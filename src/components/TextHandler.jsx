import { Button } from "react-bootstrap"
import { useRef, useState, useEffect } from 'react'
import * as utils from "./utils.js"
import scripts from "./scripts/scriptsCompiled.jsx"
import lists from "./lists/listsCompiled.jsx"
import AvatarHandler from "./AvatarHandler.jsx"

const TextHandler = () => {

    const [currentlyDoing, setCurrentlyDoing] = useState(localStorage.getItem("currentlyDoing") == "null" ? null : localStorage.getItem("currentlyDoing"))
    // If the user has set they're currently doing something
    var startScript = "main"

    const [moveType, setMoveType] = useState("move")
    // Whether the user feels like doing something active (options: move, nomove, listen)
    const [suggestedAct, setSuggestedAct] = useState()
    // The currently suggested activity

    const [currentScript, setCurrentScript] = useState(startScript)
    // The name of the current script. 
    const scriptsHistory = useRef([startScript])
    // History of read scripts, most recent first
    const [displayChoices, setDisplayChoices] = useState(() => {
        const initialLines = utils.normalizeScript(scripts[startScript]({ currentlyDoing }))
        return initialLines[0]?.choices
    })
    // The user choices currently being displayed
    const [currentLine, setCurrentLine] = useState(0)
    // The line TSK is on (not assembled)
    const [displayLine, setDisplayLine] = useState()
    // The assembled currentLine

    const [currentExpression, setCurrentExpression] = useState("def")

    const optionsArray = useRef([...lists.activitiesList[moveType]])
    // The selection of choices to iterate through

    const getAllVals = () => ({
        currentLine,
        currentlyDoing,
        currentScript,
        displayChoices,
        displayLine,
        moveType,
        optionsArray: optionsArray.current,
        scriptsHistory: scriptsHistory.current,
        suggestedAct,
    })

    const getScriptLines = () => {
        return utils.normalizeScript(scripts[currentScript](getAllVals()))
    }

    useEffect(() => {
        scriptsHistory.current = [(currentScript), ...scriptsHistory.current]
    }, [currentScript])
    // Updates script history (stored as function) when script changes

    useEffect(() => {
        resetOptionsArray()
    }, [moveType])
    // Refreshes the array of suggestions when moveType changes

    useEffect(() => {
        const assembledScript = getScriptLines()[currentLine]

        setDisplayChoices(assembledScript?.choices);

        setDisplayLine(assembledScript?.lines);

        if (assembledScript.face) {
            setCurrentExpression(assembledScript.face)
        }

    }, [currentLine, suggestedAct, currentScript, moveType])

    function randomAct() {
        return optionsArray.current.pop()
    }

    function resetOptionsArray() {
        optionsArray.current = [...lists.activitiesList[moveType]]
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
                    data-moveflag={el.moveFlag}
                    data-actflag={el.actFlag}
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
        const scriptEntry = jump;

        if (!scriptEntry) {
            //    console.log(jump, "Script not found!")
            return;
        }
        setCurrentScript(scriptEntry);
        setCurrentLine(line || 0);
    }

    function clickHandler(event) {
        const { moveflag, actflag, loop, jump, reset, set } = event.currentTarget.dataset;

        if (moveflag) {
            setMoveType(moveflag)
        }

        if (set) {
            try {
                console.log("set")
                const parsedSet = JSON.parse(set);
                if (Array.isArray(parsedSet) && parsedSet[0] === "currentlyDoing") {
                    console.log("setCurrentlyDoing")
                    var doing
                    if (moveType === "listen") {
                        doing = (parsedSet[1] == null)
                            ? null
                            : ("listening to " + parsedSet[1])
                    } else doing = parsedSet[1]
                    setCurrentlyDoing(doing);
                    localStorage.setItem("currentlyDoing", doing)
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

        if (loop === 'suggestedAct') {
            var act = randomAct(moveType)

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
