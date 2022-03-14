const validatorSetting = {
  formSelector: ".popup__form",
  inputSelector: ".form__item",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorClass: "form__item_type_error",
  errorClass: "form__item-error_active",
};

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const editButton = document.querySelector(".profile__button_type_edit");
const addCardButton = document.querySelector(".profile__button_type_add");

const userName = document.querySelector(".profile__name");
const description = document.querySelector(".profile__description");

const cardTemplate = document.querySelector("#card").content;
const cards = document.querySelector(".cards");

const mainBlock = document.querySelector(".page__main");

const popups = Array.from(document.querySelectorAll(".popup"));

const popupOpenImage = document.querySelector(".popup_openImage");
const popupImage = popupOpenImage.querySelector(".popup__img");
const closeButtonPopupImage = popupOpenImage.querySelector(
  ".popup__button_type_close"
);
const popupCaption = popupOpenImage.querySelector(".popup__caption");

const popupAddCard = document.querySelector(".popup_addCard");
const closeButtonPopupAddCard = popupAddCard.querySelector(
  ".popup__button_type_close"
);
const addForm = popupAddCard.querySelector(".form");
const inputCardTitle = popupAddCard.querySelector(".form__item_el_name");
const inputCardLink = popupAddCard.querySelector(".form__item_el_url");
const inputListAddForm = Array.from(addForm.querySelectorAll(validatorSetting.inputSelector));
const submitAddForm = addForm.querySelector(validatorSetting.submitButtonSelector);


const popupEditForm = document.querySelector(".popup_editForm");
const inputName = popupEditForm.querySelector(".form__item_el_name");
const inputDescription = popupEditForm.querySelector(
  ".form__item_el_description"
);
const closeButtonEditForm = popupEditForm.querySelector(
  ".popup__button_type_close"
);
const editForm = popupEditForm.querySelector(".form");
const inputListEditForm = Array.from(popupEditForm.querySelectorAll(validatorSetting.inputSelector));
const submitEditForm = editForm.querySelector(validatorSetting.submitButtonSelector)





