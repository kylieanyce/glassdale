import { getNotes, useNotes } from "./NoteDataProvider.js";
import { NoteHTMLConverter } from "./Note.js";
import { useCriminals, getCriminals } from '../criminals/CriminalDataProvider.js'
import { deleteNote } from "./NoteDataProvider.js";


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

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("deleteNote--")) {
        const [prefix, noteid] = clickEvent.target.id.split("--")
        const deleteClicked = new CustomEvent("deleteButtonClicked", {
            detail: {
                NoteID: clickEvent.target.noteid
            }
        })
        dispatchEvent(deleteClicked)
        deleteNote(noteid).then(
            () => {
                const updatedNotes = useNotes()
                const criminals = useCriminals()
                render(updatedNotes, criminals)
            }
        )
    }
})


export const NoteList = () => {
    getNotes()
        .then(getCriminals)
        .then(() => {
            const notes = useNotes()
            const criminals = useCriminals()

            render(notes, criminals)
        })
}


const render = (noteArray, criminalsArray) => {
    contentTarget.innerHTML = noteArray.map(note => {
        const relatedCriminal = criminalsArray.find(criminal => criminal.id === parseInt(note.criminalId))
        return `
            <section class="note">
                <h4>Note about ${relatedCriminal.name}</h4>
                ${note.text}
                <button id="deleteNote--${note.id}">Delete</button>
            </section>
        `
    }).join("")
}


