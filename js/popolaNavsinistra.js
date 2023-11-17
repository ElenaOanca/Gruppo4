const endpointPlaylist =  'https://api.spotify.com/v1/me/playlists';


async function getAmici() {
    return await fetch(endpointPlaylist,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer BQChSwVSPdnWj3etYZQE_vWPvrEl6MnR0Yf_I6QCFGkhBOarfFX95tG_jPPUkq8D59rl88WT1-R1nXvUIZW-Saf11_xbhqWD-IL1Mmx60EaGDfcjlyiDfj9BmFNwhRTgxbYDYPUqtd1r6rVJS_M_sPO946g7pDAbAd2IKQyRyGP1F-FkmGN6qVs0xGpgxAl9rDObcntlYsRAOGHu `
               
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

