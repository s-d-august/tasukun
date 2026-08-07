const outOfOptions = () => {
    return (
        [
            {
                lines: [
                    "Those are all the suggestions I have!"
                ],
                choices: [
                    {
                        choice: "Can you go back a bit?",
                        reset: "true"
                    },
                    {
                        choice: "Back to the drawing board, I guess.",
                        jump: "main"
                    }
                ]
            },
        ]
    )
}

export default outOfOptions