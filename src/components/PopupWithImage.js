import Popup from './Popup.js';


export default class PopupWithImage extends Popup {
	constructor(selector) {
    super(selector);
    this._image = this._popup.querySelector(".popup__img");
    this._caption = this._popup.querySelector(".popup__caption");
	 }

  open(link, name) {
    super.open();
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;
  }
}