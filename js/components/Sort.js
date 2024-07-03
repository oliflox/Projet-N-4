import {displayPage} from "../pages/photographers.js";

export const render = (filterValue = "Popularité") => {
    return `
    <section class="photographer-main__portfolio">
        <h2 class="photographer-main__portfolio__filter-title">Trier par</h2>
        <div  id="dropdown" class="photographer-main__portfolio__filter__dropdown">
            <p id="currentSortValue" class="photographer-main__portfolio__filter__dropdown__current" >${filterValue}</p>
            <div id="dropDownSortContainer" class="photographer-main__portfolio__filter__dropdown__container hidden">
                <p>Popularité</p>
                <p>Date</p>
                <p>Titre</p>
            </div>
        </div>
    </section>`;
};

const dropDownSort = (photographers, media) => {
    const currentsortValue = document.querySelector("#currentSortValue");
    const dropDownSortContainer = document.querySelector("#dropDownSortContainer");
const sortOptions = dropDownSortContainer.querySelectorAll("p");

    const urlParams = new URLSearchParams(window.location.search);
    const sortValue = urlParams.get('sort') || "Popularité";

    currentsortValue.textContent = sortValue;


    sortOptions.forEach(option => {
        if (option.textContent === sortValue) {
            option.classList.add("hidden");
        } else {
            option.classList.remove("hidden");
        }
    });
    currentsortValue.addEventListener("click", () => {
        dropDownSortContainer.classList.toggle("hidden");
    });

    dropDownSortContainer.addEventListener('click', (e) => {
        currentsortValue.textContent = e.target.textContent;

        const url = new URL(window.location);
        url.searchParams.set('sort', e.target.textContent);
        window.history.pushState({}, '', url);

        displayPage(photographers, media);
    });
};


export const sortMedia = (media) => {
    const urlParams = new URLSearchParams(window.location.search);
    let sortValue = urlParams.get('sort') || "Popularité"; 

    switch (sortValue) {
        case "Titre":
            sortByTitle(media);
            break;
        case "Popularité":
            sortByPopularity(media);
            break;
        case "Date":
            sortByDate(media);
            break;
        default:
            sortByPopularity(media); 
    }
}

function sortByTitle(media) {
    media.sort((a, b) => a.title.localeCompare(b.title));
}

function sortByPopularity(media) {
    media.sort((a, b) => b.likes - a.likes);
}

function sortByDate(media) {
    media.sort((a, b) => new Date(b.date) - new Date(a.date));
}


export const event = (photographers, media) => {
    dropDownSort(photographers, media);
}

export default {
    render,
    event,
    sortMedia
};