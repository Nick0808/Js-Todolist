const toDoForm = document.querySelector(".js-toDoForm"),
toDoInput = toDoForm.querySelector("input"),
toDoList = document.querySelector(".js-toDoList");

const TODO_LS = 'toDos';

const toDos = [];

function saveToDos() {
    localStorage.setItem(TODO_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerHTML = "❌";
    span.innerText = text
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos()
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value="";
}




function loadToDos() {
    const loadedToDos = localStorage.getItem(TODO_LS);
    if(loadedToDos !== null) {
        const parsedTodos = JSON.parse(loadedToDos);
        parsedTodos.forEach(function something(toDo) {
            paintToDo(toDo.text);
            })
        }
    }


function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}

init();