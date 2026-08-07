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
    const [suggestedAct, setSuggestedAct] = useState("reading")
    // The currently suggested activity

    const [currentScriptFunc, setCurrentScriptFunc] = useState(() => startScript)
    // The function that generates the currently selected script. MUST be set with ()=>
    const scriptsHistory = useRef([startScript])
    // History of read scripts, most recent first
    const [displayChoices, setDisplayChoices] = useState(currentScriptFunc()[0].choices)
    // The user choices currently being displayed
    const [currentLine, setCurrentLine] = useState(0)
    // The line TSK is on (not assembled)
    const [displayLine, setDisplayLine] = useState()
    // The assembled currentLine

    const optionsArray = useRef([...lists.activitiesList[moveType]])
    // The selection of choices to iterate through

    const getAllVals = () => ({
        currentLine,
        currentlyDoing,
        currentScriptFunc,
        displayChoices,
        displayLine,
        moveType,
        optionsArray: optionsArray.current,
        scriptsHistory: scriptsHistory.current,
        suggestedAct,
    })

    useEffect(() => {
        console.log("test", currentScriptFunc(getAllVals())[0].choices)
        setDisplayChoices(currentScriptFunc(getAllVals())[0].choices)
    }, [])
    //Initializes values

    useEffect(() => {
        scriptsHistory.current = [(currentScriptFunc), ...scriptsHistory.current]
    }, [currentScriptFunc])
    // Updates script history (stored as function) when script changes

    useEffect(() => {
        optionsArray.current = [...lists.activitiesList[moveType]]
        utils.shuffleArray(optionsArray.current)
    }, [moveType])
    // Refreshes the array of suggestions when moveType changes

    useEffect(() => {
        const assembledScript = currentScriptFunc(getAllVals())[currentLine]
        console.log("assemble script currentScriptFunc: ", currentScriptFunc)

        setDisplayChoices(assembledScript.choices);

        setDisplayLine(assembledScript.lines);
    }, [currentLine, suggestedAct, currentScriptFunc, moveType])

    console.log("script test", scripts.suggestionsReader(getAllVals()))

    function randomAct() {
        return optionsArray.current.pop()
    }

    function notString(obj) {
        return (typeof obj !== "string")
    }

    function choiceDisplay(choices) {
        // expecting an array of objects
        console.log(choices)
        const jumpTarget =
            choices.includes("suggestionsReader")
                ? "suggestionsReader"
                : null

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
        const scriptEntry = scripts[jump];

        if (!scriptEntry) {
            //    console.log(jump, "Script not found!")
            return;
        }
        console.log("scriptEntry", scriptEntry, getAllVals())
        setCurrentScriptFunc(() => scriptEntry);
        setCurrentLine(line || 0);
    }

    function clickHandler(event) {
        const { moveflag, actflag, loop, jump, reset, set } = event.currentTarget.dataset;
        console.log("click handler allVals", getAllVals())
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

        if (reset) {
            console.log("script from history", scriptsHistory.current[1])
            setCurrentScriptFunc(() => scriptsHistory.current[1])
            optionsArray.current = [...lists.activitiesList[moveType]]
            utils.shuffleArray(optionsArray.current)
            setSuggestedAct(undefined)
        }
        console.log("not loop call currentScriptFunc: ", currentScriptFunc, getAllVals())
        if (!loop) {
            if (jump) {
                scriptJump(jump)
            } else {
                const nextLine = currentLine + 1;

                if (!currentScriptFunc(getAllVals())[nextLine]) {
                    console.log(currentScriptFunc, "Line not found!")
                    return
                }
                setCurrentLine(nextLine);
                setDisplayChoices(currentScriptFunc(getAllVals())[nextLine].choices);
            }

        }

        if (loop === 'suggestedAct') {
            var act = randomAct(moveType)
            console.log("loop call currentScriptFunc: ", currentScriptFunc)

            var now = currentScriptFunc(getAllVals())[currentLine]
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
