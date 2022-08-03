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

function createButtonRemove(task) {
  const btnRemove = document.createElement('button');
  const textRemove = document.createTextNode('delete');
  btnRemove.setAttribute("class", "removerItem");
  btnRemove.appendChild(textRemove);

  btnRemove.addEventListener("click", function() {
    const position = tasks.indexOf(task);
    removeTaskArray(position);
    updateLocalStorage();
    removeList();
    generateList();
    updateTaskArray();
  });

  return btnRemove;
}

function createButtonUpdate(index) {
  const btnUpdate = document.createElement('button');
  const textUpdate = document.createTextNode('editar');
  btnUpdate.setAttribute("class", "updateItem");
  btnUpdate.appendChild(textUpdate);

  const inputUpdate = document.createElement('input');
  inputUpdate.setAttribute("class", "inputEdit");
  inputUpdate.appendChild(btnUpdate);


  btnUpdate.addEventListener("click", function() {
    console.log(index)
    updateTaskArray(index)

  })

  return btnUpdate;
}

function generateList() {
  tasks.forEach(function(task, index) {
    const item = document.createElement('li');

    console.log(index)

    item.appendChild(document.createTextNode(task));
    item.appendChild(createButtonUpdate(index));
    item.appendChild(createButtonRemove(task));
    list.appendChild(item);
  })
}

function updateTaskArray(index) {
  console.log(tasks[index])
}

function removeTaskArray(position) {
  tasks.splice(position, 1);
}

function clearInput() {
  taskInput.value = "";
}

function removeList() {
  list.innerHTML = "";
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