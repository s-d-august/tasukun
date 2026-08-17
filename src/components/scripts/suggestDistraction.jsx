const suggestDistraction = () => {
    return (
        [
            {
                lines: [
                    "Distracting yourself is a great idea! Are you at work right now?"
                ],

                choices: [
                    "listReader",
                    {
                        choice: "No, thankfully.",
                        listinfo: "nomove"
                    },
                    {
                        choice: "Yes, unfortunately.",
                        listinfo: "listen"
                    }
                ]
            }
        ]
    )
}

export default suggestDistraction