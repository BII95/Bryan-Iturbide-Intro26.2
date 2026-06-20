//Fetch Artwork image
let artworkSection = document.getElementById("artwork-section");
function getArtwork() {
    let randomPage = Math.floor(Math.random() * 11010)+1 ;
    fetch(`https://api.artic.edu/api/v1/artworks?page=${randomPage}&limit=1&fields=title,image_id,artist_display,date_start`)
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP Error ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            let apiCollection = data;
            console.log(apiCollection);
            let artwork = apiCollection.data[0];
            console.log(artwork);
           if (!artwork || !artwork.image_id) {
                throw new Error("Artwork missing image");
           }
            let properLink = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/600,/0/default.jpg`;
            let workDisplayed = artworkSection.querySelector("ul");
            workDisplayed.textContent = "";
            const img = document.createElement("img");
            img.onerror = () =>{
                artworkSection.querySelector("ul").innerHTML = "";
                let errorOnPage = document.createElement("p");
                errorOnPage.textContent = "Image forbidden...hit next again";
                artworkSection.querySelector("ul").appendChild(errorOnPage);
            }
            img.src = properLink;
            const title = document.createElement("h2");
            title.textContent = artwork.title;
            const artist = document.createElement("p");
            artist.textContent = `Artist: ${artwork.artist_display || "Unknown"}`;
            const year = document.createElement("p");
            year.textContent = `Year: ${artwork.date_start || "Unknown"}`;
            workDisplayed.appendChild(img);
            workDisplayed.appendChild(title);
            workDisplayed.appendChild(artist);
            workDisplayed.appendChild(year);
        })
        .catch(error => {
            artworkSection.querySelector("ul").innerHTML = "";
            let errorOnPage = document.createElement("p");
            errorOnPage.textContent = `API fetch failed: ${error.message}, try next again...`;
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
    let randomPage = Math.floor(Math.random() * 205) + 1;
    fetch(`https://api.artic.edu/api/v1/products?page=${randomPage}&limit=1&fields=title,web_url,image_url`)
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP Error ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            let products = data;
            console.log(products)
            let item = products.data[0];
            if (!item || !item.image_url) {
                throw new Error("Product missing image");
            }
            console.log(item);
            console.log(item.title)
            console.log(item.data);
            let productDisplayed = itemSection.querySelector("ul");
            productDisplayed.innerHTML = "";
            const img = document.createElement("img");
            img.onerror = () =>{
                itemSection.querySelector("ul").innerHTML = "";
                let errorOnPage = document.createElement("p");
                errorOnPage.textContent = "Image not found...hit random product again";
                itemSection.querySelector("ul").appendChild(errorOnPage);
            }
            img.src = item.image_url;
            const title = document.createElement("h2");
            title.textContent = item.title;
            const buyIt = document.createElement("a");
            buyIt.href=item.web_url;
            buyIt.textContent="View Product(may be unavailable)";
            buyIt.target= "_blank";
            productDisplayed.appendChild(img);
            productDisplayed.appendChild(title);
            productDisplayed.appendChild(buyIt);
        })
        .catch(error => {
            itemSection.querySelector("ul").innerHTML = "";
            let errorOnPage = document.createElement("p");
            errorOnPage.textContent = `API fetch failed: ${error.message},...try reandom product again.`;
            itemSection.querySelector("ul").appendChild(errorOnPage);

        });
}
getProducts();
document
    .getElementById("next-product")
    .addEventListener("click",getProducts);