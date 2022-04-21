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
  selectorCardList, 
  popupConfig
} from "../utils/constants.js";

import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo";

import { FormValidator } from "../components/FormValidator.js";

import { Card } from "../components/Card.js";
import "../pages/index.css"; 
const {addCardSelector, editFormSelector, openImageSelector} = popupConfig;

const editFormValidator = new FormValidator(validatorSetting, formEditProfile);
const addCardFormValidator = new FormValidator(validatorSetting, formAddCard);

function createCard (name, link, selector) {
  const card = new Card(name, link, selector, () => {
  popupOpenImage.open(link, name);
  });
  return card.generateCard();;
}

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();



const popupOpenImage = new PopupWithImage(openImageSelector);
popupOpenImage.setEventListeners();

const cardsList = new Section(
  {
    item: initialCards,
    renderer: (item) => {
      cardsList.addItem(createCard(item.name, item.link, "#card"));
    },
  },
  selectorCardList
);


cardsList.renderItems();

const user = new UserInfo(".profile__name", ".profile__description");

const popupEditForm = new PopupWithForm(editFormSelector, (formData) => {
  user.setUserInfo(formData);
});
popupEditForm.setEventListeners();

const popupAddCard = new PopupWithForm(addCardSelector, ({placeInput, urlInput}) => {
  cardsList.addItemToTop(createCard(placeInput, urlInput, "#card"));
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



