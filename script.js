// Book Constructor
function book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

// Display Constructor
function display() {}

display.prototype.validate = function (book) {
    if (book.name.length > 2 || book.author.length > 2) {
        return true;
    }
    else {
        return false;
    } 
}

display.prototype.addingBook = function (book) {
    let bookAddingRow = document.getElementById("bookAddingRow");
    let showBookDetails = `
                    <tr>
                        <td>${book.name}</td>
                        <td>${book.author}</td>
                        <td>${book.type}</td>
                    </tr>
    `;
    bookAddingRow.innerHTML += showBookDetails;
}

display.prototype.clear = function() {
    let libraryForm = document.getElementById("libraryForm");
    libraryForm.reset();
}

display.prototype.show = function(txt, title, msg) {
    let notificationBar = document.getElementById("notification");
    notificationBar.innerHTML = `
    <div class="alert alert-${txt} alert-dismissible fade show" role="alert">
        <strong> ${title}</strong> ${msg}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>`
    setTimeout(function(){
        notificationBar.innerText = "";
    }, 5000)
}

// Save Data Constructor
function saveData() {}

saveData.prototype.save = function(book){
    let booksInfo = localStorage.getItem("LibraryBookInfo");
    if(booksInfo == null){
        booksData = [];
    }
    else{
        booksData = JSON.parse(booksInfo);
    }
    let bookDetails = {
        bookName : book.name,
        bookAuthor : book.author,
        bookType : book.type,
    }
    booksData.push(bookDetails);
    localStorage.setItem("LibraryBookInfo", JSON.stringify(booksData));
}

saveData.prototype.show = function(){
    let booksInfo = localStorage.getItem("LibraryBookInfo");
    if(booksInfo == null){
        booksData = [];
    }
    else{
        booksData = JSON.parse(booksInfo);
    }
    let html = "";
    booksData.forEach(function (book){
        html += 
        `   <tr>
                <td>${book.bookName}</td>
                <td>${book.bookAuthor}</td>
                <td>${book.bookType}</td>
            </tr>
        `;
    });
    let bookAddingRow = document.getElementById("bookAddingRow");
    bookAddingRow.innerHTML = html;

}
// Add submit event listner to LibraryForm
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);


function showDetails(){
    let dataSave = new saveData();
    dataSave.show();
}

function libraryFormSubmit(e) {
    let name = document.getElementById("bookName").value;
    let author = document.getElementById("authorName").value;
    let type = document.querySelector('input[name="bookType"]:checked').value;

    let addBook = new book(name, author, type);
    
    let displayScr = new display();
    let dataSave = new saveData();
    
    if (displayScr.validate(addBook)) {
        displayScr.addingBook(addBook);
        dataSave.show();
        dataSave.save(addBook);
        displayScr.clear();
        displayScr.show("success","Congratulations!", "Your Book has been added successfully!!!");
    }
    else {
        displayScr.show("danger","Ohh No!", "Kindly enter the correct value.");
    }
    
    e.preventDefault();
}