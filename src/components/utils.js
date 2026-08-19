import lists from "./lists/listsCompiled";

export const shuffleArray = (arr) => {

    if (arr) {
        arr.sort(function (a, b) {
            return Math.random() - 0.5;
        });
    } else return
}

export const findList = (currentList, listType, listSub) => {

    console.log(currentList, listType, listSub)

    const baseList = lists[currentList]
    if (!baseList) return undefined

    if (listType && listSub) {
        return baseList[listType]?.[listSub]
    } else if (listType) {
        return baseList[listType]
    } else return baseList


}

export const notString = (obj) => {
    return (typeof obj !== "string")
}

export const isString = (obj) => {
    return (typeof obj == "string")
}

export const pastTense = (str) => {
    const words = {
        'goed': 'went',
        'tidyed': 'tidied',
        'writed': 'wrote',
        "readed": "read"
    };

    const withEd = str.replace(/\b(\w+?)ing\b/gi, (_match, stem) => `${stem}ed`);
    const output = withEd.replace(/\b([a-z']+)\b/gi, (word) => {
        const replacement = words[word.toLowerCase()]
        if (!replacement) return word

        if (word[0] === word[0].toUpperCase()) {
            return replacement.charAt(0).toUpperCase() + replacement.slice(1)
        }

        return replacement
    });
    console.log(output);
    return output
}