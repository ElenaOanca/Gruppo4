const albumsUrl = "https://api.spotify.com/v1/albums/";
const playBackCountUrl = "https://spotify-track-streams-playback-count1.p.rapidapi.com/tracks/spotify_track_streams?spotify_track_id="

checkCookieOnPage();
let token =  leggiCookie();
let id = getIdFromBar();



/***** funzione prendi album */
async function getAlbum (id) {
return await fetch (albumsUrl + id,{
    headers : {
        "Content-Type": "application/json",
        Authorization : `Bearer ${token}`   
    }
}).then(res => res.json())
}

/***** funzione prendi tracce album */
async function getAlbumTracks (id) {
    return await fetch (`${albumsUrl}${id}/tracks`,{
        headers : {
            "Content-Type": "application/json",
            Authorization : `Bearer ${token}`   
        }
    }).then(res => res.json())
    }

/**** funzione renderizzazione album */
async function renderAlbumHeader(id) {
    let album = await getAlbum(id)
    console.log(album);
    

    /*** riempimento intestazione pagina album */
    let img = document.querySelector('.album-img')
    let title = document.querySelector('#album-title')
    let artist = document.querySelector('#artist-name')
    let year = document.querySelector('#album-year')
    let tracksCount = document.querySelector('#tracks-count') 
    let albumLength = document.querySelector('#album-length')
    let albumDuration = 0 ; 
    album.tracks.items.forEach(track => {
        albumDuration += track.duration_ms;
    });
    img.src = album.images[1].url
    title.innerText = album.name
    artist.innerText = album.artists[0].name
    year.innerText = album.release_date.slice(0,4)
    tracksCount.innerText = album.tracks.total
    albumLength.innerText = millisToMinutesAndSeconds(albumDuration)
}
 renderAlbumHeader(id);

 async function renderAlbumTracks(id) {
    let tracks = await getAlbumTracks(id)
    let target = document.querySelector('#tracks-list-tabel');
    let target2 = document.querySelector('#track-list-area');
 
    console.log(tracks);

    tracks.items.forEach((track) => {
    let clone = cloneTemplate("#track-table-item")
    let trackId = clone.querySelector('.track-number');
    let title = clone.querySelector('.track-title');
    let artists = clone.querySelector('.track-artists');
    let length = clone.querySelector('.track-length');
    
    let clone2 = cloneTemplate("#tracks-mobile-list")
    let title2 = clone2.querySelector('.track-title-list');
    let artists2 = clone2.querySelector('.track-artists-list');


    trackId.innerText = track.track_number;
    title.innerText = track.name;
    title2.innerText = track.name;
    artists.innerText = track.artists.map(artist => artist.name).join(', ');
    artists2.innerText = track.artists.map(artist => artist.name).join(', ');
    length.innerText = millisToMinutesAndSeconds(track.duration_ms);
    target.append(clone);
    target2.append(clone2);
    });

 }

 renderAlbumTracks(id)

/****utilities functions */
function cloneTemplate (template) {
    let temp = document.querySelector(template)
    return temp.content.cloneNode(true)
}



/**** SEZIONE TOKEN & COOKIES */

function checkCookieOnPage() {
    if (leggiCookie() == null) {
        new Alert('info', 'La tua sessione è scaduta stai per essere reinderizzato', 'info').showAlert();
        setTimeout(() => {location.href="index.html"}, 2500)
    }
    }

function leggiCookie() {
    let allCookies = document.cookie;
    let cookie = 'token';

    let arr = allCookies.split('; ');

    let res = '';

    for(let i = 0; i < arr.length; i++) {

       chiave = arr[i].split('=')[0];//"token"
       valore = arr[i].split('=')[1];//valore token
        if(cookie == chiave){
           res = valore;
           return res;
         }
    }}




