
import activitiesList from "../lists/activitiesList"
import * as utils from "../utils"

const checkin = (allVals) => {

    const prevCheckin = localStorage.getItem("checkin date")
    localStorage.setItem("checkin date", utils.whatTime().date)
    const nowCheckin = localStorage.getItem("checkin date")

    const todoItems = utils.readStoredList("todo")
    const doneItems = utils.readStoredList("done")
    const sumLength = (todoItems?.length + doneItems?.length)

    function getReplyString() {

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
            `So you` + todoString + isAnd + utils.pastTense(doneString) + endString
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
                        set: ["setTodo", "getChecked"],
                        jump: ["checkin", 0]
                    },
                    {
                        choice: `I${isAlso()} already finished...`,
                        dropdown: activitiesList,
                        set: ["setDone", "getChecked"],
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