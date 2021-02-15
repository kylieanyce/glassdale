export const FacilitiesButton = () => {
    contentTarget.innerHTML = "<div class='facilitiesButton'><button id='showFacilities'>Facilities</button></div>"
}
    
const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".facility__button")


//listens for witness button click and dispatches payload------------
eventHub.addEventListener("click", event => {
    if (event.target.id === "showFacilities") {
        const customEvent = new CustomEvent("facilitiesButtonClicked")
        eventHub.dispatchEvent(customEvent)
    }
})