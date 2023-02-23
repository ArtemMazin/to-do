class FormValidator {
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

export { FormValidator };
