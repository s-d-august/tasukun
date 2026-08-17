const main = (allVals) => {
    console.log(allVals)
    if (allVals.currentlyDoing) {

        return (
            [
                {
                    line: `Last I heard, you were ${allVals.currentlyDoing}. How's that going?`,
                    face: "def",
                    choices: [
                        {
                            choice: "I'm all done for now!",
                            jump: "done"
                        },
                        {
                            choice: "I decided to do something else.",
                            jump: "quit"
                        },
                        {
                            choice: "I need a hand staying on track.",
                            jump: "encouragement"
                        },

                    ]
                },
            ]
        )
    } else return (
        [
            {
                line: `How are you feeling? Are you up to anything?`,
                face: "def",
                choices: [
                    {
                        choice: "I am, actually, let me tell you!",
                        jump: "setActivity"
                    },
                    {
                        choice: "I'm feeling capable -- give me a task!",
                        jump: "task"
                    },
                    {
                        choice: "Can you suggest something for me to do?",
                        jump: "listLanding",
                        set: ["list", "activities"]
                    },
                    {
                        choice: "I'm in a thought spiral, help...",
                        jump: "thoughtSpiral"
                    },
                    {
                        choice: "I could really use an encouraging reminder.",
                        jump: "encouragement"
                    },
                    {
                        choice: "I did something praiseworthy~",
                        jump: "praise"
                    },
                    {
                        choice: "TEST",
                        jump: "test"
                    },
                ]
            },
        ]
    )
}

export default main