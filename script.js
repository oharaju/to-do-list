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

    const btnUpdate = document.createElement('button');
    const textUpdate = document.createTextNode('editar');
    btnUpdate.setAttribute("class", "updateItem");
    btnUpdate.appendChild(textUpdate);

    const inputUpdate = document.createElement('input');
    inputUpdate.setAttribute("class", "inputEdit");
    inputUpdate.appendChild(btnUpdate);

    btnUpdate.addEventListener("click", function() {
      const position = tasks.indexOf(task);

      updateTaskArray(position);
      updateLocalStorage();
      removeList();
      generateList();
    });

    item.appendChild(document.createTextNode(task));
    item.appendChild(btnUpdate);
    item.appendChild(btnRemove);
    list.appendChild(item);
  })
}

function updateTaskArray(event) {
  const btnUpdate = event.target;
  const item = btnUpdate.closest('li');
  btnUpdate.classList.add('updating')

  item.classList.add('updating')
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