// UI variables

const form = document.querySelector('form');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('.collection');
const filter = document.querySelector('#filter');
const clearButton = document.querySelector('.clear-tasks');


// Load all event listeners
loadEventListeners();


function loadEventListeners() {
   // DOM Load Event
   document.addEventListener('DOMContentLoaded', getTasks);
   // Add Task
   form.addEventListener('submit', addTask);
   // Remove Task
   taskList.addEventListener('click', removeTask);
   // Clear Tasks
   clearButton.addEventListener('click', clearTasks);
   // Filter Tasks 
   filter.addEventListener('keyup', filterTasks);
} 


// GET TASKS FROM LS (DOM load event)
function getTasks(task) {
   let tasks;
   if(localStorage.getItem('tasks') === null) {
      tasks = [];
   } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
   }

   tasks.forEach(function(task) {
      // adding li items
      const li = document.createElement('li');
      li.className = 'collection-item';
      li.appendChild(document.createTextNode(task));
      const link = document.createElement('a');
      link.className='delete-item secondary-content';
      link.innerHTML = '<i class="fas fa-trash-alt"></i>';
      li.appendChild(link);

      // adding li to ul
      taskList.appendChild(li);

   });
}


// ADD TAKS
function addTask(e) {
   if(taskInput.value === ''){
      alert('Add a task');
   }

   // Create li element
   const li = document.createElement('li');
   // Add class
   li.className = 'collection-item';
   // Create text node and append
   li.appendChild(document.createTextNode(taskInput.value))
   // create a link element
   link = document.createElement('a');
   // Add class
   link.className = 'delete-item secondary-content';
   // Add icon tag
   link.innerHTML = '<i class="fas fa-trash-alt"></i>';
   // Append the link to li
   li.appendChild(link);

   // Append the li to ul 
   taskList.appendChild(li);

   // Store in LS
   storeTaskInLocalStorage(taskInput.value);

   // Clear Input
   taskInput.value = '';

   e.preventDefault();
}


// STORE TASKS IN LS
function storeTaskInLocalStorage(task) {
   let tasks;
   if(localStorage.getItem('tasks') === null) {
      tasks = [];
   } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
   }

   tasks.push(task);

   localStorage.setItem('tasks', JSON.stringify(tasks));
}


// REMOVE TASKS
function removeTask(e) {
   if(e.target.parentElement.classList.contains('delete-item')) {
      if(confirm('Are You Sure?')) {
         e.target.parentElement.parentElement.remove();

         // Remove from LS
         removeTaskFromLocalStorage(e.target.parentElement.parentElement);
      }
   }
   e.preventDefault();
}


// REMOVE TASKS FROM LS
function removeTaskFromLocalStorage(taskItem) {
   let tasks;
   if(localStorage.getItem('tasks') === null) {
      tasks = [];
   } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
   }

   tasks.forEach(function(task, index){
      if(taskItem.textContent === task) {
         tasks.splice(index, 1);
      }
   });

   localStorage.setItem('tasks', JSON.stringify(tasks));
}


// CLEAR TASKS
function clearTasks() {
   // taskList.innerHTML = '';

   // FASTER WAY
   if(confirm('Are You Sure? Do you want to remove all tasks?')) {
      while (taskList.firstChild){
         // taskList.firstChild.remove();
         taskList.removeChild(taskList.firstChild);
      }
   }

   // Clear from LS 
   clearTaskFromLocalStorage();
}


// CLEAR TASKS FROM LS
function clearTaskFromLocalStorage() {
   localStorage.clear();
}


// FILTER TASKS
function filterTasks(e) {
   const text=e.target.value.toLowerCase();
   
   document.querySelectorAll('.collection-item').forEach(function(task){
      const item = task.firstChild.textContent;
      if(item.toLowerCase().indexOf(text) != -1){
         task.style.display = 'block';
      } else {
         task.style.display = 'none';
      }
   })
}

