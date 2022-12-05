// selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
// filter
const filterOption = document.querySelector(".filter-todo");

// event listeners
// 1.kai paspaudziame cancelIdleCallback, pridedame todo
todoButton.addEventListener("click", addTodo);
// 2.
todoList.addEventListener("click", deleteCheck);
// 3 filter
filterOption.addEventListener("click", filterTodo);

// functions
// 1.kadangi neturim addTodo, ji reikia sukurti
function addTodo(event) {
  // sita reikia rasyti, nes kai paspaudi addtodo refresinas puslapis, tai sitas padaro, kad nesirefresintu
  event.preventDefault();
  // Todo div sukurimas
  const todoDiv = document.createElement("div");
  // sukurti todo class lista
  todoDiv.classList.add("todo");
  // sukurti li
  const newTodo = document.createElement("li");
  //   virsuje pasirasys uzrasas hey
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  // ikelti ta todo i li lista
  todoDiv.appendChild(newTodo);
  //   check button sukurimas
  const completedButton = document.createElement("button");
  // ides i button uzrasa ar zenkla
  completedButton.innerHTML = '<i class= "fas fa-check"></i>';
  //   pridedam i klase
  completedButton.classList.add("complete-btn");
  //   sukuriam jam diva
  todoDiv.appendChild(completedButton);
  //   trash button sukurimas
  const trashButton = document.createElement("button");
  // ides i button uzrasa ar zenkla
  trashButton.innerHTML = '<i class= "fas fa-trash"></i>';
  //   pridedam i klase
  trashButton.classList.add("trash-btn");
  //   sukuriam jam diva
  todoDiv.appendChild(trashButton);
  //   prideti viska i list ( apend to list)
  todoList.appendChild(todoDiv);
  // kad issitrintu is inputo zodziai, kai paspaudi pliusa
  todoInput.value = "";
}

// 2.

function deleteCheck(e) {
  const item = e.target;
  // delete todo
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    // animation
    todo.classList.add("fall");
    // sita funkcija pasileis, kai pasibaigs transition (css) laikas
    todo.addEventListener("trasitionend", function () {
      todo.remove();
    });
  }

  // check mark
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

// 3. filter

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
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
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
    }
  });
}
