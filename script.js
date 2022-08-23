const form = document.querySelector(".register");
const taskInput = document.querySelector(".taskInput");
const list = document.querySelector(".list");

let tasks = JSON.parse(localStorage.getItem("listTask")) || [];

function addTaskArray() {
  const currentTask = taskInput.value.toUpperCase();

  tasks.push(currentTask);
}

function updateLocalStorage() {
  const newTasks = JSON.stringify(tasks);
  localStorage.setItem("listTask", newTasks);
}

function createButtonRemove(task) {
  const btnRemove = document.createElement("button");
  btnRemove.classList.add("btnItem");
  btnRemove.classList.add("removerItem");

  const icon = document.createElement("i");
  icon.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
  btnRemove.appendChild(icon);

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
  btnUpdate.classList.add("btnItem");
  btnUpdate.classList.add("updateItem");

  const icon = document.createElement("i");
  icon.innerHTML = '<i class="fa-solid fa-pencil" aria-hidden="true"></i>';
  btnUpdate.appendChild(icon);

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

function createButtonSave() {
  const btnSave = document.createElement("button");
  btnSave.type = "submit";
  btnSave.classList.add("btnItem");
  btnSave.classList.add("saveItem");

  const icon = document.createElement("i");
  icon.innerHTML = '<i class="fa-solid fa-floppy-disk" aria-hidden="true"></i>';
  btnSave.appendChild(icon);

  return btnSave;
}

function createButtonCancel() {
  const btnCancel = document.createElement("button");
  btnCancel.classList.add("btnItem");
  btnCancel.classList.add("cancelItem");

  const icon = document.createElement("i");
  icon.innerHTML = '<i class="fa-solid fa-xmark" aria-hidden="true"></i>';
  btnCancel.appendChild(icon);

  btnCancel.addEventListener("click", function(event) {
    const buttoncancel = event.target;
    const closest = buttoncancel.closest("li");
    closest.classList.add("cancel");

    updateLocalStorage();
    removeList();
    generateList();
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

    const formItem = document.createElement("form");

    const itemSpan = document.createElement("span");
    itemSpan.appendChild(document.createTextNode(task))

    formItem.appendChild(itemSpan);

    formItem.addEventListener("submit", function (event) {
      event.preventDefault();

      const save = event.target;
      const item = save.closest("li");
      const input = item.querySelector("input");

      const inputValue = input.value.toUpperCase();

      if (validateInput(inputValue)) {
        tasks[index] = inputValue;

        updateLocalStorage();
        removeList();
        generateList();
      }
    });

    formItem.appendChild(createButtonEdit());
    formItem.appendChild(createButtonRemove(task));
    formItem.appendChild(createInputEdit());
    formItem.appendChild(createButtonSave());
    formItem.appendChild(createButtonCancel());

    item.appendChild(formItem);

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
