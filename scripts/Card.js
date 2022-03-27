import { openPopup } from "./index.js";
import {
  cardTemplate,
  popupOpenImage,
  popupImage,
  popupCaption,
} from "./constants.js";

export class Card {
  constructor(name, link) {
    this._name = name;
    this._link = link;
  }

  _getTemplate() {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".card__img").src = this._link;
    this._element.querySelector(".card__img").alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;
    return this._element;
  }

  _openImagePopup() {
    popupImage.src = this._link;
    popupImage.alt = this._name;
    popupCaption.textContent = this._name;
    openPopup(popupOpenImage);
  }

  _setEventListener() {
    const likeButton = this._element.querySelector(".card__button_like")
    likeButton.addEventListener("click", () => this._handleLike(likeButton));
    this._element
      .querySelector(".card__button_delete")
      .addEventListener("click", () => this._handleDelete());
    this._element.querySelector(".card__img").addEventListener("click", () => {
      this._openImagePopup();
    });
  }

  _handleLike(likeButton) {
    likeButton.classList.toggle("card__button_like_active");
  }

  _handleDelete() {
    console.log(this)
    this.remove();
  }
}
