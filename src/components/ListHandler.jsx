import * as utils from "./utils.js"

const ListHandler = () => {



    function applySet(parsedSet) {
        if (!Array.isArray(parsedSet)) return

        var doing = parsedSet[1]
        if (parsedSet[0] === "currentlyDoing") {
            setCurrentlyDoing(doing);
            localStorage.setItem("currentlyDoing", doing)
        } else if (parsedSet[0] === "type") {
            setListType(doing)
        } else if (parsedSet[0] === "sub") {
            setListSub(doing)
        } else if (parsedSet[0] === "list") {
            setCurrentList(doing)
        }
    }

    /*

*/

    const getFullList = () => {
        return utils.findList(currentList, listType, listSub)
    }

    function randomAct() {
        return optionsArray.current.pop()
    }

    function resetOptionsArray() {
        const list = getFullList()
        if (!Array.isArray(list)) return

        optionsArray.current = list
        utils.shuffleArray(optionsArray.current)
        setSuggestedAct(randomAct())
    }

    useEffect(() => {
        if (getFullList()) {
            resetOptionsArray()
        } else return
    }, [currentList, listType, listSub])
    // Refreshes the array of suggestions when currentList changes



}

export default ListHandler