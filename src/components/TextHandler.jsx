import { Button } from "react-bootstrap"
import { useRef, useState, useEffect } from 'react'
import * as utils from "./utils.js"
import scripts from "./scripts/scriptsCompiled.jsx"
import AvatarHandler from "./AvatarHandler.jsx"
import dropdown from "./scripts/dropdown.jsx"

const TextHandler = () => {

    const [currentlyDoing, setCurrentlyDoing] = useState(localStorage.getItem("currentlyDoing") == "null" ? null : localStorage.getItem("currentlyDoing"))
    // If the user has set they're currently doing something
    var startScript = "main"

    const [currentScript, setCurrentScript] = useState(startScript)
    // The name of the current script. 
    const scriptsHistory = useRef([startScript])
    // History of read scripts, most recent first
    const [displayChoices, setDisplayChoices] = useState(() => {
        const initialLines = (scripts[startScript]({ currentlyDoing }))
        return initialLines[0]?.choices
    })
    // The user choices currently being displayed
    const [currentLine, setCurrentLine] = useState(0)
    // The line TSK is on (not assembled)
    const [displayLine, setDisplayLine] = useState()
    // The assembled currentLine

    const [currentExpression, setCurrentExpression] = useState("def")

    const [currentList, setCurrentList] = useState()
    // The list that's currently being read from
    const [listType, setListType] = useState()
    const [listSub, setListSub] = useState()
    const [suggestionTemp, setSuggestedAct] = useState()
    // The currently suggested activity
    const optionsArray = useRef()
    // The selection of choices to iterate through

    const getAllVals = () => ({
        currentLine,
        currentlyDoing,
        currentScript,
        displayChoices,
        displayLine,
        scriptsHistory: scriptsHistory.current,
    })

    const getScriptLines = () => {
        return (scripts[currentScript](getAllVals()))
    }

    useEffect(() => {
        scriptsHistory.current = [(currentScript), ...scriptsHistory.current]
    }, [currentScript])
    // Updates script history (stored as function) when script changes

    useEffect(() => {
        const assembledScript = getScriptLines()[currentLine]
        console.log("assembledScript", assembledScript)
        var line

        if (typeof assembledScript === "string") {
            line = assembledScript
        } else line = assembledScript?.line

        setDisplayChoices(assembledScript?.choices);

        setDisplayLine(line);

        if (assembledScript.face) {
            setCurrentExpression(assembledScript.face)
        }

    }, [currentLine, currentScript])

    function choiceDisplay(choices) {
        // expecting an array of objects

        if (!choices) {
            return (
                <Button
                    key={0}
                    className={"jumpWorks"}
                    onClick={clickHandler}>
                    {"..."}
                </Button>
            )
        }

        const jumpTarget = choices.filter(utils.isString)
        // If the choice array contains a bare string, that's used as the jump for all choices

        const choicesClean = choices.filter(utils.notString).map((el, index) => {

            var jumpClass = "jumpWorks"

            if (el.jump && !scripts[el.jump]) {
                //   console.log(el.jump, "Script not found!")
                jumpClass = "jumpBroken"
            }

            if (el.dropdown) {
                return dropdown(el.dropdown, el.set, el.choice, clickHandler, el.jump)
            }

            return (
                <Button
                    key={index}
                    data-loop={el.loop}
                    data-jump={el.jump ? el.jump : jumpTarget}
                    data-reset={el.reset}
                    data-set={el.set ? JSON.stringify(el.set) : ""}
                    className={jumpClass}
                    onClick={clickHandler}>
                    {el.choice}
                </Button>
            );
        });

        return choicesClean;
    }

    function scriptJump(jump) {

        const ifArray = Array.isArray(jump)

        console.log("jump", jump)
        if (!jump) {
            //    console.log(jump, "Script not found!")
            return;
        }
        setCurrentScript(ifArray ? jump[0] : jump);
        setCurrentLine(ifArray ? jump[1] : 0);
    }

    function clickHandler(event) {
        const { jump, reset, set } = event.currentTarget.dataset;

        function setTodo(vals) {
            const normalized = Array.isArray(vals) ? vals : [vals]
            console.log("set todo", vals, normalized)
            localStorage.setItem("todo", JSON.stringify(normalized))
        }
        function setDone(vals) {
            const normalized = Array.isArray(vals) ? vals : [vals]
            console.log("set done", vals, normalized)
            localStorage.setItem("done", JSON.stringify(normalized))
        }

        function getCheckedItems() {
            return Array.from(document.querySelectorAll('input[type=checkbox]:checked'), (checkbox) => checkbox.value)
        }

        function applySet(parsedSet) {
            if (!Array.isArray(parsedSet)) return

            const [action, value] = parsedSet

            console.log("parsedSet: ", parsedSet)

            const doing = value === "getChecked" ? getCheckedItems() : value

            const actions = {
                currentlyDoing: (nextValue) => {
                    setCurrentlyDoing(nextValue)
                    localStorage.setItem("currentlyDoing", nextValue)
                },
                type: setListType,
                sub: setListSub,
                list: setCurrentList,
                setTodo,
                setDone,
            }

            actions[action]?.(doing)
        }

        if (set) {

            try {
                const parsedSet = JSON.parse(set);

                console.log("parsedSet", parsedSet)

                if (Array.isArray(parsedSet) && Array.isArray(parsedSet[0])) {
                    parsedSet.forEach(applySet)
                } else {
                    applySet(parsedSet)
                }
            } catch {
                applySet(set.split(","))
                console.log("Invalid set payload", set);
            }
        }



        if (reset) {
            console.log("script from history", scriptsHistory.current[1])
            setCurrentScript(() => scriptsHistory.current[1])
            //resetOptionsArray()
        }

        if (jump) {
            scriptJump(jump)
        } else {
            const nextLine = currentLine + 1;
            const scriptLines = getScriptLines()

            if (!scriptLines[nextLine]) {
                console.log(currentScript, "Line not found!")
                return
            }
            setCurrentLine(nextLine);
            setDisplayChoices(scriptLines[nextLine].choices);
        }
    }



    return (
        <div>
            <div id="avatarDiv">
                <AvatarHandler
                    face={currentExpression} />
            </div>
            <p id="lineDiv">
                {displayLine}
            </p>
            <div id="choicesDiv">
                {choiceDisplay(displayChoices)}
            </div>
        </div>

    )

}
export default TextHandler
