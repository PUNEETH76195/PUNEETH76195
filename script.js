// Sample data for demonstration
let tasks = [
    { id: 1, title: 'Task 1', description: 'Description for Task 1', dueDate: '2024-05-15' },
    { id: 2, title: 'Task 2', description: 'Description for Task 2', dueDate: '2024-05-20' }
  ];
  
  // Function to display tasks on the page
  function displayTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    tasks.forEach(task => {
      const listItem = document.createElement('li');
      listItem.classList.add('list-group-item');
      listItem.textContent = task.title;
      listItem.addEventListener('click', () => viewTask(task.id));
      taskList.appendChild(listItem);
    });
  }
  
  // Function to add a new task
  function addTask(title, description, dueDate) {
    const newTask = {
      id: tasks.length + 1,
      title,
      description,
      dueDate
    };
    tasks.push(newTask);
    displayTasks();
  }
  
  // Function to view task details
  function viewTask(id) {
    const task = tasks.find(task => task.id === id);
    const taskDetails = document.getElementById('task-details');
    taskDetails.innerHTML = `
      <h5>Title: ${task.title}</h5>
      <p>Description: ${task.description}</p>
      <p>Due Date: ${task.dueDate}</p>
    `;
    const editTaskBtn = document.getElementById('editTaskBtn');
    const deleteTaskBtn = document.getElementById('deleteTaskBtn');
    editTaskBtn.addEventListener('click', () => editTask(id));
    deleteTaskBtn.addEventListener('click', () => deleteTask(id));
    $('#viewTaskModal').modal('show');
  }
  
  // Function to edit task
  function editTask(id) {
    // Implement edit task functionality
  }
  
  // Function to delete task
  function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    displayTasks();
    $('#viewTaskModal').modal('hide');
  }
  
  // Event listener for adding a new task
  document.getElementById('task-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const dueDate = document.getElementById('due-date').value;
    addTask(title, description, dueDate);
    this.reset();
  });
  
  // Display tasks on page load
  displayTasks();
  