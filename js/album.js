const albumsUrl = "https://api.spotify.com/v1/albums/";
checkCookie();
let token =  leggiCookie();

let id = "4aawyAB9vmqN3uQ7FjRGTy";

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
    let clone = cloneTrackTableItem()


    console.log(tracks);

    tracks.items.forEach(track => {
    let clone = cloneTrackTableItem()
    let trackId = clone.querySelector('.track-number');
    let title = clone.querySelector('.track-title');
    let artists = clone.querySelector('.track-artists');
    let reproductions = clone.querySelector('.reproductions');
    let length = clone.querySelector('.track-length');
    
    
    trackId.innerText = track.track_number;
    title.innerText = track.name;
    artists.innerText = track.artists.map(artist => artist.name).join(', ');
    length.innerText = millisToMinutesAndSeconds(track.duration_ms);
    target.append(clone);
    });

 }

 renderAlbumTracks(id)

function cloneTrackTableItem () {
    let temp = document.querySelector('#track-table-item')
    return temp.content.cloneNode(true)
}

/**** SEZIONE TOKEN & COOKIES */

async function getToken () {
    return await fetch ("https://accounts.spotify.com/api/token",
        {
            method : "POST",
            headers : {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body : "grant_type=client_credentials&client_id=3d95631fa2714b63a86360548af955cd&client_secret=8f03a40917cb4cca9c4c5a9c476fa168"
        })
   .then(res => res.json())
}


async function scriviCookie() {
    let token = await getToken()
    let now = new Date();//Date crea un oggetto data contenente data ed ora attuali
    now.getHours()//ora attuale
    now.setHours(now.getHours() + 1 );//All'ora attuale aggiungo un'ora

    let scadenza = `expires= + ${now.toUTCString()}`;//converto la data nel formato utc, richiesto per il corretto funzionamento del cookie. esempio: Wed, 14 Jun 2017 07:00:00 GMT

    document.cookie =`token =${token.access_token};${scadenza}`;
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

function checkCookie(){
        if (!leggiCookie()) {
            scriviCookie();
        }
    }

function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes} min  ${seconds} sec`;
}

console.log(millisToMinutesAndSeconds(4008078));