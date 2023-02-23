import { FormValidator } from './FormValidator.js';
import { settingsValidation } from './settingList.js';
import { Task } from './Task.js';

const tasksList = document.querySelector('.tasks__list'),
  inputTitle = document.querySelector('.tasks__input_type_title'),
  inputText = document.querySelector('.tasks__input_type_text'),
  submitButton = document.querySelector('.tasks__button');

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
