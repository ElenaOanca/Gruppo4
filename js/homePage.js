const catUrl = "https://api.spotify.com/v1/browse/categories"
const playlistUrl = "https://api.spotify.com/v1/browse/featured-playlists?country=IT&locale=it_IT"
checkCookie();
let token =  leggiCookie();



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


// FUNZIONE PRENDI CATEGORIE
async function getCategories () {
    return await fetch (catUrl,
        {
            headers : {
                "Content-Type": "application/json",
                Authorization : `Bearer ${token}`   
            }
        })
    .then(res => res.json())
}

let catArray = [];

// FUNZIONE RENDERIZZA CATEGORIE
async function renderCategories(){

    let target = document.querySelector('.home-artists-area')
    let categories = await getCategories()
    categories.categories.items.forEach(category => {
        catArray.push(category.name)
    })

    console.log(catArray);

    for (let i = 0 ; i < 6; i++) {
        let clone = cloneCategoriesCard()
        let img = clone.querySelector('.img-first-section')
        let artistName = clone.querySelector('.name-first-section')

        img.src = categories.categories.items[i].icons[0].url
        artistName.innerText = categories.categories.items[i].name
        target.append(clone)
    }
  
}
// LANCIO FUNZIONE RENDERIZZA categorie
renderCategories();


// FUNZIONE CLONA CARD categorie
function cloneCategoriesCard () {
    let temp = document.querySelector('#home-categories-card')
    return temp.content.cloneNode(true)
}

async function getPlaylists () {
        return await fetch (playlistUrl ,
            {
                headers : {
                    "Content-Type": "application/json",
                    Authorization : `Bearer ${token}`   
                }
            })
        .then(res => res.json())
}

async function renderPlaylists () {
    let target = document.querySelector('.container-playlist')
    let playlists = await getPlaylists()

   
    for (let i = 0; i < 8; i++) {
    let clone = clonePlaylistsCard()

    let img = clone.querySelector('.playlist-img')
    let title = document.querySelector('.playlist-title')
    let name = clone.querySelector('.playlist-name')
    let desc = clone.querySelector('.playlist-desc')
    
    img.src = playlists.playlists.items[i].images[0].url
    name.innerText = playlists.playlists.items[i].name
    desc.innerText = playlists.playlists.items[i].description
    title.innerText = playlists.message;

    target.append(clone);
    }
    
}

renderPlaylists();
// FUNZIONE CLONA CARD PLAYLIST
function clonePlaylistsCard () {
    let temp = document.querySelector('#playlist-card')
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