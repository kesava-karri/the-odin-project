function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.info = function() {
    return this.title + " by " + this.author + ", " + this.pages + " pages, "
      + this.isRead;
  }
}


const book0 = new Book("Power of Habits","Charles Duhigg", 300, "Read");
const book1 = new Book("How to Talk to Anyone","Leil Lowndes", 365, "Unread");

const books = [];

addBookToLibrary(book0);
addBookToLibrary(book1);

function addBookToLibrary(info) {
  [title, author, pages, isRead] = [...Object.values(info)];;
  const book = new Book(title, author, pages, isRead);
  books.push(book);

  const container = document.querySelector(".container");
  const div = document.createElement("div");
  div.classList.add("card");

  const bookInfo = book.info().split(",");
  bookInfo.forEach(infoPart => {
    if (infoPart.match("Read") || infoPart.match("Unread")) {
      const btnRead = document.createElement("button");
      btnRead.textContent = infoPart;
      btnRead.classList.add(".btn-read-status");
      btnRead.addEventListener('click', (e) => {
        if (book.isRead.match("Read")) {
          book.isRead = "Unread";
          btnRead.textContent = "Unread";
        } else if (book.isRead.match("Unread")){
          book.isRead = "Read";
          btnRead.textContent = "Read";
        }
      });
      div.append(btnRead);
    } else {
      const p = document.createElement("p");
      p.textContent = infoPart;
      div.append(p);
    }
  });
  
  
  const btnRemove = document.createElement("button");
  btnRemove.classList.add(".btn-remove");
  btnRemove.textContent = "Remove";
  div.appendChild(btnRemove);
  btnRemove.addEventListener('click', (e) => {
    container.removeChild(div);
    books.splice(books.indexOf(book), 1);
  });
  
  container.append(div);
}

const dialog = document.querySelector("#dialog");

const btnNewBook = document.querySelector(".btn-new-book");
btnNewBook.addEventListener('click', (event) => {
  dialog.showModal();
});

const btnAddNewBook = document.querySelector(".btn-add-new-book");
btnAddNewBook.addEventListener('click', (e) => {
  e.preventDefault();
  const form = document.querySelector("#form");
  const formData = Object.fromEntries(new FormData(form).entries());

  addBookToLibrary(formData);
  form.reset();
  dialog.close();
});

const btnClose = document.querySelector(".btn-close");
btnClose.addEventListener('click', (e) => {
  e.preventDefault();
  dialog.close();
});


