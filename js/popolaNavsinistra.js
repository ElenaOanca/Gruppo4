const endpointPlaylist =  'https://api.spotify.com/v1/me/playlists';


async function getAmici() {
    return await fetch(endpointPlaylist,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
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

