const myLibrary = [];

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

Book.prototype.info =  function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.status}`
}

function addToLibrary(title, author, page_count, read_status) {
    const newBook = new Book(title, author, page_count, read_status);
    myLibrary.push(newBook);
}

addToLibrary("The Dictionary", "Webster", 10000, "read");
addToLibrary("The Lorax", "Dr. Seuss", 20, "did not finish");
addToLibrary("Where the Sidewalk Ends", "Shel Silverstien", 200, "want to read");

const booklist = document.querySelector("tbody");
