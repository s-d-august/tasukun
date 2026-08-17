const outOfOptions = () => {
    return (
        [
            {
                line: "Those are all the suggestions I have!",
                face: "worried",
                choices: [
                    {
                        choice: "Can you go through them one more time?",
                        reset: "true"
                    },
                    {
                        choice: "Back to the drawing board, I guess. [return to main page]",
                        jump: "main"
                    }
                ]
            },
        ]
    )
}

export default outOfOptions