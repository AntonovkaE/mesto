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
const buttonChangeAvatar = document.querySelector(".profile__button_type_change-avatar");
const buttonTypeEdit = document.querySelector(".profile__button_type_edit");
const buttonAddCard = document.querySelector(".profile__button_type_add");

const userName = document.querySelector(".profile__name");
const description = document.querySelector(".profile__description");
const userAvatar = document.querySelector(".profile__avatar")

const cardTemplate = document.querySelector("#card").content;
const cards = document.querySelector(".cards");

const mainBlock = document.querySelector(".page__main");

const popups = Array.from(document.querySelectorAll(".popup"));

const popupOpenImage = document.querySelector(".popup_openImage");
const popupImage = popupOpenImage.querySelector(".popup__img");
const buttonClosePopupImage = popupOpenImage.querySelector(
  ".popup__button_type_close"
);
const popupCaption = popupOpenImage.querySelector(".popup__caption");

const popupAddCard = document.querySelector(".popup_addCard");
const buttonClosePopupAddCard = popupAddCard.querySelector(
  ".popup__button_type_close"
);
const addCardPopupSubmitButton = popupAddCard.querySelector(".form__submit")
const formAddCard = popupAddCard.querySelector(".form");
const inputCardTitle = popupAddCard.querySelector(".form__item_el_name");
const inputCardLink = popupAddCard.querySelector(".form__item_el_url");

const popupEditForm = document.querySelector(".popup_editForm");
const popupEditProfileSubmit = popupEditForm.querySelector(".form__submit")
const inputName = popupEditForm.querySelector(".form__item_el_name");
const inputDescription = popupEditForm.querySelector(
  ".form__item_el_description"
);
const buttonCloseEditForm = popupEditForm.querySelector(
  ".popup__button_type_close"
);
const formEditProfile = popupEditForm.querySelector(".form");

const selectorCardList = ".cards";

const popupConfig = {
  addCardSelector: ".popup_addCard",
  editFormSelector: ".popup_editForm",
  openImageSelector: ".popup_openImage",
  deleteCardSelector: ".popup_deleteCard",
  changeAvatarSelector: ".popup_changeAvatar"
}

// const deletePopupSubmit = document.querySelector(".popup__deleteCard").querySelector(".form__submit")

let userId;
const addAvatarForm = document.querySelector(".popup_changeAvatar")
const changeAvatarSubmit = addAvatarForm.querySelector(".form__submit")

export {
  validatorSetting,
  initialCards,
  buttonTypeEdit,
  buttonAddCard,
  userName,
  description,
  cardTemplate,
  cards,
  mainBlock,
  popupOpenImage,
  popupImage,
  buttonClosePopupImage,
  popupCaption,
  popupAddCard,
  buttonClosePopupAddCard,
  addCardPopupSubmitButton,
  formAddCard,
  inputCardTitle,
  inputCardLink,
  popupEditForm,
  inputName,
  inputDescription,
  buttonCloseEditForm,
  formEditProfile,
  popupEditProfileSubmit,
  popups,
  selectorCardList,
  popupConfig,
  userAvatar,
  buttonChangeAvatar,
  userId,
  addAvatarForm,
  changeAvatarSubmit,
};
