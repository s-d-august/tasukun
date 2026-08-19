
import activitiesList from "../lists/activitiesList"
import { pastTense } from "../utils"

const checkin = (allVals) => {

    const plans = localStorage.getItem("checkin") === "null" ? null : localStorage.getItem("checkin")

    function readStoredList(list) {
        const raw = localStorage.getItem(list)
        if (!raw) return []

        try {
            const parsed = JSON.parse(raw)
            if (Array.isArray(parsed)) return parsed
            if (typeof parsed === "string") return [parsed]
        } catch {
            return raw.split(",").map((item) => item.trim()).filter(Boolean)
        }

        return []
    }

    function getReplyString() {
        const todoItems = readStoredList("todo")
        const doneItems = readStoredList("done")

        var todoString = todoItems.length ? `'re planning on ${todoItems.join(" and ")}` : ""
        var doneString = doneItems.length ? ` already ${doneItems.join(" and ")}` : ""
        var isAnd = (todoString && doneString) ? `, and you` : ""
        var endString = (todoItems?.length + doneItems?.length) > 3 ? `? That's a lot! I'm impressed!`
            : (todoItems?.length) > 2 ? `? You've got a lot to do! I believe in you!`
                : (doneItems?.length) > 2 ? `? You've been busy! I'm so proud of you!`
                    : `? That's wonderful to hear!`

        return (
            `So you` + todoString + isAnd + pastTense(doneString) + endString
        )
    }

    console.log(getReplyString())


    if (!plans) {
        return (
            [
                {
                    line: `Tell me -- what are your plans for the day?`,

                    choices: [
                        {
                            choice: "Nothing just yet. Can you suggest something?",
                            jump: "listLanding"
                        },
                        {
                            choice: "I'm planning on...",
                            dropdown: activitiesList,
                            set: ["setTodo", "getChecked"]
                        },
                        {
                            choice: "I already finished...",
                            dropdown: activitiesList,
                            set: ["setDone", "getChecked"]
                        },
                    ]
                },
                {
                    line: getReplyString(),

                    choices: [
                        {
                            choice: "Can you suggest something else too?",
                            jump: "listLanding"
                        },
                        {
                            choice: "I'm also planning on...",
                            dropdown: activitiesList,
                            set: ["setTodo", "getChecked"],
                            jump: ["checkin", 1]
                        },
                        {
                            choice: "I also already finished...",
                            dropdown: activitiesList,
                            set: ["setDone", "getChecked"],
                            jump: ["checkin", 1]
                        },
                    ]
                },
            ]
        )
    }
}

export default checkin