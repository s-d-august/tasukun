const suggestActivity = [
    {
        lines: [
            "Of course! Do you feel like moving your body?"
        ],
        choices: [
            {
                choice: "Yep!",
                moveFlag: "move"
            },
            {
                choice: "Not today.",
                moveFlag: "nomove"
            }
        ]
    },
    {
        lines: [
            `In that case, how about `,
            "?"
        ],
        change: "chosenAct",
        choices: [
            {
                choice: "Hm, maybe something else?",
                loop: "chosenAct",
                jump: "outOfOptions"
            },
            {
                choice: "Sure, I'll do that!",
                actFlag: "chosenAct"
            },
        ]
    },
    {
        lines: [
            "That's great to hear! Come tell me when you're done, alright?"
        ]
    }
]

export default suggestActivity