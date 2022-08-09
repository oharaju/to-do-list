const form = document.querySelector(".register");
const taskInput = document.querySelector(".taskInput");
const list = document.querySelector(".list");

let tasks = JSON.parse(localStorage.getItem("listTask")) || [];

function addTaskArray() {
  const currentTask = taskInput.value;
  tasks.push(currentTask);
}

function updateLocalStorage() {
  const newTasks = JSON.stringify(tasks);
  localStorage.setItem("listTask", newTasks);
}

function createButtonRemove(task) {
  const btnRemove = document.createElement("button");
  const textRemove = document.createTextNode("delete");
  btnRemove.classList.add("removerItem");
  btnRemove.appendChild(textRemove);

  btnRemove.addEventListener("click", function () {
    const position = tasks.indexOf(task);
    removeTaskArray(position);
    updateLocalStorage();
    removeList();
    generateList();
    handleEditItem();
  });

  return btnRemove;
}

function createButtonEdit() {
  const btnUpdate = document.createElement("button");
  const textUpdate = document.createTextNode("editar");
  btnUpdate.classList.add("updateItem");
  btnUpdate.appendChild(textUpdate);

  const inputUpdate = document.createElement("input");
  inputUpdate.appendChild(btnUpdate);

  btnUpdate.addEventListener("click", function (event) {
    const edit = event.target;
    const item = edit.closest("li");
    item.classList.add("editing");
  });

  return btnUpdate;
}

function generateList() {
  tasks.forEach(function (task, index) {
    const item = document.createElement("li");

    // console.log(index)

    item.appendChild(document.createTextNode(task));
    item.appendChild(createButtonEdit());
    item.appendChild(createButtonRemove(task));
    list.appendChild(item);
  });
}

function handleEditItem(index) {
  // const editar = tasks[index];
  // const updateItem = document.querySelectorAll("inputEdit").value;

  // console.log(editar, updateItem)
  console.log(tasks[index]);
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
  return value.length > 0;
}

function handleSubmit(e) {
  e.preventDefault();

  const valueInput = taskInput.value;

  if (validateInput(valueInput)) {
    addTaskArray();
    updateLocalStorage();
    removeList();
    generateList();

    clearInput();
  }
}

form.addEventListener("submit", handleSubmit);

generateList();
