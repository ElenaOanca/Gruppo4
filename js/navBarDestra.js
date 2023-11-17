const friends = [
    {
      "profileImage": "https://picsum.photos/40",
      "userName": "Elena Oanca",
      "songArtist": "in Camera Yumi Zouma",
      "songTitle": "EP III",
      "lastPlayed": "4 ore"
    },
    {
      "profileImage": "https://picsum.photos/41",
      "userName": "Daniele Ruiu",
      "songArtist": "Gone with the Wind",
      "songTitle": "Misty Waters",
      "lastPlayed": "2 giorni"
    },
    {
      "profileImage": "https://picsum.photos/42",
      "userName": "Davide D'Amario",
      "songArtist": "Under the Stars",
      "songTitle": "Starry Night",
      "lastPlayed": "1 settimana"
    },
    {
      "profileImage": "https://picsum.photos/43",
      "userName": "Lorenzo Neroni",
      "songArtist": "Walking in the Rain",
      "songTitle": "Rainy Days",
      "lastPlayed": "6 ore"
    },
    {
      "profileImage": "https://picsum.photos/44",
      "userName": "Samuele Toscano",
      "songArtist": "Walking in the Rain",
      "songTitle": "Rainy Days",
      "lastPlayed": "1 ora"
    },
    {
      "profileImage": "https://picsum.photos/38",
      "userName": "Simone D'Anna",
      "songArtist": "Walking in the Rain",
      "songTitle": "Rainy Days",
      "lastPlayed": "7 ore"
    }
  ]
  



function renderFriends(items) {
    const friends = document.getElementById('friends');
    items.forEach(item => {
        
    //    friends.innerHTML += `<div class="p-2 mb-2 overflow-hidden">${item.userName}</div>` 
    friends.innerHTML += `
    <div class="friends-card row">
    <div class="col-2 pe-0">
        <img class="round-image friend-profile-image" src="${item.profileImage}" alt="">
    </div>
    <div class="col-7 offset-1">
        <p class="m-0 friend-user-name">${item.userName}</p>
        <p class="m-0 friend-song-artist">${item.songArtist}</p>
        <i class="bi bi-disc friend-song"></i><span> ${item.songTitle}</span>
    </div>
    <div class="col-2 p-0">
        <p class="friend-last-played"> ${item.lastPlayed}</p>
    </div>
</div>`
    });
    
}
renderFriends(friends);

