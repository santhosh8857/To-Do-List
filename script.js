// UI variables

const form = document.querySelector('form');
const taskInput = document.querySelector('#task')
const taskList = document.querySelector('.collection');
const filter = document.querySelector('#filter');
const clearButton = document.querySelector('.clear-tasks');

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
   // Add Task
   form.addEventListener('submit', addTask);
   // Remove Task
   taskList.addEventListener('click', removeTask);
   // Clear Tasks
   clearButton.addEventListener('click', clearTasks);
   // Filter Tasks 
   filter.addEventListener('keyup', filterTasks);
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

function removeTask(e) {
   if(e.target.parentElement.classList.contains('delete-item')) {
      if(confirm('Are You Sure?')) {
         e.target.parentElement.parentElement.remove();
      }
   }

   e.preventDefault();
}

// Clear tasks
function clearTasks() {
   // taskList.innerHTML = '';

   // FASTER WAY
   while (taskList.firstChild){
      // taskList.firstChild.remove();
      taskList.removeChild(taskList.firstChild);
   }
}

// Filter Tasks
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

