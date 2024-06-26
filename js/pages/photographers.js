import { getData } from "../utils/api.js";
import PhotographerProfile from "../components/PhotographerProfile.js";
import PhotographerMedia from "../components/PhotographerMedia.js";
import Filter from "../components/Filter.js"; 
import GlobalLikes from "../components/GlobalLikes.js";

 
const displayPage = (photographers, media) => {
    if (!photographers || !media) return;

    const app = document.querySelector("#app");
 
    app.innerHTML = `
        ${PhotographerProfile.render(photographers)} 
        ${Filter.render()} 
        <section class="photographer-main__portfolio__gallery">
            ${media.map(mediaItem => PhotographerMedia.render(mediaItem, photographers)).join("")}   
        </section>
        ${GlobalLikes.render(photographers, media)}
    `;
    PhotographerProfile.event();
    Filter.event(media);
};  


(async () => {
    const data = await getData();
    
    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = urlParams.get('id');
 
    const photographer = data?.photographers.find(photographer => photographer.id === parseInt(photographerId));
    const media = data?.media.filter(media => media.photographerId === parseInt(photographerId));
    const sort = media.sort((a, b) => b.likes - a.likes);

    displayPage(photographer, sort);
})();

/* filter, carousel, globalLikes */