const QUERY_URL = "https://api.spotify.com/v1/search?q=";
const token = "Bearer BQChn4wkik5G4NmflPRJhVbBJDZsBWfvHwYBtQ4qMNmmlN9bVgAM374jvTubU0ZUIU57bI2KBaX2t4S8wtZnhx7mNUN4BoPNpCeq_XZQ6ADus5L-u1I"

const searchBox = document.querySelector('.searchForm input');


async function searchByQuery (query) {
    return await fetch (`${QUERY_URL}${query}&type=artist` , {
        headers : {
            "Content-Type": "application/json",
            Authorization : token
        }
        })
    .then(res => res.json())
}

searchBox.addEventListener('keydown', async (e) => {
    if (e.keyCode === 13) {
        // Il tasto "Enter" è stato premuto
        let results = await searchByQuery(searchBox.value);
        console.log(results);
        let target = document.querySelector('.targetSearch')
        let clone = cloneSearchResults()
        let container = clone.querySelector('.container-risultati')
        let img = clone.querySelector('.img-risultati')
        let artistName = clone.querySelector('.nomi-risultati')
        let btn = clone.querySelector('.btn-risultati')
    
        for (let i = 0 ; i <6 ; i++) {
            //alcune non hanno immagini, risolvere questo problema
            img.src = results.artists.items[i].images[0].url
            artistName.innerText = `Ascolta ${results.artists.items[i].name}`
            btn.href = results.artists.items[i].uri
            btn.innerText = 'Ascolta ora'
            target.append(clone)
        }

    } else {
        return

    }
});

function cloneSearchResults () {
    let temp = document.querySelector('#risultatoSearchPage')
    return temp.content.cloneNode(true)
}

