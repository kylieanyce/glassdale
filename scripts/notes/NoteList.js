import { getNotes, useNotes } from "./NoteDataProvider.js";
import { NoteHTMLConverter } from "./Note.js";

const contentTarget = document.querySelector(".noteListContainer")
const eventHub = document.querySelector(".container")

//listens for customevent button clicked and sends to dom-------------------
eventHub.addEventListener("showNotesClicked", customEvent => {
    NoteList()
})

const render = (noteArray) => {
    const allNotesConvertedToStrings = noteArray.map(noteObj => {
        return NoteHTMLConverter(noteObj)
    }).join("")

    contentTarget.innerHTML = `
    <div>    
        <h3>Notes</h3
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


