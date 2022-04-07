import {
  validatorSetting,
  initialCards,
  buttonTypeEdit,
  buttonAddCard,
  userName,
  description,
  cards,
  popupOpenImage,
  buttonClosePopupImage,
  popupAddCard,
  buttonClosePopupAddCard,
  formAddCard,
  inputCardTitle,
  inputCardLink,
  popupEditForm,
  inputName,
  inputDescription,
  buttonCloseEditForm,
  formEditProfile,
  popups,
} from "./constants.js";

import { FormValidator } from "./FormValidator.js";

import { Card } from "./Card.js";

const editFormValidator = new FormValidator(validatorSetting, formEditProfile);
const addCardFormValidator = new FormValidator(validatorSetting, formAddCard);

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();

function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_open"));
  }
}

function openPopup(popup) {
  popup.classList.add("popup_open");
  document.addEventListener("keydown", closePopupByEsc);
}

function openAddCardPopup(popupAddCard) {
  addForm.reset();
  addCardFormValidator.resetErrors();
  addCardFormValidator.toggleButtonState();
  openPopup(popupAddCard);
}

function openEditFormPopup(popupEditForm) {
  inputName.value = userName.textContent;
  inputDescription.value = description.textContent;
  editFormValidator.resetErrors();
  editFormValidator.toggleButtonState();
  openPopup(popupEditForm);
}

function closePopup(popup) {
  popup.classList.remove("popup_open");
  document.removeEventListener("keydown", closePopupByEsc);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  userName.textContent = inputName.value;
  description.textContent = inputDescription.value;

  closePopup(popupEditForm);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  cards.prepend(createCard(inputCardTitle.value, inputCardLink.value));

  closePopup(popupAddCard);
}

function createCard(name, link) {
  const card = new Card(name, link, "#card");
  const cardElement = card.generateCard();
  return cardElement;
}

function renderCards(initialCards) {
  initialCards.forEach((elem) => {
    cards.append(createCard(elem.name, elem.link));
  });
}

renderCards(initialCards);

buttonTypeEdit.addEventListener("click", () =>
  openEditFormPopup(popupEditForm)
);

buttonAddCard.addEventListener("click", () => openAddCardPopup(popupAddCard));

formAddCard.addEventListener("submit", handleAddCardFormSubmit);

formEditProfile.addEventListener("submit", handleProfileFormSubmit);

buttonClosePopupImage.addEventListener("click", () =>
  closePopup(popupOpenImage)
);
buttonClosePopupAddCard.addEventListener("click", () =>
  closePopup(popupAddCard)
);
buttonCloseEditForm.addEventListener("click", () => closePopup(popupEditForm));

// document.addEventListener("click", (evt) => {
//   if (evt.target.classList.contains("popup")) {
//     closePopup(evt.target);
//   }
// });

popups.forEach(popup =>  {
  popup.addEventListener('click', (evt) => closePopup(evt.target))
})

export { openPopup };
