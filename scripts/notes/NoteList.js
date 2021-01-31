import { getNotes, useNotes } from "./NoteProvider.js";
import { NoteHTMLConverter } from "./Note.js";

const contentTarget = document.querySelector(???)

const eventHub = ???

eventHub.addEventListener("showNotesClicked", customEvent => {
    NoteList()
})

const render = (noteArray) => {
    const allNotesConvertedToStrings = noteArray.map(
        // convert the notes objects to HTML with NoteHTMLConverter

    ).join("")

    contentTarget.innerHTML = ???
}

// Standard list function you're used to writing by now. BUT, don't call this in main.js! Why not?
export const NoteList = () => {
    getNotes()
        .then(() => {
            const allNotes = useNotes()
            render(allNotes)
        })
}