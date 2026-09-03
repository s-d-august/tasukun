

import lists from "../lists/listsCompiled"
import * as utils from "../utils"

const ListLanding = (allVals) => {

    console.log("allVals", allVals)

    const list = utils.findList(JSON.parse(allVals.currentList))

    console.log("list", list, lists)

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

    var taskieLine
    var choiceLine
    var jump
    var type
    var sub

    function writeLine(insert) {
        return (
            `I want to ${insert}!`
        )
    }

    if (list.ask) {
        taskieLine = list.ask

    } else if (list.type && !list.all) {
        taskieLine = `In that case, what did you have in mind?`
    }

    function assembleChoice(key, value) {

        if (list.ask) {
            console.log("top-level")
            // top-level
            choiceLine = "preset"

        } else if (list.type && !list.all) {
            console.log("type with sub")
            // types with subcategories
            choiceLine = false
            sub = true

        } else if (list.type && list.all) {
            console.log("type without sub")
            // types without subcategories
            sub = false
            choiceLine = "preset"
        }

        return (
            {
                choice: (choiceLine === "preset") ? value.type : writeLine(key),
                list: JSON.stringify({
                    currentList: sub ? value.topList : list.listName,
                    listType: sub ? list.listName : value.listName,
                    listSub: sub ? key : false
                }),
                jump: (value.type && value.all) ? "listReader" : "listLanding",

            }
        )

    }

    const choices = Object.entries(list)
        .filter((el) => typeof el[1] !== "string")
        .map(([key, value]) => assembleChoice(key, value)
        )


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

export default ListLanding