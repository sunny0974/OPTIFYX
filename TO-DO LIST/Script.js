// Selecting elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Event listeners
document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);
addTaskBtn.addEventListener('click', addTask);

// Function to load tasks from local storage
function loadTasksFromLocalStorage() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => addTaskToDOM(task));
}

// Function to add a task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    addTaskToDOM(taskText);
    saveTaskToLocalStorage(taskText);

    taskInput.value = '';
}

// Function to add task to DOM
function addTaskToDOM(taskText) {
    const li = document.createElement('li');
    li.className = 'task-item';

    li.innerHTML = `
        <input type="text" value="${taskText}" readonly>
        <button class="edit-task">Edit</button>
        <button class="delete-task">Delete</button>
    `;

    const editBtn = li.querySelector('.edit-task');
    const deleteBtn = li.querySelector('.delete-task');
    const taskInputField = li.querySelector('input');

    // Edit Task
    editBtn.addEventListener('click', () => {
        if (editBtn.textContent === 'Edit') {
            taskInputField.removeAttribute('readonly');
            taskInputField.focus();
            editBtn.textContent = 'Save';
        } else {
            taskInputField.setAttribute('readonly', 'readonly');
            updateTaskInLocalStorage(taskInputField.value, taskText);
            editBtn.textContent = 'Edit';
        }
    });

    // Delete Task
    deleteBtn.addEventListener('click', () => {
        li.remove();
        removeTaskFromLocalStorage(taskText);
    });

    taskList.appendChild(li);
}

// Function to get tasks from local storage
function getTasksFromLocalStorage() {
    let tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

// Function to save a task to local storage
function saveTaskToLocalStorage(taskText) {
    const tasks = getTasksFromLocalStorage();
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to update a task in local storage
function updateTaskInLocalStorage(newTask, oldTask) {
    const tasks = getTasksFromLocalStorage();
    const taskIndex = tasks.indexOf(oldTask);
    if (taskIndex !== -1) {
        tasks[taskIndex] = newTask;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

// Function to remove a task from local storage
function removeTaskFromLocalStorage(taskText) {
    const tasks = getTasksFromLocalStorage();
    const filteredTasks = tasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(filteredTasks));
}
