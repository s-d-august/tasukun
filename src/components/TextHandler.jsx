import { Button } from "react-bootstrap"
import { useRef, useState, useEffect } from 'react'
import * as utils from "./utils.js"
import scripts from "./scripts/scriptsCompiled.jsx"
import lists from "./lists/listsCompiled.jsx"


const TextHandler = () => {

    const startScript = scripts.main

    const [currentlyDoing, setCurrentlyDoing] = useState()
    // If the user has set they're currently doing something

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

    const allVals = useRef()

    useEffect(() => {
        allVals.current = {
            currentLine,
            currentlyDoing,
            currentScript,
            displayChoices,
            displayLine,
            moveType,
            optionsArray,
            scriptsHistory,
            suggestedAct,
        }
    }, [
        currentLine,
        currentlyDoing,
        currentScript,
        displayChoices,
        displayLine,
        moveType,
        optionsArray,
        scriptsHistory,
        suggestedAct,
    ])

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
        setDisplayChoices(currentScript[currentLine].choices);

        var fullLine
        var now = currentScript[currentLine]
        var toChange
        if (now.change) {
            if (now.change === "suggestedAct") {
                if (suggestedAct === undefined) {
                    toChange = randomAct(moveType)
                    setSuggestedAct(toChange)
                } else {
                    toChange = suggestedAct
                }
            }
            fullLine = now.lines[0] + toChange + now.lines[1]
        } else if (now.lines) {
            fullLine = now.lines[0]
        }
        setDisplayLine(fullLine);
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

            return (
                <Button
                    key={index}
                    data-moveflag={el.moveFlag}
                    data-actflag={el.actFlag}
                    data-loop={el.loop}
                    data-jump={el.jump ? el.jump : jumpTarget}
                    data-reset={el.reset}
                    onClick={clickHandler}>
                    {el.choice}
                </Button>
            );
        });

        return choicesClean;
    }

    function scriptJump(jump) {
        if (scripts[jump]) {
            setCurrentScript(scripts[jump]);
            setDisplayChoices(scripts[jump][0].choices);
            setCurrentLine(0);
        } else console.log(jump, "Script not found!")
    }

    function clickHandler(event) {
        const { moveflag, actflag, loop, jump, reset } = event.currentTarget.dataset;

        if (moveflag) {
            setMoveType(moveflag)
        }

        if (currentlyDoing) {
            if (currentlyDoing === "false") {
                setCurrentlyDoing(null)
            } else setCurrentlyDoing(suggestedAct);
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
