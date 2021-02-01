export const AssociatesButton = (criminal) => {
    // debugger
    return `<button id="associate--${criminal.id}">Associate Alibis</button>`
}
    
const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", event => {
    console.log("event", event.target.id)
    if (event.target.id.startsWith("asociates--")){
        const [prefix, criminalId] = event.target.id.split("--")
        const customEvent = new CustomEvent("associatesClicked", {
            detail: {
                crimnalId: parseInt(criminalID)
            }
        })
        console.log(customEvent)
        eventHub.dispatchEvent(customEvent)
    }

})