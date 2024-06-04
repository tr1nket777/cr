import { refs } from './refs';
import { tasks } from './tasks';

export function renderTasks() {
  refs.taskList.innerHTML = '';
  tasks.forEach(task => {
    const taskItem = document.createElement('div');
    taskItem.classList.add('taskItem', 'card', 'mb-3');
    taskItem.innerHTML = `
      <div class="card-body d-flex justify-content-between align-items-center">
        <div class="form-check flex-grow-1">
          <input type="checkbox" ${task.completed ? 'checked' : ''} data-id="${
      task.id
    }" class="form-check-input taskComplete" />
          <label class="form-check-label ${
            task.completed ? 'text-decoration-line-through' : ''
          } w-100">
            <ul class="list-group list-group-horizontal">
              <li class="list-group-item flex-fill text-center">
                <div>Задача</div>
                <div>${task.title}</div>
              </li>
              <li class="list-group-item flex-fill text-center">
                <div>Дата</div>
                <div>${task.date}</div>
              </li>
              <li class="list-group-item flex-fill text-center">
                <div>Пріоритет</div>
                <div>${task.priority}</div>
              </li>
            </ul>
          </label>
        </div>
        <div class="d-flex ms-3"> <!-- Відступ зліва -->
          <button data-id="${
            task.id
          }" class="btn btn-warning btn-sm taskEdit me-2">Редагувати</button>
          <button data-id="${
            task.id
          }" class="btn btn-danger btn-sm taskDelete">Видалити</button>
        </div>
      </div>
    `;
    refs.taskList.appendChild(taskItem);
  });

  document.querySelectorAll('.taskComplete').forEach(checkbox => {
    checkbox.addEventListener('change', toggleComplete);
  });

  document.querySelectorAll('.taskEdit').forEach(button => {
    button.addEventListener('click', editTask);
  });

  document.querySelectorAll('.taskDelete').forEach(button => {
    button.addEventListener('click', deleteTask);
  });
}

function editTask(e) {
  const taskId = e.target.getAttribute('data-id');
  const task = tasks.find(t => t.id == taskId);

  document.getElementById('taskTitle').value = task.title;
  document.getElementById('taskDate').value = task.date;
  document.getElementById('taskPriority').value = task.priority;
  renderTasks();
  const index = tasks.findIndex(t => t.id == taskId);
  if (index !== -1) {
    tasks.splice(index, 1);
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function toggleComplete(e) {
  const taskId = e.target.getAttribute('data-id');
  const task = tasks.find(t => t.id == taskId);
  task.completed = !task.completed;
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

function deleteTask(e) {
  const taskId = e.target.getAttribute('data-id');
  const index = tasks.findIndex(t => t.id == taskId);
  if (index !== -1) {
    tasks.splice(index, 1);
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}
