const url = "https://api.spotify.com/v1/search?q=";
const token = "Bearer BQCJU3D_eApnQ10XkmL6KrQLv6s91RGO3h-g_ldtPSBM60FSXDnSlFZ2yMHhlZpxSrs26JSO9d7jYr3YWywj19kUQrOocHOlU1pp_yAJvXbZASvIA4M"
const newAlbumUrl = "https://api.spotify.com/v1/browse/new-releases"

const searchBox = document.querySelector('.searchForm input');

//query aritsta
async function searchByQueryArtist (query) {
    return await fetch (`${url}${query}&type=artist` , {
        headers : {
            "Content-Type": "application/json",
            Authorization : token
        }
        })
    .then(res => res.json())
}
//ricerca aritsta
async function renderArtistsSearch() {
    searchBox.addEventListener('keydown', async (e) => {
        if (e.keyCode === 13) {
            let artist = await searchByQueryArtist(searchBox.value);
            let target = document.querySelector('.targetSearchArtisti');
            target.innerHTML = '';
            let title = document.querySelector('#title-artist');
            title.classList.remove('d-none')
                let items = artist.artists.items;
                for (let index = 0; index < 4 && index < items.length; index++) {
                    let item = items[index];
                    if (item.popularity > 50) {
                        let temp = document.querySelector('#risultatoSearchPage');
                        let clone = temp.content.cloneNode(true);
                
                        let img = clone.querySelector('.img-artist');
                        let btn = clone.querySelector('.btn-artist');
                        let name = clone.querySelector('.nome-artist');
                        let container = clone.querySelectorAll('.single-card');
                        container.forEach(card => card.style.backgroundColor = getRandomColor());
                        img.src = item.images[0].url;
                        btn.href = "artista.html?id=" + item.id;
                        btn.innerText = 'Ascolta ora';
                        name.innerText = item.name;
                        searchBox.value = '';
                        target.append(clone);
                    }
                }
                
        }
    });
}

renderArtistsSearch()

//query song

async function searchByQuerySong(query) {
    return await fetch (`${url}${query}&type=track` , {
        headers : {
            "Content-Type": "application/json",
            Authorization : token
        }
        })
    .then(res => res.json())
}

//ricerca canzone

async function renderSongsSearch() {
    searchBox.addEventListener('keydown', async (e) => {
        if (e.keyCode === 13) {
            let song = await searchByQuerySong(searchBox.value);
            let target = document.querySelector('.targetSearchsong');
            target.innerHTML = '';
            console.log(song);
            let title = document.querySelector('#title-song');
            title.classList.remove('d-none')
            let items = song.tracks.items
            for (let index = 0; index < 4 && index < items.length; index++) {
                let item = items[index];
                if (item.popularity > 50) {
                    let temp = document.querySelector('#risultatoSearchPageSong');
                    let clone = temp.content.cloneNode(true);
            
                    let img = clone.querySelector('.img-song');
                    let btn = clone.querySelector('.btn-song');
                    let name = clone.querySelector('.nomi-song');
                    let container = clone.querySelectorAll('.container-song');
                    container.forEach(card => card.style.backgroundColor = getRandomColor());
            
                    img.src = item.album.images[0].url;
                    btn.href = ''; // Aggiungi l'URL desiderato
                    btn.innerText = 'Ascolta ora';
                    name.innerText = item.name;
                    searchBox.value = '';
                    target.append(clone);
                }
            }
            
        }
    });
}
renderSongsSearch()


//query album

async function searchByQueryAlbum(query) {
    return await fetch (`${url}${query}&type=album` , {
        headers : {
            "Content-Type": "application/json",
            Authorization : token
        }
        })
    .then(res => res.json())
}
//ricerca album

async function renderAlbumSearch() {
    let target = document.querySelector('.targetSearchAlbum');
   
    searchBox.addEventListener('keydown', async (e) => {
        if (e.keyCode === 13) {
            let title = document.querySelector('#title-album');
            title.classList.remove('d-none');
            title.innerText = 'Album';
            console.log(title);
            target.innerHTML = '';
            let album = await searchByQueryAlbum(searchBox.value);
            let items = album.albums.items;
            console.log(album);
            
            for (let index = 0; index < 4; index++) {
                // Clona il contenuto del template con ID 'risultatoSearchAlbum'
                let temp = document.querySelector('#risultatoSearchAlbum');
                let clone = temp.content.cloneNode(true);
                
                // Estrae gli elementi dal template clonato
                let img = clone.querySelector('.img-album');
                let btn = clone.querySelector('.btn-album');
                let name = clone.querySelector('.nome-album');
                let releaseDate = clone.querySelector('.releaseDate-album');
                
               
                
                
                
                
                img.src = items[index].images[1].url;
                name.innerText = items[index].name;
                releaseDate.innerText = `L'album è stato pubblicato nel ${items[index].release_date}`;
                btn.href = "album.html?id=" + items[index].id;
                btn.innerText = `Ascolta l'album`;
                searchBox.value = '';
                
                // Aggiunge il template clonato all'elemento target
                target.append(clone);
            }
        }
    });
}


renderAlbumSearch()



//query newReleases

async function getNewReleases () {
    return await fetch (newAlbumUrl ,
        {
            headers : {
                "Content-Type": "application/json",
                Authorization : token   
            }
        })
    .then(res => res.json())
}

async function renderNewReleases() {
    let albums = await getNewReleases();
    console.log(albums);

    let target = document.querySelector('#targetTrendingAlbum');
    let temp = document.querySelector('#areaTrendingALbum');

    for (let i = 0; i < albums.albums.items.length; i++) {
        let album = albums.albums.items[i];

        if (album.album_type === "album") {
            let clone = temp.content.cloneNode(true);
            let img1 = clone.querySelector('#image1');
            let img2 = clone.querySelector('#image2');
            let title = clone.querySelector('.album-title');
            let artist = clone.querySelector('.album-artist');
            let container = clone.querySelectorAll('.single-card');
            // let tracks = clone.querySelector('.tracks');

            img1.src = album.images[1].url;
            img2.src = album.images[0].url;
            title.innerText = album.name;
            artist.innerText = album.artists.map(artist => artist.name).join(', ');
            // tracks.innerText = album.total_tracks;
           container.forEach(card => card.style.backgroundColor = getRandomColor());
            
            target.append(clone);
        }
    }
}

renderNewReleases();

function getRandomColor() {
    // Genera valori RGB casuali
    let col1 = Math.floor(Math.random() * 256);
    let col2 = Math.floor(Math.random() * 100);
    let col3 = Math.floor(Math.random() * 156);

    
    return `rgb(${col1}, ${col2}, ${col3})`;
}


getRandomColor();
