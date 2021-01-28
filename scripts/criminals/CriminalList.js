
import { getCriminals, useCriminals } from './CriminalDataProvider.js'
import { Criminals } from "./Criminal.js";
import { useConvictions } from '../convictions/ConvictionDataProvider.js';

const eventHub = document.querySelector(".container")
const criminalContainer = document.querySelector(".criminalsContainer")

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

// Listen for the custom event you dispatched in ConvictionSelect
eventHub.addEventListener("crimeChosen", event => {
    // Use the property you added to the event detail.
    if (event.detail.crimeThatWasChosen !== "0"){

        const convictionsArray = useConvictions()

        const chosenConvictionObj = convictionsArray.find(convictionObj => {
            console.log("currently checking", convictionObj)
            return convictionObj.id === parseInt(event.detail.crimeThatWasChosen)
        })
        
        console.log(chosenConvictionObj.name)
        
        const criminalArray = useCriminals()
        /*
            Filter the criminals application state down to the people that committed the crime
        */
        const filteredCriminalsArray = criminalArray.filter(criminalObj => criminalObj.conviction === chosenConvictionObj.name)

        /*
            Then invoke render() and pass the filtered collection as
            an argument
        */
        renderToDom(filteredCriminalsArray)
    }
})

//puts criminal name in officer select drop down----------------------------
eventHub.addEventListener("officerSelect", event => {
    // How can you access the officer name that was selected by the user?
    const officerName = event.???

    // How can you get the criminals that were arrested by that officer?
    const criminals = useCriminals()
    criminals.???(
        criminalObject => {
            if (criminalObject.??? === officerName) {
                return true
            }
        }
    )
})