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