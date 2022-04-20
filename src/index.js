import {
  validatorSetting,
  initialCards,
  buttonTypeEdit,
  buttonAddCard,
  userName,
  description,
  formAddCard,
  inputName,
  inputDescription,
  formEditProfile,
} from "../utils/constants.js";

import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo";

import { FormValidator } from "../components/FormValidator.js";

import { Card } from "../components/Card.js";
import "../pages/index.css";

const editFormValidator = new FormValidator(validatorSetting, formEditProfile);
const addCardFormValidator = new FormValidator(validatorSetting, formAddCard);

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();



const popupOpenImage = new PopupWithImage(".popup_openImage");
popupOpenImage.setEventListeners();

const cardsList = new Section(
  {
    item: initialCards,
    renderer: (item) => {

      const card = new Card(item.name, item.link, "#card", () => {
        popupOpenImage.open(item.link, item.name);
      });
      const cardElement = card.generateCard();
      cardsList.addItem(cardElement);
    },
  },
  ".cards"
);

cardsList.renderItems();

const user = new UserInfo(".profile__name", ".profile__description");

const popupEditForm = new PopupWithForm(".popup_editForm", (formData) => {
  user.setUserInfo(formData);
});
popupEditForm.setEventListeners();

const popupAddCard = new PopupWithForm(".popup_addCard", (formValues) => {
  const cardItem = new Section(
    {
      item: formValues,
      renderer: ({ placeInput, urlInput }) => {
        const card = new Card(placeInput, urlInput, "#card", () => {
          popupOpenImage.open(item.link, item.name);
        });
        const cardElement = card.generateCard();
        cardItem.addItemToTop(cardElement);
      },
    },
    ".cards"
  );
  cardItem.renderItems();``
});
popupAddCard.setEventListeners();



buttonTypeEdit.addEventListener("click", () => {
  inputName.value = userName.textContent;
  inputDescription.value = description.textContent;
  editFormValidator.resetErrors();
  editFormValidator.toggleButtonState();
  popupEditForm.open();
});

buttonAddCard.addEventListener("click", () => {
  popupAddCard.open();
  addCardFormValidator.resetErrors();
  addCardFormValidator.toggleButtonState();
});



