const quit = () => {
    return (
        [
            {
                lines: [
                    "Oh, I see... Thanks for letting me know."
                ],
                choices: [
                    {
                        choice: "That's all for now. [return to main page]",
                        jump: "main"
                    }
                ]
            },
        ]
    )
}

export default quit