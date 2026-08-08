const isDoing = (allVals) => {
    console.log("allVals: ", allVals)
    return (
        [
            {
                lines: [
                    `How's it going? Are you still busy with ${allVals}?`
                ],

                choices: [
                    {
                        choice: "Nope, I'm all done!",
                        jump: "done"
                    },
                    {
                        choice: "Nah, I changed my mind.",
                        set: ["currentlyDoing", null],
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