import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._popup.querySelector(".form__submit");
    // this._
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
    const initialValueSubmit = this._submitButton.textContent
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.renderLoading(true, 'Сохранение...')
      this._handleFormSubmit(this._getInputValues())
          .then(() => this.close())
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
        this._submitButton.textContent = initialValueSubmit
      });
    })}

  open() {
    super.open();
  }

  close() {
    super.close();
    this._popup.querySelector("form").reset();
  }

  renderLoading(isLoading, buttonText) {
    if (isLoading) {
      this._submitButton.textContent = buttonText;
    }
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      // тут вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
      input.value = data[input.name];
    });
  }
}
