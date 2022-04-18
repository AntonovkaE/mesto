import {
  validatorSetting,
  initialCards,
  buttonTypeEdit,
  buttonAddCard,
  userName,
  description,
  cards,
  buttonClosePopupImage,
  buttonClosePopupAddCard,
  formAddCard,
  inputCardTitle,
  inputCardLink,
  // popupEditForm,
  inputName,
  inputDescription,
  buttonCloseEditForm,
  formEditProfile,
  popups,
} from "../utils/constants.js";
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo';

import { FormValidator } from "../components/FormValidator.js";

import { Card } from "../components/Card.js";
import '../pages/index.css'

const editFormValidator = new FormValidator(validatorSetting, formEditProfile);
const addCardFormValidator = new FormValidator(validatorSetting, formAddCard);

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();

// function closePopupByEsc(evt) {
//   if (evt.key === "Escape") {
//     closePopup(document.querySelector(".popup_open"));
//   }
// }

// function openPopup(popup) {
//   popup.classList.add("popup_open");
//   document.addEventListener("keydown", closePopupByEsc);
// }
const popupOpenImage = new PopupWithImage('.popup_openImage') 
console.log(popupOpenImage)

const cardsList = new Section({
  item: initialCards,
  renderer: (item) => {

    // console.log(item.)
    const card = new Card(item.name, item.link, "#card", () => {

      popupOpenImage.open(item.link, item.name);    
    });
      const cardElement = card.generateCard();
      cardsList.addItem(cardElement)

    }}, '.cards'
);

cardsList.renderItems()
// function handleProfileFormSubmit(evt) {
//   evt.preventDefault();
//   userName.textContent = inputName.value;
//   description.textContent = inputDescription.value;

//   closePopup(popupEditForm);
// }
const popupEditForm = new PopupWithForm('.popup_editForm', (formValues) => {
  const user = new UserInfo('.profile__name', '.profile__description');
  user.setUserInfo()
  popupEditForm.setEventListeners();
  // userName.textContent = formValues.name-input;
  // description.textContent = inputName.description-input;
  // popupEditForm.setEventListeners();
  popupEditForm.close()
})

const popupAddCard = new PopupWithForm('.popup', (formValues) => {
  cards.prepend(createCard(formValues.input, formValues.url-input));
  popupAddCard.close();
})



// function openAddCardPopup(popupAddCard) {
//   addForm.reset();
//   addCardFormValidator.resetErrors();
//   addCardFormValidator.toggleButtonState();
//   openPopup(popupAddCard);
// }

// function openEditFormPopup(popupEditForm) {
//   inputName.value = userName.textContent;
//   inputDescription.value = description.textContent;
//   editFormValidator.resetErrors();
//   editFormValidator.toggleButtonState();
//   openPopup(popupEditForm);
// }

// function closePopup(popup) {
//   popup.classList.remove("popup_open");
//   document.removeEventListener("keydown", closePopupByEsc);
// }



// function handleAddCardFormSubmit(evt) {
//   evt.preventDefault();

//   cards.prepend(createCard(inputCardTitle.value, inputCardLink.value));

//   closePopup(popupAddCard);
// }

function createCard(name, link) {
  const card = new Card(name, link, "#card", (name, link) => {
    PopupWithImage.open(name, link)
  });
  const cardElement = card.generateCard();
  return cardElement;
}

// function renderCards(initialCards) {
//   initialCards.forEach((elem) => {
//     cards.append(createCard(elem.name, elem.link));
//   });
// }

// renderCards(initialCards);

buttonTypeEdit.addEventListener("click", () => {
  console.log(popupEditForm)
  popupEditForm.open()}
);

buttonAddCard.addEventListener("click", () => openAddCardPopup(popupAddCard));

// formAddCard.addEventListener("submit", handleAddCardFormSubmit);

// formEditProfile.addEventListener("submit", handleProfileFormSubmit);

// buttonClosePopupImage.addEventListener("click", () =>
//   closePopup(popupOpenImage)
// );
// buttonClosePopupAddCard.addEventListener("click", () =>
//   closePopup(popupAddCard)
// );
// buttonCloseEditForm.addEventListener("click", () => closePopup(popupEditForm));

// document.addEventListener("click", (evt) => {
//   if (evt.target.classList.contains("popup")) {
//     closePopup(evt.target);
//   }
// });

// popups.forEach(popup =>  {
//   popup.addEventListener('click', (evt) => closePopup(evt.target))
// })

export {createCard}
