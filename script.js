class Book {
  constructor(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
  }

  info() {
    console.log(`${this.title} by ${this.author}, ${this.pages} pages, ${ this.read == true ? "read" : "not read yet"  }`);
  }

  changeRead() {
    this.read = this.read === true ? false : true;
  }
}

class Library {
  #myLibrary = []

  addBookToLibrary(author, title, pages, read) {
    const newBook = new Book(author, title, pages, read);
    this.#myLibrary.push(newBook);
  }    

  deleteBookFromLibrary = (id) => {
    this.#myLibrary = this.#myLibrary.filter((book) => book.id !== id);
  }

  updateBookFromLibrary = (bookId) => {
    const bookToUpdate =this.#myLibrary.find(({id}) => id === bookId);
    bookToUpdate.changeRead();
  }

  get myLibrary() {
    return this.#myLibrary;
  }
}

const newBookDialog = document.querySelector("#newBookDialog")
const newBookForm = document.querySelector("#newBookForm")
const dialogCloseButton = document.querySelector("#dialogButton")

const allBooks = new Library()

// add some dummy values as en example
allBooks.addBookToLibrary("An Author", "A Book", 393, true)
allBooks.addBookToLibrary("Another Author", "Another Book", 1393, true)

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
  allBooks.addBookToLibrary(newBookData.author, newBookData.title, parseInt(newBookData.pages), bookRead )

  renderTable()
  newBookDialog.close();
});

function renderTable() {
  const table = document.getElementById("bookTable").getElementsByTagName('tbody')[0]

  table.innerHTML = "";

  allBooks.myLibrary.forEach((item) => {
      const row = table.insertRow();

      const authorCell = row.insertCell();
      authorCell.innerText = item.author;

      const titleCell = row.insertCell();
      titleCell.innerText = item.title;      

      const pagesCell = row.insertCell();
      pagesCell.innerText = item.pages;

      const readCell = row.insertCell();
      readCell.className = "readStatus";
      readCell.innerText = item.read == true ? "\u2705" :  "\u274C";
      readCell.addEventListener("click", (event) => {
        allBooks.updateBookFromLibrary(event.target.parentNode.lastChild.innerText);
        renderTable();
      })
      readCell.title = "Click to Change Status"

      const deleteCell = row.insertCell();
      const deleteButton = document.createElement("button");
      deleteButton.addEventListener("click", (event) => {
        allBooks.deleteBookFromLibrary(event.target.parentNode.parentNode.lastChild.innerText);
        renderTable();
      })
      deleteButton.innerText = "Delete";
      deleteCell.appendChild(deleteButton);

      const idCell = row.insertCell();
      idCell.innerText = item.id;
    }
  )
}

