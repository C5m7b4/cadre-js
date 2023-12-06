// state of the app
const todos = ['Walk the dog', 'Water the plants', 'Sand the chairs'];

const addTodoInput = document.getElementById('todo-input');
const addtodoButton = document.getElementById('add-todo-btn');
const todosList = document.getElementById('todos-list');

function removeTodo(idx) {
  todos.splice(idx, 1);
  todosList.childNodes[idx].remove();
}

function updateTodo(idx, description) {
  todos[idx] = description;
  const todo = renderTodoInReadMode(description);
  todosList.replaceChild(todo, todosList.childNodes[idx]);
}

function renderTodoInEditMode(todo) {
  const li = document.createElement('li');

  const input = document.createElement('input');
  input.type = 'text';
  input.value = todo;
  li.append(input);

  const saveBtn = document.createElement('btn');
  saveBtn.textContent = 'Save';
  saveBtn.classList.add('btn');
  saveBtn.addEventListener('click', () => {
    const idx = todos.indexOf(todo);
    updateTodo(idx, input.value);
  });
  li.append(saveBtn);

  const cancelBtn = document.createElement('button');
  cancelBtn.classList.add('btn');
  cancelBtn.textContent = 'Cancel';
  cancelBtn.addEventListener('click', () => {
    const idx = todos.indexOf(todo);
    todosList.replaceChild(
      renderTodoInReadMode(todo),
      todosList.childNodes[idx]
    );
  });
  li.append(cancelBtn);

  return li;
}

function renderTodoInReadMode(todo) {
  const li = document.createElement('li');

  const span = document.createElement('span');
  span.textContent = todo;
  span.addEventListener('dblclick', () => {
    console.log('double click');
    const idx = todos.indexOf(todo);

    todosList.replaceChild(
      renderTodoInEditMode(todo),
      todosList.childNodes[idx]
    );
  });
  li.appendChild(span);

  const button = document.createElement('button');
  button.textContent = 'Done';
  button.classList.add('btn');
  button.addEventListener('click', () => {
    const idx = todos.indexOf(todo);
    removeTodo(idx);
  });
  li.append(button);

  return li;
}

// initialize the view
for (const todo of todos) {
  todosList.append(renderTodoInReadMode(todo));
}

addTodoInput.addEventListener('input', () => {
  console.log('value', addTodoInput.value);
  addtodoButton.disabled = addTodoInput.value.length < 3;
});

addTodoInput.addEventListener('keydown', ({ key }) => {
  if (key === 'Enter' && addTodoInput.value.length >= 3) {
    addTodo();
  }
});

addtodoButton.addEventListener('click', () => {
  addToDo();
});

function addToDo() {
  const description = addTodoInput.value;

  todos.push(description);
  const todo = renderTodoInReadMode(description);
  todosList.append(todo);

  addTodoInput.value = '';
  addtodoButton.disabled = true;
}
