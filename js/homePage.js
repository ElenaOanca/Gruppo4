const ARTIST_URL = "https://striveschool-api.herokuapp.com/api/deezer/artist/"

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



async function getArtist (query) {
    try{
        return await fetch (ARTIST_URL + query)
        .then(res => res.json())
    } catch (error) {
        Swal.fire({
            title: "C'è un problema nel caricamento artisti, vuoi ricaricare la pagina?",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Ricarica",
            denyButtonText: `Non ricaricare`
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Swal.fire("La pagina si sta ricaricando","","success");
              setTimeout(() => {location.reload()}, 3000)
            } else if (result.isDenied) {
              Swal.fire("Continua la tua navigazione!", "", "");
            }
          });    }
}

async function renderInitialSongs(){
    
    
    
    let target = document.querySelector('.home-artists-area')

    for (let i = 0; i < 6; i++) {
        let query = Math.floor(Math.random() * 150)
        let artist = await getArtist(query)
        console.log(artist);

        let clone = cloneHomeMusicCard()
        
        let img = clone.querySelector('.img-first-section')
        let artistName = clone.querySelector('.name-first-section')

        artistName.innerText = artist.name
        img.src = artist.picture_medium
        target.append(clone)

}    
}
renderInitialSongs();

function cloneHomeMusicCard () {
    let temp = document.querySelector('#home-artist-card')
    return temp.content.cloneNode(true)
}