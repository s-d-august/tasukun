export const shuffleArray = (arr) => {
    arr.sort(function (a, b) {
        return Math.random() - 0.5;
    });
}

export const pluckRandomFrom = (array, newArray) => {
    console.log("up top", newArray)
    if (!Array.isArray(array)) {
        console.log("test1")
        return null;
    }

    if (newArray.length === 0) {
        newArray = array.slice();
        shuffleArray(newArray);
        console.log("test2", array, newArray)
        return null;
    }

    if (!Array.isArray(newArray)) {
        newArray = array.slice();
        shuffleArray(newArray);
        console.log("test3", newArray)

    }
    console.log(newArray)
    return newArray.pop();
}