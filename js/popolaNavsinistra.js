const endpointPlaylist =  'https://api.spotify.com/v1/me/playlists';


async function getAmici() {
    return await fetch(endpointPlaylist,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer BQCtGUe2uL0Cxl9aOkwy3M7SCEUecEWeQr4gGjSFyBeoqNMTGLiD60AQ7R6IGpgJmPB03I_RyO0bcKvSYxM8uKM46LXN3M5suJdzopVZD2tpR3eiV9bI8xHXcm9MjMt7MMFKZ7pY7Z30gx1vWqPXGIJ6gf5b7ySlJjm3tWGWIafKTcy4JanRFKAOltxsqHvAVPGxMN0YVDCvu5Hw `
               
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

