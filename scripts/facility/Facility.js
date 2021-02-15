export const FacilitiesHTML = (facility, criminal) => {
    return `
    <div class="facilityCard">
        <p><strong>Name: </strong>${facility.facilityName}</p>
        <p><strong>Statement: </strong>${facility.securityLevel}</p>
    </div>
    `
}