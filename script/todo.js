import {
  tasksList,
  inputTitle,
  inputText,
  popup,
  popupForm,
  openPopupButton,
  closePopupButton,
} from './const.js';
import { localStorageData } from './localStorageData.js';
import { FormValidator } from './FormValidator.js';
import { settingsValidation } from './settingList.js';
import { Task } from './Task.js';

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
const newLocalStorage = new localStorageData(tasksList, renderTask);
newLocalStorage.render();

const formValidation = new FormValidator(settingsValidation);
formValidation.enableValidation();

function renderTask(card, templateSelector) {
  const newTask = new Task(card, templateSelector, newLocalStorage);
  return newTask.createTask();
}

function handleFormTask(e) {
  const tasksObj = { title: inputTitle.value, text: inputText.value };
  e.preventDefault();
  tasksList.prepend(renderTask(tasksObj, '#task-template'));
  newLocalStorage.unshiftObj(tasksObj);
  newLocalStorage.setStorage();
  e.target.reset();
  closePopup();
}

popupForm.addEventListener('submit', handleFormTask);

export { renderTask };
