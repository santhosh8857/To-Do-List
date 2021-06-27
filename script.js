// UI vars

const form = document.querySelector('form');
const taskInput = document.querySelector('#task')
const taskList = document.querySelector('.collection');
const filter = document.querySelector('#filter');
const clearButton = document.querySelector('.clear-tasks');

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
   // Add task event
   form.addEventListener('submit', addTask);
} 

// Add Task
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
   // add icon tag
   link.innerHTML = '<i class="fas fa-trash-alt"></i>';
   // append the link to li
   li.appendChild(link);

   // append the li to ul 
   taskList.appendChild(li);

   // Clear Input
   taskInput.value = '';

   e.preventDefault();
}

