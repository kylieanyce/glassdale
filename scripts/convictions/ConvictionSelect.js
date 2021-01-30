import { useConvictions, getConvictions } from "./ConvictionDataProvider.js";

const contentTarget = document.querySelector(".filters__crime")
const eventHub = document.querySelector(".container")


export const ConvictionSelect = () => {
    getConvictions()
    .then( () => {
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
                    return `<option value="${convictions.id}">${name}</option>`
                })
            }
        </select>
    `
}

//listens for when someone selects a crime and grabs name of crime---------
eventHub.addEventListener("change", event => {
    // console.log("event happened")
    if (event.target.id === "crimeSelect") {
        const customEvent = new CustomEvent("crimeChosen", {
            detail: {
                crimeThatWasChosen: event.target.value
            }
        })
        eventHub.dispatchEvent(customEvent)
    }
})