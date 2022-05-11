import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._popup.querySelector(".form__submit");
    this._inputList = this._popup.querySelectorAll(".form__item");
    this._form = this._popup.querySelector("form");
    this._initialValueSubmit = this._submitButton.textContent;
  }

  _getInputValues() {
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
          .then(() => this.close())
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
        this.renderLoading(false)
      });
    })}


  close() {
    super.close();
    this._form.reset();
  }

  renderLoading(isLoading, buttonText = 'Сохранение...') {
    if (isLoading) {
      this._submitButton.textContent = buttonText;
    }
    else {
      this._submitButton.textContent = this._initialValueSubmit;
    }
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

}
