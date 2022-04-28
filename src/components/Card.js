export class Card {
  constructor(name, link, templateSelector, likes, user, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._likes = likes;
    this._user = user;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._card = this._element.querySelector(".card__img");
    this._card.src = this._link;
    this._card.alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;
    this._setEventListener();
    return this._element;
  }

  _setEventListener() {
    this._likeButton = this._element.querySelector(".card__button_like");
    this._likeButton.addEventListener("click", () => this._handleLike());
    this._element
      .querySelector(".card__button_delete")
      .addEventListener("click", () => this._handleDelete());
    this._element.querySelector(".card__img").addEventListener("click", () => {
      this._handleCardClick();
    });
  }

  _handleLike() {
    this._likeCount = this._element.querySelector(".card__like-counter")
    this._likeButton.classList.add("card__button_like_active");
    setTimeout(() => {this._likeButton.classList.remove("card__button_like_active")}, 1000)
    this._likes.push(this._user.getUserInfo().name);
    this._likeCount.textContent = this._likes.length;
  }

  _handleDelete() {
    this._element.remove();
    this._element = null;
  }
}
