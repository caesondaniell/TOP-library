const myLibrary = [];
const dialog = document.querySelector("dialog");
const buttons = document.querySelectorAll("button");

// dialog.showModal();

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
                };
                break;
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

function addToLibrary(title, author, pages, status) {
    const newBook = new Book(title, author, pages, status);
    let exists = 0;
    myLibrary.forEach(book => {
        if (book.title === newBook.title && book.author === newBook.author) {
            exists += 1;
        }
    });
    if (exists) {
        alert("That book is already in your library!")
    } else myLibrary.push(newBook);
}

function updateLibrary() {
    const bookList = document.querySelector("tbody");
    const presentTitles = bookList.querySelectorAll(".title");
    const titleList = [];
    const presentAuthors = bookList.querySelectorAll(".author");
    const authorList = [];
    for (let i = 0; i < presentTitles.length; i++) {
        titleList.push(presentTitles[i].textContent);
    }
    for (let i = 0; i < presentAuthors.length; i++) {
        authorList.push(presentAuthors[i].textContent);
    }
    myLibrary.forEach(book => {
        if (titleList.includes(book.title) &&
            authorList.includes(book.author) &&
            titleList.indexOf(book.title) === authorList.indexOf(book.author)) {
                titleList.splice(0,1);
                authorList.splice(0,1);
                return;
        } else {
            const row = document.createElement("tr");
            const rmv = document.createElement("button");
            row.setAttribute("data-id", book.id);
            rmv.classList.add("remove");
            rmv.classList.add("material-symbols-outlined");
            rmv.setAttribute("aria-label", "remove book");
            rmv.textContent = "close";
            bookList.appendChild(row);
            for (const detail in book) {
                if (!(detail === "id")) {
                    const cell = document.createElement("td");
                    cell.classList.add(`${detail}`);
                    cell.textContent = book[detail];
                    row.appendChild(cell);
                }
            }
            row.appendChild(rmv);
            rmv.addEventListener("click", () => {
                const idNumber = rmv.parentElement.dataset.id;
                if (confirm("Delete this book from your library?")) {
                    bookList.removeChild(rmv.parentElement);
                    myLibrary.forEach(book => {
                        if (book.id === idNumber) {
                            myLibrary.splice(myLibrary.indexOf(book), 1);
                        };
                    });
                };
            });
        }
    })
    console.log(titleList);
    console.log(authorList);
    console.log(myLibrary);
}

addToLibrary("House of Blades", "Chuckie", 10, "want to read");
addToLibrary("Sunshine and Daisies", "Barney", 20, "finished");
updateLibrary();