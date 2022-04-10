const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", delCompleteTodo);
filterOption.addEventListener("click", fitlterTodo);
document.addEventListener("DOMContentLoaded", getTodos);

function addTodo(event) {
  event.preventDefault();

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;

  saveLocalTodo(todoInput.value);

  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  todoInput.value = "";

  const completedBtn = document.createElement("button");
  completedBtn.innerHTML = "<i class='fas fa-check'></i>";
  completedBtn.classList.add("complete-btn");
  todoDiv.appendChild(completedBtn);

  const trashBtn = document.createElement("button");
  trashBtn.innerHTML = "<i class='fas fa-trash'></i>";
  trashBtn.classList.add("trash-btn");
  todoDiv.appendChild(trashBtn);

  todoList.appendChild(todoDiv);
}

function saveLocalTodo(todo) {
  let todos;
  if (
    localStorage.getItem("todos") === null
      ? (todos = [])
      : (todos = JSON.parse(localStorage.getItem("todos")))
  );
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function delCompleteTodo(event) {
  const item = event.target;
  console.log(item.parentElement);

  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    removeLocalTodo(todo);
    todo.remove();
  } else if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function fitlterTodo(event) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (event.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (todo.classList.contains("completed")) {
          todo.style.display = "none";
        } else {
          todo.style.display = "flex";
        }
        break;
    }
  });
}

function removeLocalTodo(todo) {
  let todos;
  if (
    localStorage.getItem("todos") === null
      ? (todos = [])
      : (todos = JSON.parse(localStorage.getItem("todos")))
  );
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (
    localStorage.getItem("todos") === null
      ? (todos = [])
      : (todos = JSON.parse(localStorage.getItem("todos")))
  );

  todos.forEach(function (todo) {

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todo;

        newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    const completedBtn = document.createElement("button");
    completedBtn.innerHTML = "<i class='fas fa-check'></i>";
    completedBtn.classList.add("complete-btn");
    todoDiv.appendChild(completedBtn);
  
    const trashBtn = document.createElement("button");
    trashBtn.innerHTML = "<i class='fas fa-trash'></i>";
    trashBtn.classList.add("trash-btn");
    todoDiv.appendChild(trashBtn);
  
    todoList.appendChild(todoDiv);
  });
}
