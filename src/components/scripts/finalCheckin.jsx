import * as utils from "../utils"

const finalCheckin = (allVals) => {

    const todoItems = utils.readStoredList("todo")
    const doneItems = utils.readStoredList("done")
    const sumLength = (todoItems?.length + doneItems?.length)

    localStorage.setItem(utils.whatTime().dmy, { "todo": todoItems, "done": doneItems })

    function getLine() {
        var todoString = todoItems?.length ? ` planned on ${todoItems.join(" and ")}` : ""
        var doneString = doneItems?.length ? ` ${doneItems.join(" and ")}` : ""
        var isAnd = (todoString && doneString) ? `, and you` : ""
        var endString = (doneItems?.length === 0) ? ` didn't get much done, huh? That's okay -- sometimes you need to rest.`
            : (sumLength) > 3 ? `? That's a lot! I'm impressed!`
                : (todoItems?.length) > 2 ? `? You've got a lot to do! I believe in you!`
                    : (doneItems?.length) > 2 ? `. You got a lot done! That's great!`
                        : `? That's wonderful to hear!`

        return (
            `Let me see... Today, you` + todoString + isAnd + utils.pastTense(doneString) + endString
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
