const listReader = (allVals) => {
    console.log("allVals: ", allVals)

    return (
        [
            {
                line: `In that case, how about ${allVals.suggestionTemp}?`,
                jump: "outOfOptions",
                choices: [
                    {
                        choice: "Hm, maybe something else?",
                        loop: "suggestionTemp"
                    },
                    {
                        choice: "Sure, I'll do that!",
                        set: ["currentlyDoing", allVals.suggestionTemp]
                    },
                ]
            },
            {
                line: "That's great to hear! Come tell me when you're done, alright?",
                face: "pleased",
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


export default listReader