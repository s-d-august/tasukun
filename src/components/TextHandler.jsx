import { Button } from "react-bootstrap"
import { useRef, useState, useEffect } from 'react'
import * as utils from "./utils.js"
import scripts from "./scripts/scriptsCompiled.jsx"
import lists from "./lists/listsCompiled.jsx"


const TextHandler = () => {

    const [moveType, setMoveType] = useState("move")
    // Whether the user feels like doing something active (options: move, nomove)
    const [chosenAct, setChosenAct] = useState()
    // The currently suggested activity

    const [currentScript, setCurrentScript] = useState(scripts.suggestActivity)
    // The script currently being read from
    const [displayChoices, setDisplayChoices] = useState(scripts.suggestActivity[0].choices)
    // The user choices currently being displayed
    const [currentLine, setCurrentLine] = useState(0)
    // The line TSK is on (not assembled)
    const [displayLine, setDisplayLine] = useState(scripts.suggestActivity[0].lines[0])
    // The assembled currentLine

    const optionsArray = useRef([...lists.activitiesList[moveType]])
    // The selection of choices to iterate through

    useEffect(() => {
        setDisplayChoices(currentScript[0].choices)
        setCurrentLine(0)
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
            if (now.change === "chosenAct") {
                if (chosenAct === undefined) {
                    toChange = randomAct(moveType)
                    setChosenAct(toChange)
                } else {
                    toChange = chosenAct
                }
            }
            fullLine = now.lines[0] + toChange + now.lines[1]
        } else if (now.lines) {
            fullLine = now.lines[0]
        }
        setDisplayLine(fullLine);
    }, [currentLine, chosenAct, currentScript, moveType])


    function randomAct(flag) {
        console.log("options: ", optionsArray.current)
        return optionsArray.current.pop()
    }

    function choiceDisplay(choices) {
        return choices.map((el, index) => (
            <Button
                key={index}
                data-moveflag={el.moveFlag}
                data-actflag={el.actFlag}
                data-loop={el.loop}
                data-jump={el.jump}
                data-script={el.script}
                onClick={clickHandler}>
                {el.choice}
            </Button>
        ));
    }

    function clickHandler(event) {
        const { moveflag, actflag, loop, jump, script } = event.currentTarget.dataset;

        if (moveflag) {
            setMoveType(moveflag)
        }

        if (actflag === "chosenAct") {
            setChosenAct(chosenAct);
        }

        if (script && scripts[script]) {
            setCurrentScript(scripts[script]);
            setDisplayChoices(scripts[script][0].choices);
            setCurrentLine(0);
        }

        if (!loop) {
            const nextLine = currentLine + 1;
            setCurrentLine(nextLine);
            setDisplayChoices(currentScript[nextLine].choices);
        }
        if (loop === 'chosenAct') {
            var act = randomAct(moveType)

            var now = currentScript[currentLine]
            console.log(act, now)
            if (act) {
                setChosenAct(act)
            } else if (!act && now.jump) {
                console.log("nojump")
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
