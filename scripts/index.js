function setEventListeners(cardElement, card) {
  cardElement
    .querySelector(".card__button_like")
    .addEventListener("click", handleLike);
  cardElement
    .querySelector(".card__button_delete")
    .addEventListener("click", handleDelete);
  cardElement.querySelector(".card__img").addEventListener("click", () => {
    openImagePopup(card);
  });
}

function handleLike(event) {
  const likeButton = event.target;
  likeButton.classList.toggle("card__button_like_active");
}

function handleDelete(event) {
  const cardItem = event.target.parentNode;
  cardItem.remove();
}

function openImagePopup(card) {
  popupImage.src = card.link;
  popupImage.alt = card.name;
  popupCaption.textContent = card.name;
  openPopup(popupOpenImage);
}

function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_open"));
  }
}

function openPopup(popup) {
  popup.classList.add("popup_open");
  activePopup = popup;
  document.addEventListener("keydown", closePopupByEsc);
}

function openAddCardPopup(popupAddCard) {
  addForm.reset();
  toggleButtonState(
    inputListAddForm,
    submitAddForm,
    validatorSetting.inactiveButtonClass
  );
  openPopup(popupAddCard);
}

function openEditFormPopup(popupEditForm) {
  inputName.value = userName.textContent;
  inputDescription.value = description.textContent;
  inputListEditForm.forEach((inputElement) => {
    isValid(
      editForm,
      inputElement,
      validatorSetting.inputErrorClass,
      validatorSetting.errorClass
    );
  });
  toggleButtonState(
    inputListEditForm,
    submitEditForm,
    validatorSetting.inactiveButtonClass
  );

  openPopup(popupEditForm);
}

function closePopup(popup) {
  popup.classList.remove("popup_open");
  document.removeEventListener("keydown", closePopupByEsc);
}

function handleProfileFormSubmit(evt) {
  handleFormSubmit(evt);
  userName.textContent = inputName.value;
  description.textContent = inputDescription.value;
  closePopup(popupEditForm);
}

function handleAddCardFormSubmit(evt) {
  handleFormSubmit(evt);

  const newCard = {
    name: inputCardTitle.value,
    link: inputCardLink.value,
  };
  cards.prepend(createCard(newCard));
  closePopup(popupAddCard);
}

function createCard(card) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardElementImage = cardElement.querySelector(".card__img");
  cardElementImage.src = card.link;
  cardElementImage.alt = card.name;
  cardElement.querySelector(".card__title").textContent = card.name;
  setEventListeners(cardElement, card);
  return cardElement;
}

function renderCards(initialCards) {
  initialCards.forEach((card) => {
    cards.append(createCard(card));
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
