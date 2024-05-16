// Load tasks from local storage
document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
});

// Function to load tasks from local storage
function loadTasks() {
    // Fetch tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Display tasks
    let taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach(function(task, index) {
        let taskElement = document.createElement('div');
        taskElement.innerHTML = `
            <input type="checkbox" onchange="toggleTask(${index})" ${task.completed ? 'checked' : ''}>
            <span>${task.title}</span>
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>
            <button onclick="completeTask(${index})">Complete</button> <!-- New button -->
        `;
        taskList.appendChild(taskElement);
    });
}

// Function to add a new task
function addTask() {
    let title = document.getElementById('taskTitle').value;
    if (title.trim() !== '') {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ title: title, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
        document.getElementById('taskTitle').value = '';
    }
}

// Function to toggle task completion status
function toggleTask(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

// Function to edit a task
function editTask(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let newTitle = prompt('Enter new title:', tasks[index].title);
    if (newTitle !== null && newTitle.trim() !== '') {
        tasks[index].title = newTitle;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
    }
}

// Function to delete a task
function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

// Function to mark a task as completed
function completeTask(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks[index].completed = true;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}
