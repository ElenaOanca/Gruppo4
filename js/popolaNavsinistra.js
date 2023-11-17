const endpointPlaylist =  'https://api.spotify.com/v1/me/playlists';




async function getAmici() {
    return await fetch(endpointPlaylist,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer BQAEy0CZo4gf7iBBGWey2FXaGwoYMyraBbchhi8dNZxk6bw4fKbh79cvdS5qOiOUw0D5TL1aQMuuLfRiSYATYMv8SCKwKiEBjRciG0LMV0HKbmPdt3j3PdWQeP9Gpd1RWVyPQW94gWCulhTc-Qsaela7twfnF1axD4PvcQVrU254ZH5U8OQ-cEGwekkvv-Xm1yP_tMM5U6vqGg
                `
            }
        })
        .then(res => res.json())
}
getAmici()


.then(res => rendersPlayList(res.items));
function rendersPlayList(items) {
    const navLeftPlayList = document.getElementById('navLeftPlayList');
    items.forEach(item => {
        
       navLeftPlayList.innerHTML += `<i class="p-2 mb-2 overflow-hidden">${item.name}</i>` 
    });
    
}

