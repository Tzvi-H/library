let myLibrary = [];

class Book {
  constructor(attributes) {
    this.title = attributes.title;
    this.author = attributes.author;
    this.pages = Number(attributes.pageCount);
    this.readStatus = attributes.readStatus || false
  }

  toggleRead() {
    this.readStatus = !this.readStatus
  }

  addToLibrary(library) {
    library.push(this)
  }
}

function addBookToLibrary(attributes) {
  const newBook = new Book(attributes);
  newBook.addToLibrary(myLibrary)
}

function renderBooks() {
  const bookContainer = document.querySelector('.books-container');
  Array.from(bookContainer.children).forEach(c => c.remove())

  myLibrary.forEach((book, index) => {
    const readStatus = book.readStatus ? '[x]' : '[ ]'
    const textContent = `${readStatus} - ${book.title}, by ${book.author}, ${book.pages} pages`
  
    const li = document.createElement('li');
    li.textContent = textContent;

    const deleteButton = document.createElement('button');
    const markAsButton = document.createElement('button');
    deleteButton.textContent = 'delete'
    deleteButton.classList.add('delete-book')
    deleteButton.dataset.index = index;
    markAsButton.textContent = `mark as ${book.readStatus ? 'unread' : 'read'}`
    markAsButton.classList.add('mark-book')
    markAsButton.dataset.index = index;
    li.appendChild(deleteButton)
    li.appendChild(markAsButton)

    bookContainer.appendChild(li)
  })
}

function deleteBook(index) {
  myLibrary.splice(index, 1);
  renderBooks()
}

function markBook(index) {
  myLibrary[index].toggleRead();
  renderBooks()
}

function handleBookSubmit(event) {
  event.preventDefault();
  const bookInfo = Object.fromEntries(new FormData(event.target).entries())
  addBookToLibrary(bookInfo)
  renderBooks()
  toggleForm()
}

function handleBookClick(event) {
  if (event.target.classList.contains('delete-book')) {
    deleteBook(Number(event.target.dataset.index))
  } else if (event.target.classList.contains('mark-book')) {
    markBook(Number(event.target.dataset.index))
  } else {
    return;
  }
}

function toggleForm() {
  const form = document.querySelector('.new-book-form');
  form.hidden = !form.hidden;
}

function addEventListeners() {
  document
    .querySelector('.new-book-form')
    .addEventListener('submit', handleBookSubmit)

  document
    .querySelector('.add-book')
    .addEventListener('click', toggleForm)

  document
    .querySelector('.books-container')
    .addEventListener('click', handleBookClick)
}

addBookToLibrary({
  title: 'Norwegian Wood',
  author: 'Haruki Murakami',
  pageCount: 296,
  readStatus: true
})
addBookToLibrary({
  title: 'War and Peace',
  author: 'Leo Tolstoy',
  pageCount: 1225
})

renderBooks()
addEventListeners()