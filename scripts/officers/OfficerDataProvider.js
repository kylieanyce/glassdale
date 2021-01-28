let officers = []

export const useOfficers = () => {
    return officers.slice()
}
// Data from API ------------------------------------------------------
export const getOfficers = () => {
    return fetch("https://criminals.glassdale.us/officers")
        .then(response => response.json())
        .then(
            parsedOfficers => {
                officers = parsedOfficers
            }
        )
}

