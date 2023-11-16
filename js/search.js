const url = "https://api.spotify.com/v1/search?q=";
const token = "Bearer BQAyfDyvqRFvAIJsq--eTB-6M_nlx4xin6Dvbng_6JytIFrrdPKx9_h0MqUpxhryDFWps6OQd0rBkCHD-YjvbH2KX0movvRq8EWWjjaNpIOtYb_7bRE"
const urlArtist=  "https://api.spotify.com/v1/artists/"
const searchBox = document.querySelector('.searchForm input');


async function searchByQueryArtist (query) {
    return await fetch (`${url}${query}&type=artist` , {
        headers : {
            "Content-Type": "application/json",
            Authorization : token
        }
        })
    .then(res => res.json())
}

async function searchByQuerySong(query) {
    return await fetch (`${url}${query}&type=track` , {
        headers : {
            "Content-Type": "application/json",
            Authorization : token
        }
        })
    .then(res => res.json())
}

async function searchByQueryAlbum(query) {
    return await fetch (`${url}${query}&type=album` , {
        headers : {
            "Content-Type": "application/json",
            Authorization : token
        }
        })
    .then(res => res.json())
}



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


async function searchByQueryTrending(id) {
    return await fetch ( urlArtist + id, {
        headers : {
            "Content-Type": "application/json",
            Authorization : token
        }
        })
    .then(res => res.json())
}

async function renderTrendingSearch(id) {
    let target = document.querySelector('.targetTrending');

        
            let title = document.querySelector('.sfogliaTitle');
            title.classList.remove('d-none');
            
            
            let trending = await searchByQueryTrending(id);
            
            console.log(trending);
            
            
           

            for (let index = 0; index <=10; index++) {
               
                let temp = document.querySelector('#areaTrending');
                let clone = temp.content.cloneNode(true);
            
                let img = clone.querySelector('.img-artist');
                let name = clone.querySelector('.frase-card');
                let img2 = clone.querySelector('.img-second');
                let name2 = clone.querySelector('.frase-second');

                img.src = trending.images[1].url;
                name.innerText = trending.name;
                img2.src = trending.images[1].url;
                name2.innerText = trending.name;
                
                
                
                
                target.append(clone);
            }
       
   
}
renderTrendingSearch('0TnOYISbd1XYRBk9myaseg')

  