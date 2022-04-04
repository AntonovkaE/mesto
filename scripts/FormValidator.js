import {
  validatorSetting
} from "./constants.js";

export class FormValidator {
  constructor(validatorSetting, formElement) {
    this._validatorSetting = validatorSetting;
    this._formElement = formElement;
  }
  enableValidation() {
    const formList = Array.from(
      document.querySelectorAll(validatorSetting.formSelector)
    );
    const formListIterator = (formElement) => {
      this._formElement.addEventListener("submit", this._handleFormSubmit);
      this._setFormEventListeners(
        validatorSetting.inputSelector,
        validatorSetting.submitButtonSelector,
        validatorSetting.inactiveButtonClass,
        validatorSetting.inputErrorClass,
        validatorSetting.errorClass
      );
    };
    formList.forEach(formListIterator);
  }

  _isValid (inputElement, inputErrorClass, errorClass) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        inputElement,
        inputElement.validationMessage,
        inputErrorClass,
        errorClass
      );
    } else {
      this._hideInputError(inputElement, inputErrorClass, errorClass);
    }
  };

  _handleFormSubmit(evt) {
    evt.preventDefault();
  };

  _showInputError(inputElement, ...args) {
    {
      const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.add(args[1]);
      errorElement.textContent = args[0];
      errorElement.classList.add(args[2]);
      inputElement.style.borderBottom = "1px #FF0000 solid";
    }
  }
  _hideInputError(
    inputElement,
    inputErrorClass,
    errorClass
  ) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = "";
    inputElement.style.borderBottom = "1px rgba(0, 0, 0, 0.2) solid";
  };
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  _toggleButtonState (inputList, buttonElement, inactiveButtonClass) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(inactiveButtonClass);
      buttonElement.setAttribute("disabled", "disabled");
    } else {
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
    }
  };
  _setFormEventListeners = (...args) => {
    const inputList = Array.from(this._formElement.querySelectorAll(args[0]));
    this._formElement.setAttribute("novalidate", "true");
    const inputListIterator = (inputElement) => {
      const handleInput = () => {
        this._isValid(inputElement, args[3], args[4]);
        this._toggleButtonState(inputList, buttonElement, args[2]);
      };
      inputElement.addEventListener("input", handleInput);
    };
  
    const buttonElement = this._formElement.querySelector(args[1]);
    this._toggleButtonState(inputList, buttonElement, args[2]);
  
    inputList.forEach(inputListIterator);
  };

}

// class AddCardFormValidator extends FormValidator {
//   constructor() {

//   }
// }

// class EditFormValidator extends FormValidator {
//   constructor() {

//   }
// }