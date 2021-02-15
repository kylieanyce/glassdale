import { AssociatesButton } from "../associates/AssociateButton.js"

export const Criminals = (criminalObject, facilities) => {
    return `
    <div class="criminal">
        <h2>${criminalObject.name}</h2>
        <div class="criminal__details">
            <p>Convicted for ${criminalObject.conviction}</p>
            <p>Arrested by ${criminalObject.arrestingOfficer}</p>
            <p>Incarcerated between:
                ${new Date(criminalObject.incarceration.start).toLocaleDateString()} and
                ${new Date(criminalObject.incarceration.end).toLocaleDateString()}
            </p>
            <p>Age: ${criminalObject.age}</p>
            <div>
                <h3>Facilities</h3>
                <p>
                    ${facilities.map(f => `<p>${f.facilityName}</p>`).join("")}
                </p>
            </div>
            ${AssociatesButton(criminalObject)}
        </div>
    </div>
    `
}


