const searchBox = document.querySelector('.searchForm input');
const QUERY_URL = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";



async function searchByQuery (query) {
    return await fetch (QUERY_URL + query)
    .then(res => res.json())
}

searchBox.addEventListener('input', async (e) => {
    e.preventDefault();
    let results = await searchByQuery(e.target.value)

    console.log(results);
})
console.log(searchBox);