

const suggestActivity = () => {
    return (
        [
            {
                lines: [
                    "Of course! Do you feel like moving your body?"
                ],
                face: "earnest",
                choices: [
                    "suggestionsReader",
                    {
                        choice: "Yep!",
                        moveFlag: "move"
                    },
                    {
                        choice: "Not today.",
                        moveFlag: "nomove"
                    },
                    {
                        choice: "Actually, I need something to listen to.",
                        moveFlag: "listen"
                    }
                ]
            }
        ]
    )
}

export default suggestActivity