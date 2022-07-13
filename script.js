const form = document.querySelector('.register');
const taskInput = document.querySelector('.taskInput');
const list = document.querySelector('.list');

let tasks = JSON.parse(localStorage.getItem("listTask")) || [];

function addTaskToLocalStorage() {
  const currentTask = taskInput.value;
  tasks.push(currentTask);
  const newTasks = JSON.stringify(tasks);
  localStorage.setItem('listTask', newTasks);
}

function createList() {
  tasks.forEach(function(task) {
    const item = document.createElement('li');
    item.appendChild(document.createTextNode(task));
    list.appendChild(item);
  })
}

function clearList() {
  list.innerHTML = "";
}

function clearInput() {
  taskInput.value = "";
}

function handleSubmit(e) {
  e.preventDefault();

  if(taskInput.value.length > 0) {
    addTaskToLocalStorage();
    clearList();
    createList();
    clearInput();
  }
}

form.addEventListener("submit", handleSubmit);

createList();