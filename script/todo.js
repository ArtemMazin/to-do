const data = {
  inputSelector: '.tasks__input',
  submitButtonSelector: '.tasks__button',
  inactiveButtonClass: 'tasks__button_disabled',
  inputErrorClass: 'tasks__input_invalid',
};
const tasksList = document.querySelector('.tasks__list'),
inputTitle = document.querySelector('.tasks__input_type_title'),
inputText = document.querySelector('.tasks__input_type_text'),
submitButton = document.querySelector('.tasks__button')

class Task {
  constructor(card, templateSelector) {
    this._title = card.title;
    this._text = card.text;
    this._template = templateSelector;
    this._taskElement = document
      .querySelector(this._template)
      .content.querySelector('.task')
      .cloneNode(true);
    this._taskTitle = document.querySelector('.task__title');
    this._taskText = document.querySelector('.task__text');
  }
  createTask() {
    this._taskTitle.textContent = this._title;
    this._taskText.textContent = this._text;
    return this._taskElement;
  }
}
function renderTask(card, templateSelector) {
  const newTask = new Task(card, templateSelector);
  return newTask.createTask();
}
function handleFormTask(e) {
  e.preventDefault();
  tasksList.prepend(renderTask({title: inputTitle.value, text: inputText.value}, '#task-template'))
}

submitButton.addEventListener('click', handleFormTask)