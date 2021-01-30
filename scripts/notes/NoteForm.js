import { saveNote } from "./NoteDataProvider.js";

const contentTarget = document.querySelector(".noteFormContainer")
const eventHub = document.querySelector(".container")

const render = () => {
    contentTarget.innerHTML = `

                <label for="note-suspect">Suspect: </label>
                <input type="text" id="note-suspect">

                <label for="note-text">Note: </label>
                <input type="text" id="note-text">

                <label for="note-date">Date: </label>
                <input type="date" id="note-date">

                <label for="note-author">Author: </label>
                <input type="text" id="note-author">

                <button id="saveNote">Save Note</button>
        
    `
}

export const NoteForm = () => {
    render()
}

eventHub.addEventListener("click", clickEvent => {
    console.log("event")
    if (clickEvent.target.id === "saveNote") {
        clickEvent.preventDefault()
        const suspect = document.getElementById("note-suspect").value
        const note = document.getElementById("note-text").value
        const date = document.getElementById("note-date").value
        const author = document.getElementById("note-author").value
        
        const newNote = {
            "note": note,
            "suspect": suspect,
            "date": date,
            "author": author
        }
        saveNote(newNote)
    }
})
