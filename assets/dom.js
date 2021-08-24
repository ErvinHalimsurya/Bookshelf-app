const UNCOMPLETED_BOOK_CONTAINER = 'incompleteBookshelfList';
const COMPLETED_BOOK_CONTAINER = 'completeBookshelfList';


function displayBook(id, title, author, year, isComplete) {

    const bookTitle = document.createElement("h3");
    bookTitle.innerText = title;

    const bookAuthor = document.createElement("p");
    bookAuthor.innerText = author;

    const bookYear = document.createElement("p");
    bookYear.innerText = year;

    const textContainer = document.createElement("article");
    textContainer.classList.add("book_item");
    textContainer.setAttribute("id", id);
    textContainer.append(bookTitle, bookAuthor, bookYear);

    const actionButtons = addActionButton(isComplete, id);

    textContainer.append(actionButtons);

    return textContainer;
}

function addBook() {
    const id = +new Date();
    const title = document.getElementById("inputBookTitle").value;
    const author = document.getElementById("inputBookAuthor").value;
    const year = document.getElementById("inputBookYear").value;
    const isComplete = document.getElementById("inputBookIsComplete").checked;

    const book = displayBook(id, title, `Penulis: ${author}`, `Tahun: ${year}`, isComplete);
    const bookObject = makeBookObject(id,title, author, year,isComplete);

    books.push(bookObject);

    if (isComplete) {
        const container = document.getElementById(COMPLETED_BOOK_CONTAINER);
        container.append(book);

    } else {
        const container = document.getElementById(UNCOMPLETED_BOOK_CONTAINER);
        container.append(book);

    }
    updateStorage();
}

function addActionButton(isComplete,id){
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("action");

    const deleteButton = createDeleteButton(id);

    if(isComplete){
        const uncompleteButton = createUncompleteButton(id);
        buttonContainer.append(uncompleteButton);
        buttonContainer.append(deleteButton);
    }
    else{
        const completeButton = createCompleteButton(id);
        buttonContainer.append(completeButton);
        buttonContainer.append(deleteButton);
    }
    return buttonContainer;
}

function createDeleteButton(id){
    const deleteButton = document.createElement("button");
    deleteButton.classList.add('red', 'delete-button');
    deleteButton.innerText = "Hapus Buku";

    deleteButton.addEventListener("click",function(){
        const isConfirmed = confirm("Yakin ingin menghapus buku?");

        if (isConfirmed){
            const book = document.getElementById(id);
            book.remove();

            const searchedBook = document.getElementById(`s-${id}`);

            if (searchedBook){
                searchedBook.remove();
            }

            deleteBook(id);
            updateStorage();
        }
    });

    return deleteButton;
}

function createCompleteButton(id){
    const completeButton = document.createElement("button");
    completeButton.classList.add('green','complete-button');
    completeButton.innerText = "Pindahkan ke selesai dibaca";
    
    completeButton.addEventListener("click",function(){
        const bookContainer = document.getElementById(id);

        const title = bookContainer.querySelector(".book_item > h3").innerText;
        const author = bookContainer.querySelectorAll(".book_item > p")[0].innerText;
        const year = bookContainer.querySelectorAll(".book_item > p")[1].innerText;

        const book = displayBook(id,title,author,year,true);
        document.getElementById(COMPLETED_BOOK_CONTAINER).append(book);
        bookContainer.remove();

        const searchedBook = document.getElementById(`s-${id}`);

        if (searchedBook){
            searchedBook.querySelectorAll(".book_item > p")[2].innerText = 'Status: Selesai dibaca';
            searchedBook.querySelector(".book_item > .action").remove();
            searchedBook.append(addActionButton(true,id));
        }
        
        for (let index =0; index<books.length; index++){
            if (books[index].id == id){
                books[index].isComplete = true;
            }
        }
        updateStorage();
    });

    return completeButton;
}

function createUncompleteButton(id){

    const uncompleteButton = document.createElement("button");
    uncompleteButton.classList.add('green','uncomplete-button');
    uncompleteButton.innerText = "Pindahkan ke belum selesai dibaca";
    
    uncompleteButton.addEventListener("click",function(){
        const bookContainer = document.getElementById(id);
        const title = bookContainer.querySelector(".book_item > h3").innerText;
        const author = bookContainer.querySelectorAll(".book_item > p")[0].innerText;
        const year = bookContainer.querySelectorAll(".book_item > p")[1].innerText;

        const book = displayBook(id,title,author,year,false);
        document.getElementById(UNCOMPLETED_BOOK_CONTAINER).append(book);
        bookContainer.remove();
        const searchedBook = document.getElementById(`s-${id}`);

        if (searchedBook){
            searchedBook.querySelectorAll(".book_item > p")[2].innerText = 'Status: Belum selesai dibaca';
            searchedBook.querySelector(".book_item > .action").remove();
            searchedBook.append(addActionButton(false,id));
        }
        
        for (let index =0; index<books.length; index++){
            if (books[index].id == id){
                books[index].isComplete = false;
            }
        }
        updateStorage();
    });

    return uncompleteButton;
}

function searchBook() {
    const key = document.getElementById("searchBookTitle").value;
    const container = document.getElementById("search-display");
    container.innerHTML = '';
    if (key ==''){
        return;
    }
    books.forEach(book=>{
        if (book.title.toUpperCase().includes(key.toUpperCase()) ){
            const bookTitle = document.createElement("h3");
            bookTitle.innerText = book.title;

            const bookAuthor = document.createElement("p");
            bookAuthor.innerText = `Penulis: ${book.author}`;

            const bookYear = document.createElement("p");
            bookYear.innerText = `Tahun: ${book.year}`;

            const status = document.createElement("p");

            if (book.isComplete){
                status.innerText = 'Status: Selesai dibaca';
            }
            else{
                status.innerText = 'Status: Belum selesai dibaca';
            }

            const textContainer = document.createElement("article");
            textContainer.classList.add("book_item");
            textContainer.setAttribute("id", `s-${book.id}`);

            textContainer.append(bookTitle, bookAuthor, bookYear,status);
            const actionButtons = addActionButton(book.isComplete, book.id);
            
            textContainer.append(actionButtons);
            container.append(textContainer);
            
        }
    });
}