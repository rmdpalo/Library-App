//library array
let myLibrary = [];
//book container
const container = document.querySelector('#book-container');

//Book class (constructor)
function Book(title, author, pages, hasRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;

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
addBookButton.addEventListener('click', addBookToLibrary);

//adding book to library
function addBookToLibrary(){
    let title = prompt("Book title");
    let author = prompt("Book author");
    let pages = prompt("Pages");
    let hasRead = prompt("Have you read it?");
    let newBook = new Book(title, author, pages, hasRead);
    myLibrary.push(newBook);
    removeAllChildNodes(container);
    generateCards();
}

function removeAllChildNodes(parent){
    //remove all child nodes from container
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

function generateCards(){
    myLibrary.forEach(book => {
        //create card
        const card = document.createElement('div');
        card.classList.add('book-card');
        //create title
        const bookTitle = document.createElement('h4');
        bookTitle.textContent = book.title;
        //create author
        const bookAuthor = document.createElement('p');
        bookAuthor.textContent = book.author;
        //create pages
        const bookPages = document.createElement('p');
        bookPages.textContent = book.pages;
        //create read
        const bookRead = document.createElement('button');
        bookRead.classList.add('read-button');
        if(book.hasRead === "yes"){
            bookRead.textContent = "Read";
        } else {
            bookRead.textContent = "Not read";
        }
        //append all to card
        card.appendChild(bookTitle);
        card.appendChild(bookAuthor);
        card.appendChild(bookPages);
        card.appendChild(bookRead);
        //append card to container
        container.appendChild(card);
    });
}

console.log(myLibrary);
