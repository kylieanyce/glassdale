export const noteSelect = (criminal) => {
    return  `
            <select class="formBoxes">
                <option value="${criminal.id}">${criminal.name}</option>
            </select>
        `
        }