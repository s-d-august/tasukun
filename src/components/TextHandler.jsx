import { Button } from "react-bootstrap"
import { useRef, useState, useEffect } from 'react'
import suggestActivity from "./scripts/suggestActivity"
import activitiesList from "./scripts/activititesList"
import * as utils from "./utils.js"

const TextHandler = () => {

    const [moveType, setMoveType] = useState("move")
    // Whether the user feels like doing something active (options: move, nomove)
    const [chosenAct, setChosenAct] = useState()
    // The currently suggested activity

    const [currentScript, setCurrentScript] = useState(suggestActivity)
    // The script currently being read from
    const [displayChoices, setDisplayChoices] = useState(suggestActivity[0].choices)
    // The user choices currently being displayed
    const [currentLine, setCurrentLine] = useState(0)
    // The line TSK is on (not assembled)
    const [displayLine, setDisplayLine] = useState(suggestActivity[0].lines[0])
    // The assembled currentLine

    const optionsArray = useRef([])
    // The selection of choices to iterate through

    useEffect(() => {
        optionsArray.current = [...activitiesList[moveType]]
        utils.shuffleArray(optionsArray.current)
    }, [])

    useEffect(() => {
        optionsArray.current = [...activitiesList[moveType]]
        utils.shuffleArray(optionsArray.current)
    }, [moveType])


    function randomAct(flag) {
        console.log(optionsArray.current)
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
                onClick={clickHandler}>
                {el.choice}
            </Button>
        ));
    }

    function clickHandler(event) {
        const { moveflag, actflag, loop, jump } = event.currentTarget.dataset;

        if (moveflag) {
            setMoveType(moveflag)
        }

        if (actflag === "chosenAct") {
            setChosenAct(chosenAct);
        }

        if (!loop) {
            const nextLine = currentLine + 1;
            setCurrentLine(nextLine);
            setDisplayChoices(currentScript[nextLine].choices);
            var fullLine
            var now = currentScript[nextLine]
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
        }

        if (loop === 'chosenAct') {
            var act = randomAct(moveType)

            if (act) {
                setChosenAct(act)

                var fullLine
                var now = currentScript[currentLine]
                var toChange
                if (now.change) {
                    if (now.change === "chosenAct") {
                        toChange = act
                    }
                    fullLine = now.lines[0] + toChange + now.lines[1]
                } else if (now.lines) {
                    fullLine = now.lines[0]
                }
                setDisplayLine(fullLine);
            } else if (!act && now.jump) {
                console.log("test")
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
