const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Sample data for demonstration
let tasks = [
  { id: 1, title: 'Task 1', description: 'Description for Task 1', dueDate: '2024-05-15' },
  { id: 2, title: 'Task 2', description: 'Description for Task 2', dueDate: '2024-05-20' }
];

// Middleware
app.use(bodyParser.json());

// Routes
// Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Get a specific task by ID
app.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(task => task.id === taskId);
  if (!task) {
    res.status(404).json({ message: 'Task not found' });
  } else {
    res.json(task);
  }
});

// Add a new task
app.post('/tasks', (req, res) => {
  const { title, description, dueDate } = req.body;
  if (!title || !description || !dueDate) {
    res.status(400).json({ message: 'Title, description, and due date are required' });
  } else {
    const newTask = {
      id: tasks.length + 1,
      title,
      description,
      dueDate
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
  }
});

// Update an existing task
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex === -1) {
    res.status(404).json({ message: 'Task not found' });
  } else {
    const { title, description, dueDate } = req.body;
    tasks[taskIndex] = { ...tasks[taskIndex], title, description, dueDate };
    res.json(tasks[taskIndex]);
  }
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex === -1) {
    res.status(404).json({ message: 'Task not found' });
  } else {
    tasks.splice(taskIndex, 1);
    res.status(204).end();
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
