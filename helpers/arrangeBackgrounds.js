const arrangeBackgrounds = (backgroundsList, formFactor) => {
    return backgroundsList.sort().reduce((prevArray, string) => {
        const stringToNumbers = string.replace(/\D+/g, '')
        const id = stringToNumbers.slice(
            stringToNumbers.length - 2,
            stringToNumbers.length
        )
        if (string.includes(`${formFactor}/x1`)) {
            prevArray.push({
                id,
                [`${formFactor}1x`]: string,
                [`${formFactor}2x`]: '',
            })
        } else {
            prevArray.find((e) => e.id === id)[[`${formFactor}2x`]] = string
        }
        return prevArray
    }, [])
}

module.exports = arrangeBackgrounds
