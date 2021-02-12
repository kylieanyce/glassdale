const eventHub = document.querySelector(".container")


let notes = []

//copy of note array-----------------------------------------
export const useNotes = () => {
    return notes.slice()
}

//saves new note to API--------------------------------------
export const saveNote = note => {
    return fetch('http://localhost:8088/notes', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        //parses(?) note into raw data for API
        body: JSON.stringify(note)
    })
    //gets notes back from API with new note added
    .then(getNotes)
        //calls this specific dispatch function
        .then(dispatchStateChangeEvent)
}

//fetches notes from the API-----------------------------------
export const getNotes = () => {
    return fetch('http://localhost:8088/notes')
        .then(response => response.json())
        .then(parsedNotes => {
            notes = parsedNotes
        })
}

//deletes notes from API---------------------------------------
export const deleteNote = noteId => {
    return fetch(`http://localhost:8088/notes/${noteId}`, {
        method: "DELETE"
    })
        //then gets updated notes from API without deleted note
        .then(getNotes)
        //calls this specific dispatch function
        .then(dispatchDeleteStateChange)
}

//creates a customEvent that dispatches when a note is saved----------
const dispatchStateChangeEvent = () => {
    const noteStateChangedEvent = new CustomEvent("noteStateChanged") 
    eventHub.dispatchEvent(noteStateChangedEvent)
}

//creates a customEvent that dispatches when a note is deleted------------
const dispatchDeleteStateChange = () => {
    const dispatchDeleteStateChange = new CustomEvent("deleteStateChanged") 
    eventHub.dispatchEvent(dispatchDeleteStateChange)
}
