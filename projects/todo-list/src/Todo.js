export default class Todo {
  constructor(title, description, dueDate, priority, notes) {
    if (!title) {
      throw new Error('Please provide a title');
    }
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
  }
}
