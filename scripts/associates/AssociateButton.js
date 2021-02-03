export const AssociatesButton = (criminal) => {
    return `<button id="associate--${criminal.id}">Associate Alibis</button>`
}
    
const eventHub = document.querySelector(".container")


//listens for associate button click and dispatches payload------------
eventHub.addEventListener("click", event => {
    // debugger
    if (event.target.id.startsWith("associate--")){
        const [prefix, criminalId] = event.target.id.split("--")
        const customEvent = new CustomEvent("associatesClicked", {
            detail: {
                criminalId: parseInt(criminalId)
            }
        })
        eventHub.dispatchEvent(customEvent)
    }
})