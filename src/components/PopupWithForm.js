import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._buttonSubmit = this._popup.querySelector(".form__submit")
    this._initialValueSubmit = this._buttonSubmit.textContent
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll(".form__item");
    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
  open() {
    this._buttonSubmit.textContent = this._initialValueSubmit;
    super.open();
  }

  close() {
    super.close();
    this._popup.querySelector("form").reset();
  }
}
