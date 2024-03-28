import Todo from './Todo.js';
import Project from './Project.js';
import Form from './Form.js';
import './style.css';

const todo = new Todo('oakley');

let defaultProject = new Project('Default Project');

defaultProject.addNewTodo(todo);

const projectDiv = document.createElement("div");
projectDiv.addEventListener('click', (e) => {
  alert(`${e.currentTarget.textContent} has been clicked :)`);
});

projectDiv.textContent = defaultProject.getProjectName();
projectDiv.classList.add('project');

const createNewTodoBtn = document.createElement('button');
createNewTodoBtn.textContent = "Add new Todo";

const createNewProjectBtn = document.createElement('button');
createNewProjectBtn.textContent = "Create new Project";
const formContainer = new Form().createFormContainer();
createNewProjectBtn.appendChild(formContainer);

createNewProjectBtn.addEventListener('click', (e) => {
  formContainer.querySelector('dialog').showModal();
  formContainer.querySelector('form').reset();
});

document.body.appendChild(projectDiv);

const createBtns = document.createElement("div");
createBtns.appendChild(createNewTodoBtn);
createBtns.appendChild(createNewProjectBtn);
createBtns.classList.add('create-btns');

document.body.appendChild(createBtns);
