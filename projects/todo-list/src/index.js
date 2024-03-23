import Todo from './Todo.js';
import Project from './Project.js';
import './style.css';

const todo = new Todo('oakley');

let defaultProject = new Project('Default Project');

defaultProject.addNewTodo(todo);

const projectDiv = document.createElement("div");
projectDiv.addEventListener('click', () => {
  alert('Default project has been clicked :)');
});

projectDiv.textContent = JSON.stringify(defaultProject.getProjectName());
projectDiv.classList.add('project');

const createNewTodoBtn = document.createElement('button');
createNewTodoBtn.textContent = "Add new Todo";

const createNewProjectBtn = document.createElement('button');
createNewProjectBtn.textContent = "Create new Project";

document.body.appendChild(projectDiv);

const createBtns = document.createElement("div");
createBtns.appendChild(createNewTodoBtn);
createBtns.appendChild(createNewProjectBtn);
createBtns.classList.add('create-btns');

document.body.appendChild(createBtns);
