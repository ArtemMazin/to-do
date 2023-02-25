class localStorageData {
  constructor(tasksList, renderTask) {
    this._arr = JSON.parse(localStorage.getItem('tasks'));
    this._tasksList = tasksList;
    this._renderTask = renderTask;
  }

  render() {
    if (this._arr == null) {
      return;
    }
    JSON.parse(localStorage.getItem('tasks')).forEach((item) =>
      this._tasksList.append(this._renderTask(item, '#task-template'))
    );
  }
  unshiftObj(tasksObj) {
    if (this._arr == null) {
      this._arr = [];
    }
    this._arr.unshift(tasksObj);
  }
  removeObj(e) {
    const array = JSON.parse(localStorage.getItem('tasks'));
    document.querySelectorAll('.task__button-remove').forEach((item, i) => {
      if (e.target == item) {
        array.splice(i, 1);
        localStorage.setItem('tasks', JSON.stringify(array));
      }
    });
  }
  setStorage() {
    localStorage.setItem('tasks', JSON.stringify(this._arr));
  }
}
export { localStorageData };
