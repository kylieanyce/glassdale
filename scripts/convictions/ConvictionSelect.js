import { useConvictions, getConvictions } from "./ConvictionDataProvider.js";

const contentTarget = document.querySelector(".filters__crime")

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
                convictionsCollection.map(convictions => {
                    const name = convictions.name
                    return `<option>${name}</option>`
                })
            }
        </select>
    `
}