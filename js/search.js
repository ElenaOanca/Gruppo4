const url = "https://api.spotify.com/v1/search?q=";
const token = "Bearer BQBhvjWDFRVTSzGryAErK8fcey4DKBYh8RT8Z3qhObeuzbEqLBobSAQ-WkfbmwFL1IicXEkFdDn102M2u-ousrIZkccE_6kY9NfcjdtT1qq_yg_DW9E"

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




async function renderArtistsSearch() {
    searchBox.addEventListener('keydown', async (e) => {
        if (e.keyCode === 13) {
            let artist = await searchByQueryArtist(searchBox.value);
            let target = document.querySelector('.targetSearchArtisti');
            let titleSearch = document.querySelector('.title-searchArtist');
            
            titleSearch.innerText = 'Artisti';
            
            
                let items = artist.artists.items;
                items.forEach(item => {
                    if (item.popularity > 50){
                        let temp = document.querySelector('#risultatoSearchPage')
                        let clone =  temp.content.cloneNode(true)
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
                    return 
                });
        }
    });
}

renderArtistsSearch();


async function renderSongsSearch() {
    searchBox.addEventListener('keydown', async (e) => {
        if (e.keyCode === 13) {
            let song = await searchByQuerySong(searchBox.value);
            let target = document.querySelector('.targetSearchsong');
            let titleSearchSong = document.querySelector('.title-searchSong');
            console.log(song);
            titleSearchSong.innerText = 'Canzoni correlate';
            let items = song.tracks.items
            items.forEach((item) => {
                if (item.popularity > 50){
                    let temp = document.querySelector('#risultatoSearchPageSong')
                    let clone= temp.content.cloneNode(true)
                    
                            let img = clone.querySelector('.img-song');
                            let btn = clone.querySelector('.btn-song');
                            let name = clone.querySelector('.nomi-song');
                        console.log(clone);
                                img.src = item.album.images[0].url;
                                btn.href = "album.html?id=" + item.id;
                                btn.innerText = 'Ascolta ora';
                                name.innerText = item.name;
                                searchBox.value = '';
                                target.append(clone);
                       
                        }
            })
        }
    });
}

renderSongsSearch();



