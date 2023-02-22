const settingsValidation = {
  formSelector: '.tasks__form',
  inputSelector: '.tasks__input',
  submitButtonSelector: '.tasks__button',
  inactiveButtonClass: 'tasks__button_disabled',
  inputErrorClass: 'tasks__input_invalid',
  spanErrorClass: 'tasks__error',
};
const tasksList = document.querySelector('.tasks__list'),
  inputTitle = document.querySelector('.tasks__input_type_title'),
  inputText = document.querySelector('.tasks__input_type_text'),
  submitButton = document.querySelector('.tasks__button');

class Validation {
  constructor({
    formSelector,
    inputSelector,
    inputErrorClass,
    submitButtonSelector,
    inactiveButtonClass,
    spanErrorClass,
  }) {
    this._form = document.querySelector(formSelector);
    this._inputList = document.querySelectorAll(inputSelector);
    this._inputError = inputErrorClass;
    this._button = document.querySelector(submitButtonSelector);
    this._buttonDisabled = inactiveButtonClass;
    this._spanError = spanErrorClass;
  }
  _showError(input) {
    this._spanError = document.querySelector(`#${input.name}-error`);
    input.classList.add(this._inputError);
    this._spanError.textContent = input.validationMessage;
  }
  _hideError(input) {
    this._spanError = document.querySelector(`#${input.name}-error`);
    input.classList.remove(this._inputError);
    this._spanError.textContent = '';
  }
  _toggleValidation(input) {
    if (!input.validity.valid) {
      this._showError(input);
    } else {
      this._hideError(input);
    }
  }
  _toggleButton() {
    this._button.classList.toggle(
      this._buttonDisabled,
      !this._form.checkValidity()
    );
  }
  _setValidation() {
    this._toggleButton();
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._toggleValidation(input);
        this._toggleButton();
      });
    });
  }
  enableValidation() {
    this._setValidation();
  }
}

const formValidation = new Validation(settingsValidation);
formValidation.enableValidation();

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
  tasksList.prepend(
    renderTask(
      { title: inputTitle.value, text: inputText.value },
      '#task-template'
    )
  );
}

submitButton.addEventListener('click', handleFormTask);
