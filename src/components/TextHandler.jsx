import { Button } from "react-bootstrap"
import { useRef, useState, useEffect } from 'react'
import * as utils from "./utils.js"
import scripts from "./scripts/scriptsCompiled.jsx"
import AvatarHandler from "./AvatarHandler.jsx"

const TextHandler = () => {

    const [currentlyDoing, setCurrentlyDoing] = useState(localStorage.getItem("currentlyDoing") == "null" ? null : localStorage.getItem("currentlyDoing"))
    // If the user has set they're currently doing something
    var startScript = "main"

    const [currentList, setCurrentList] = useState()
    // The list that's currently being read from
    const [listType, setListType] = useState()
    const [listSub, setListSub] = useState()
    const [suggestionTemp, setSuggestedAct] = useState()
    // The currently suggested activity

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

    const optionsArray = useRef()
    // The selection of choices to iterate through

    const getAllVals = () => ({
        currentLine,
        currentlyDoing,
        currentScript,
        displayChoices,
        displayLine,
        currentList,
        listType,
        listSub,
        optionsArray: optionsArray.current,
        scriptsHistory: scriptsHistory.current,
        suggestionTemp,
    })

    const getScriptLines = () => {
        return (scripts[currentScript](getAllVals()))
    }

    const getFullList = () => {
        return utils.findList(currentList, listType, listSub)
    }

    useEffect(() => {
        scriptsHistory.current = [(currentScript), ...scriptsHistory.current]
    }, [currentScript])
    // Updates script history (stored as function) when script changes

    useEffect(() => {
        if (getFullList()) {
            resetOptionsArray()
        } else return
    }, [currentList, listType, listSub])
    // Refreshes the array of suggestions when currentList changes

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

    }, [currentLine, suggestionTemp, currentScript, currentList, listType, listSub])

    function randomAct() {
        return optionsArray.current.pop()
    }

    function resetOptionsArray() {
        const list = getFullList()
        if (!Array.isArray(list)) return

        optionsArray.current = list
        utils.shuffleArray(optionsArray.current)
        setSuggestedAct(randomAct())
    }

    function notString(obj) {
        return (typeof obj !== "string")
    }

    function isString(obj) {
        return (typeof obj == "string")
    }

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

        const jumpTarget = choices.filter(isString)
        // If the choice array contains a bare string, that's used as the jump for all choices

        const choicesClean = choices.filter(notString).map((el, index) => {

            var jumpClass = "jumpWorks"

            if (el.jump && !scripts[el.jump]) {
                //   console.log(el.jump, "Script not found!")
                jumpClass = "jumpBroken"
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

    function scriptJump(jump, line) {

        const scriptEntry = jump

        console.log("jump", scriptEntry)
        if (!scriptEntry) {
            //    console.log(jump, "Script not found!")
            return;
        }
        setCurrentScript(scriptEntry);
        setCurrentLine(line || 0);
    }

    function clickHandler(event) {
        const { actflag, loop, jump, reset, set } = event.currentTarget.dataset;

        function applySet(parsedSet) {
            if (!Array.isArray(parsedSet)) return

            var doing = parsedSet[1]
            if (parsedSet[0] === "currentlyDoing") {
                setCurrentlyDoing(doing);
                localStorage.setItem("currentlyDoing", doing)
            } else if (parsedSet[0] === "type") {
                setListType(doing)
            } else if (parsedSet[0] === "sub") {
                setListSub(doing)
            } else if (parsedSet[0] === "list") {
                setCurrentList(doing)
            }
        }

        if (set) {
            console.log("set", set)
            try {
                const parsedSet = JSON.parse(set);

                if (Array.isArray(parsedSet) && Array.isArray(parsedSet[0])) {
                    parsedSet.forEach(applySet)
                } else {
                    applySet(parsedSet)
                }
            } catch {
                console.log("Invalid set payload", set);
            }
        }

        if (reset) {
            console.log("script from history", scriptsHistory.current[1])
            setCurrentScript(() => scriptsHistory.current[1])
            resetOptionsArray()
        }

        if (!loop) {
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

        if (loop === 'suggestionTemp') {
            var act = randomAct(getFullList())

            var now = getScriptLines()[currentLine]
            if (act) {
                setSuggestedAct(act)
            } else if (!act && now.jump) {
                scriptJump(now.jump)
            }

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
