const validatorSetting = {
  formSelector: ".popup__form",
  inputSelector: ".form__item",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorClass: "form__item_type_error",
  errorClass: "form__item-error_active",
};


const buttonChangeAvatar = document.querySelector(".profile__button_type_change-avatar");
const buttonTypeEdit = document.querySelector(".profile__button_type_edit");
const buttonAddCard = document.querySelector(".profile__button_type_add");

const userName = document.querySelector(".profile__name");
const description = document.querySelector(".profile__description");
const userAvatar = document.querySelector(".profile__avatar")



const popupAddCard = document.querySelector(".popup_addCard");
const addCardPopupSubmitButton = popupAddCard.querySelector(".form__submit")
const formAddCard = popupAddCard.querySelector(".form");

const popupEditForm = document.querySelector(".popup_editForm");
const popupEditProfileSubmit = popupEditForm.querySelector(".form__submit")
const inputName = popupEditForm.querySelector(".form__item_el_name");
const inputDescription = popupEditForm.querySelector(
  ".form__item_el_description"
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



const addAvatarForm = document.querySelector(".popup_changeAvatar")
const changeAvatarSubmit = addAvatarForm.querySelector(".form__submit")

export {
  validatorSetting,
  buttonTypeEdit,
  buttonAddCard,
  userName,
  description,
  popupAddCard,
  addCardPopupSubmitButton,
  formAddCard,
  popupEditForm,
  inputName,
  inputDescription,
  formEditProfile,
  popupEditProfileSubmit,
  selectorCardList,
  popupConfig,
  userAvatar,
  buttonChangeAvatar,
  addAvatarForm,
  changeAvatarSubmit,
};
