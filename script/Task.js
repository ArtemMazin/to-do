class Task {
  constructor(card, templateSelector) {
    this._title = card.title;
    this._text = card.text;
    this._template = templateSelector;
    this._taskElement = document
      .querySelector(this._template)
      .content.querySelector('.task')
      .cloneNode(true);
    this._taskTitle = this._taskElement.querySelector('.task__title');
    this._taskText = this._taskElement.querySelector('.task__text');
  }
  createTask() {
    this._taskTitle.textContent = this._title;
    this._taskText.textContent = this._text;
    return this._taskElement;
  }
}
export { Task };
