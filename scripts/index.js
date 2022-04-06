import {
  validatorSetting,
  initialCards,
  editButton,
  addCardButton,
  userName,
  description,
  cards,
  popupOpenImage,
  closeButtonPopupImage,
  popupAddCard,
  closeButtonPopupAddCard,
  addForm,
  inputCardTitle,
  inputCardLink,
  popupEditForm,
  inputName,
  inputDescription,
  closeButtonEditForm,
  editForm,
} from "./constants.js";

import {FormValidator} from './FormValidator.js'


import {Card} from './Card.js'

const editFormValidator = new FormValidator(validatorSetting, editForm)
const addCardFormValidator = new FormValidator(validatorSetting, addForm )

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
  addCardFormValidator.disableSubmitButton();
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
  evt.preventDefault()
  userName.textContent = inputName.value;
  description.textContent = inputDescription.value;

  closePopup(popupEditForm);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault()

  cards.prepend(createCard(inputCardTitle.value, inputCardLink.value));

  closePopup(popupAddCard);
}

function createCard(name, link) {
  const card = new Card(name, link);
  const cardElement = card.generateCard();
  return cardElement;
}

function renderCards(initialCards) {
  initialCards.forEach((elem) => {
    cards.append(createCard(elem.name, elem.link));
  });
}

renderCards(initialCards);

editButton.addEventListener("click", () => openEditFormPopup(popupEditForm));

addCardButton.addEventListener("click", () => openAddCardPopup(popupAddCard));

addForm.addEventListener("submit", handleAddCardFormSubmit);

editForm.addEventListener("submit", handleProfileFormSubmit);

closeButtonPopupImage.addEventListener("click", () =>
  closePopup(popupOpenImage)
);
closeButtonPopupAddCard.addEventListener("click", () =>
  closePopup(popupAddCard)
);
closeButtonEditForm.addEventListener("click", () => closePopup(popupEditForm));

document.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
});

export { openPopup };
