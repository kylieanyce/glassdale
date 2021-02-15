export const FacilitiesHTML = (facility, criminal) => {
    return `
    <section class="facilities">
    <div class="facilityCard">
        <p><strong>Name: </strong>${facility.facilityName}</p>
        <p><strong>Security Level: </strong>${facility.securityLevel}</p>
    </div>
    <div>
        <p>Criminal: ${criminal.map(c => `<p>${c.name}</p>`).join("")}</p>
    </div>
    </section>
    `
}