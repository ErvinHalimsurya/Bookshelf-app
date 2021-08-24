const checkbox = document.getElementById('inputBookIsComplete');
const status_msg = document.getElementById('status');

document.addEventListener("DOMContentLoaded", function () {
     
    checkbox.addEventListener("change",function(){
        if (this.checked) {
            status_msg.innerText = 'Selesai dibaca';
          } else {
            status_msg.innerText = 'Belum selesai dibaca';
          }
     });

    const submitForm = document.getElementById("inputBook");
    const searchForm = document.getElementById("searchBook")

    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addBook();
        document.getElementById("inputBookTitle").value = "";
        document.getElementById("inputBookAuthor").value = "";
        document.getElementById("inputBookYear").value = "";
        document.getElementById("inputBookIsComplete").checked = false;
    });
  
    searchForm.addEventListener("submit", function (event){
        event.preventDefault();
        searchBook();
    });

    if(isStorageExist()){
        getDataFromStorage();
    }

 });
  
 document.addEventListener("ondataloaded", () => {
    displayDataFromStorage();
 });


