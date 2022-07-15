const form = document.querySelector('.register');
const taskInput = document.querySelector('.taskInput');
const list = document.querySelector('.list');

let tasks = JSON.parse(localStorage.getItem("listTask")) || [];

function addTaskArray() {
  const currentTask = taskInput.value;
  tasks.push(currentTask);
}

function updateLocalStorage() {
  const newTasks = JSON.stringify(tasks);
  localStorage.setItem('listTask', newTasks);
}

function generateList() {
  tasks.forEach(function(task) {
    const item = document.createElement('li');

    const btnRemove = document.createElement('button');
    const textRemove = document.createTextNode('delete');
    btnRemove.appendChild(textRemove);

    btnRemove.addEventListener("click", function() {
      const position = tasks.indexOf(task);
      removeTaskArray(position);
      updateLocalStorage();
      removeList();
      generateList();
    });

    item.appendChild(document.createTextNode(task));
    item.appendChild(btnRemove);
    list.appendChild(item);
  })
}

function clearInput() {
  taskInput.value = "";
}

function removeList() {
  list.innerHTML = "";
}

function removeTaskArray(position) {
  tasks.splice(position, 1);
}

function validateInput(value) {
  return value.length > 0
}

function handleSubmit(e) {
  e.preventDefault();
  const valueInput = taskInput.value;

  if(validateInput(valueInput)) {
    addTaskArray();
    updateLocalStorage();
    removeList();
    generateList();

    clearInput();
  }
}

form.addEventListener("submit", handleSubmit);

generateList();