import { FormValidator } from './FormValidator.js';
import { settingsValidation } from './settingList.js';
import { Task } from './Task.js';

const tasksList = document.querySelector('.tasks__list'),
  inputTitle = document.querySelector('.popup__input_type_title'),
  inputText = document.querySelector('.popup__input_type_text'),
  popup = document.querySelector('.popup-container'),
  openPopupButton = document.querySelector('.task__button'),
  closePopupButton = document.querySelector('.popup__close-button'),
  submitButton = document.querySelector('.popup__button');

function openPopup() {
  popup.classList.add('popup-container_active');
}
openPopupButton.addEventListener('click', openPopup);

function closePopup() {
  popup.classList.remove('popup-container_active');
}
closePopupButton.addEventListener('click', closePopup);

const formValidation = new FormValidator(settingsValidation);
formValidation.enableValidation();

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
