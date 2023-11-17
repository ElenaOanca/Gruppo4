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
    
   //funzione arrow history
 

   async function putReviews(query){
    let reviews = await getSongPreviews(query);

    let currentTitle = document.querySelector('.current-playing');
    let currentTitleMobile = document.querySelector('.current-playing-mobile');
    let artist = document.querySelector('.current-playing-artist');
    let playerImg = document.querySelector('#player-lg-img');
    
    
    audioSrc.src = reviews.data[0].preview;

    playerImg.src = reviews.data[0].album.cover_small
    currentTitleMobile.innerText = `${reviews.data[0].title} - ${reviews.data[0].artist.name}`;
    currentTitle.innerText = `${reviews.data[0].title}`;
    artist.innerText = `${reviews.data[0].artist.name}`;

    
    audioSrc.play();
    playerPaused = false
    togglePlayerPlayIcon ()
   }

 
  
    
   
   /***** barra del player */
   let playBtn = document.querySelectorAll(".play-button");
   let audioSrc = document.querySelector('#audio-player-source');


   let player = document.querySelector('.player');
   let myProgressBar = document.querySelector('#my-progress-bar');
   let playerPaused = true;

   function playPause(mediaElement) { 
    if (mediaElement.paused) {
        playerPaused = false
        mediaElement.play();  
    }
    else{
        playerPaused = true;
        mediaElement.pause();
    } 
  }

  


  /**** funzione bottone play */
  playBtn.forEach((button) => {
  if (button!= null){
      button.addEventListener("click", () => {
          playPause(audioSrc);
          togglePlayerPlayIcon ()
        })
    }
    })


  function togglePlayerPlayIcon (){
   playBtn.forEach((button) => {
    if (!playerPaused) {
    button.classList.remove('bi-play-fill');
    button.classList.add('bi-pause-fill');
    button.classList.remove('bi-play-circle-fill');
    button.classList.add('bi-pause-circle-fill');
    } else {
        button.classList.add('bi-play-fill');
        button.classList.remove('bi-pause-fill');
        button.classList.add('bi-play-circle-fill');
        button.classList.remove('bi-pause-circle-fill');
    }
  })
}



/****** sezione funzioni bottoni footer */
function buttonFooter() {
    const home = document.querySelectorAll('.home');
    const search = document.querySelectorAll('.search');
    const library = document.querySelectorAll('.library');
    const searchPage= document.querySelector('.search-container');
    const homePage = document.querySelector('.homeContainer');

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
function goBack() {
    window.history.back();
    
}
function goUp() {
    window.history.forward();
    
}

let forward = document.querySelector(".history-forward");
let back = document.querySelector(".history-back");
forward.addEventListener('click', goUp) ;
back.addEventListener('click', goBack) ;
