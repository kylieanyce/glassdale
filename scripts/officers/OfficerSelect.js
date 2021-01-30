import { getOfficers, useOfficers } from "./OfficerDataProvider.js";

const contentTarget = document.querySelector(".filters__officer")
const eventHub = document.querySelector(".container")

//Dispatches officerSelected------------------------------------------------
eventHub.addEventListener("change", changeEvent => {
    if (changeEvent.target.id === "officerSelect") {
        // console.log("selected")
        const selectedOfficer = changeEvent.target.value
        const customEvent = new CustomEvent("officerSelected", {
            detail: {
                officer: selectedOfficer
            }
        })
        eventHub.dispatchEvent(customEvent)
    }
})

//Get officers from API for the dropdown menu ----------------------------------
export const OfficerSelect = () => {
    getOfficers()
    .then( () => {
        const officers = useOfficers()
        render(officers)
    })
}

//Render the drop down menu ---------------------------------------------------
const render = officersCollection => {
    contentTarget.innerHTML = `
        <select class="dropdown" id="officerSelect">
            <option value="0">Please select an officer...</option>
            ${
                officersCollection.map(officer => {
                    const name = officer.name
                    return `<option value="${officer.name}">${name}</option>`
                })
            }
        </select>
    `
}
