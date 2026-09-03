import * as utils from "../utils"

const main = (allVals) => {
    console.log(allVals)
    if (allVals.currentlyDoing) {

        return (
            [
                {
                    line: `Last I heard, you were ${allVals.currentlyDoing}. How's that going?`,
                    face: "def",
                    choices: [
                        {
                            choice: "I'm all done for now!",
                            jump: "done"
                        },
                        {
                            choice: "I decided to do something else.",
                            jump: "quit"
                        },
                        {
                            choice: "I need a hand staying on track.",
                            jump: "encouragement"
                        },

                    ]
                },
            ]
        )
    } else return (
        [
            {
                line: `${utils.whatTime().string} It's great to see you!`,
                face: "def",
                choices: [
                    {
                        choice: "I'm here to check in!",
                        jump: "checkin"
                    },
                    {
                        choice: "I'm in a thought spiral, help...",
                        jump: "thoughtSpiral"
                    },
                    {
                        choice: "I could really use an encouraging reminder.",
                        jump: "encouragement"
                    },
                    {
                        choice: "Can you suggest something for me to do?",
                        jump: "listLanding",
                        list: JSON.stringify({
                            currentList: "activities"
                        })
                    },
                ]
            },
        ]
    )
}

export default main