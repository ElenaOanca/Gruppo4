const artistsUrl = "https://api.spotify.com/v1/artists/"
const newAlbumUrl = "https://api.spotify.com/v1/browse/new-releases"

checkCookieOnPage();
let token = leggiCookie();

id = "0TnOYISbd1XYRBk9myaseg";




// FUNZIONE PRENDI ARTISTA
async function getArtist (id) {
    return await fetch (`${artistsUrl}${id}`,
        {
            headers : {
                "Content-Type": "application/json",
                Authorization : `Bearer ${token}`   
            }
        })
    .then(res => res.json())
}
// FUNZIONE PRENDI ARTISTI CORRELATI
async function getArtistsRelated () {
    return await fetch (`${artistsUrl}${id}/related-artists`,
        {
            headers : {
                "Content-Type": "application/json",
                Authorization : `Bearer ${token}`   
            }
        })
    .then(res => res.json())
}

// FUNZIONE RENDERIZZA artisti
async function renderArtists(id){

    let target = document.querySelector('#artists-area')
    let artist = await getArtist(id)
    let relatedArtists = await getArtistsRelated(id)
    relatedArtists.artists.push(artist)
    console.log(relatedArtists);
    relatedArtists.artists.forEach(artist => {
        if (artist.popularity > 60){
            let clone = cloneTemplate("#artist-template")
            let img = clone.querySelector('.artist-img')
            let name = clone.querySelector('.artist-name')
            let artistLink = clone.querySelector('.artist-link')
            let container = clone.querySelectorAll('.first-section-container');
            container.forEach(card => card.style.backgroundColor = getRandomColor());
            img.src = artist.images[0].url
            name.innerText = artist.name
            artistLink.href = `artist.html?id=${artist.id}`
            target.append(clone)    
        }
    })
  


  
}
// LANCIO FUNZIONE RENDERIZZA categorie
renderArtists(id);  



/*** funzione prendi nuovi album */
async function getNewReleases () {
        return await fetch (newAlbumUrl ,
            {
                headers : {
                    "Content-Type": "application/json",
                    Authorization : `Bearer ${token}`   
                }
            })
        .then(res => res.json())
}

async function renderNewReleases () {
    let target = document.querySelector('#album-area')
    let albums = await getNewReleases()
    console.log(albums);
    albums.albums.items.forEach((album, i) => {
        if (album.album_type == "album"){
            let clone = cloneTemplate("#album-template")
            let img1 = clone.querySelector('.image1');
            let img2 = clone.querySelector('.image2');
            let title = clone.querySelector('.album-title');
            let artist = clone.querySelector('.album-artist');
            let tracks = clone.querySelector('.tracks');
            let albumLink = clone.querySelector('.album-link');
            let artistLink = clone.querySelector('.artist-link');
            let container = clone.querySelectorAll('.container-album');
            container.forEach(card => card.style.backgroundColor = getRandomColor());
            img1.src = album.images[1].url
            img2.src = album.images[0].url
            title.innerText = album.name
            artist.innerText = album.artists.map(artist => artist.name).join(', ');
            tracks.innerText = album.total_tracks
            albumLink.href = `album.html?id=${album.id}`
            artistLink.href = `artist.html?id=${album.artists[0].id}`
            target.append(clone)
        }
    })
    
    
}

renderNewReleases();


function buttonFooter() {
    const home = document.querySelector('.home');
    const search = document.querySelector('.search');
    const library = document.querySelector('.library');
    const searchPage= document.querySelector('.search-container');
    const homePage = document.querySelector('.homeContainer');

    home.addEventListener('click', () => {
        location.href = "home.html";
    });
    search.addEventListener('click', () =>{
        homePage.style.opacity='0.2'
        searchPage.classList.toggle('d-none');
        searchPage.style.zIndex='2'
        searchPage.style.opacity='0.9'
        window.addEventListener('scroll', ()=>{
            if (window.scrollY > searchPage.offsetTop) {
                // Se sì, aggiungi la classe per bloccare lo scroll
                body.classList.add('stopScroll');
              } else {
                // Altrimenti, rimuovi la classe per consentire lo scroll
                body.classList.remove('stopScroll');
              }
        })
    });
    library.addEventListener('click', () => {
        location.href = "album.html"; // array in local storage di canzoni salvate
    });
}
buttonFooter()