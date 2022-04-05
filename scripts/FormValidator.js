export class FormValidator {
  constructor(validatorSetting, formElement) {
    this._validatorSetting = validatorSetting;
    this._formElement = formElement;
  }

  _showInputError(errorMessage, inputElement) {
    const { inputErrorClass, errorClass } = this._validatorSetting;
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
    inputElement.classList.add("form__item_error");
  }
  _hideInputError(inputElement) {
    const { inputErrorClass, errorClass } = this._validatorSetting;
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = "";
    inputElement.classList.remove("form__item_error");
    // inputElement.style.borderBottom = "1px rgba(0, 0, 0, 0.2) solid";
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement.validationMessage, inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _handleFormSubmit(evt) {
    evt.preventDefault();
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  disableSubmitButton() {
    const { inactiveButtonClass } = this._validatorSetting;
    this._buttonElement.classList.add(inactiveButtonClass);
    this._buttonElement.setAttribute("disabled", "disabled");
  }

  _enableSubmitButton() {
    const { inactiveButtonClass } = this._validatorSetting;
    this._buttonElement.classList.remove(inactiveButtonClass);
    this._buttonElement.removeAttribute("disabled");
  }
  toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this.disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  }
  _setFormEventListeners = () => {
    const { inputSelector, submitButtonSelector, inactiveButtonClass } =
      this._validatorSetting;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(inputSelector)
    );
    this._formElement.setAttribute("novalidate", "true");
    const inputListIterator = (inputElement) => {
      const handleInput = () => {
        this._isValid(inputElement);
        this.toggleButtonState();
      };
      inputElement.addEventListener("input", handleInput);
    };

    this._buttonElement = this._formElement.querySelector(submitButtonSelector);
    this.toggleButtonState();

    this._inputList.forEach(inputListIterator);
  };

  enableValidation() {
    this._formElement.addEventListener("submit", this._handleFormSubmit);
    this._setFormEventListeners();
  }

  resetErrors() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}
