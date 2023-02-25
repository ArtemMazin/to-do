import { renderTask } from './todo.js';
import { tasksList } from './const.js';

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
  unshiftObj(tasksObj) {
    if (this.arr == null) {
      this.arr = [];
    }
    this.arr.unshift(tasksObj);
  },
  setStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.arr));
  },
};
export { localStorageData };
