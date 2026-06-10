let artworkSection = document.getElementById("artwork-section")
let randomPage = Math.floor(Math.random() * 1000) + 1;
let randomIndex = Math.floor(Math.random() * 10);



fetch(`https://api.artic.edu/api/v1/artworks?page=${randomPage}&limit=12`)
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP Error ${res.status}`);
        }

        return res.json();
    })
    .then(data => {
        let apiCollection = data;
        console.log(apiCollection);
        let workTitle = apiCollection.data[randomIndex].title
        let imageId = apiCollection.data[randomIndex].image_id;
        let author = apiCollection.data[randomIndex].artist_display;
        let fromYear = apiCollection.data[randomIndex].date_start;
        console.log(workTitle)
        console.log(fromYear)
        console.log(imageId);
        console.log(author);
        let properLink = `${apiCollection.config.iiif_url}/${imageId}/full/843,/0/default.jpg`;
        const img = document.createElement("img");
        img.src = properLink;
        let workDisplayed = artworkSection.querySelector("ul")
        workDisplayed.appendChild(img);
        //    artworkSection.addEventListener("submit",(event) => {
        //    when user clicks button
        // with that create a fetch for the corresponding work's about
        // have next button present the next work which is randomly generated and chosen
        //author,date , category brief description})
    })
    .catch(error => {
        console.error("Error: ", error.message);
        let errorOnPage = document.createElement("p");
        errorOnPage.textContent = `API fetch failed: ${error.message}`;
        artworkSection.appendChild(errorOnPage);
    });
