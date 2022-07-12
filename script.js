const form = document.querySelector('.register');
const taskInput = document.querySelector('.taskInput');
const list = document.querySelector('.list');
let tasks = JSON.parse(localStorage.getItem('listTask')) || [];


function addTaskToLocalStorage() {
  const currentTask = taskInput.value;
  tasks.push(currentTask);
  const newTasks = JSON.stringify(tasks);
  localStorage.setItem('listTask', newTasks);

  console.log(tasks)
}

function createList() {
  const item = document.createElement('li');
  item.innerHTML = `${tasks}`
  list.appendChild(item)



  console.log(item)
}


const clearInput = function() {
  taskInput.value = "";
}

function handleSubmit() {
  addTaskToLocalStorage();
  createList();
  clearInput();
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if(taskInput.value.length > 0) {
    handleSubmit();
  }
});