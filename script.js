const myLibrary = [];
const dialog = document.querySelector("dialog");
const buttons = document.querySelectorAll("button");

dialog.showModal();

buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        switch (button.classList[0]) {
            case "add":
                dialog.showModal();
                break;
            case "close":
                dialog.close();
                break;
            case "submit":
                const title = dialog.querySelector("#title");
                const author = dialog.querySelector("#author");
                const pages = dialog.querySelector("#pgs");
                const status = dialog.querySelector("#status");
                if (title.value !== "" && 
                    author.value !== "" && 
                    status.value !== "") {
                        e.preventDefault();
                        addToLibrary(title.value, author.value, pages.value, status.value);
                        title.value = "";
                        author.value = "";
                        pages.value = "";
                        status.value = "";
                        updateLibrary();
                        dialog.close();
                    }
        }
    })
});

function Book(title, author, pages, status) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor.")
  };
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
  this.id = crypto.randomUUID();
}

// Book.prototype.info =  function() {
//     return `${this.title} by ${this.author}, ${this.pages} pages, ${this.status}`
// }

function addToLibrary(title, author, pages, status) {
    const newBook = new Book(title, author, pages, status);
    myLibrary.push(newBook);
}

function updateLibrary() {
    const bookList = document.querySelector("tbody");
    const presentTitles = bookList.querySelectorAll(".title");
    const titleList = [];
    for (let i = 0; i < presentTitles.length; i++) {
        titleList.push(presentTitles[i].textContent);
    }
    myLibrary.forEach(book => {
        if (!(titleList.includes(book.title))){
            const row = document.createElement("tr");
            bookList.appendChild(row);
            for (const detail in book) {
                if (!(detail === "id")) {
                    const cell = document.createElement("td");
                    cell.classList.add(`${detail}`);
                    cell.textContent = book[detail];
                    row.appendChild(cell);
                }
            }
        }
    })
    console.log(titleList);
    console.log(myLibrary);
}