import { useConvictions, getConvictions } from "./ConvictionDataProvider.js";

const contentTarget = document.querySelector(".filters__crime")
const eventHub = document.querySelector(".container")


// On the event hub, listen for a "change" event.
eventHub.addEventListener("change", event => {
    console.log("event happened")
    // Only do this if the `crimeSelect` element was changed
    if (event.target.id === "crimeSelect") {
        // Create custom event. Provide an appropriate name.
        const customEvent = new CustomEvent("crimeChosen", {
            detail: {
                crimeThatWasChosen: event.target.value
            }
        })

        // Dispatch to event hub
        eventHub.dispatchEvent(customEvent)
    }
})

export const ConvictionSelect = () => {
    // Trigger fetching the API data and loading it into application state
    getConvictions()
    .then( () => {
      // Get all convictions from application state
        const convictions = useConvictions()
        render(convictions)
    })
}

const render = convictionsCollection => {
    
    contentTarget.innerHTML = `
        <select class="dropdown" id="crimeSelect">
            <option value="0">Please select a crime...</option>
            ${
                convictionsCollection.map(conviction => {
                    const name = conviction.name
                    return `<option value=${conviction.id}>${name}</option>`
                })
            }
        </select>
    `
}
