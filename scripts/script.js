let options={
    weekday: "long",
    year:"numeric",
    month:"long",
    day:"numeric"
};


let booksList = new Array();
let authors = new Array();
let category = new Array();

let listAuthors = document.getElementById("listAuthors");
let listCategories = document.getElementById("listCategories");
let listBooks = document.getElementById("booksList");


listAuthors.addEventListener("change",chargeByAuthor);
listCategories.addEventListener("change",chargeByCategory);

// On créé l'écouteur d'évenement sur le load de notre page
window.addEventListener("DOMContentLoaded",jsonOnLoad)

// Fonction qui appele le chargement du json
function jsonOnLoad(){
    fetch("data/books.json")
    .then((response)=>(
    response.json()
    ))
    .then((data)=>{
        //console.log(data)
        createBooks(data);
    })
}

// Fonction qui affiche les livres mais aussi qui crééera les listes déroulantes
// (ERREUR A CORRIGER)
function createBooks(_books){

    // Boucle sur l'ensemble des livres, on s'en servira pour afficher les livres plus tards
    for (let book of _books){
        booksList.push(book);
        for (let i=0; i < book.authors.length;i++) {
            let author=book.authors[i];

            // Vérification que l'auteur n'est pas dans la liste des auteurs
            if (authorsList.indexOf(author)===-1) {
                authorsList.push(author);
            }
        }
    }
    booksList.sort()
    authorsList.sort()

    for(let j=0; j < authorsList.length;j++){
        let option=document.createElement("option")
        option.value=authorsList[j];
        option.innerText=authorsList[j];
        listAuthors.appendChild(option);
    }

    console.log(authorsList)

    showBooks(booksList);
}

function showBooks(_books) {
    listBooks.innerHTML="";

    for (let k=0; k <_books.length; k++) {
        let book =document.createElement("div");
        book.setAttribute("class","card");

        if (_books[k].thumbnailURL ==undefined || _books[k].thumbnailURL ==null) {
            _books[k].thumbnailURL= "https://p1.storage.canalblog.com/14/48/1145642/91330992_o.png"
        }

        let titre;
        if(_books[k].title.length > 20) {
            titre=_books[k].title.substring(0,20) +" (...)"
        } else {
            titre=_books[k].title
        }

        let description;
        let shortDescription;

        if ( _books[k].shortDescription == undefined || _books[k].shortDescription == null) {
            // TO DO: FINISH
        }

        if (_books[k].longDescription == undefined || _books[k].longDescription == null) {
            // TO DO: FINISH
        }
        
        if (_books[k].shortDescription==undefined || _books[k].thumbnailURL == null) {
            shortDescription=_books[k].longDescription.substring(0,100);
        } else {
            shortDescription= _books[k].shortDescription;
        }

        description = _books[k].longDescriiption;
        if (_books[k].shortDescription > 100) {
            shortDescription=_books[k].shortDescription.substring(0,100) +" (...)"
        } else {
            shortDescription=_books[k].shortDescription;
        }

        let datePubli;
        try {
            datePubli=new Date(_books[k].publishedDate.dt_txt).toLocaleDateString("fr-FR",options);
        } catch (error) {
            datePubli=" Pas de date de publication ";
        }

        // TODO: Nombre de page, et ISBN

        book.innerHTML=
        '<img src="'+
        _books[k].thumbnailURL +
        '" />' +
        '<h1 class="booktitle"><span class="infobulle" title="' +
        _books[k].title + 
        '">' +
        titre + 
        "</span></h1>" +
        "<h4>" +
        datePubli +
        "</h4>"+
        '<h5> <span class="infobulle" title="' +
        description +
        '">' + 
        shortDescription + 
        '</span></h5>';



        listBooks.appendChild(book);

    }
}

// Fonction lors du changement d'auteur dans la liste déroulante
function chargeByAuthor(){
    let strAuthor=listAuthors.options[listAuthors.selectedIndex].text;
    console.log(strAuthor);

    let bookByAuthor= new Array();
    
    if (strAuthor==""){
        showBooks(booksList)
    } else {
        for (let l=0;l<booksList.length;l++) {
            let book=booksList[l];

            if(book.auors.indexOf(strAuthor)!=-1) {
                bookByAuthor.push(book);
            }
        }
    }

    bookByAuthor.sort();
    showBooks(bookByAuthor);
}

function chargeByCategory(){

}

