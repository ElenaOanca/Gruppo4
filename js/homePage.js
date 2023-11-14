const url = "https://api.spotify.com/v1/browse/categories"
const token = "Bearer BQChn4wkik5G4NmflPRJhVbBJDZsBWfvHwYBtQ4qMNmmlN9bVgAM374jvTubU0ZUIU57bI2KBaX2t4S8wtZnhx7mNUN4BoPNpCeq_XZQ6ADus5L-u1I"


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



async function getCategories () {
    return await fetch (url,
        {
            headers : {
                "Content-Type": "application/json",
                Authorization : token   
            }
        })
    .then(res => res.json())
}

async function renderCategories(){
    
    
    
    let target = document.querySelector('.home-artists-area')
    let categories = await getCategories()
    console.log(categories.categories.items[0]);

    for (let i = 0 ; i < 6; i++) {
        let clone = cloneHomeMusicCard()
        let img = clone.querySelector('.img-first-section')
        let artistName = clone.querySelector('.name-first-section')

        img.src = categories.categories.items[i].icons[0].url
        artistName.innerText = categories.categories.items[i].name
        target.append(clone)
    }  
}
renderCategories();

function cloneHomeMusicCard () {
    let temp = document.querySelector('#home-artist-card')
    return temp.content.cloneNode(true)
}