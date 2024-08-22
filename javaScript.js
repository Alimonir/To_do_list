let inputfield = document.querySelector(".inputfield");
let submit = document.querySelector(".add");
let taskDiv = document.querySelector(".tasks");

let tasksArray = JSON.parse(localStorage.getItem("task")) || [];

window.onload = function () {
  addTasksToPage(tasksArray);
};

submit.onclick = function addTasks() {
  if (inputfield.value !== "") {
    addTaskToArray(inputfield.value);
    addTasksToPage(tasksArray);
  }
  inputfield.value = "";
};

function addTaskToArray(taskTitle) {
  task = {
    id: new Date().getTime(),
    title: taskTitle,
    statue: false,
  };
  tasksArray.push(task);
  localStorage.setItem("task", JSON.stringify(tasksArray));
}

function addTasksToPage(tasks) {
  taskDiv.innerHTML = "";
  tasks.forEach((task) => {
    let newDiv = document.createElement("div");
    newDiv.setAttribute("data-id", task.id);
    let text = document.createTextNode(task.title);
    newDiv.appendChild(text);
    newDiv.classList.add("task");
    let del = document.createElement("span");
    del.innerHTML = "Delete";
    newDiv.appendChild(del);
    del.onclick = function () {
      deleteTask(task.id);
    };
    taskDiv.appendChild(newDiv);
  });
}

function deleteTask(id) {
  tasksArray = tasksArray.filter((task) => task.id !== id);
  localStorage.setItem("task", JSON.stringify(tasksArray));
  addTasksToPage(tasksArray);
}
