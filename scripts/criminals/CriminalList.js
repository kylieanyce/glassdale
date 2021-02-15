
import { getCriminals, useCriminals } from './CriminalDataProvider.js'
import { Criminals } from "./Criminal.js";
import { useConvictions } from '../convictions/ConvictionDataProvider.js';

const eventHub = document.querySelector(".container")
const criminalContainer = document.querySelector(".criminalsContainer")


//listens for crimeChose and matches crime with criminals then sends to DOM-----------------
eventHub.addEventListener("crimeChosen", event => {
    if (event.detail.crimeThatWasChosen !== "0"){
        const convictionsArray = useConvictions()
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

//listens for which officer chosen and sends matching criminals to DOM----------------------------
eventHub.addEventListener("officerSelected", event => {
    // console.log("event happened")
        const officerName = event.detail.officer
    // console.log(event.detail)
    const criminals = useCriminals()
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


export const CriminalList = () => {
    getCriminals()
        .then(() => {
            const criminalArray = useCriminals()
            renderToDom(criminalArray)
            }
        )
}

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


