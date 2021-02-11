export const WitnessHTML = (witness) => {
    return `
    <div class="witnessCard">
        <p><strong>Name: </strong>${witness.name}</p>
        <p><strong>Statement: </strong>${witness.statements}</p>
    </div>
    `
}