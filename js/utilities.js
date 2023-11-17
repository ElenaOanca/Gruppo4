// CLASSE PER ALERT
class Alert {
    constructor(icon, message, text) {
        this.icon = icon;
        this.message = message;
        this.text = text;
    }

    showAlert() {
        Swal.fire({
            icon: this.icon,
            title: this.message,
            text: this.text,
          });
        }
}

//FUNZIONE CERCA ID NELLA BARRA INDIRIZZI

function getIdFromBar() {
    let url = new URLSearchParams(location.search);
    let id = url.get("id");
    return id;
}

// FUNZIONE CLONA TEMPLATE
function cloneTemplate (template) {
    let temp = document.querySelector(template)
    return temp.content.cloneNode(true)
}

// FUNZIONE COOKIE PER PAGINA PRINCIPALE

function checkCookie() {
    if (leggiCookie()!= null) {
        location.href="home.html"
    }
    }

// FUNZIONI COOKIE PER PAGINE INTERNE
function checkCookieOnPage() {
    if (leggiCookie() == null) {
        new Alert('INFO', 'La tua sessione è Scaduta stai per essere reinderizzato', 'info').showAlert();
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

    // funzione millies to min and second
    function formatDuration(ms) {
        const minutes = Math.floor(ms / 60000);
        const seconds = ((ms % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    function millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return `${minutes} min  ${seconds} sec`;
    }
    function getRandomColor() {
        // Genera valori RGB casuali
        let col1 = Math.floor(Math.random() * 256);
        let col2 = Math.floor(Math.random() * 100);
        let col3 = Math.floor(Math.random() * 156);
    
        
        return `rgb(${col1}, ${col2}, ${col3})`;
    }

    /**** funzione snitcha le vere preview da deezer */
    
    async function getSongPreviews(query) {
        return await fetch ("https://striveschool-api.herokuapp.com/api/deezer/search?q="+query,)
        .then(res => res.json())
    }

   async function putReviews(query){
    let reviews = await getSongPreviews(query);
    let target = document.querySelector('.player');
    let currentTitle = document.querySelector('#current-playing');
    console.log(reviews);
    audioSrc.src = reviews.data[0].preview;
    currentTitle.innerText = `${reviews.data[0].title} - ${reviews.data[0].artist.name}`;
    audioSrc.play();
    toggleMediaIcons();
   }

 
    
   
   /***** barra del player */
   let playBtn = document.querySelector("#play");
   let audioSrc = document.querySelector('#audio-player-source');
   let player = document.querySelector('.player');

   function playPause(mediaElement) { 
    if (mediaElement.paused) {
        mediaElement.play();
        toggleMediaIcons()
    }
    else{
        mediaElement.pause();
        toggleMediaIcons();
    } 
  }

  /**** funzione bottone play */
  if (playBtn!= null){
      playBtn.addEventListener("click", () => {
          playPause(audioSrc);
        })
    }

  function toggleMediaIcons (){
    if (audioSrc.paused) {
      playBtn.classList.toggle("bi-play-fill");
      playBtn.classList.toggle("bi-pause-fill");
    } else {
        playBtn.classList.toggle("bi-play-fill");
        playBtn.classList.toggle("bi-pause-fill");
    }
  }





/****** sezione funzioni bottoni footer */
function buttonFooter() {
    const home = document.querySelectorAll('.home');
    const search = document.querySelectorAll('.search');
    const library = document.querySelectorAll('.library');
    const searchPage= document.querySelector('.search-container');
    const homePage = document.querySelector('.homeContainer');

    homePage.addEventListener('click', () => {
        homePage.classList.toggle('puff-out-center');
        searchPage.classList.toggle('puff-out-center');
        location.href = "home.html";
    });
    search.forEach((e) =>{
        e.addEventListener('click', () =>{
           
            homePage.classList.add('d-none');
            searchPage.classList.toggle('d-none');
            searchPage.classList.toggle('slide-in-fwd-center')
            searchPage.style.zIndex='5'
        })

    })
    library.forEach((e) =>{
        e.addEventListener('click', () =>{
            location.href = "album.html"; // array in local storage di canzoni salvate

        })
    
})
}

buttonFooter();

//inizializzazione array di canzoni preferite
let canzoniPreferite =  [];

function setBraniCheTiPiacciono(id) {
  const heart = document.querySelector(".heart");

  // Rimuovi l'event listener precedente
  heart.removeEventListener("click", handleClick);

  // Definisci la funzione di gestione degli eventi
  function handleClick() {
    // Aggiunto l'ID dell'item all'array
    canzoniPreferite.push(id);

    // Salvato l'array nel localStorage
    localStorage.setItem(
      "CanzoniPreferiteArray",
      JSON.stringify(canzoniPreferite)
    );
  }

  // Aggiungi l'event listener utilizzando la funzione di gestione degli eventi
  heart.addEventListener("click", handleClick);
}


let canzoniPreferiteArray = JSON.parse(localStorage.getItem('CanzoniPreferiteArray'));

let braniCheTiPiacciono = {
    name: "Brani che ti piacciono",
    img: "https://th.bing.com/th/id/OIP.tXfUfPx9mQUVxghIyAzWtQAAAA?rs=1&pid=ImgDetMain",
    canzoni: canzoniPreferiteArray
  };
console.log(braniCheTiPiacciono);