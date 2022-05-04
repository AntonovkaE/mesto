import Popup from './Popup.js';

export default class PopupWithChoice extends Popup {
	constructor(selector, api, card) {
    super(selector);
    this._api = api;
    this._card = card;
    this._submit = this._popup.querySelector(".form__submit");
    // this._submitContent = this._submit.textContent;
	 }

  open() {
    console.log(this._submit)
    this._submit.textContent = "Да";
    super.open();

  }


  handleFormSubmit() {
    this._api.deleteCard(this._card._id, this, this._submit)
    this._card._handleDelete()
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