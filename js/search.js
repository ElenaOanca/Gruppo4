const searchBox = document.querySelector('.searchForm input');
const QUERY_URL = "https://api.spotify.com/v1/search?q=";
const token = "Bearer BQAxrTFOJcOiOj4RbuywRUHm3BPEUTiw4Yov8q4dDgQoHW1NRtKvroCW_U_Dkrh7Qu8Qt4uEukPV1uO4XJ_cIrm1X9eTJ9w_XY5_cA6j2X7rtSMzkTU"



async function searchByQuery (query) {
    return await fetch (`${QUERY_URL}${query}&type=artist` , {
        headers : {
            "Content-Type": "application/json",
            Authorization : token
        }
        })
    .then(res => res.json())
}

searchBox.addEventListener('input', async (e) => {
    let results = await searchByQuery(e.target.value)
    console.log(results);



})


