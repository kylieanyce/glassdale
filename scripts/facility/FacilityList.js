import { getCriminals, useCriminals } from "../criminals/CriminalDataProvider.js"
import { getCriminalFacilities, useCriminalFacilities } from "./CriminalFacilityProvider.js"
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
    contentTarget.innerHTML = 
    `<h3>Glassdale Criminals</h3>
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
