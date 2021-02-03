
const contentTarget = document.querySelector(".noteList")
const eventHub = document.querySelector(".container")

//listens for customevent button clicked and sends to dom-------------------
eventHub.addEventListener("showNotesClicked", customEvent => {
    NoteList()
    showNotesClicked = true
})