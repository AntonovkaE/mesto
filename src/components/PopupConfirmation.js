import Popup from './Popup.js';

export default class PopupConfirmation extends Popup {
	constructor(selector, api) {
    super(selector);
    this._api = api;
    this._submitButton = this._popup.querySelector(".form__submit");
    this._initialValueSubmit = this._submitButton.textContent;

	 }

  open(card) {
    super.open();
    this._card = card;
  }

  handleFormSubmit() {
    return this._card._handleDelete(this._submitButton, this)

  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.renderLoading(true, "Удаление...")
      this.handleFormSubmit()
          .then(() => this.close())
          .catch((err) => {
              console.log(err);
          })
          .finally(() => {
            this.renderLoading(false)
          });
    });
  }
  renderLoading(isLoading, buttonText='Сохранение...') {
    if (isLoading) {
      this._submitButton.textContent = buttonText;
    }
    else {
        this._submitButton.textContent = this._initialValueSubmit
    }
  }
}

