export const Criminals = (criminal) => {
    return `
        <section class="criminalCard">
            <h3>${criminal.name}</h3>
            <p>${criminal.age}</p>
            <p>${criminal.conviction}
            <p>${new Date(criminal.incarceration.start).toLocaleDateString('en-US')}</p>
            <p>${new Date(criminal.incarceration.end).toLocaleDateString('en-US')}</p>
        </section>`
}