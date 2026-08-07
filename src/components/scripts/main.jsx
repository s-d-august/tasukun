const main = () => {
    return (
        [
            {
                lines: [
                    "What can I do to help support you?"
                ],

                choices: [
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
                        jump: "thoughtSpiral"
                    },
                    {
                        choice: "I could really use some encouragement.",
                        jump: "encouragement"
                    },
                    {
                        choice: "I did something praiseworthy~",
                        jump: "praise"
                    },
                    {
                        choice: "I need a reminder.",
                        jump: "reminder"
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