const books = document.querySelector("#books");
const library = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = this.read ? false : true;
};

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  insertBook(book);
}

function insertCardsToDOM() {
  for (const [index, book] of library.entries()) {
    const bookElement = createDOMElement("div", "card", "");
    bookElement.setAttribute("data-index", `${index}`);

    const titleElement = createDOMElement("div", "title", book.title);

    const authorElement = createDOMElement(
      "div",
      "author",
      `Author: ${book.author}`
    );

    const pagesNumberElement = createDOMElement(
      "div",
      "page-number",
      `Pages: ${book.pages}`
    );

    const bookInfoElement = createDOMElement("div", "book-info");

    bookInfoElement.appendChild(authorElement);
    bookInfoElement.appendChild(pagesNumberElement);

    const readFlagElement = createDOMElement("div", "read-flag");

    const readButton = createDOMElement("button", "read-btn", "Not Read");
    readButton.setAttribute("data-index", `${index}`);
    if (book.read) {
      readButton.classList.add("read");
      readButton.textContent = "Read";
    }
    readFlagElement.appendChild(readButton);

    const cardOptionsElement = createDOMElement("div", "card-options");

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
}

function createDOMElement(elementName, className, textContent = "") {
  const element = document.createElement(elementName);
  if (className !== "") element.classList.add(className);
  element.textContent = textContent;
  return element;
}

function insertBook(book) {
  library.push(book);
}

function toggleRead(element) {
  library[+element.dataset.index].toggleRead();
  if (element.classList.toggle("read")) {
    element.textContent = "Read";
    return;
  }
  element.textContent = "Not Read";
}

addBookToLibrary(
  "The Chronicles of Narnia: The Lion, The Witch and The Wardrobe",
  "Num Sei",
  600,
  true
);
addBookToLibrary("Chuck Testa", "John Tester", 200, false);
addBookToLibrary("Chuck Testa 2", "John Tester", 250, true);
addBookToLibrary("Chuck Testa 3", "John Tester", 100, false);
addBookToLibrary("Chuck Testa 4: Tokyo Drift ", "John Tester", 300, true);
addBookToLibrary("Chuck Testa: The Return", "John Tester", 800, false);

insertCardsToDOM();

const readButtons = document.querySelectorAll(".read-btn");
readButtons.forEach((btn) => {
  btn.addEventListener("click", toggleRead.bind(null, btn));
});
