const QUERY_URL = "https://api.spotify.com/v1/search?q=";
const token = "Bearer BQCssO8UTDbIV-9A75hRAMwrlXj252jt_BzrrXpQXlKJWzAsqNPpGT8p2Z9-RoGQvzgAAOzms4Sbq8lqjU_IwV8GkTqk_wuGxQYuZu9gzUmLaMR0cl0"

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
        let img = clone.querySelector('.img-risultati')
        let artistName = clone.querySelector('.nomi-risultati')
        let btn = clone.querySelector('.btn-risultati')
    
        for (let i = 0 ; i <6 ; i++) {
           if (img.src = results.artists.items[i].images[0].url) {
            img.src = results.artists.items[i].images[0].url
           } else{
            img.src = 'https://play-lh.googleusercontent.com/eN0IexSzxpUDMfFtm-OyM-nNs44Y74Q3k51bxAMhTvrTnuA4OGnTi_fodN4cl-XxDQc'
           }
            artistName.innerText = `Ascolta ${results.artists.items[i].name}`
            btn.href = results.artists.items[i].uri
            btn.innerText = 'Ascolta ora'
            target.append(clone)
            searchBox.value =''
        }

    } else {
        return

    }
});

function cloneSearchResults () {
    let temp = document.querySelector('#risultatoSearchPage')
    return temp.content.cloneNode(true)
}

