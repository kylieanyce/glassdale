import { getCriminals, useCriminals } from "../criminals/CriminalDataProvider.js";
import { saveNote } from "./NoteDataProvider.js";

const contentTarget = document.querySelector(".noteFormContainer")
const eventHub = document.querySelector(".container")

//gets information to then be sent to the render function---------------------
export const NoteForm = () => {
    //fetches criminals from API
    getCriminals()
    //puts criminals into an array
    .then(() => {
        const criminalsArray = useCriminals()
        //sends array to render function
        render(criminalsArray)
    })
}

//creates HTML for parameter to be rendered to DOM-------------------------
//maps through the criminalsArray and for each object, returns
//an <option> with the criminal.id and criminal.name in string interpolation
const render = (criminalsArray) => {
    contentTarget.innerHTML = `
            <h4>Add A Note Below</h4>
            <form class="form">
                <select id="select" class="formBoxes">
                    <option value="0">Please select a criminal</option>
                    ${criminalsArray.map(criminal => {
                        return `<option class="note-suspect" value="${criminal.id}">${criminal.name}</option>`
                        }).join("")
                    }
                </select>
                <div class="formBoxes">
                    <label for="note-text">Note: </label>
                    <input type="text" id="note-text">
                </div>
                <div class="formBoxes">
                    <label for="note-date">Date: </label>
                    <input type="date" id="note-date">
                </div>
                <div class="formBoxes">
                    <label for="note-author">Author: </label>
                    <input type="text" id="note-author">
                </div>
                <button class="formBoxes" id="saveNote">Save Note</button>
            </form>
    `
}

//grabs input from note form and saves----------------------------------
//listens for click event that "saveNote" button was clicked
eventHub.addEventListener("click", clickEvent => {
    //if the id of the button clicked is "saveNote", it will execute function
    if (clickEvent.target.id === "saveNote") {
        clickEvent.preventDefault()
        //the index.html document is searched for the specific classes called in ()
        //the value of what was entered into those areas is put into vars
        const criminalId = parseInt(document.querySelector("#select").value)
        const text = document.getElementById("note-text").value
        const date = document.getElementById("note-date").value
        const author = document.getElementById("note-author").value
        //a new object is created based on what was grabbed from index.html
        //keys are created and the vars are entered as properties
        const newNote = {
            "criminalId": criminalId,
            "text": text,
            "date": date,
            "author": author
        }
        //the new object is passed into the saveNote function to be sent to API
        saveNote(newNote)
    }
})
