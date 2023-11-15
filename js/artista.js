const url = " https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg"
const urlGenerico = "https://api.spotify.com/v1/search?q="

// class SpotifyApi {
//     tokenBody
//     token
//     constructor(grantType,clientId, clientSecret){
//         this.getToken(grantType,clientId, clientSecret)

//  }
//  async getToken(grantType,clientId, clientSecret){
//     return await fetch ("https://accounts.spotify.com/api/token",
//     {
//         method : "POST",
//         headers : {
//             "Content-Type": "application/x-www-form-urlencoded"
//         },
//         body : `grant_type=${grantType}&client_id=${clientId}&client_secret=${clientSecret}`
//     })
// .then(res => res.json())

// }
// accounts = {
//     async getUsers (){
//         spotifyApi.getToken()
//     }
// }
// }


//  const spotifyApi = new SpotifyApi('client_credentials','9d5ca7a25f3943c29e70a563595298d0','67bf58d590e04daaaeacc44c24f31c77');

checkCookie()
const token = leggiCookie()
// spotifyApi.getToken()

// spotifyApi.accounts.getUsers();//prendi token


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

//Scrivi cookie----------------------------------------------------------------------------------------------------------

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

    let arr = allCookies.split(' ; ');

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
        if (!leggiCookie()){
            scriviCookie();
            return
        }
    }




// SEZIONE PRENDI ARTISTA  E MOSTRALO NEL IMG DI PAGINA ARTISTA---------------------------------------------------------

async function getArtists () {
    return await fetch (url,
        {
            headers : {
                "Content-Type": "application/json",
                Authorization : `Bearer ${token}`   
            }
        })
    .then(res => res.json())
}

async function renderArtist(){
    let artist = await getArtists();

const windowWidth = window.innerWidth;
let img = document.getElementById('artist-img-album-'+(windowWidth>670?"lg":"sm"));

img.src = artist.images[0].url

 
}

renderArtist();


// SEZIONE PER PRENDERE FOLLOWERS E METTERLO DENTRO IL P --------------------------------------------------------------------

async function getFollower () {
    return await fetch (url,
        {
            headers : {
                "Content-Type": "application/json",
                Authorization : `Bearer ${token}`   
            }
        })
    .then(res => res.json())
}

async function renderFollower(){
    let artist = await getArtists();
console.log(artist.followers);//funziona

let follower = document.querySelector('#follower');
follower.textContent = artist.followers.total +' ascoltattori mensili';
const windowWidth = window.innerWidth;
//  follower.style.background = windowWidth>670?"trnsparent":"linear-gradient(0deg, black, grey 50%)"
 
}

renderFollower();


//SEZIONE PER PRENDERE LE TRACKS E METTERLE NELLE CARD -----------------------------------------------------------------------



async function getTracks() {
    return await fetch(`https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg/top-tracks?market=US`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(res => res.json());
}
async function renderTracks() {
    let tracks = await getTracks();
    console.log(tracks); // funziona dati ricevuti
    // let tableBody = document.querySelector('.desktop-table tbody');
    // for (let index = 0; index < tracks.tracks.length; index++) {
    //     if (index >= 8) break; // Esce dal ciclo  8 elementi
    let tableBody = document.querySelector('.desktop-table tbody');
    tracks.tracks.slice(0,5).forEach((track, index) => { 
        
        let row = document.createElement('tr');

    
        let songIdCell = document.createElement('td');
        songIdCell.className = 'songId';
        songIdCell.textContent = index + 1;
        row.appendChild(songIdCell);

        // Aggiunta dell'immagine dell'album
        let imageCell = document.createElement('td');
        let img = document.createElement('img');
        img.src = track.album.images[0].url;
        img.width = 50;
        img.alt = track.name;
        imageCell.appendChild(img);
        row.appendChild(imageCell);

        // Aggiunta del nome e della popolarità della canzone
        let songInfoCell = document.createElement('td');
        let songName = document.createElement('p');
        songName.className = 'list-second-title titoloCanzone';
        songName.textContent = track.name;
        songInfoCell.appendChild(songName);

        let songPopularity = document.createElement('p');
        songPopularity.className = 'ascolti';
        songPopularity.textContent = `${track.popularity} Popolarità`;
        songInfoCell.appendChild(songPopularity);
        row.appendChild(songInfoCell);

        // Aggiunta dell'icona dei tre punti
        let iconCell = document.createElement('td');
        let icon = document.createElement('i');
        icon.className = 'bi bi-three-dots-vertical';
        iconCell.appendChild(icon);
        row.appendChild(iconCell);

        // Aggiunta della riga completa al corpo della tabella
        tableBody.appendChild(row);


          // Per schermi lg
    let lgTableBody = document.querySelector('.lg-table tbody');
    tracks.tracks.slice(0,5).forEach((track, index) => { 
        let row = document.createElement('tr');
    
        let songIdCell = document.createElement('td');
        songIdCell.className = 'songId';
        songIdCell.textContent = index + 1;
        row.appendChild(songIdCell);

        // Aggiunta dell'immagine dell'album
        let imageCell = document.createElement('td');
        let img = document.createElement('img');
        img.src = track.album.images[0].url;
        img.width = 50;
        img.alt = track.name;
        imageCell.appendChild(img);
        row.appendChild(imageCell);

        // Aggiunta del nome e della popolarità della canzone
        let songInfoCell = document.createElement('td');
        let songName = document.createElement('p');
        songName.className = 'list-second-title titoloCanzone';
        songName.textContent = track.name;
        songInfoCell.appendChild(songName);

        let songPopularity = document.createElement('p');
        songPopularity.className = 'ascolti';
        songPopularity.textContent = `${track.popularity} Popolarità`;
        songInfoCell.appendChild(songPopularity);
        row.appendChild(songInfoCell);

        // Aggiunta dell'icona dei tre punti
        let iconCell = document.createElement('td');
        let icon = document.createElement('i');
        icon.className = 'bi bi-three-dots-vertical';
        iconCell.appendChild(icon);
        row.appendChild(iconCell);

        // Aggiunta della riga completa al corpo della tabella lg
        lgTableBody.appendChild(row);
    });
    });
}

renderTracks();


