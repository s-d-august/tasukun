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
        "readed": "read",
        "thed": "thing",
        "somethed": "something",
        "drawed": "drawing"
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

export const whatTime = () => {
    function dayOfWeek(day) {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return daysOfWeek[day]
    }

    let currentDate = new Date();
    let cDay = dayOfWeek(currentDate.getDay())
    let cDate = currentDate.getDate()
    let cMonth = currentDate.getMonth() + 1
    let cYear = currentDate.getFullYear()
    let cHour = currentDate.getHours()
    let cMinute = currentDate.getMinutes() < 10 ? "0" + currentDate.getMinutes() : currentDate.getMinutes()
    let cSecond = currentDate.getSeconds()
    let dmy = cMonth + "/" + cDate + "/" + cYear
    let hm = cHour + ":" + cMinute

    let timeOfDay = (cHour < 12) ? "morning" :
        (cHour < 17) ? "afternoon" : "evening"

    let string = `Good ${timeOfDay}! It's ${hm} on ${cDay}, ${dmy}.`

    return (
        {
            full: currentDate,
            day: cDay,
            date: cDate,
            dmy,
            month: cMonth,
            year: cYear,
            hour: cHour,
            minute: cMinute,
            second: cSecond,
            string,
            tod: timeOfDay
        }
    )

}

export const readStoredList = (list) => {
    const raw = localStorage.getItem(list)

    console.log("stored list", raw)
    if (!raw) return []

    try {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) return parsed
        if (typeof parsed === "string") return [parsed]
    } catch {
        return raw.split(",").map((item) => item.trim()).filter(Boolean)
    }

    return []
}

export const setVals = (key, vals) => {
    const normalized = Array.isArray(vals) ? vals : [vals]
    const prev = JSON.parse(localStorage.getItem(key)) || []
    normalized.forEach((el) => {
        if (prev.includes(el)) {
            return
        } else prev.push(el)
    })
    localStorage.setItem(key, JSON.stringify(prev))
}

export const setDone = (vals) => {
    const normalized = Array.isArray(vals) ? vals : [vals]
    console.log("set done", vals, normalized)
    const prev = localStorage.getItem("done")
    localStorage.setItem("done", JSON.stringify(prev.concat(normalized)))
}

export const storeVals = (day, vals) => {
    const normalized = Array.isArray(vals) ? vals : [vals]
    console.log("set done", vals, normalized)
    localStorage.setItem(day, JSON.stringify(normalized))
}

export const getCheckedItems = (location) => {
    console.log("location", location)
    return Array.from(
        document.querySelectorAll('input[type=checkbox]:checked'),
        (checkbox) => checkbox.closest(`#${CSS.escape(location)}`) ? checkbox.value : null
    ).filter(Boolean) // clears null values
}

export const applySet = (parsedSet) => {
    if (!Array.isArray(parsedSet)) return

    const [key, value] = parsedSet

    console.log("parsedSet: ", parsedSet)

    const doing = value === "getChecked" ? getCheckedItems(key) : value

    setVals(key, doing)
}