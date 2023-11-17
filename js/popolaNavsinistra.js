const endpointPlaylist =  'https://api.spotify.com/v1/me/playlists';


async function getAmici() {
    return await fetch(endpointPlaylist,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer BQDdhCNyYoS1rBlHb__dGmi4Iv1migPWO1V8XU9w9MOFwhqgSUoUsIpBTgOdi8y89iznuTEfwOeBQoMkqCJlt1b2guPjHi-qpdmTjuF0jQA0bQuFsZM7FkLIv3_hI9khyvao8InVuwKH6I29L1D8zhPRf2SkR6PtlMhf8YaHDdwO6W1MB5yAR4v_xQpgWBiT6fH3Yp08ObPAK6oW`
               
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

