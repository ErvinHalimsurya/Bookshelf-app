const STORAGE_KEY = "BOOK_APPS";

let books = [];

// Fungsi untuk cek availability local storage browser
function isStorageExist() {
    if(typeof(Storage) === undefined){
        alert("Browser tidak mendukung local storage");
        return false
    } 
    return true;
}

// Fungsi untuk mengimpan data ke local storage
function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

// Mengambil data dari storage
function getDataFromStorage() {
    const storageData = localStorage.getItem(STORAGE_KEY);
    
    let data = JSON.parse(storageData);
    
    if(data !== null){
        books = data;
    }
    document.dispatchEvent(new Event("ondataloaded"));
}

// Update data jika browser punya storage
function updateStorage() {
    if(isStorageExist()){
        saveData();
    }   
}

// Buat informasi menjadi object sebelum di simpan ke storage
function makeBookObject(id, title, author, year, isComplete) {
    return {
        id,
        title,
        author,
        year,
        isComplete
    };
}

function deleteBook(id) {

    for (let index =0; index<books.length; index++){

        if (books[index].id == id){
            books.splice(index,1);
        }
    }
}

function displayDataFromStorage(){
    
    books.forEach(book=>{
        const newBook = displayBook(book.id,book.title, `Penulis: ${book.author}`, `Tahun: ${book.year}`, book.isComplete);

        if (book.isComplete) {
            document.getElementById(COMPLETED_BOOK_CONTAINER).append(newBook);
        } else {
            document.getElementById(UNCOMPLETED_BOOK_CONTAINER).append(newBook);
        }
    });
}