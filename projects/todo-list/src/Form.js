export default class Form {
  constructor() {

  }

  createFormContainer() {
    const container = document.createElement('div');
    const dialogBox = document.createElement('dialog');
    container.classList.add('form-container');
    dialogBox.classList.add('dialog-box');

    const form = document.createElement('form');
    form.method = "dialog";

    const titleDiv = this.createDiv("Title", "text");
    form.appendChild(titleDiv);
    const description = this.createDiv("Description", "text");
    form.appendChild(description);

    const notes = this.createDiv("Notes", "textarea");
    form.appendChild(notes);

    dialogBox.appendChild(form);
    container.appendChild(dialogBox);
    return container;
  }

  /**
   * Creates a div needed for form
   * The type of input element is defaulted to text, 
   * override it when other types are needed
   * @param {String} nameOfLabel
   * @param {String} inputElement 
   */
  createDiv(nameOfLabel, inputElement) {
    const div = document.createElement('div');
    const label = document.createElement('label');
    const input = document.createElement(inputElement);

    label.for = nameOfLabel;
    label.textContent = nameOfLabel;

    input.id = nameOfLabel;
    input.type = "text";
    input.name = nameOfLabel;
    div.appendChild(label);
    div.appendChild(input);
    return div;
  }
}
