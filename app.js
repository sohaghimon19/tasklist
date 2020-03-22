// Define UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event Listeners

loadEventListeners();

// Load all event Listeners

function loadEventListeners() {
  // Dom load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // clear task events
  clearBtn.addEventListener('click', clearTasks);
  // filter tasks event
  filter.addEventListener('keyup', filterTask);
}
// Get task form ls
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task) {
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // create taxt node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    // add class
    link.className = 'delete-item secondary-content';
    //add icon html
    link.innerHTML = '<i class ="fa fa-remove"></i>';
    // append the link to li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);
    // store in Ls
  });
}
// Add task
function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a Task');
  }
  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // create taxt node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement('a');
  // add class
  link.className = 'delete-item secondary-content';
  //add icon html
  link.innerHTML = '<i class ="fa fa-remove"></i>';
  // append the link to li
  li.appendChild(link);
  // Append li to ul
  taskList.appendChild(li);
  // store in Ls
  storeTaskInLocalStorage(taskInput.value);

  // clear input
  taskInput.value = '';
  e.preventDefault();
}
// store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();
      // Remove from Us
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}
//Remove from Ls
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// clear tasks
function clearTasks() {
  // taskList.innerHTML = '';
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  // clear from ls
  clearTaskFromLocalStorage();
}
// Clear Tasks from Ls
function clearTaskFromLocalStorage() {
  localStorage.clear();
}
// filter tasks
function filterTask(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}
