import { renderTasks } from './renderTask';
import { tasks } from './tasks';

export function sortPriority() {
  const priorityOrder = { high: 1, medium: 2, low: 3 };
  tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  renderTasks();
}

export function sortDate() {
  tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
  renderTasks();
}
