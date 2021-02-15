
import { getCriminals, useCriminals } from './CriminalDataProvider.js'
import { Criminals } from "./Criminal.js";
import { useConvictions } from '../convictions/ConvictionDataProvider.js';
import { getCriminalFacilities, useCriminalFacilities } from '../facility/CriminalFacilityProvider.js';
import { getFacilities, useFacilities } from '../facility/FacilityProvider.js';
import { FacilitiesList } from '../facility/FacilityList.js';


const eventHub = document.querySelector(".container")
const contentContainer = document.querySelector(".criminalsContainer")


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
        const facilities = useFacilities()
        const allRelationships = useCriminalFacilities()

        render(filteredCriminalsArray, facilities, allRelationships)
    }
})

eventHub.addEventListener("facilitiesButtonClicked", event => {
    FacilitiesList()
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
    const facilities = useFacilities()
    const allRelationships = useCriminalFacilities()
    render(filteredCriminalsArray, facilities, allRelationships)
    }
)


export const CriminalList = () => {
    // Kick off the fetching of both collections of data
    getFacilities()
        .then(getCriminalFacilities)
        .then(getCriminals)
        .then(
            () => {
                // Pull in the data now that it has been fetched
                const facilities = useFacilities()
                const crimFac = useCriminalFacilities()
                const criminals = useCriminals()
                // console.table(facilities)
                // console.table(crimFac)
                // console.table(criminals)

                // Pass all three collections of data to render()
                render(criminals, facilities, crimFac)
            }
        )
}

const render = (criminalsToRender, allFacilities, allRelationships) => {
    // Step 1 - Iterate all criminals
    contentContainer.innerHTML = 
    `<h2>Glassdale Criminals</h2>
    <section class="criminalList">
    ${ criminalsToRender.map(
        (criminalObject) => {
            // Step 2 - Filter all relationships to get only ones for this criminal
            const facilityRelationshipsForThisCriminal = allRelationships.filter(cf => cf.criminalId === criminalObject.id)

            // Step 3 - Convert the relationships to facilities with map()
            const facilities = facilityRelationshipsForThisCriminal.map(cf => {
                const matchingFacilityObject = allFacilities.find(facility => facility.id === cf.facilityId)
                return matchingFacilityObject
            })

            // Must pass the matching facilities to the Criminal component
            return Criminals(criminalObject, facilities)
        }
    ).join("") }
    </section>`
}




