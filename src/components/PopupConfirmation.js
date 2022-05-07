import Popup from './Popup.js';

export default class PopupConfirmation extends Popup {
	constructor(selector, api) {
    super(selector);
    this._api = api;
    this._submitButton = this._popup.querySelector(".form__submit");
    this._initialValueSubmit = this._submitButton.textContent
	 }

  open(card) {
    // this._submitButton.textContent = "Да";
    super.open();
    this._card = card;
  }

  handleFormSubmit() {
    this._card._handleDelete(this._submitButton, this)
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.renderLoading(true)
      this.handleFormSubmit()
          .then(() => this.close())
          .finally(() => {
            this._submitButton.textContent = this._initialValueSubmit
          });
    });
  }
  renderLoading(isLoading, buttonText='Сохранить') {
    if (isLoading) {
      this._submit = buttonText;
    }
  }
}

