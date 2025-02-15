document.getElementById("theme-toggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

function addTask() {
    let project = document.getElementById("project").value.trim();
    let title = document.getElementById("title").value.trim();
    let description = document.getElementById("description").value.trim();
    let date = document.getElementById("date").value;

    if (!title || !date) {
        alert("Please enter a task title and date.");
        return;
    }

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ project, title, description, date });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    updateTaskList();
}

function updateTaskList() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.className = "task";
        li.innerHTML = `
            <div>
                <strong>${task.project || "No Project"}</strong> - ${task.title}
                <p>${task.description}</p>
                <small>${task.date}</small>
            </div>
            <button onclick="editTask(${index})">✏️</button>
            <button onclick="deleteTask(${index})">❌</button>
        `;
        list.appendChild(li);
    });

    updateFilters(tasks);
}

function editTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let task = tasks[index];

    document.getElementById("project").value = task.project;
    document.getElementById("title").value = task.title;
    document.getElementById("description").value = task.description;
    document.getElementById("date").value = task.date;

    deleteTask(index);
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    updateTaskList();
}

function updateFilters(tasks) {
    let projectFilter = document.getElementById("filter-project");
    let monthFilter = document.getElementById("filter-month");
    projectFilter.innerHTML = '<option value="">All Projects</option>';
    monthFilter.innerHTML = '<option value="">All Months</option>';

    let projects = new Set();
    let months = new Set();

    tasks.forEach(task => {
        if (task.project) projects.add(task.project);
        months.add(task.date.slice(0, 7));
    });

    projects.forEach(project => {
        let option = document.createElement("option");
        option.value = project;
        option.textContent = project;
        projectFilter.appendChild(option);
    });

    months.forEach(month => {
        let option = document.createElement("option");
        option.value = month;
        option.textContent = month;
        monthFilter.appendChild(option);
    });
}

function filterTasks() {
    let selectedProject = document.getElementById("filter-project").value;
    let selectedMonth = document.getElementById("filter-month").value;
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    let filteredTasks = tasks.filter(task => 
        (selectedProject === "" || task.project === selectedProject) &&
        (selectedMonth === "" || task.date.startsWith(selectedMonth))
    );

    let list = document.getElementById("taskList");
    list.innerHTML = "";

    filteredTasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.className = "task";
        li.innerHTML = `
            <div>
                <strong>${task.project || "No Project"}</strong> - ${task.title}
                <p>${task.description}</p>
                <small>${task.date}</small>
            </div>
            <button onclick="editTask(${index})">✏️</button>
            <button onclick="deleteTask(${index})">❌</button>
        `;
        list.appendChild(li);
    });
}

updateTaskList();
