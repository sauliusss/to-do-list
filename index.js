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
// 4 jei viskas pasileidzia uzloadink viska
document.addEventListener("DOMContentLoader", getTodos);

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
  // 4. kad pridetu local storage ( i paskutine vieta negalima deti, nes visada rodys "." )
  saveLocalTodos(todoInput.value);
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
    // 4 kai nori istrinti is local storage todo
    removeLocalTodos(todo);
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
// 4. local storage

function saveLocalTodos(todo) {
  // patikrinti ar nera to pacio dalyko
  // patikrina ar yra todo
  let todos;
  // jei nera, padaro tuscia array
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    // jei bus todo, palieka ta array
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  // jei bus tas Array, jie nusius i local storage
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  // kad issitrintu reikiamas arrayjus
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    //Create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create list
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";
    //Create Completed Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //Create trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //attach final Todo
    todoList.appendChild(todoDiv);
  });
}
