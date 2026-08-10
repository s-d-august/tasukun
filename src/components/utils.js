export const shuffleArray = (arr) => {
    arr.sort(function (a, b) {
        return Math.random() - 0.5;
    });
}

export const blockHandler = (block, index) => {
    if (!Array.isArray(block)) {
        console.log("Text block is not formatted as an array!")
        return
    }


    const blockOutput = block.map((el) => {
        return (
            {
                lines: [
                    el
                ],

            }
        )
    })
    console.log(blockOutput)
    return blockOutput
}

export const normalizeScript = (scriptOutput) => {
    if (!Array.isArray(scriptOutput)) {
        return []
    }

    return scriptOutput.flat(Infinity).filter((entry) => {
        return entry && typeof entry === "object" && !Array.isArray(entry)
    })
}