import { getWitnesses, useWitnesses } from "./WitnessProvider.js"
import { WitnessHTML } from "./Witness.js"

const contentTarget = document.querySelector(".criminalsContainer")
const eventHub = document.querySelector(".container")

//listens for customevent button clicked and sends to dom-------------------
eventHub.addEventListener("witnessButtonClicked", event => {
    WitnessList()
})

export const WitnessList = () => {
    getWitnesses()
    .then(() =>{
        const witnesses = useWitnesses()
        render(witnesses)
    })
}

const render = witnessArray => {
    let witnessHTMLrep = ""
    for (const witness of witnessArray){
        witnessHTMLrep += WitnessHTML(witness)
    }
    contentTarget.innerHTML = `
        <section = "witnesses">
        <h3>Witness Statements</h3>
        ${witnessHTMLrep}
        </section>
    `
}