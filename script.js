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
  });

  return btnRemove;
}

function createButtonEdit() {
  const btnUpdate = document.createElement("button");
  const textUpdate = document.createTextNode("editar");
  btnUpdate.classList.add("updateItem");
  btnUpdate.appendChild(textUpdate);

  btnUpdate.addEventListener("click", function (event) {
    const edit = event.target;
    const item = edit.closest("li");
    item.classList.add("editing");
  });

  return btnUpdate;
}

function createInputEdit() {
  const inputUpdate = document.createElement("input");
  inputUpdate.classList.add("inputEdit");
  inputUpdate.type = "text";

  return inputUpdate;
}

function createButtonSave(index) {
  const btnSave = document.createElement("button");
  const textSave = document.createTextNode("salvar");
  btnSave.classList.add("SaveItem");
  btnSave.appendChild(textSave);

  btnSave.addEventListener("click", function (event) {
    const save = event.target;
    const item = save.closest("li");
    const input = item.querySelector("input");
    const inputValue = input.value;

    if (validateInput(inputValue)) {
      tasks[index] = inputValue;

      updateLocalStorage();
      removeList();
      generateList();
    }
  });

  return btnSave;
}

function createButtonCancel() {
  const btnCancel = document.createElement("button");
  const textCancel = document.createTextNode("cancelar");
  btnCancel.classList.add("cancelItem");
  btnCancel.appendChild(textCancel);

  btnCancel.addEventListener("click", function(event) {
    const buttoncancel = event.target;
    const closest = buttoncancel.closest("li");
    closest.classList.add("cancel");

    updateLocalStorage();
    removeList();
    generateList();

    console.log(buttoncancel)
  })

  return btnCancel;
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

function generateList() {
  tasks.forEach(function (task, index) {
    const item = document.createElement("li");

    item.appendChild(document.createTextNode(task));
    item.appendChild(createButtonEdit());
    item.appendChild(createButtonRemove(task));
    item.appendChild(createInputEdit());
    item.appendChild(createButtonSave(index));
    item.appendChild(createButtonCancel());
    list.appendChild(item);
  });
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
