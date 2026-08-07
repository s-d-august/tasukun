const suggestDistraction = () => {
    return (
        [
            {
                lines: [
                    "Distracting yourself is a great idea! Are you at work right now?"
                ],

                choices: [
                    "suggestionsReader",
                    {
                        choice: "No, thankfully.",
                        moveFlag: "nomove"
                    },
                    {
                        choice: "Yes, unfortunately.",
                        moveFlag: "listen"
                    }
                ]
            }
        ]
    )
}

export default suggestDistraction