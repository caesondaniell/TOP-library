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
                        publishLibrary();
                        dialog.close();
                    }
        }
    })
});

function Book(title, author, page_count, read_status) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor.")
  };
  this.title = title;
  this.author = author;
  this.pages = page_count;
  this.status = read_status;
  this.id = crypto.randomUUID();
}

// Book.prototype.info =  function() {
//     return `${this.title} by ${this.author}, ${this.pages} pages, ${this.status}`
// }

function addToLibrary(title, author, page_count, read_status) {
    const newBook = new Book(title, author, page_count, read_status);
    myLibrary.push(newBook);
}

// addToLibrary("The Dictionary", "Webster", 10000, "read");
// addToLibrary("The Lorax", "Dr. Seuss", 20, "did not finish");
// addToLibrary("Where the Sidewalk Ends", "Shel Silverstien", 200, "want to read");

function publishLibrary() {
    const bookList = document.querySelector("tbody");
    myLibrary.forEach((book) => {
        const row = document.createElement("tr");
        bookList.appendChild(row);
        for (const detail in book) {
            if (!(detail === "id")) {
                const cell = document.createElement("td");
                cell.textContent = book[detail];
                row.appendChild(cell);
            }
        }
    })
}

publishLibrary();