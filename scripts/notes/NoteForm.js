const contentTarget = document.querySelector(".noteFormContainer")

const render = () => {
    contentTarget.innerHTML = `

                <label for="note-date">Date: </label>
                <input type="date" id="note-date">

                <label for="note-suspect">Suspect: </label>
                <input type="text" id="note-suspect">

                <label for="note-author">Author: </label>
                <input type="text" id="note-author">

                <label for="note-text">Note: </label>
                <input type="text" id="note-text">

                <button id="saveNote">Save Note</button>
        
    `
}

export const NoteForm = () => {
    render()
}
