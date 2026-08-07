const done = (allVals) => {
    console.log("allVals", allVals)
    return (
        [
            {
                lines: [
                    `You're all finished with ${allVals.currentlyDoing}? That's great to hear! I'm so proud of you!`
                ],

                choices: [
                    {
                        choice: "Aw thanks!",
                        set: (["currentlyDoing", "false"])
                    }
                ]
            },
            {
                lines: [
                    "Of course! I'm always happy to hear when you get things done. Keep up the good work!"
                ],
                choices: [
                    {
                        choice: "I'll do my best! [return to main page]",
                        jump: "main"
                    }
                ]
            }
        ]
    )
}

export default done
