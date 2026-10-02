const myLibrary = [];

const newBookDialog = document.querySelector("#newBookDialog")
const newBookForm = document.querySelector("#newBookForm")
const dialogCloseButton = document.querySelector("#dialogButton")

newBookDialog.addEventListener("close", (event) => {
  // always clear form when dialog is closed (cancel or submit)
  newBookForm.reset()
})

newBookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const newBookData = Object.fromEntries(formData);
  const book = {title: newBookData.title, author: newBookData.author, pages: newBookData.pages, read: `${newBookData.read == "on" ? true : false}`}
  
  myLibrary.push(book)
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

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read)
  myLibrary.push(newBook);
}



let bookA = {title: "A book", author: "An author", pages: 393, read: true}
let bookB = {title: "Another book", author: "Another author", pages: 1393, read: false}

myLibrary.push(bookA)
myLibrary.push(bookB)

function renderTable() {
  const table = document.getElementById("bookTable").getElementsByTagName('tbody')[0]

  table.innerHTML = "";

  myLibrary.forEach((item) => {
      const row = table.insertRow()

      const titleCell = row.insertCell();
      titleCell.innerText = item.title;

      const authorCell = row.insertCell();
      authorCell.innerText = item.author;

      const pagesCell = row.insertCell();
      pagesCell.innerText = item.pages;

      const readCell = row.insertCell();
      readCell.innerText = item.read;
    }
  )
}

renderTable()