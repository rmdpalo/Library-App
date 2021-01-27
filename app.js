//library array
let myLibrary = !localStorage["myLibrary"] ? [] : JSON.parse(localStorage["myLibrary"]);
//book container
const container = document.querySelector('#book-container');
//book id counter
let idNum = 0;
//form
const bookForm = document.getElementById('book-form');

//Book class (constructor)
function Book(title, author, pages, hasRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
    this.idNum = idNum;
    idNum++;

    this.info = function(){
        if(hasRead === "yes"){
            hasRead = "read"
        } else {
            hasRead = "not read"
        }
        return `${title} by ${author}, ${pages} pages, ${hasRead}.`;
    }
}

//add event listener to add book button
const addBookButton = document.querySelector('#add-book')
addBookButton.addEventListener('click', submitBook);

//adding book to library
function addBookToLibrary(){
    let title = document.getElementById('book-title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let hasRead = getStatus();
    let newBook = new Book(title, author, pages, hasRead);
    myLibrary.push(newBook);
    localStorage["myLibrary"] = JSON.stringify(myLibrary);
    removeAllChildNodes(container);
    generateCards();
}

function getStatus(){
    //selects our radio options by name
    let options = document.getElementsByName('status');

    //loop through our options and check if that option is checked
    for(let i = 0; i < options.length; i++){
        //if it is checked we return its value
        if(options[i].checked){
            return options[i].value;
        }
    }
}

function submitBook(){
    addBookToLibrary();
    bookForm.reset();
}

function removeAllChildNodes(parent){
    //remove all child nodes from container
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

function generateCards(){
    idNum = 0;
    myLibrary.forEach(book => {
        //create card
        const card = document.createElement('div');
        card.classList.add('book-card');
        book.idNum = idNum;
        idNum++;
        //create title
        const bookTitle = document.createElement('h4');
        bookTitle.textContent = book.title;
        //create author
        const bookAuthor = document.createElement('p');
        bookAuthor.textContent = book.author;
        //create pages
        const bookPages = document.createElement('p');
        bookPages.textContent = book.pages + " pages";
        //create read
        const bookRead = document.createElement('button');
        bookRead.classList.add('card-button');
        if(book.hasRead === "yes"){
            bookRead.textContent = "Read";
        } else {
            bookRead.textContent = "Not read";
        }
        bookRead.addEventListener('click', (e) => {
            book.hasRead === "yes" ? book.hasRead = "no" : book.hasRead = "yes"; 
            removeAllChildNodes(container);
            generateCards();
        })
        //create delete button
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('card-button');
        deleteButton.classList.add('delete-button')
        deleteButton.textContent = "Remove";
        deleteButton.addEventListener('click', (e) => {
            myLibrary.splice(book.idNum, 1)
            localStorage["myLibrary"] = JSON.stringify(myLibrary);
            removeAllChildNodes(container);
            generateCards();
        });
        //append all to card
        card.appendChild(bookTitle);
        card.appendChild(bookAuthor);
        card.appendChild(bookPages);
        card.appendChild(bookRead);
        card.appendChild(deleteButton);
        //append card to container
        container.appendChild(card);
    });
}

console.log(myLibrary);
