export default class Project {
  // private fields
  #listOfTodos = [];
  #projectName;

  constructor(projectName) {
    // projectName cannot be empty string, undefined, null...
    if (!projectName) {
      throw new Error("Project name must be a String");
    }
    this.#projectName = projectName;
  }

  addNewTodo(todo) {
    this.#listOfTodos.push(todo);
    console.log("Updated todo list: ");
    for (todo of this.#listOfTodos) {
      console.log(todo);
    }
  }

  getTodoList() {
    console.log("Todo list: " + this.#listOfTodos);
    return this.#listOfTodos;
  }

  getProjectName() {
    return this.#projectName;
  }

  setProjectName(newProjectName) {
    this.#projectName = newProjectName;
    console.log("Updated project name: " + this.#projectName);
  }
}
