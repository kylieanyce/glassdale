import { getOfficers, useOfficers } from "./OfficerDataProvider.js";

const contentTarget = document.querySelector(".filters__officer")
const eventHub = document.querySelector(".container")

//Dispatches officerSelected------------------------------------------------
eventHub.addEventListener("change", changeEvent => {
    if (changeEvent.target.id === "officerSelect") {
        // Get the name of the selected officer
        const selectedOfficer = changeEvent.target.value

        // Define a custom event
        const customEvent = new CustomEvent("officerSelected", {
            detail: {
                officer: selectedOfficer
            }
        })

        // Dispatch event to event hub
        eventHub.dispatchEvent(customEvent)
    }
})

//Get officers from API for the dropdown menu ----------------------------------
export const OfficerSelect = () => {
    // Trigger fetching the API data and loading it into application state
    getOfficers()
    .then( () => {
      // Get all officers from application state
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
                    return `<option value=${officer.id}>${name}</option>`
                })
            }
        </select>
    `
}
