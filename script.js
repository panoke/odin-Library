let myLibrary = [];

const newBookDialog = document.querySelector("#newBookDialog")
const newBookForm = document.querySelector("#newBookForm")
const dialogCloseButton = document.querySelector("#dialogButton")

// add some dummy values as en example
addBookToLibrary("A Book", "An Author", 393, true)
addBookToLibrary("Another Book", "Another Author", 1393, true)

// render values on page load
renderTable()

newBookDialog.addEventListener("close", () => {
  // always clear form when dialog is closed (cancel or submit)
  newBookForm.reset()
})

newBookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const newBookData = Object.fromEntries(formData);

  const bookRead = newBookData.read == "on" ? true : false
  addBookToLibrary(newBookData.title, newBookData.author, parseInt(newBookData.pages), bookRead )

  renderTable()
  newBookDialog.close();
});

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
  this.info = function() {
    console.log(`${this.title} by ${this.author}, ${this.pages} pages, ${ this.read == true ? "read" : "not read yet"  }`);
  };
}

Book.prototype.changeRead = function () {
  this.read = this.read === true ? false : true;
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read)
  myLibrary.push(newBook);
}

function deleteBookFromLibrary(id) {
  myLibrary = myLibrary.filter((book) => book.id !== id);
}

function updateBookFromLibrary (bookId) {
  console.log(bookId)
  const bookToUpdate = myLibrary.find(({id}) => id === bookId)

  console.log(bookToUpdate)
  bookToUpdate.changeRead()
}

function renderTable() {
  const table = document.getElementById("bookTable").getElementsByTagName('tbody')[0]

  table.innerHTML = "";

  myLibrary.forEach((item) => {
      const row = table.insertRow();

      const titleCell = row.insertCell();
      titleCell.innerText = item.title;

      const authorCell = row.insertCell();
      authorCell.innerText = item.author;

      const pagesCell = row.insertCell();
      pagesCell.innerText = item.pages;

      const readCell = row.insertCell();
      readCell.className = "readStatus";
      readCell.innerText = item.read == true ? "\u2705" :  "\u274C";
      readCell.addEventListener("click", (event) => {
        updateBookFromLibrary(event.target.parentNode.lastChild.innerText);
        renderTable();
      })
      readCell.title = "Click to Change Status"

      const deleteCell = row.insertCell();
      const deleteButton = document.createElement("button");
      deleteButton.addEventListener("click", (event) => {
        deleteBookFromLibrary(event.target.parentNode.parentNode.lastChild.innerText);
        renderTable();
      })
      deleteButton.innerText = "Delete";
      deleteCell.appendChild(deleteButton);

      const idCell = row.insertCell();
      idCell.innerText = item.id;
    }
  )
}

