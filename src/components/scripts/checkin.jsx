
import activitiesList from "../lists/activitiesList"
import * as utils from "../utils"

const checkin = (allVals) => {

    console.log(allVals, allVals.scriptsHistory)

    const prevCheckin = localStorage.getItem("checkin date")
    const nowCheckin = utils.whatTime().dmy

    function storeOldVals() {
        console.log("checkin days", prevCheckin, nowCheckin)
        if (prevCheckin !== nowCheckin) {

            const oldVals = {
                todo: utils.readStoredList("todo"),
                done: utils.readStoredList("done")
            }

            localStorage.setItem(prevCheckin, JSON.stringify(oldVals))
            localStorage.setItem("todo", [])
            localStorage.setItem("done", [])
        }
    }

    storeOldVals()

    const todoItems = utils.readStoredList("todo")
    const doneItems = utils.readStoredList("done")
    const sumLength = (todoItems?.length + doneItems?.length)

    localStorage.setItem("checkin date", nowCheckin)

    function getReplyString() {

        var introstring = (allVals.scriptsHistory[1] !== "checkin") ? "Last we spoke, you said you" : "So you"
        var todoString = todoItems.length ? `'re planning on ${todoItems.join(" and ")}` : ""
        var doneString = doneItems.length ? ` already ${doneItems.join(" and ")}` : ""
        var isAnd = (todoString && doneString) ? `, and you` : ""
        var endString = (sumLength) > 3 ? `? That's a lot! I'm impressed!`
            : (todoItems?.length) > 2 ? `? You've got a lot to do! I believe in you!`
                : (doneItems?.length) > 2 ? `? You've been busy! I'm so proud of you!`
                    : `? That's wonderful to hear!`

        if (sumLength < 1) {
            return `Tell me -- what are your plans for the day?`
        } else return (
            introstring + todoString + isAnd + utils.pastTense(doneString) + endString
        )
    }

    function getSuggString() {
        if (sumLength < 1) {
            return "Nothing just yet. Can you suggest something?"
        } else return (
            "Can you suggest something else too?"
        )
    }

    function isAlso() {
        if (sumLength < 1) {
            return ""
        } else return (
            " also"
        )
    }

    return (
        [
            {
                line: getReplyString(),

                choices: [
                    {
                        choice: getSuggString(),
                        jump: "listLanding"
                    },
                    {
                        choice: `I'm${isAlso()} planning on...`,
                        dropdown: activitiesList,
                        set: ["todo", "getChecked"],
                        jump: ["checkin", 0]
                    },
                    {
                        choice: `I${isAlso()} already finished...`,
                        dropdown: activitiesList,
                        set: ["done", "getChecked"],
                        jump: ["checkin", 0]
                    },
                    {
                        choice: `I'll check back in later!`
                    },
                    {
                        choice: `That's all for today!`,
                        jump: "finalCheckin"
                    },
                ]
            },
            {
                line: "I'll be looking forward to seeing you! And remember -- I'm always here if you need me!",

                choices: [
                    {
                        choice: "You got it!",
                        jump: "main"
                    }
                ]
            }
        ]
    )
}

export default checkin