import { getCriminals } from "../criminals/CriminalDataProvider"


const eventHub = document.querySelector(".container")


export const AssociateList = () => {
    getCriminals()
        .then(() => {
            const criminalArray = useCriminals()
            }
        )
}

eventHub.addEventListener("associatesClicked", event => {
    debugger
    console.log("clicked")
})
