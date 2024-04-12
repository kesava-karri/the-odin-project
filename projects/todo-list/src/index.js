import Todo from "./Todo";
import Project from "./Project";
import Form from "./Form";
import "./style.css";
import createCloseBtn from "./myUtil";
import { INPUT, TEXT } from "./constants";

const todo = new Todo("oakley");

const defaultProject = new Project("Default Project");

defaultProject.addNewTodo(todo);

const projectDiv = document.createElement("div");
projectDiv.addEventListener("click", (e) => {
  alert(`${e.currentTarget.textContent} has been clicked :)`);
});

projectDiv.textContent = defaultProject.getProjectName();
projectDiv.classList.add("project");

const createNewTodoBtn = document.createElement("button");
createNewTodoBtn.textContent = "Add new Todo";
const newForm = new Form().createFormContainer();
createNewTodoBtn.appendChild(newForm);

const dialog = createNewTodoBtn.querySelector(".dialog-box");

createNewTodoBtn.addEventListener("click", () => {
  dialog.showModal();
});

const createNewProjectBtn = document.createElement("button");
createNewProjectBtn.textContent = "Create new Project";

const innerHeading = document.createElement("h3");
innerHeading.textContent = "Create New Project";

// const newProjContainer = new Form().createFormContainer();
const projLabelAndInput = Form.createDiv(
  "Name of the new project: ",
  INPUT,
  TEXT
);

const newProjDialog = document.createElement("dialog");
newProjDialog.id = "project-dialog";

newProjDialog.appendChild(innerHeading);
newProjDialog.appendChild(projLabelAndInput);

createNewProjectBtn.appendChild(newProjDialog);
createNewProjectBtn.addEventListener("click", () => {
  const diag = document.querySelector("#project-dialog");
  diag.showModal();
  console.log(diag.querySelector("input").value);
});

document.body.appendChild(projectDiv);

const createBtns = document.createElement("div");
createBtns.appendChild(createNewTodoBtn);
createBtns.appendChild(createNewProjectBtn);
createBtns.classList.add("create-btns");

document.body.appendChild(createBtns);
