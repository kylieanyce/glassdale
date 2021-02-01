import { getNotes, useNotes } from "./NoteDataProvider.js";
import { NoteHTMLConverter } from "./Note.js";

const contentTarget = document.querySelector(".noteList")
const eventHub = document.querySelector(".container")

let showNotesClicked = false

//listens for customevent button clicked and sends to dom-------------------
eventHub.addEventListener("showNotesClicked", customEvent => {
    NoteList()
    showNotesClicked = true
})

eventHub.addEventListener("noteStateChanged", event => {
    if (showNotesClicked) {
        render(useNotes())
    }
})

const render = (noteArray) => {
    const allNotesConvertedToStrings = noteArray.map(noteObj => {
        return NoteHTMLConverter(noteObj)
    }).join("")

    contentTarget.innerHTML = `
        <h3>Notes</h3
        <div>    
        ${allNotesConvertedToStrings}
        </div>
    `
}

export const NoteList = () => {
    getNotes()
        .then(() => {
            const allNotes = useNotes()
            render(allNotes)
        })
}


