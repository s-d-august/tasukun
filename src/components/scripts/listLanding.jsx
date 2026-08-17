

import lists from "../lists/listsCompiled"
import { findList } from "../utils"

const listLanding = (allVals) => {

    const list = findList(allVals.currentList, allVals.listType, allVals.listSub)
    if (!list) {
        return (
            [
                {
                    line: "I couldn't find that list. Let's try another option.",
                    face: "earnest",
                    choices: [
                        {
                            choice: "Back",
                            jump: "main"
                        }
                    ]
                }
            ]
        )
    }

    const keys = Object.keys(list)
    var taskieLine
    var choiceLine
    var jump
    var type
    var sub
    console.log("listLanding", list)


    function writeLine(insert) {
        return (
            `I want to ${insert}!`
        )
    }

    function setList(key, type, sub) {
        return (
            type && sub ? [["type", key], ["sub", "all"]]
                : type ? ["type", key]
                    : sub ? ["sub", key]
                        : null
        )

    }

    if (list.ask) {
        console.log("top-level")
        // top-level
        taskieLine = list.ask
        choiceLine = "preset"
        type = true
        jump = "listLanding"

    } else if (list.type && !list.all) {
        console.log("type with sub")
        // types with subcategories
        taskieLine = `In that case, what did you have in mind?`
        sub = true
        jump = "listLanding"
        choiceLine = false

    } else if (list.type && list.all) {
        console.log("type without sub")
        // types without subcategories
        jump = "listReader"
        type = true
        sub = true

    }

    const choices = Object.entries(list)
        .filter((el) => typeof el[1] !== "string")
        .map(([key, value]) => {
            console.log(value)

            return (
                {
                    choice: (choiceLine === "preset") ? value.type : writeLine(key),
                    set: setList(key, type, sub),
                    jump: jump,

                }
            )
        })

    console.log("listLanding choices", choices)

    return (
        [
            {
                line: taskieLine,
                face: "earnest",
                choices: choices
            }
        ]
    )

}

export default listLanding