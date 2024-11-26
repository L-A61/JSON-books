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
let descList = new Array();


// Sélection des ids la liste déroulante des auteurs, catégories, et la div vide pour la liste des livres
let listAuthors = document.getElementById("listAuthors");
let listCategories = document.getElementById("listCategories");
let listDesc = document.getElementById("listDesc")
let listBooks = document.getElementById("booksList");


// Écoute d'évenement pour les deux listes déroulantes
listAuthors.addEventListener("change", chargeByAuthor);
listCategories.addEventListener("change", chargeByCategory);

// Écoute d'évenement pour la barre de recherche
listDesc.addEventListener("change", chargeByDescription);

// On créé l'écouteur d'événement sur le load de notre page
window.addEventListener("DOMContentLoaded", jsonOnLoad)

// Fonction qui appelle le chargement du JSON
function jsonOnLoad() {
    fetch("./data/books.json")
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
            // Verification que la catégorie n'est pas dans la liste des catégorie
            if (categoriesList.indexOf(category) === -1) {
                categoriesList.push(category);
            }
        }
    }
    // La liste de livre, est listes déroulantes sont trier par ordre alphabetique
    booksList.sort();
    authorsList.sort();
    categoriesList.sort();

    // Importe le tableau des auteurs dans la liste déroulante pour auteur
    for (let j = 0; j < authorsList.length; j++) {
        let option = document.createElement("option");
        option.value = authorsList[j];
        option.innerText = authorsList[j];
        listAuthors.appendChild(option);
    }

    // Importe le tableau des catégories dans la liste déroulante pour catégorie
    for (let k = 0; k < categoriesList.length; k++) {
        let option = document.createElement("option");
        option.value = categoriesList[k];
        option.innerText = categoriesList[k];
        listCategories.appendChild(option);
    }

    // Appel la fonction showBooks avec pour argument la liste créer dans la fonction createBooks
    showBooks(booksList);
}

// Apparition des livres dans le HTML
function showBooks(_books) {
    listBooks.innerHTML = "";

    for (let k = 0; k < _books.length; k++) {
        // Créer une div pour chaque livre avec pour class (bootstrap) card 
        let book = document.createElement("div");
        book.setAttribute("class", "card");

        // Si l'image n'est pas présent, utilise l'image contenu dans l'URL comme remplacement
        if (_books[k].thumbnailUrl == undefined || _books[k].thumbnailUrl == null) {
            _books[k].thumbnailUrl = "https://p1.storage.canalblog.com/14/48/1145642/91330992_o.png";
        }

        // Titre
        let titre;
        if (_books[k].title.length > 20) {
            titre = _books[k].title.substring(0, 20) + " (...)";
        } else {
            titre = _books[k].title;
        }

        // Description & Courte Description
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
            description = "Pas de description";
        } else {
            description = _books[k].longDescription;
        }

        if (_books[k].shortDescription > 100) {
            shortDescription = _books[k].shortDescription.substring(0, 100) + " (...)";
        } else {
            shortDescription = shortDescription;
        }

        // Date de publication
        let datePubli;
        try {
            datePubli = new Date(_books[k].publishedDate.dt_txt).toLocaleDateString("fr-FR", options);
        } catch (error) {
            datePubli = " Pas de date de publication ";
        }

        // ISBN
        let ISBN;
        ISBN = _books[k].isbn;

        // Nombre de page
        let pageNb;
        pageNb = _books[k].pageCount;

        if (pageNb == 0) {
            pageNb = "Inconnue";
        }

        // DOM Ensemble
        // Image
        book.innerHTML =
            '<img src="' +
            _books[k].thumbnailUrl +
            '" />' +

            // Titre
            '<h1 class="booktitle"><span class="infobulle" title="' +
            _books[k].title +
            '">' +
            titre +
            "</span></h1>" +

            // ISBN
            "<h5>" +
            ISBN +
            "</h5>" +

            // Nombre de Page
            "<h5>Pages: " +
            pageNb +
            "</h5>" +

            // Date de publication
            "<h4>" +
            datePubli +
            "</h4>" +

            // Description
            '<h5> <span class="infobulle" title="' +
            description +
            '">' +

            // Description (courte)
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

// Fonction lors du changement de catégorie dans la liste déroulante
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

// Récupère la valeur de listDesc, et filtre la liste des livres selon si la description contient la valeur de listDesc
function chargeByDescription() {
    let strDesc = listDesc.value.toLowerCase();
    console.log(strDesc);

    // Création d'un tableau dans la variable bookByDesc
    let bookByDesc = new Array();

    // Si la valeur de strDesc est vide, on affiche tout les livres, 
    if (strDesc === "") {
        showBooks(booksList);
    
    // sinon on fait une boucle sur l'ensemble des livres
    } else {
        for (let n = 0; n < booksList.length; n++) {
            // la variable book représent l'index de la boucle de booksList
            let book = booksList[n];   

            // Déclaration des variables shortDesc et longDesc, vide pour le moment
            let shortDesc = "";
            let longDesc = "";

            // Stock toutes les descriptions courtes dans la variable shortDesc en minuscule
            if (book.shortDescription) {
                shortDesc = book.shortDescription.toLowerCase();
            }

            // Stock toutes les descriptions longues dans la variable longDesc en minuscule
            if (book.longDescription) {
                longDesc = book.longDescription.toLowerCase();
            }

            // Si la variable shortDesc ou longDesc contient la valeur de strDesc, on inclus le livre contenant la description dans le tableau bookByDesc 
            if (shortDesc.includes(strDesc) || longDesc.includes(strDesc)) {
                bookByDesc.push(book);
            }
        }
        // Une fois sortie de la boucle, on affiche le tableau bookByDesc
        showBooks(bookByDesc);
    }
}

/*
    let filterDesc = booksList.filter((book) => {
        if (book.shortDescription !== "") {
            let shortDesc = book.shortDescription.toLowerCase()
            console.log("Short Desc: "+ shortDesc)
            bookByDesc.push(shortDesc)
        } else {
            book.shortDescription = "";
        }

        if (book.longDescription !== "") {
            let longDesc = book.longDescription.toLowerCase()
            console.log(longDesc)
        } else {
            book.longDescription = "";
        }
    //    bookByDesc.push()
    return book.shortDesc.includes(strDesc) || book.longDesc.includes(strDesc);
    }
    );
    showBooks(filterDesc);
    */