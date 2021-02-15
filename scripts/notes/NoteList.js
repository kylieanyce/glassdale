import { getNotes, useNotes } from "./NoteDataProvider.js";
import { NoteHTMLConverter } from "./Note.js";
import { useCriminals, getCriminals } from '../criminals/CriminalDataProvider.js'
import { deleteNote } from "./NoteDataProvider.js";
import { useCriminalFacilities } from "../facility/CriminalFacilityProvider.js";


const contentTarget = document.querySelector(".noteList")
const eventHub = document.querySelector(".container")

//false because the show notes button has not been clicked-----------------
let showNotesClicked = false

//listens that "show notes" button was clicked, then renders notes to DOM---------------
eventHub.addEventListener("showNotesClicked", customEvent => {
    NoteList()
    //resets value of showNotesClicked to true, which is important
    //for the following event listener
    showNotesClicked = true
})

//listens that "save note" button has been clicked-----------------------------
eventHub.addEventListener("noteStateChanged", event => {
    //when save note button is clicked and showNotesClicked is true..
    if (showNotesClicked) {
        render(useNotes(), useCriminals())
    }
})

//listens for click and checks if it was "delete note" button--------------------
eventHub.addEventListener("click", clickEvent => {
    //if button clicked's id matches "deleteNote--"
    if (clickEvent.target.id.startsWith("deleteNote--")) {
        //sets two variables at the same time
        //split "deleteNote--" into prefix and whatever comes after into noteid
        const [prefix, noteid] = clickEvent.target.id.split("--")
        //creates new customEvent
        const deleteClicked = new CustomEvent("deleteButtonClicked", {
            //adds a detail object that contains the value of noteid
            detail: {
                NoteID: clickEvent.target.noteid
            }
        })
        //dispatches customEvent
        dispatchEvent(deleteClicked)

        //passes noteid into delete note function which deletes the note, 
        //fetches new array of notes from API using getNotes(), and  
        //dispatches event that the delete button was clicked
        deleteNote(noteid).then(
            //once that is done, .then grabs copy of array with useNotes()
            () => {
                const updatedNotes = useNotes()
                //grabs copy of array of criminals
                const criminals = useCriminals()
                //sends notes and criminals to be rendered to DOM
                render(updatedNotes, criminals)
            }
        )
    }
})

//gets notes from API and sends to render function--------------------------------------
export const NoteList = () => {
    //gets notes from API
    getNotes()
    //.then gets criminals from API
        .then(getCriminals)
        .then(() => {
            //.then puts copy of notes array in var
            const notes = useNotes()
            //puts copy of criminals array in var
            const criminals = useCriminals()
            //sends notes and criminals to be rendered to DOM
            render(notes, criminals)
        })
}

//takes two arrays and renders to DOM---------------------------------------------
const render = (noteArray, criminalsArray) => {
    //maps through first array
    console.log("notes", noteArray)
    console.log("criminals", criminalsArray)
    contentTarget.innerHTML = noteArray.map(note => {
        //for each object in the first array, map through second array. For each
        //object in second array, find the id that matches the first array's
        //object. Will need to be parsed from string to integer for correct match.
        //put result into new variable.
        const relatedCriminal = criminalsArray.find(criminal => criminal.id === parseInt(note.criminalId))
        //returns HTML for displaying note about matching criminal
        //finds name of found criminal that was set to a variable
        //finds note text and id that match the criminals from the note object
        return `
            <section class="note">
                <h4>Note about ${relatedCriminal.name}</h4>
                ${note.text}
                <button id="deleteNote--${note.id}">Delete</button>
            </section>
        `
        //.join is used to get rid of the commas
    }).join("")
}


