// alert("oh god no it's alive")

// elementen ophalen
const todoInput = document.getElementById("todoInput");
const todoButton = document.getElementById("todoButton");
const todoList = document.getElementById("todoList");

var toDoArray = []

if(localStorage.getItem("ToDoList"))
var savedToDoArray = localStorage.getItem("ToDoList")
toDoArray = JSON.parse(savedToDoArray);
showToDoArray();

/*
check of knop gedrukt is
lees input, voeg input toe aan lijst, clear input
laat lijst zien
*/

todoButton.addEventListener("click", addToDoItem);

function addToDoItem() {
    // alert("this lives")
    var id = Math.random();
    var toDo = {id: id, text: todoInput.value}

    toDoArray.push(toDo)
    todoInput.value = "";
    todoInput.placeholder = "another!"
    showToDoArray();
    storeToDoArray();
}

function showToDoArray() {
    todoList.replaceChildren();
    toDoArray.forEach((toDo) => {
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(toDo.text));

        var deleteButton = document.createElement("button");
        deleteButton.appendChild(document.createTextNode("X"));
        li.appendChild(deleteButton);
        li.setAttribute("data-id", toDo.id)

        todoList.appendChild(li);
        deleteButton.addEventListener("click", deleteToDo)
        li.addEventListener("click", checkedToDo)
    })
}

function deleteToDo() {
    const target = this.parentElement.getAttribute("data-id");
    toDoArray = toDoArray.filter((toDo) => toDo.id != target);

    this.parentElement.remove();
    storeToDoArray();
}

function storeToDoArray() {
    var jsonToDoArray = JSON.stringify(toDoArray);
    localStorage.setItem("ToDoList", jsonToDoArray)
}

function checkedToDo() {
    this.style.textDecoration = "Line-through"
}