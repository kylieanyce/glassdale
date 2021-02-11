export const WitnessHTML = (witness) => {
    return `
    <div class="witnessCard>
        <p>Name: ${witness.name}</p>
        <p>Statement: ${witness.statements}</p>
    </div>
    `
}