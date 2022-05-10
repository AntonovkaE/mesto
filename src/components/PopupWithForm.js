import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._popup.querySelector(".form__submit");
    this._inputList = this._popup.querySelectorAll(".form__item");
    this._form = this._popup.querySelector("form")
  }

  _getInputValues() {
    this._formValues = {};
    this._setInputValues(this._inputList)
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
    this._form.reset();
  }

  renderLoading(isLoading, buttonText) {
    if (isLoading) {
      this._submitButton.textContent = buttonText;
    }
  }

  _setInputValues(inputList) {
    inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );

  }
}
