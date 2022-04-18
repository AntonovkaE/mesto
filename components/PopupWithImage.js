import Popup from './Popup.js';


export default class PopupWithImage extends Popup {
	constructor(selector) {
    super(selector);
	 }

  open(link, name) {
    super.open();
    this._image = this._popup.querySelector(".popup__img");
    this._image.src = link;
    this._image.alt = name;
    this._popup.querySelector(".popup__caption").textContent = name;
  }
  close() {
    super.close();
  }
}