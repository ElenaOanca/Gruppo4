/**** audio entra */
let soundfile = document.querySelector('#audio');


function audioPlay (){  soundfile.play()}

/**** SEZIONE TOKEN & COOKIES */
function checkCookie() {
if (leggiCookie()!= null) {
    location.href="home.html"
}
}

checkCookie();
// SEZIONE CLASSE OGGETTI
class Alert {
    constructor(icon, message, text) {
        this.icon = icon;
        this.message = message;
        this.text = text;
    }

    showAlert() {
        Swal.fire({
            icon: this.icon,
            title: this.message,
            text: this.text,
          });
        }
}

let tokenButton = document.querySelector('#tokenGenerator');
let  check = document.querySelector('#promise');
console.log(check, tokenButton);

tokenButton.addEventListener('click', () => {
    if (check.checked) {
        scriviCookie()
        new Alert('success', 'Token generato correttamente', 'success').showAlert();
        setTimeout(() => {location.href="home.html"}, 2500)
    } else {
        Swal.fire({
            title: 'Entraaa?!?!',
            confirmButtonText: 'Non penso proprio',
        })
        soundfile.play()
    }
});
async function getToken () {
    return await fetch ("https://accounts.spotify.com/api/token",
        {
            method : "POST",
            headers : {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body : "grant_type=client_credentials&client_id=3d95631fa2714b63a86360548af955cd&client_secret=8f03a40917cb4cca9c4c5a9c476fa168"
        })
   .then(res => res.json())
}


async function scriviCookie() {
    let token = await getToken()
    let now = new Date();//Date crea un oggetto data contenente data ed ora attuali
    now.getHours()//ora attuale
    now.setHours(now.getHours() + 1 );//All'ora attuale aggiungo un'ora

    let scadenza = `expires= + ${now.toUTCString()}`;//converto la data nel formato utc, richiesto per il corretto funzionamento del cookie. esempio: Wed, 14 Jun 2017 07:00:00 GMT

    document.cookie =`token =${token.access_token};${scadenza}`;
 } 

function leggiCookie() {
    let allCookies = document.cookie;
    let cookie = 'token';

    let arr = allCookies.split('; ');

    let res = '';

    for(let i = 0; i < arr.length; i++) {

       chiave = arr[i].split('=')[0];//"token"
       valore = arr[i].split('=')[1];//valore token
        if(cookie == chiave){
           res = valore;
           return res;
         }
    }}

