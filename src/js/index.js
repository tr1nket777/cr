import { refs } from './refs';
import { renderTasks } from './renderTask';
import { tasks } from './tasks';
import { sortDate } from './sortTask';
import { sortPriority } from './sortTask';

function handleSubmin(e) {
  e.preventDefault();
  const form = e.target;

  const task = {
    id: Date.now(),
    title: form.elements.taskTitle.value,
    date: form.elements.taskDate.value,
    priority: form.elements.taskPriority.value,
    completed: false,
  };

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  form.elements.taskTitle.value = '';
  form.elements.taskDate.value = '';
  form.elements.taskPriority.value = 'high';
  renderTasks();
}

refs.taskForm.addEventListener('submit', handleSubmin);

refs.sortByDate.addEventListener('click', sortDate);
refs.sortByPriority.addEventListener('click', sortPriority);

renderTasks();
