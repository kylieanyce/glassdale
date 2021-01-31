export const NoteHTMLConverter = (noteObject) => {
    // debugger
    return `
        <section class="note">
            <div class="note__suspect oneNote">Suspect: ${ noteObject.suspect }</div>
            <div class="note__text oneNote">Note: ${ noteObject.note }</div>
            <div class="note__author oneNote">Author: ${ noteObject.author }</div>
            <div class="note__timestamp oneNote">Date: ${ new Date(noteObject.date).toLocaleDateString('en-US')  }</div>
        </section>
    `
}