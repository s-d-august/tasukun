import { Button } from "react-bootstrap"
import { useRef, useState, useEffect } from 'react'
import * as utils from "./utils.js"
import scripts from "./scripts/scriptsCompiled.jsx"
import lists from "./lists/listsCompiled.jsx"


const TextHandler = () => {

    const [currentlyDoing, setCurrentlyDoing] = useState("reading")
    // If the user has set they're currently doing something
    var startScript = scripts.main


    const [moveType, setMoveType] = useState("move")
    // Whether the user feels like doing something active (options: move, nomove, listen)
    const [suggestedAct, setSuggestedAct] = useState()
    // The currently suggested activity

    const [currentScript, setCurrentScript] = useState(startScript)
    // The script currently being read from
    const scriptsHistory = useRef([startScript])
    // History of read scripts, most recent first
    const [displayChoices, setDisplayChoices] = useState(startScript[0].choices)
    // The user choices currently being displayed
    const [currentLine, setCurrentLine] = useState(0)
    // The line TSK is on (not assembled)
    const [displayLine, setDisplayLine] = useState(startScript[0].lines[0])
    // The assembled currentLine

    const optionsArray = useRef([...lists.activitiesList[moveType]])
    // The selection of choices to iterate through

    const getAllVals = () => ({
        currentLine,
        currentlyDoing,
        currentScript,
        displayChoices,
        displayLine,
        moveType,
        optionsArray,
        scriptsHistory,
        suggestedAct,
    })

    useEffect(() => {
        setDisplayChoices(currentScript[0].choices)
        setCurrentLine(0)
        scriptsHistory.current = [currentScript, ...scriptsHistory.current]
    }, [currentScript])

    useEffect(() => {
        optionsArray.current = [...lists.activitiesList[moveType]]
        utils.shuffleArray(optionsArray.current)
    }, [moveType])

    useEffect(() => {

        const assembledScript = typeof currentScript === "function"
            ? currentScript(getAllVals())[currentLine]
            : currentScript[currentLine]

        setDisplayChoices(assembledScript.choices);

        const nextLineText = Array.isArray(assembledScript?.lines)
            ? assembledScript.lines.join(" ")
            : typeof assembledScript === "string"
                ? assembledScript
                : "";

        setDisplayLine(nextLineText);
    }, [currentLine, suggestedAct, currentScript, moveType])


    function randomAct() {
        return optionsArray.current.pop()
    }

    function notString(obj) {
        return (typeof obj !== "string")
    }

    function choiceDisplay(choices) {
        const jumpTarget =
            choices.includes("suggestionsReader")
                ? "suggestionsReader"
                : null

        const choicesClean = choices.filter(notString).map((el, index) => {

            var jumpClass = "jumpWorks"

            if (el.jump && !scripts[el.jump]) {
                console.log(el.jump, "Script not found!")
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

    function scriptJump(jump) {
        const scriptEntry = scripts[jump];

        if (!scriptEntry) {
            console.log(jump, "Script not found!")
            return;
        }

        const nextScript = typeof scriptEntry === "function"
            ? scriptEntry(getAllVals())
            : scriptEntry;

        setCurrentScript(nextScript);
        setDisplayChoices(nextScript[0].choices);
        setCurrentLine(0);
    }

    function clickHandler(event) {
        const { moveflag, actflag, loop, jump, reset, set } = event.currentTarget.dataset;

        if (moveflag) {
            setMoveType(moveflag)
        }

        if (set) {
            try {
                const parsedSet = JSON.parse(set);
                if (Array.isArray(parsedSet) && parsedSet[0] === "currentlyDoing") {
                    setCurrentlyDoing(parsedSet[1]);
                }
            } catch {
                console.log("Invalid set payload", set);
            }
        }

        if (currentlyDoing !== undefined) {
            if (currentlyDoing === "false") {
                setCurrentlyDoing(null)
            } else if (suggestedAct !== undefined) {
                setCurrentlyDoing(suggestedAct)
            }
        }

        if (reset) {
            setCurrentScript(scriptsHistory.current[1])
            optionsArray.current = [...lists.activitiesList[moveType]]
            utils.shuffleArray(optionsArray.current)
            setSuggestedAct(undefined)
        }

        if (!loop) {
            if (jump) {
                scriptJump(jump)
            } else {
                const nextLine = currentLine + 1;
                if (!currentScript[nextLine]) {
                    console.log(currentScript, "Line not found!")
                    return
                }
                setCurrentLine(nextLine);
                setDisplayChoices(currentScript[nextLine].choices);
            }

        }

        if (loop === 'suggestedAct') {
            var act = randomAct(moveType)

            var now = currentScript[currentLine]
            if (act) {
                setSuggestedAct(act)
            } else if (!act && now.jump) {
                scriptJump(now.jump)
            }

        }

    }

    return (
        <div>
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
