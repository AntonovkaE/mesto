export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
  }
  open() {
    this._popup.classList.add("popup_open");
    this.setEventListeners();
    document.addEventListener("keydown", (evt) => this._handleEscClose(evt));
  }
  close() {
    this._popup.classList.remove("popup_open");
    document.removeEventListener("keydown", closePopupByEsc);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      closePopup(document.querySelector(".popup_open"));
    }
  }

  setEventListeners() {
    this._closeButton = this._popup.querySelector(".popup__button_type_close");
    this._closeButton.addEventListener("click", () => this.close());
  }
}
