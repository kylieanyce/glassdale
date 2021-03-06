const contentTarget = document.querySelector(".noteListButton")
const eventHub = document.querySelector(".container")


//dispatches customEvent that specific button was clicked------------------
eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "showNotes") {
        const customEvent = new CustomEvent("showNotesClicked")
        eventHub.dispatchEvent(customEvent)
    }
})

export const ShowNoteButton = () => {
    contentTarget.innerHTML = "<div class='noteButton'><button id='showNotes'>Show Notes</button></div>"
}