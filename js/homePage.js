const catUrl = "https://api.spotify.com/v1/browse/categories"
const newAlbumUrl = "https://api.spotify.com/v1/browse/new-releases"


checkCookie();
let token = leggiCookie();



// SEZIONE CLASSE OGGETTI
class Alert {
    constructor(title, text, icon){
        this.title = title
        this.text = text
        this.icon = icon
    }

    showAlert(){
        Swal.fire(this.title, this.text, this.icon)
    }
}


// // FUNZIONE PRENDI CATEGORIE
// async function getCategories () {
//     return await fetch (catUrl,
//         {
//             headers : {
//                 "Content-Type": "application/json",
//                 Authorization : `Bearer ${token}`   
//             }
//         })
//     .then(res => res.json())
// }

// let catArray = [];

// // FUNZIONE RENDERIZZA CATEGORIE
// async function renderCategories(){

//     let target = document.querySelector('.home-artists-area')
//     let categories = await getCategories()
//     categories.categories.items.forEach(category => {
//         catArray.push(category.name)
//     })

//     console.log(catArray);

//     for (let i = 0 ; i < 6; i++) {
//         let clone = cloneCategoriesCard()
//         let img = clone.querySelector('.img-first-section')
//         let artistName = clone.querySelector('.name-first-section')

//         img.src = categories.categories.items[i].icons[0].url
//         artistName.innerText = categories.categories.items[i].name
//         target.append(clone)
//     }
  
// }
// // LANCIO FUNZIONE RENDERIZZA categorie
// renderCategories();



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

            img1.src = album.images[1].url
            img2.src = album.images[0].url
            title.innerText = album.name
            artist.innerText = album.artists.map(artist => artist.name).join(', ');
            tracks.innerText = album.total_tracks
            target.append(clone)
        }
    })
    
    
}

renderNewReleases();


// FUNZIONE CLONA TEMPLATE
function cloneTemplate (template) {
    let temp = document.querySelector(template)
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