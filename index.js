console.log("This is index.js")


//Constructor
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

//Display Constructor
function Display() {
}


//Add methods to display prototype
Display.prototype.add = function (book) {
    console.log("adding to UI");
    tablebody = document.getElementById("tablebody")
    let uistring = `<tr>
                        <td>${book.name}</td>
                        <td>${book.author}</td>
                        <td>${book.type}</td>
                    </tr>`;
    tablebody.innerHTML += uistring;
}

//Implement clear function
Display.prototype.clear = function () {
    let libraryForm = document.getElementById("libraryForm");
    libraryForm.reset();
}

//Implement validate function
Display.prototype.validate = function (book) {
    if (book.name.length < 2 || book.author.length < 2) {
        return false;
    }
    else {
        return true;
    }

}

Display.prototype.show = function (type, message1) {
    let message = document.getElementById("message");
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>Message :</strong> ${message1}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`;

    setTimeout(function () {
        message.innerHTML = "";
    }, 5000);
}



//Add submit event listener to libraryForm
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(e) {
    console.log("you have submitted library form");

    let name = document.getElementById("bookName").value;
    let author = document.getElementById("author").value;
    let type;
    let fiction = document.getElementById("fiction");
    let programming = document.getElementById("programming");
    let stories = document.getElementById("stories");

    if (fiction.checked) {
        type = fiction.value;
    }

    else if (programming.checked) {
        type = programming.value;
    }

    else if (stories.checked) {
        type = stories.value;
    }

    let book = new Book(name, author, type);
    console.log(book);

    let display = new Display();

    if (display.validate(book)) {

        display.add(book);
        display.clear();
        display.show('success', 'Your book has been added successfully , You should check in Your Books fields below.');
    }
    else {
        display.show('danger', 'You cannot add this book , You should check in on some of input fields below.');
    }

    e.preventDefault();

}