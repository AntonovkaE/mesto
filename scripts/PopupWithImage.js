import Popup from 'Popup.js';

export default class PopupWithImage extends Popup {
	constructor(selector) {
    super(selector);
	 }
 
  // generate() {
  //   this._element = super._getElement();
  //   super._setEventListeners();

  // 	this._element.querySelector('.message__paragraph').textContent = this._text;

  // 	return this._element;
  // }

  // open() {
  //   super.open();
  //   this._popupImage = this._popupImage.querySelector(".popup_openImage");
  //   this._popupImage.src = this._link;
  //   this._popupImage.alt = this._name;
  //   this._popupImage.querySelector(".popup__caption").textContent = this._name;
  //   openPopup(popupOpenImage);
  // }
}