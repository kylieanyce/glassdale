import { getCriminals, useCriminals } from "../criminals/CriminalDataProvider.js"
import { getCriminalFacilities, useCriminalFacilities } from "./CriminalFacilityProvider.js"
import { FacilitiesHTML } from "./Facility.js"
import { getFacilities, useFacilities } from "./FacilityProvider.js"


const contentTarget = document.querySelector(".facilityContainer")
const eventHub = document.querySelector(".container")


export const FacilitiesList = () => {
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
                console.table(facilities)
                console.table(crimFac)
                console.table(criminals)

                // Pass all three collections of data to render()
                render(criminals, facilities, crimFac)
            }
        )
}


const render = (criminalsToRender, allFacilities, allRelationships) => {
    // Step 1 - Iterate all criminals
    contentTarget.innerHTML = 
    `<h3>Glassdale Criminals</h3>
    <section class="criminalList">
    ${ allFacilities.map(
        (facilityObject) => {
            
            // Step 2 - Filter all relationships to get only ones for this criminal
            const criminalsForThisFacility = allRelationships.filter(cf => cf.facilityId === facilityObject.id)
            // Step 3 - Convert the relationships to facilities with map()
            const criminals = criminalsForThisFacility.map(cf => {
                const matchingCriminalObject = criminalsToRender.find(criminal => criminal.id === cf.criminalId)
                return matchingCriminalObject
            })
            console.log("facility", facilityObject)
            console.log("criminal", criminals)
            // Must pass the matching facilities to the Criminal component
            return FacilitiesHTML(facilityObject, criminals)
        }
    ).join("") }
    </section>`
}
