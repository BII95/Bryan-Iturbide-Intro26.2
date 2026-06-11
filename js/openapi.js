//Fetch Artwork image
let artworkSection = document.getElementById("artwork-section");
function getArtwork() {
    let randomPage = Math.floor(Math.random() * 1000) + 1;
    let randomIndex = Math.floor(Math.random() * 12);
    fetch(`https://api.artic.edu/api/v1/artworks?page=${randomPage}&limit=12`)
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP Error ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            let apiCollection = data;
            let artwork = apiCollection.data[randomIndex];
            if (!artwork.image_id) return getArtwork();
            let workTitle = artwork.title;
            let imageId = artwork.image_id;
            let author = artwork.artist_display;
            let fromYear = artwork.date_start;
            let properLink = `${apiCollection.config.iiif_url}/${imageId}/full/600,/0/default.jpg`;
            let workDisplayed = artworkSection.querySelector("ul");
            workDisplayed.innerHTML = "";
            const img = document.createElement("img");
            img.onerror = () =>{
                artworkSection.querySelector("ul").innerHTML = "";
                let errorOnPage = document.createElement("p");
                errorOnPage.textContent = "Image forbidden hit next again";
                artworkSection.querySelector("ul").appendChild(errorOnPage);
            };
            img.src = properLink;
            const title = document.createElement("h2");
            title.textContent = workTitle;
            const artist = document.createElement("p");
            artist.textContent = `Artist: ${author || "Unknown"}`;
            const year = document.createElement("p");
            year.textContent = `Year: ${fromYear || "Unknown"}`;
            workDisplayed.appendChild(img);
            workDisplayed.appendChild(title);
            workDisplayed.appendChild(artist);
            workDisplayed.appendChild(year);
        })
        .catch(error => {
            artworkSection.querySelector("ul").innerHTML = "";
            console.error("Error: ", error.message);
            let errorOnPage = document.createElement("p");
            errorOnPage.textContent = `API fetch failed: ${error.message}`;
            artworkSection.querySelector("ul").appendChild(errorOnPage);
        });
}
getArtwork();
document
    .getElementById("next-artwork")
    .addEventListener("click", getArtwork);

//Fetch product image
let itemSection = document.getElementById("product-section");
function getProducts() {
    let randomPage = Math.floor(Math.random() * 206) + 1;
    let randomIndex = Math.floor(Math.random() * 11);
    fetch(`https://api.artic.edu/api/v1/products?page=${randomPage}`)
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP Error ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            let products = data;
            console.log(products)
            let item = products.data[randomIndex];
            if (!item.image_url) return getProducts();
            console.log(item);
            let itemTitle = item.title;
            let linkToBuy = item.web_url;
            console.log(itemTitle)
            let productDisplayed = itemSection.querySelector("ul");
            productDisplayed.innerHTML = "";
            const img = document.createElement("img");
            img.src = item.image_url;
            const title = document.createElement("h2");
            title.textContent = itemTitle;
            const buyIt = document.createElement("a");
            buyIt.href=linkToBuy;
            buyIt.textContent="View Product(may be unavailable)";
            buyIt.target= "_blank";
            productDisplayed.appendChild(img);
            productDisplayed.appendChild(title);
            productDisplayed.appendChild(buyIt);
        })
        .catch(error => {
            console.error("Error: ", error.message);
            let errorOnPage = document.createElement("p");
            errorOnPage.textContent =`API fetch failed: ${error.message}`;
            itemSection.appendChild(errorOnPage);
        });
}
getProducts();
document
    .getElementById("next-product")
    .addEventListener("click",getProducts);