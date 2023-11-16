// CLASSE PER ALERT
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

//FUNZIONE CERCA ID NELLA BARRA INDIRIZZI

function getIdFromBar() {
    let url = new URLSearchParams(location.search);
    let id = url.get("id");
    return id;
}

// FUNZIONE CLONA TEMPLATE
function cloneTemplate (template) {
    let temp = document.querySelector(template)
    return temp.content.cloneNode(true)
}

// FUNZIONE COOKIE PER PAGINA PRINCIPALE

function checkCookie() {
    if (leggiCookie()!= null) {
        location.href="home.html"
    }
    }

// FUNZIONI COOKIE PER PAGINE INTERNE
function checkCookieOnPage() {
    if (leggiCookie() == null) {
        new Alert('INFO', 'La tua sessione è Scaduta stai per essere reinderizzato', 'info').showAlert();
        setTimeout(() => {location.href="index.html"}, 2500)
    }
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

    function getRandomColor() {
        // Genera valori RGB casuali
        let col1 = Math.floor(Math.random() * 256);
        let col2 = Math.floor(Math.random() * 100);
        let col3 = Math.floor(Math.random() * 156);
    
        
        return `rgb(${col1}, ${col2}, ${col3})`;
    }
    