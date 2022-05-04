import { userId } from "../pages/index.js";

export class Card {
  constructor(
    card,
    templateSelector,
    user,
    api,
    handleCardClick,
    handleCardDelete
  ) {
    this._cardData = card;
    this._name = card.name;
    this._link = card.link;
    this._templateSelector = templateSelector;
    this._likes = card.likes;
    this._id = card.id;
    this._api = api;
    this._user = this._api.getUserData();
    this._handleCardClick = handleCardClick;
    this._owner = card.owner;
    this._handleCardDelete = handleCardDelete;
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
    if (this._likes.length > 0) {
      this._element.querySelector(".card__like-counter").textContent =
      this._likes.length;
    }
    
    function isLiked(elem) {
      return elem._id == userId;
    }

    if (this._likes.some(isLiked)) {
      this._element.querySelector(".card__button_like").classList.add("card__button_like_active");
    }
    this._user
      .then((res) => {
        this._owner = this._owner ? this._owner : res._id;
        return res;
      })
      .then((res) => {
        if (res._id == this._owner) {
          this._element
            .querySelector(".card__button_delete")
            .classList.remove("hidden");
        }
      });

    this._setEventListener();
    return this._element;
  }

  _setEventListener() {
    this._likeButton = this._element.querySelector(".card__button_like");
    this._likeButton.addEventListener("click", () => this._handleLike());
    this._element
      .querySelector(".card__button_delete")
      .addEventListener("click", () => this._handleCardDelete(this._id));
    this._element.querySelector(".card__img").addEventListener("click", () => {
      this._handleCardClick();
    });
  }

  _handleLike() {
    this._likeCount = this._element.querySelector(".card__like-counter");
    // проверим лайкнул ли юзер карточку
    // function isLiked(elem) {
    //   return elem._id == userId;
    // }
    // this._api.addLike(this._id).then((res) => {
    //   if (res.likes.some(isLiked)) {
    //     this._likeCount.textContent = res.likes.length;
    //     this._likeButton.classList.add("card__button_like_active");
    //     console.log(res)
    //   }
    //   else {
    //     this._api.deleteLike(this._id).then((res) => {
    //     this._likeCount.textContent = res.likes.length;
    //     console.log(res);
    //   });
    //   }
    // });
    // this._api.addLike(this._id).then((res) => {
    //   this._likeCount.textContent = res.likes.length;
    // });
    this._likeButton.classList.toggle("card__button_like_active");
    if (this._likeButton.classList.contains("card__button_like_active")) {
      this._api.addLike(this._id).then((res) => {
        this._likeCount.textContent = res.likes.length;
      });
    } else {
      this._api.deleteLike(this._id).then((res) => {
        this._likeCount.textContent = res.likes.length;
        if (res.likes.length == 0) {
          this._likeCount.classList.add('hidden')
        }
      });
      // }
    }
  }

  _handleDelete() {
    this._api
      .deleteCard(this._id)
      .then(() => {
        this._element.remove();
        this._element = null;
      })
      .catch((err) => console.log(err));
    // this._element.remove();
    //
  }
}
