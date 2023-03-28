const books = document.querySelector("#books");
const modal = document.querySelector("#modal");
const bookForm = document.querySelector("#insert-book-form");
const library = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleRead() {
    this.read = this.read ? false : true;
  }
}

//Erases the book card list and inserts all of them
function insertCardsToDOM() {
  books.innerHTML = "";
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
    readButton.addEventListener(
      "click",
      toggleRead.bind(null, readButton, index)
    );
    if (book.read) {
      readButton.classList.add("read");
      readButton.textContent = "Read";
    }
    readFlagElement.appendChild(readButton);

    const editButton = createDOMElement("div", "edit", "");
    editButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <title>Edit</title>
        <path d="M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19H5V5H12V3H5M17.78,4C17.61,4 17.43,4.07 17.3,4.2L16.08,5.41L18.58,7.91L19.8,6.7C20.06,6.44 20.06,6 19.8,5.75L18.25,4.2C18.12,4.07 17.95,4 17.78,4M15.37,6.12L8,13.5V16H10.5L17.87,8.62L15.37,6.12Z"/>
      </svg>
    `;
    editButton.addEventListener("click", openEditModal.bind(null, index));
    const deleteButton = createDOMElement("div", "delete", "");
    deleteButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <title>Delete</title>
        <path
        d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z"
        />
      </svg>
    `;
    deleteButton.addEventListener("click", deleteBook.bind(null, index));
    const cardOptionsElement = createDOMElement("div", "card-options");
    cardOptionsElement.appendChild(editButton);
    cardOptionsElement.appendChild(deleteButton);

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

function toggleRead(button, index) {
  library[index].toggleRead();
  if (button.classList.toggle("read")) {
    button.textContent = "Read";
    return;
  }
  button.textContent = "Not Read";
}

function deleteBook(index) {
  library.splice(index, 1);
  insertCardsToDOM();
}

function openEditModal(index) {
  modal.style.display = "block";
  document.querySelector("#insert-book-btn").style.display = "none";
  document.querySelector("#edit-book-btn").style.display = "block";
  document.querySelector("#insert-book-title").style.display = "none";
  document.querySelector("#edit-book-title").style.display = "block";
  bookForm.setAttribute("data-type", "edit");
  bookForm.setAttribute("data-index", index);
  bookForm[0].value = library[index].title;
  bookForm[1].value = library[index].author;
  bookForm[2].value = library[index].pages;
  bookForm[3].checked = library[index].read;
}

function openNewBookModal() {
  modal.style.display = "block";
  document.querySelector("#edit-book-btn").style.display = "none";
  document.querySelector("#insert-book-btn").style.display = "block";
  document.querySelector("#edit-book-title").style.display = "none";
  document.querySelector("#insert-book-title").style.display = "block";
  bookForm.setAttribute("data-type", "insert");
}

document
  .querySelector(".new-book-btn")
  .addEventListener("click", openNewBookModal);

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

document.querySelector("#cancel-btn").addEventListener("click", () => {
  modal.style.display = "none";
});

document.querySelector("#insert-book-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const book = new Book(
    e.target[0].value,
    e.target[1].value,
    Number(e.target[2].value),
    e.target[3].checked
  );
  if (e.target.dataset.type === "insert") library.push(book);
  if (e.target.dataset.type === "edit") library[+e.target.dataset.index] = book;
  modal.style.display = "none";
  e.target.reset();
  insertCardsToDOM();
});

insertCardsToDOM();
