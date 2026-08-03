import { Button } from "react-bootstrap"
import { useRef, useState, useEffect } from 'react'

const ChoiceButtons = () => {


    const activitiesList =
    {
        move: [
            "going for a walk",
            "tidying up",
            "cooking something"
        ],
        nomove: [
            "reading a book",
            "practicing drawing",
            "writing movie reviews",
            "playing a short visual novel"
        ]
    }

    const suggestedActs = useRef([])
    const [chosenAct, setChosenAct] = useState()

    const randomAct = (flag) => {
        var array = activitiesList[flag]
        var suggested = suggestedActs.current

        var i = Math.floor(Math.random() * array.length);
        return array[i]
    }


    var suggestActivity = [
        {
            lines: [
                "Of course! Do you feel like moving your body?"
            ],
            choices: [
                {
                    choice: "Yep!",
                    moveFlag: "move"
                },
                {
                    choice: "Not today.",
                    moveFlag: "nomove"
                }
            ]
        },
        {
            lines: [
                `In that case, how about `,
                "?"
            ],
            change: "chosenAct",
            choices: [
                {
                    choice: "Hm, maybe something else?",
                    loop: "chosenAct"
                },
                {
                    choice: "Sure, I'll do that!",
                    actFlag: chosenAct
                },
            ]
        },
        {
            lines: [
                "That's great to hear! Come tell me when you're done, alright?"
            ]
        }
    ]
    const [currentScript, setCurrentScript] = useState(suggestActivity)

    const [moveType, setMoveType] = useState("move")
    const [displayLine, setDisplayLine] = useState(suggestActivity[0].lines[0])
    const [displayChoices, setDisplayChoices] = useState(suggestActivity[0].choices)
    const [currentLine, setCurrentLine] = useState(0)

    useEffect(() => {
        setChosenAct(randomAct(moveType))
    }, [moveType])

    function choiceDisplay(choices) {
        return choices.map((el, index) => (
            <Button
                key={index}
                data-moveflag={el.moveFlag}
                data-actflag={el.actFlag}
                data-loop={el.loop}
                onClick={clickHandler}>
                {el.choice}
            </Button>
        ));
    }

    function clickHandler(event) {
        const { moveflag, actflag, loop } = event.currentTarget.dataset;

        console.log(event.currentTarget)

        if (moveflag) {
            setMoveType(moveflag)
        }

        if (actflag) {
            setChosenAct(actflag);
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
                    toChange = chosenAct
                }
                fullLine = now.lines[0] + toChange + now.lines[1]
            } else if (now.lines) {
                fullLine = now.lines[0]
            }
            setDisplayLine(fullLine);
        }

        if (loop === 'chosenAct') {
            setChosenAct(randomAct(moveType))
            console.log(chosenAct)
            var fullLine
            var now = currentScript[currentLine]
            var toChange
            if (now.change) {
                if (now.change === "chosenAct") {
                    toChange = chosenAct
                }
                fullLine = now.lines[0] + toChange + now.lines[1]
            } else if (now.lines) {
                fullLine = now.lines[0]
            }
            setDisplayLine(fullLine);
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

export default ChoiceButtons
