const thoughtSpiral = [
    {
        block: [
            "I'm so sorry to hear that...! You can handle this, though!",
            "Let's start by taking some deep breaths, okay?",
            "Don't forget the acupressure and eye-roll!"
        ],
        animation: "breathing"
    }, {
        lines: [
            "How was that? Are you feeling any better?"
        ],

        choices: [
            {
                choice: "Maybe one more time.",
                jump: "thoughtSpiral"
            },
            {
                choice: "Yeah, I think I'm okay now.",
            },
            {
                choice: "Yeah, but I could use a distraction.",
                jump: "suggestDistraction"
            },
        ]
    },
    {
        lines: [
            "That's wonderful! But if you start feeling bad again, don't hesitate to ask me, okay?"
        ],

        choices: [
            {
                choice: "Of course! [return to main page]",
                jump: "main"
            },
            {
                choice: "Actually, I think I could use a distraction after all.",
                jump: "suggestDistraction"
            },
        ]
    }
]

export default thoughtSpiral