import Popup from './Popup.js';


export default class PopupWithChoice extends Popup {
	constructor(selector, api, card) {
    super(selector);
    this._api = api;
    this._card = card;
	 }

  open() {
    super.open();
  }

  handleFormSubmit() {
    this._card._handleDelete()
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.handleFormSubmit();
      this.close();
    });
  }
}