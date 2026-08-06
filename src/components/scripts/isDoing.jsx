const isDoing = (currentlyDoing) => {
    return (
        [
            {
                lines: [
                    `How's it going? Are you still busy with ${currentlyDoing}?`
                ],

                choices: [
                    {
                        choice: "Nope, I'm all done!",
                        jump: "done"
                    },
                    {
                        choice: "Nah, I changed my mind.",
                        currentlyDoing: "false",
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

export default isDoing