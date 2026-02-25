const dialog = document.querySelector("dialog");
const buttons = document.querySelectorAll("button");
const library = [];
class Book {
  constructor(title, author, pages, readState) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readState = readState;
    }
    
    id = crypto.randomUUID();
    
    addToLibrary() {
        let exists;
        library.forEach(book => {
            if (book.title === this.title && book.author === this.author) {
                exists = 1;
            }
        });
        if (exists) {
            alert("That book is already in your library!");
        } else library.push(this);
    }
    
    changeState(state) {
        this.readState = state;
    }
}

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
                let title = dialog.querySelector("#title");
                let author = dialog.querySelector("#author");
                let pages = dialog.querySelector("#pgs");
                let status = dialog.querySelector("#status");
                if (title.value !== "" && 
                    author.value !== "" && 
                    status.value !== "") {
                        e.preventDefault();
                        const book = new Book(title.value, author.value, pages.value, status.value);
                        title.value = "";
                        author.value = "";
                        pages.value = "";
                        status.value = "";
                        dialog.close();
                        book.addToLibrary();
                        updateLibrary();
                };
                break;
        }
    })
});

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
    library.forEach(book => {
        if (titleList.includes(book.title) &&
            authorList.includes(book.author) &&
            titleList.indexOf(book.title) === authorList.indexOf(book.author)) {
                titleList.splice(0,1);
                authorList.splice(0,1);
                return;
        } else {
            const row = document.createElement("tr");
            row.setAttribute("data-id", book.id);
            bookList.appendChild(row);
            for (const detail in book) {
                if (!(detail === "id")) {
                    const cell = document.createElement("td");
                    cell.classList.add(`${detail}`);
                    if (!(detail === "readState")) {
                        cell.textContent = book[detail];
                    } else {
                        const statusSelector = document.createElement("select");
                        statusSelector.setAttribute("name", `${book.id}-status`);
                        statusSelector.setAttribute("id", `${book.id}-status`);
                        cell.appendChild(statusSelector);
                        const optionList = [
                            "want to read", 
                            "reading", 
                            "did not finish", 
                            "finished"
                        ]
                        optionList.forEach(option => {
                            const statusOption = document.createElement("option");
                            statusOption.setAttribute("value", option);
                            statusOption.textContent = option;
                            statusSelector.appendChild(statusOption);
                        })
                        statusSelector.value = book[detail];
                        statusSelector.addEventListener("input", () => {
                            book.changeState(statusSelector.value);
                            console.log(library);
                        })
                    }
                    row.appendChild(cell);
                }
            }

            const rmv = document.createElement("button");
            rmv.classList.add("remove");
            rmv.classList.add("material-symbols-outlined");
            rmv.setAttribute("aria-label", "remove book");
            rmv.textContent = "close";
            row.appendChild(rmv);
            rmv.addEventListener("click", () => {
                if (confirm(`Delete ${book.title}, by ${book.author} from your library?`)) {
                    bookList.removeChild(rmv.parentElement);
                    library.splice(library.indexOf(book), 1);
                };
            });
        }
    })
    // --Here for when I need to add/test/style features--
    // console.log(titleList);
    // console.log(authorList);
    // console.log(library);
}

// --Here for when I need to add/test/style features--
// addToLibrary("House of Blades", "Chuckie", 10, "want to read");
// addToLibrary("Sunshine and Daisies", "Barney", 20, "finished");
// updateLibrary();