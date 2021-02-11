import { getNotes, useNotes } from "./NoteDataProvider.js";
import { NoteHTMLConverter } from "./Note.js";
import { useCriminals, getCriminals } from '../criminals/CriminalDataProvider.js'


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


const render = (noteArray, criminalsArray) => {
    contentTarget.innerHTML = noteArray.map(note => {
        const relatedCriminal = criminalsArray.find(criminal => criminal.id === parseInt(note.criminalId))
        return `
            <section class="note">
                <h4>Note about ${relatedCriminal.name}</h4>
                ${note.text}
            </section>
        `
    }).join("")
}

export const NoteList = () => {
    getNotes()
        .then(getCriminals)
        .then(() => {
            const notes = useNotes()
            const criminals = useCriminals()

            render(notes, criminals)
        })
}

