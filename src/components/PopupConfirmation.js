import Popup from './Popup.js';

export default class PopupConfirmation extends Popup {
	constructor(selector, api) {
    super(selector);
    this._api = api;
    // this._card = card;
    this._submit = this._popup.querySelector(".form__submit");
    // this._submitContent = this._submit.textContent;
	 }

  open(card) {
    console.log(this._submit)
    this._submit.textContent = "Да";
    super.open();
    this._card = card;
  }


  handleFormSubmit() {
    // this._api.deleteCard(this._card._id, this, this._submit)
    this._card._handleDelete(this._submit, this)
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.handleFormSubmit();
    });
  }

  close() {
    super.close()
  }
}