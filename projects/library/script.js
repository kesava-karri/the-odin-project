function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.info = function() {
    return this.title + " by " + this.author + ", " + this.pages + " pages, "
      + (this.isRead 
        ? "read it"
        : "didn't read yet");
  }
}

const book0 = new Book("The Hobbit","J.R.R. Tolkien", 295, false);
const book1 = new Book("Power of Habits","Charles Duhigg", 300, false);
const book2 = new Book("How to Talk to Anyone","Leil Lowndes", 365, false);

const books = [];
// to check
books.push(book0.info());
books.push(book1.info());
books.push(book2.info());

function addBookToLibrary(title, author, pages, isRead) {
  const book = new Book(title, author, pages, isRead);
  console.log("book instanceof Book: ", this instanceof book);
  console.log(this.books);
  books.push(book.info());
}

const container = document.querySelector(".container");
for (const book of books) {
  const div = document.createElement("div");
  div.classList.add("card");

  const bookInfo = book.split(",");
  bookInfo.forEach(infoPart => {
    const p = document.createElement("p");
    p.textContent = infoPart;
    div.append(p);
  });

  container.append(div);
}