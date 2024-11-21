let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
};
// Déclaration de tableau
let booksList = new Array();
let authorsList = new Array();
let categoriesList = new Array();


// Sélection des ids la liste déroulante des auteurs, catégories, et la div vide pour la liste des livres
let listAuthors = document.getElementById("listAuthors");
let listCategories = document.getElementById("listCategories");
let listBooks = document.getElementById("booksList");

listAuthors.addEventListener("change", chargeByAuthor);
listCategories.addEventListener("change", chargeByCategory);

// On créé l'écouteur d'événement sur le load de notre page
window.addEventListener("DOMContentLoaded", jsonOnLoad)

// Fonction qui appelle le chargement du JSON
function jsonOnLoad() {
    fetch("data/books.json")
    .then((response) => 
        response.json())
    .then((data) => {
        createBooks(data)
    })
}

// Fonction qui affiche les livres mais aussi qui créera les listes déroulantes
function createBooks(_books) {
    // Boucle sur l'ensemble des livres, on s'en servira pour afficher les livres plus tard
    for (let book of _books) {
        booksList.push(book);
        for (let i = 0; i < book.authors.length; i++) {
            let author = book.authors[i];
            let category = book.categories[i];
            // Vérification que l'auteur n'est pas dans la liste des auteurs
            if (authorsList.indexOf(author) === -1) {
                authorsList.push(author);
            }
            if (categoriesList.indexOf(category) === -1) {
                categoriesList.push(category)
            }
        }
    }
    booksList.sort();
    authorsList.sort();
    categoriesList.sort();

    for (let j = 0; j < authorsList.length; j++) {
        let option = document.createElement("option");
        option.value = authorsList[j];
        option.innerText = authorsList[j];
        listAuthors.appendChild(option);
    }
    for (let k = 0; k < categoriesList.length; k++) {
        let option2 = document.createElement("option");
        option2.value = categoriesList[k];
        option2.innerText = categoriesList[k];
        listCategories.appendChild(option2);
    }

    console.log(authorsList);
    console.log(categoriesList)
    showBooks(booksList);
}

function showBooks(_books) {
    listBooks.innerHTML = "";

    for (let k = 0; k < _books.length; k++) {
        let book = document.createElement("div");
        book.setAttribute("class", "card");

        if (_books[k].thumbnailUrl == undefined || _books[k].thumbnailUrl == null) {
            _books[k].thumbnailUrl = "https://p1.storage.canalblog.com/14/48/1145642/91330992_o.png";
        }

        let titre;
        if (_books[k].title.length > 20) {
            titre = _books[k].title.substring(0, 20) + " (...)";
        } else {
            titre = _books[k].title;
        }

        let description;
        let shortDescription;

        if (_books[k].shortDescription == undefined || _books[k].shortDescription == null) {
            if (_books[k].longDescription == undefined || _books[k].longDescription == null) {
                shortDescription = "Pas de description";
            } else {
                shortDescription = _books[k].longDescription.substring(0, 100);
            }
        } else {
            shortDescription = _books[k].shortDescription;
        }
        if (_books[k].longDescription == undefined || _books[k].longDescription == null) {
            description = _books[k].longDescription;
        } else {
            description = "Pas de description";
        }
        if (_books[k].shortDescription > 100) {
            shortDescription = _books[k].shortDescription.substring(0, 100) + " (...)";
        } else {
            shortDescription = shortDescription;
        }

        let datePubli;
        try {
            datePubli = new Date(_books[k].publishedDate.dt_txt).toLocaleDateString("fr-FR", options);
        } catch (error) {
            datePubli = " Pas de date de publication ";
        }

        // TODO: Nombre de page, et ISBN

        book.innerHTML =
        '<img src="' +
        _books[k].thumbnailUrl +
        '" />' +
        '<h1 class="booktitle"><span class="infobulle" title="' +
        _books[k].title +
        '">' +
        titre +
        "</span></h1>" +
        "<h4>" +
        datePubli +
        "</h4>" +
        '<h5> <span class="infobulle" title="' +
        description +
        '">' +
        shortDescription +
        '</span></h5>';

        listBooks.appendChild(book);
    }
}

// Fonction lors du changement d'auteur dans la liste déroulante
function chargeByAuthor() {
    let strAuthor = listAuthors.options[listAuthors.selectedIndex].text;
    console.log(strAuthor);

    let bookByAuthor = new Array();

    if (strAuthor == "") {
        showBooks(booksList);
    } else {
        for (let l = 0; l < booksList.length; l++) {
            let book = booksList[l];

            if (book.authors.indexOf(strAuthor) != -1) {
                bookByAuthor.push(book);
            }
        }
    }

    bookByAuthor.sort();
    showBooks(bookByAuthor);
}

// Fonction lors du changement de catégorie dans la liste déroulante (A faire)
function chargeByCategory() {
    let strCategory = listCategories.options[listCategories.selectedIndex].text;
    console.log(strCategory);

    let bookByCategory = new Array();

    if (strCategory == "") {
        showBooks(booksList);
    } else {
        for (let m = 0; m < booksList.length; m++) {
            let book = booksList[m];

            if (book.categories.indexOf(strCategory) != -1) {
                bookByCategory.push(book);
            }
        }
    }

    bookByCategory.sort();
    showBooks(bookByCategory);
}
