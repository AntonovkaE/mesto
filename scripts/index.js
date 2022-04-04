// function setEventListeners(cardElement, card) {
//   cardElement
//     .querySelector(".card__button_like")
//     .addEventListener("click", handleLike);
//   cardElement
//     .querySelector(".card__button_delete")
//     .addEventListener("click", handleDelete);
//   cardElement.querySelector(".card__img").addEventListener("click", () => {
//     openImagePopup(card);
//   });
// }

import {
  validatorSetting,
  initialCards,
  editButton,
  addCardButton,
  userName,
  description,
  cardTemplate,
  cards,
  mainBlock,
  popups,
  popupOpenImage,
  popupImage,
  closeButtonPopupImage,
  popupCaption,
  popupAddCard,
  closeButtonPopupAddCard,
  addForm,
  inputCardTitle,
  inputCardLink,
  inputListAddForm,
  submitAddForm,
  popupEditForm,
  inputName,
  inputDescription,
  closeButtonEditForm,
  editForm,
  inputListEditForm,
  submitEditForm,
} from "./constants.js";

// import {validatorSetting, addForm, editForm} from './constants.js'
import {FormValidator} from './FormValidator.js'


import {Card} from './Card.js'

// import {EditFormValidator, AddCardFormValidator} from './validate.beforeEnter(el) {
//   console.log('beforeEnter');
// },
// enter(el, done) {
//   console.log('enter');
//   done();
// },
// beforeLeave(el) {
//   console.log('beforeLeave');
// },
// leave(el, done) {
//   console.log('leave');
//   done();
// },'


// import { toggleButtonState, handleFormSubmit, isValid} from "./validate.js";

// function handleLike(event) {
//   const likeButton = event.target;
//   likeButton.classList.toggle("card__button_like_active");
// }

// function handleDelete(event) {
//   const cardItem = event.target.parentNode;
//   cardItem.remove();
// }

// function openImagePopup(card) {
//   popupImage.src = card.link;
//   popupImage.alt = card.name;
//   popupCaption.textContent = card.name;
//   openPopup(popupOpenImage);
// }

const EditFormValidator = new FormValidator(validatorSetting, editForm)
const AddCardFormValidator = new FormValidator(validatorSetting, addForm )

EditFormValidator.enableValidation();
AddCardFormValidator.enableValidation();

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
  // toggleButtonState(
  //   inputListAddForm,
  //   submitAddForm,
  //   validatorSetting.inactiveButtonClass
  // );
  openPopup(popupAddCard);
}

function openEditFormPopup(popupEditForm) {
  inputName.value = userName.textContent;
  inputDescription.value = description.textContent;
  // inputListEditForm.forEach((inputElement) => {
  //   isValid(
  //     editForm,
  //     inputElement,
  //     validatorSetting.inputErrorClass,
  //     validatorSetting.errorClass
  //   );
  // });
  // toggleButtonState(
  //   inputListEditForm,
  //   submitEditForm,
  //   validatorSetting.inactiveButtonClass
  // );

  openPopup(popupEditForm);
}

function closePopup(popup) {
  popup.classList.remove("popup_open");
  document.removeEventListener("keydown", closePopupByEsc);
}

function handleProfileFormSubmit(evt) {
  // handleFormSubmit(evt);
  userName.textContent = inputName.value;
  description.textContent = inputDescription.value;
  closePopup(popupEditForm);
}

function handleAddCardFormSubmit(evt) {
  // handleFormSubmit(evt);

  cards.prepend(createCard(inputCardTitle.value, inputCardLink.value));

  closePopup(popupAddCard);
}

function createCard(name, link) {
  const card = new Card(name, link);
  const cardElement = card.generateCard();
  card._setEventListener();
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
