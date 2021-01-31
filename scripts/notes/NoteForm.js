import { saveNote } from "./NoteDataProvider.js";

const contentTarget = document.querySelector(".noteFormContainer")
const eventHub = document.querySelector(".container")

const render = () => {
    contentTarget.innerHTML = `
            <h4>Add A Note Below</h4>
            <form>
                <div>
                    <label for="note-suspect">Suspect: </label>
                    <input type="text" id="note-suspect">
                </div>
                <div>
                    <label for="note-text">Note: </label>
                    <input type="text" id="note-text">
                </div>
                <div>
                    <label for="note-date">Date: </label>
                    <input type="date" id="note-date">
                </div>
                <div>
                    <label for="note-author">Author: </label>
                    <input type="text" id="note-author">
                </div>
                <button id="saveNote">Save Note</button>
            </form>
    `
}

export const NoteForm = () => {
    render()
}

eventHub.addEventListener("click", clickEvent => {
    // console.log("event")
    if (clickEvent.target.id === "saveNote") {
        clickEvent.preventDefault()
        const suspect = document.getElementById("note-suspect").value
        const note = document.getElementById("note-text").value
        const date = document.getElementById("note-date").value
        const author = document.getElementById("note-author").value
        
        const newNote = {
            "suspect": suspect,
            "note": note,
            "date": date,
            "author": author
        }
        saveNote(newNote)
    }
})
