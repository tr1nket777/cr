export let tasks = [];

const savedTasks = localStorage.getItem('tasks');
if (savedTasks) {
  tasks = JSON.parse(savedTasks);
} else {
  tasks = [];
}
