let myLibrary = [];

const newBookDialog = document.querySelector("#newBookDialog")
const newBookForm = document.querySelector("#newBookForm")
const dialogCloseButton = document.querySelector("#dialogButton")

// add some dummy values as en example
addBookToLibrary("A book", "An author", 393, true)
addBookToLibrary("Another book", "Another author", 1393, true)

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

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read)
  myLibrary.push(newBook);
}

function deleteBookFromLibrary(id) {
  myLibrary = myLibrary.filter((book) => book.id !== id)
}

function renderTable() {
  const table = document.getElementById("bookTable").getElementsByTagName('tbody')[0]

  table.innerHTML = "";

  console.log(myLibrary)

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

      const deleteCell = row.insertCell();

      const deleteButton = document.createElement("button");

      deleteButton.addEventListener("click", (event) => {
        deleteBookFromLibrary(event.target.value)
        renderTable()
      })
      deleteButton.innerText = "Delete"
      deleteButton.value = item.id;
      deleteCell.appendChild(deleteButton)

    }
  )
}

