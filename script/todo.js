import {
  tasksList,
  inputTitle,
  inputText,
  popup,
  popupForm,
  openPopupButton,
  closePopupButton,
} from './const.js';
// import { localStorageData } from './localStorageData.js';
import { FormValidator } from './FormValidator.js';
import { settingsValidation } from './settingList.js';
import { Task } from './Task.js';

const localStorageData = {
  arr: JSON.parse(localStorage.getItem('tasks')),

  render() {
    if (this.arr == null) {
      return;
    }
    JSON.parse(localStorage.getItem('tasks')).forEach((item) =>
      tasksList.append(renderTask(item, '#task-template'))
    );
  },
  set(tasksObj) {
    if (this.arr == null) {
      this.arr = [];
    }
    this.arr.unshift(tasksObj);
  },
  setStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.arr));
  },
};

localStorageData.render();

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
  const tasksObj = { title: inputTitle.value, text: inputText.value };
  e.preventDefault();
  tasksList.prepend(renderTask(tasksObj, '#task-template'));
  localStorageData.set(tasksObj);
  localStorageData.setStorage();
  e.target.reset();
  closePopup();
}

popupForm.addEventListener('submit', handleFormTask);
