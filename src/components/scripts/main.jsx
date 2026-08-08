const main = (allVals) => {
    console.log(allVals)
    if (allVals.currentlyDoing) {

        return (
            [
                {
                    lines: [`Last I heard, you were ${allVals.currentlyDoing}. How's that going?`],

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
                lines: [`How are you feeling? Are you up to anything?`],

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
                        jump: "suggestActivity"
                    },
                    {
                        choice: "I'm in a thought spiral, help...",
                        jump: "broken"
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