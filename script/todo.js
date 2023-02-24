import { FormValidator } from './FormValidator.js';
import { settingsValidation } from './settingList.js';
import { Task } from './Task.js';

const tasksList = document.querySelector('.tasks__list'),
  inputTitle = document.querySelector('.popup__input_type_title'),
  inputText = document.querySelector('.popup__input_type_text'),
  popup = document.querySelector('.popup-container'),
  popupForm = document.querySelector('.popup__form'),
  openPopupButton = document.querySelector('.task__button'),
  closePopupButton = document.querySelector('.popup__close-button'),
  submitButton = document.querySelector('.popup__button');

let i = 0;
for (; i < localStorage.length / 2; i++) {
  tasksList.prepend(
    renderTask(
      {
        title: localStorage.getItem('title' + `${i}`),
        text: localStorage.getItem('text' + `${i}`),
      },
      '#task-template'
    )
  );
}

function openPopup() {
  popup.classList.add('popup-container_active');
  document.addEventListener('mousedown', closePopupByOverlay);
  document.addEventListener('keydown', closePopupByEsc);
}
openPopupButton.addEventListener('click', openPopup);

function closePopup() {
  popup.classList.remove('popup-container_active');
  document.removeEventListener('mousedown', closePopupByOverlay);
  document.removeEventListener('keydown', closePopupByEsc);
}
closePopupButton.addEventListener('click', closePopup);

function closePopupByOverlay(e) {
  if (e.target === popup) {
    closePopup();
  }
}

function closePopupByEsc(e) {
  if (e.key === 'Escape') {
    closePopup();
  }
}

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
  localStorage.setItem('title' + `${i}`, `${inputTitle.value}`);
  localStorage.setItem('text' + `${i}`, `${inputText.value}`);
  e.target.reset();
  closePopup();
}

popupForm.addEventListener('submit', handleFormTask);
