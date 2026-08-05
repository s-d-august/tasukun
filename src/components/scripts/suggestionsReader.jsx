const suggestionsReader = [
    {
        lines: [
            `In that case, how about `,
            "?"
        ],
        change: "suggestedAct",
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
        ]
    }
]

export default suggestionsReader