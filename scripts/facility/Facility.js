export const FacilitiesHTML = (facility, criminal) => {
    return `
    <div class="facilityCard">
        <p><strong>Name: </strong>${facility.facilityName}</p>
        <p><strong>Security Level: </strong>${facility.securityLevel}</p>
    </div>
    <div>
        <p>Criminal: ${criminal.map(c => `<p>${c.name}</p>`).join("")}</p>
    </div>
    `
}