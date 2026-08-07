const suggestionsReader = (allVals) => {
    console.log("allVals: ", allVals)
    return (
        [
            {
                lines: [
                    `In that case, how about ${allVals.suggestedAct}?`
                ],
                jump: "outOfOptions",
                choices: [
                    {
                        choice: "Hm, maybe something else?",
                        loop: "suggestedAct"
                    },
                    {
                        choice: "Sure, I'll do that!",
                        currentlyDoing: "suggestedAct"
                    },
                ]
            },
            {
                lines: [
                    "That's great to hear! Come tell me when you're done, alright?"
                ],
                choices: [
                    {
                        choice: "You got it! [return to main page]",
                        jump: "main"
                    }
                ]
            }
        ]
    )
}


export default suggestionsReader