import * as utils from "../utils"

const finalCheckin = (allVals) => {

    const todoItems = utils.readStoredList("todo")
    const doneItems = utils.readStoredList("done")
    const todoNum = todoItems?.length
    const doneNum = doneItems?.length
    const sumLength = (todoNum + doneNum)

    localStorage.setItem(utils.whatTime().dmy, { "todo": todoItems, "done": doneItems })

    function getLine() {
        var todoString = todoNum ? ` planned on ${todoItems.join(" and ")}` : ""
        var doneString = doneNum ? ` ${doneItems.join(" and ")}` : ""
        var isAnd = (todoString && doneString) ? `, and you` : ""
        var endTodo = (todoNum === 0) ? `. You didn't make any plans`
            : (todoNum > 2) ? `. You had a lot planned`
                : ". You had some plans"

        var joiner = (todoString < doneString || todoString > doneString) ? `, but ` : `, and `

        var endDone = (doneNum === 0) ? `you didn't get much done, huh?`
            : (doneNum) > 2 ? `you did a lot!`
                : `you got some stuff done.`

        return (
            `Let me see... Today, you` + todoString + isAnd + utils.pastTense(doneString) + endTodo + joiner + endDone
        )
    }

    return (
        [
            {
                line: getLine(),
                face: "excited",
                choices: [
                    {
                        choice: "Aw thanks!",
                        set: ["todo", null]
                    }
                ]
            },
            {
                line: "Of course! I'm always happy to hear when you get things done. Keep up the good work!",
                face: "pleased",
                choices: [
                    {
                        choice: "I'll do my best! [return to main page]",
                        jump: "main"
                    }
                ]
            }
        ]
    )
}

export default finalCheckin
