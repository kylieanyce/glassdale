import { AssociatesButton } from "../associates/AssociateButton.js"

export const Criminals = (criminal) => {
    return `
        <section class="criminalCard">
            <h3>Name: ${criminal.name}</h3>
            <p>Age: ${criminal.age}</p>
            <p>Crime: ${criminal.conviction}
            <p>Term Start: ${new Date(criminal.incarceration.start).toLocaleDateString('en-US')}</p>
            <p>Term End: ${new Date(criminal.incarceration.end).toLocaleDateString('en-US')}</p>
            ${AssociatesButton(criminal)}
        </section>`
}