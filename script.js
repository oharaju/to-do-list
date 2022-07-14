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

    const btnRemove = document.createElement('button');
    const textRemove = document.createTextNode('delete');
    btnRemove.appendChild(textRemove);

    const position = tasks.indexOf(task);
    btnRemove.setAttribute('onclick', removeTask(position));


    item.appendChild(document.createTextNode(task));
    item.appendChild(btnRemove);
    list.appendChild(item);
  })
}

function removeTask(position) {
  // tasks.splice(position, 1);
  console.log(tasks)
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