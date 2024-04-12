import { format } from "date-fns";
import {
  BUTTON,
  DATE_TIME_LOCAL,
  DIV,
  INPUT,
  LABEL,
  TEXT,
  TEXT_AREA,
  SELECT,
} from "./constants";

import createCloseBtn from "./myUtil.js";

export default class Form {
  constructor() {
  }

  /**
   * Creates a container with dialog box & form within it
   * @returns {HTMLDIVElement} container
   */
  createFormContainer() {
    const container = document.createElement(DIV);
    const dialogBox = document.createElement('dialog');
    container.classList.add('form-container');
    dialogBox.classList.add('dialog-box');
    
    const closeBtn = createCloseBtn();

    const form = document.createElement('form');
    form.method = "dialog";

    const titleDiv = Form.createDiv("Title", INPUT, TEXT);
    const description = Form.createDiv("Description", INPUT, TEXT);

    // const dueDate = new Date().toLocaleString(Date.now());
    const priority = Form.createDiv("Priority", SELECT);
    const notes = Form.createDiv("Notes", TEXT_AREA);
    
    const dateDiv = Form.createDiv("Due-date", INPUT, DATE_TIME_LOCAL);

    form.appendChild(titleDiv);
    form.appendChild(description);
    form.appendChild(dateDiv);
    form.appendChild(priority);
    form.appendChild(notes);
    form.appendChild(closeBtn);
    
    dialogBox.appendChild(form);
    container.appendChild(dialogBox);
    return container;
  }

  /**
   * Creates a div containing the elements input & label
   * The type of input element is defaulted to text, 
   * override it when other types are needed
   * @param {String} nameOfLabel
   * @param {String} element
   * @param {String} inputTypeIfPresent all input fields needs a specific type, 
   * set to null by default
   * @returns {HTMLDivElement} div
   */
  static createDiv(nameOfLabel, element, inputTypeIfPresent = null) {
    const div = document.createElement(DIV);
    const label = document.createElement(LABEL);
    label.for = nameOfLabel;
    label.textContent = nameOfLabel;
    div.appendChild(label);
    
    const ele = this.#createElement(nameOfLabel, element, inputTypeIfPresent);
    div.appendChild(ele);

    return div;
  }

  /**
   * Returns an html element based on the given input
   * Ex: HTML elements like text, textArea, select
   * @param {String} nameOfLabel
   * @param {String} element
   * @param {String} inputTypeIfPresent all input fields needs a specific type, 
   * set to null by default
   * @returns {HTMLElement} element
   */
  static #createElement(nameOfLabel, element, inputTypeIfPresent = null) {
    const ele = document.createElement(element);
    ele.id = nameOfLabel;
    ele.name = nameOfLabel;
    
    if (inputTypeIfPresent === TEXT
        || inputTypeIfPresent === DATE_TIME_LOCAL) {
      ele.type = inputTypeIfPresent;
    } else if (element === SELECT && inputTypeIfPresent === null) {
      ele.appendChild(this.#createOption());
      ele.appendChild(this.#createOption("High"));
      ele.appendChild(this.#createOption("Medium"));
      ele.appendChild(this.#createOption("Low"));
    }
    return ele;
  }

  /**
   * Helps to create option HTML element needed in the select menu
   * @param {String} value The options in dropdown select menu
   * @returns {HTMLOptionElement} option 
   */
  static #createOption(value = "--Choose priortiy of the task--") {
    const option = document.createElement('option');
    option.value = option.textContent = value;
    return option;
  }
}
