import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._popup.querySelector(".form__submit");
    this._initialValueSubmit = this._submitButton.textContent
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
      this.renderLoading(true)
      this._handleFormSubmit(this._getInputValues())
      //     .then(() => this.close())
      //     .finally(() => {
      //   this._submitButton.textContent = this._initialValueSubmit
      // });
    })}

  open() {
    // this._submitButton.textContent = this._initialValueSubmit;
    super.open();
  }

  close() {
    super.close();
    this._popup.querySelector("form").reset();
  }

  renderLoading(isLoading, buttonText='Сохранить') {
    if (isLoading) {
      this._submitButton = buttonText;
    }
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      // тут вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
      input.value = data[input.name];
    });
  }
}
