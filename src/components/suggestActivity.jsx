const activitiesList =
{
    move: [
        "going for a walk",
        "tidying up",
        "cooking something"
    ],
    nomove: [
        "reading a book",
        "practicing drawing",
        "writing movie reviews",
        "playing a short visual novel"
    ]
}


var typeFlag = []
var chosenAct = []

function randomAct(flag) {
    var array = activitiesList[flag]
    var i = Math.floor(Math.random() * array.length);
    console.log(array)
    return array[i];
}

var suggestActivity = [
    {
        lines: [
            "Of course! Do you feel like moving your body?"
        ],
        choices: [
            {
                choice: "Yep!",
                flag: "move"
            },
            {
                choice: "Not today.",
                flag: "nomove"
            }
        ]
    },
    {
        lines: [
            "In that case, how about " + randomAct(typeFlag) + "?"
        ],
        choices: [
            {
                choice: "Hm, maybe something else?",
                loop: true
            },
            {
                choice: "Sure, I'll do that!",
                flag: chosenAct
            },
        ]
    },
    {
        lines: [
            "That's great to hear! Come tell me when you're done, alright?"
        ]
    }
]