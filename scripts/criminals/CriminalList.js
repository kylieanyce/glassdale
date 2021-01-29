
import { getCriminals, useCriminals } from './CriminalDataProvider.js'
import { Criminals } from "./Criminal.js";
import { useConvictions } from '../convictions/ConvictionDataProvider.js';

const eventHub = document.querySelector(".container")
const criminalContainer = document.querySelector(".criminalsContainer")


const renderToDom = (criminalArray) => {
    let criminalsHTMLrep = ""
        for (const criminal of criminalArray) {
            criminalsHTMLrep += Criminals(criminal)
        }
        criminalContainer.innerHTML = `
            <h3>Glassdale Criminals</h3>
            <section class="criminalList">
            ${criminalsHTMLrep}
            </section>`
}

export const CriminalList = () => {
    getCriminals()
        .then(() => {
            const criminalArray = useCriminals()
            renderToDom(criminalArray)
            }
        )
}



eventHub.addEventListener("crimeChosen", event => {
    if (event.detail.crimeThatWasChosen !== "0"){
        const convictionsArray = useConvictions()
        // debugger
        const chosenConvictionObj = convictionsArray.find(convictionObj => {
            // console.log("currently checking", convictionObj)
            return convictionObj.id === parseInt(event.detail.crimeThatWasChosen)
        })
        // console.log(chosenConvictionObj.name)
        const criminalArray = useCriminals()
        const filteredCriminalsArray = criminalArray.filter(criminalObj => criminalObj.conviction === chosenConvictionObj.name)

        renderToDom(filteredCriminalsArray)
    }
})
//puts criminal name in officer select drop down----------------------------
eventHub.addEventListener("officerSelected", event => {
    console.log("event happened")
    

    // if (event.detail.officer !== "0") {
    const officerName = event.detail.officer
    console.log(officerName)

    const criminals = useCriminals()
    debugger
    const filteredCriminalsArray = criminals.filter(
        criminalObject => {
            if (criminalObject.arrestingOfficer === officerName) {
                return true
            }
            
        }
    )
    renderToDom(filteredCriminalsArray)
    }
)