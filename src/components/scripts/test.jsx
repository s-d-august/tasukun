const test = (allVals) => {
    return (
        [
            {
                lines: [
                    `TEST: ${allVals.currentlyDoing}`
                ],

                choices: [
                    {
                        choice: "Nope, I'm all done!",
                        jump: "done"
                    },
                    {
                        choice: "Nah, I changed my mind.",

                        jump: "quit"
                    },
                    {
                        choice: "Yeah, but I need help staying on track.",
                        jump: "encouragement"
                    },
                    {
                        choice: "Yeah, but I need a hand with something else.",
                        jump: "main"
                    },
                ]
            },
        ]
    )
}

export default test