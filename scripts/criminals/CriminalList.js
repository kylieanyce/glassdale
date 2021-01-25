
import { getCriminals, useCriminals } from './CriminalDataProvider.js'
import { Criminals } from "./Criminal.js";

const criminalContainer = document.querySelector(".criminalsContainer")

export const CriminalList = () => {
    getCriminals()
        .then(() => {
            const criminalArray = useCriminals()
            let criminalsHTMLrep = ""
            for (const criminal of criminalArray) {
                criminalsHTMLrep += Criminals(criminal)
            }
            criminalContainer.innerHTML = `
                <h3>Glassdale Criminals</h3>
                <section class="criminalList">
                ${criminalsHTMLrep}
                </section>`
            }
        )
}