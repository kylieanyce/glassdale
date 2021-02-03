export const WitnessButton = () => {
    contentTarget.innerHTML = "<button id='showWitnesses'>Witnesses</button>"
}
    
const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".witnessContainer")


//listens for witness button click and dispatches payload------------
eventHub.addEventListener("click", event => {
    if (event.target.id === "showWitnesses") {
        const customEvent = new CustomEvent("witnessButtonClicked")
        eventHub.dispatchEvent(customEvent)
    }
})