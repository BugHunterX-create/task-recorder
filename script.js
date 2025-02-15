// Load tasks from local storage
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let title = document.getElementById("taskTitle").value;
    let desc = document.getElementById("taskDesc").value;
    let date = document.getElementById("taskDate").value;

    if (title.trim() === "" || date === "") {
        alert("Please enter a task title and date.");
        return;
    }

    let task = { title, desc, date };
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTask(task);
    document.getElementById("taskTitle").value = "";
    document.getElementById("taskDesc").value = "";
    document.getElementById("taskDate").value = "";
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => displayTask(task));
}

function displayTask(task) {
    let taskList = document.getElementById("taskList");
    let li = document.createElement("li");
    li.classList.add("task");
    li.innerHTML = `
        <strong>${task.title}</strong> - ${task.date} <br>
        ${task.desc} <br>
        <button class="delete-btn" onclick="deleteTask('${task.title}')">Delete</button>
    `;
    taskList.appendChild(li);
}

function deleteTask(title) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.title !== title);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    document.getElementById("taskList").innerHTML = "";
    loadTasks();
}
