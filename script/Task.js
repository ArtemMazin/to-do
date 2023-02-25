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
    this._removeButton = this._taskElement.querySelector(
      '.task__button-remove'
    );
  }
  _removeTask(e) {
    const array = JSON.parse(localStorage.getItem('tasks'));
    document.querySelectorAll('.task__button-remove').forEach((item, i) => {
      if (e.target == item) {
        array.splice(i, 1);
        localStorage.setItem('tasks', JSON.stringify(array));
      }
    });

    this._taskElement.remove();
  }
  _setEventListeners() {
    this._removeButton.addEventListener('click', (e) => this._removeTask(e));
  }
  createTask() {
    this._taskTitle.textContent = this._title;
    this._taskText.textContent = this._text;
    this._setEventListeners();
    return this._taskElement;
  }
}
export { Task };
