import { useCriminals } from "../criminals/CriminalDataProvider.js"

const contentContainer = document.querySelector(".associatesContainer")
const eventHub = document.querySelector(".container")


export const AssociateList = (criminalObj) => {
    const htmlrep = `
    <div>
        <h3>Known Associates for ${criminalObj.name}</h3>
        ${criminalObj.known_associates.map(associate => {
            return `
                <section class="associatesContainer">
                    <div class="associateName">${associate.name}</div>
                    <div class="associateAlibi">${associate.alibi}</div>
                </section>`
        }).join("")}
    </div>`
    contentContainer.innerHTML = htmlrep
}

eventHub.addEventListener("associatesClicked", event => {
    // debugger
    const chosenCriminal = event.detail.criminalId
    const criminalArray = useCriminals()
    const findCriminalObj = criminalArray.find(criminalobj => {
        return criminalobj.id === chosenCriminal
    })
    AssociateList(findCriminalObj)
})
