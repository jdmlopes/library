const books = document.querySelector("#books");
const library = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBook() {
  let title = "A Test Book";
  let author = "John Tester";
  let pages = 200;
  let read = false;
  const book = new Book(title, author, pages, read);
  insertBook(book);

  const bookElement = document.createElement("div");
  bookElement.classList.add("card");
  bookElement.setAttribute("data-index", `${library.length - 1}`);

  const titleElement = document.createElement("div");
  titleElement.classList.add("title");
  titleElement.textContent = book.title;

  const authorElement = document.createElement("div");
  authorElement.classList.add("author");
  authorElement.textContent = "Author: " + book.author;

  const pagesNumberElement = document.createElement("div");
  pagesNumberElement.classList.add("pages");
  pagesNumberElement.textContent = "Pages: " + book.pages;

  const bookInfoElement = document.createElement("div");
  bookInfoElement.classList.add("book-info");
  bookInfoElement.appendChild(authorElement);
  bookInfoElement.appendChild(pagesNumberElement);

  const readFlagElement = document.createElement("div");
  readFlagElement.classList.add("read-flag");

  const readLabelElement = document.createElement("label");
  const readCheckboxElement = document.createElement("input");

  readLabelElement.textContent = "Finished Reading? ";
  readLabelElement.setAttribute("for", "read");
  readCheckboxElement.setAttribute("type", "checkbox");

  readFlagElement.appendChild(readLabelElement);
  readFlagElement.appendChild(readCheckboxElement);

  const cardOptionsElement = document.createElement("div");
  cardOptionsElement.classList.add("card-options");
  cardOptionsElement.innerHTML = `<div class="edit">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <title>Edit</title>
    <path
      d="M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19H5V5H12V3H5M17.78,4C17.61,4 17.43,4.07 17.3,4.2L16.08,5.41L18.58,7.91L19.8,6.7C20.06,6.44 20.06,6 19.8,5.75L18.25,4.2C18.12,4.07 17.95,4 17.78,4M15.37,6.12L8,13.5V16H10.5L17.87,8.62L15.37,6.12Z"
    />
  </svg>
</div>
<div class="delete">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <title>Delete</title>
    <path
      d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z"
    />
  </svg>`;

  bookElement.appendChild(titleElement);
  bookElement.appendChild(bookInfoElement);
  bookElement.appendChild(readFlagElement);
  bookElement.appendChild(cardOptionsElement);

  books.appendChild(bookElement);
}

function insertBook(book) {
  library.push(book);
}

addBook();
