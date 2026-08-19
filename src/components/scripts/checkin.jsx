
import activitiesList from "../lists/activitiesList"

const checkin = (allVals) => {
    /*
    localStorage formatting:
    [
    {"todo":"work, cook"}
    {"done":"draw"}
    ]
    */
    const plans = localStorage.getItem("checkin") === "null" ? null : localStorage.getItem("checkin")

    function setTodo(vals) {
        const normalized = Array.isArray(vals) ? vals : [vals]
        localStorage.setItem("todo", JSON.stringify(normalized))
    }
    function setDone(vals) {
        const normalized = Array.isArray(vals) ? vals : [vals]
        localStorage.setItem("done", JSON.stringify(normalized))
    }

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

    function getLocalVals() {
        const todoItems = readStoredList("todo")
        const doneItems = readStoredList("done")

        var todoString = todoItems.length ? `'re planning on ${todoItems.join(" and ")}` : ""
        var doneString = doneItems.length ? ` already ${doneItems.join(" and ")}` : ""
        var isAnd = (todoString && doneString) ? ` and ` : ""
        var endString = (todoString?.length + doneString?.length) > 3 ? `? That's a lot! I'm impressed!`
            : (todoString?.length) > 2 ? `? You've got a lot to do! I believe in you!`
                : (doneString?.length) > 2 ? `? You've been busy! I'm so proud of you!`
                    : `? That's wonderful to hear!`

        return (
            `So you` + todoString + isAnd + doneString + endString
        )
    }

    console.log(getLocalVals())


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
                            set: setTodo
                        },
                        {
                            choice: "I already finished...",
                            dropdown: activitiesList,
                            set: setDone
                        },
                    ]
                },
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
                            set: setTodo
                        },
                        {
                            choice: "I already finished...",
                            dropdown: activitiesList,
                            set: setDone
                        },
                    ]
                },
            ]
        )
    }
}

export default checkin