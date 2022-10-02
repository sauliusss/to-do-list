// selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

// event listeners
// kai paspaudziame cancelIdleCallback, pridedame todo
todoButton.addEventListener("click", addTodo);

// functions
// kadangi neturim addTodo, ji reikia sukurti
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
  newTodo.innerText = "hey";
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
  trashButton.classList.add("complete-btn");
  //   sukuriam jam diva
  todoDiv.appendChild(trashButton);
  //   prideti viska i list ( apend to list)
  todoList.appendChild(todoDiv);
}
