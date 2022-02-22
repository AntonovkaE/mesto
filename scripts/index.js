const editButton = document.querySelector(".profile__button_type_edit")
const userName = document.querySelector(".profile__name")
const description = document.querySelector(".profile__description")
const cardTemplate = document.querySelector('#card').content;
const cards = document.querySelector('.cards')
const addCardButton = document.querySelector('.profile__button_type_add')
const mainBlock = document.querySelector('.page__main')
const popupOpenImage = document.querySelector('.popup_openImage')
const popupImage = popupOpenImage.querySelector('.popup__img')
const closeButtonPopupImage = popupOpenImage.querySelector('.popup__button_type_close');
const popupCaption = popupOpenImage.querySelector('.popup__caption')
const popupAddCard = document.querySelector('.popup_addCard')
const closeButtonPopupAddCard = popupAddCard.querySelector('.popup__button_type_close');
const addForm = popupAddCard.querySelector('.form');
const popupEditForm = document.querySelector('.popup_editForm')
const closeButtonEditForm = popupEditForm.querySelector('.popup__button_type_close');
const newName = popupEditForm.querySelector('.form__item_el_name');
const newDescription = popupEditForm.querySelector('.form__item_el_description');
const editForm = popupEditForm.querySelector('.form');


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function setEventListeners(cardElement, card) {
  cardElement.querySelector('.card__button_like').addEventListener('click', handleLike);
  cardElement.querySelector('.card__button_delete').addEventListener('click', handleDelete);
  cardElement.querySelector('.card__img').addEventListener('click', () => {openImagePopup(card)})
}

function handleLike(event) {
  const likeButton = event.target;
  likeButton.classList.toggle('card__button_like_active')
}

function handleDelete(event) {
  const cardItem = event.target.parentNode;
  cardItem.remove();
}

function openImagePopup(card) {
  popupImage.src = card.link
  popupImage.alt = card.name
  popupCaption.textContent = card.name
  openPopup(popupOpenImage)
}

function openPopup(popup) {
  popup.classList.add('popup_open');
}

function openAddCardPopup(popupEditForm) {
  openPopup(popupEditForm); 
}

function openEditFormPopup(popupEditForm) {
  newName.value = userName.textContent;
  newDescription.value = description.textContent;
  openPopup(popupEditForm); 
}

function closePopup(popup) {
  popup.classList.remove('popup_open');
  
}

function handleProfileFormSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const newName = form.querySelector(".form__item_el_name");
  const newDescription = form.querySelector(".form__item_el_description");
  userName.textContent = newName.value;
  description.textContent = newDescription.value;
  closePopup(popupEditForm);
}

function handleAddCardFormSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const newName = form.querySelector('.form__item_el_name').value
  const newUrl = form.querySelector('.form__item_el_url').value
  const newCard = {
    name: newName,
    link: newUrl, 
  }
  cards.prepend(createCard(newCard));
  closePopup(popupAddCard);
}

function createCard(card) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true)
  const cardElementImage = cardElement.querySelector('.card__img')
  cardElementImage.src = card.link;
  cardElementImage.alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;
  setEventListeners(cardElement, card);
  return cardElement;
}

function renderCards(initialCards) {
  initialCards.forEach(card => {
    cards.append(createCard(card));
    })
}

renderCards(initialCards);

editButton.addEventListener('click', () => openEditFormPopup(popupEditForm))

addCardButton.addEventListener('click', () => openAddCardPopup(popupAddCard))

addForm.addEventListener('submit', handleAddCardFormSubmit);

editForm.addEventListener('submit', handleProfileFormSubmit);

closeButtonPopupImage.addEventListener('click', () => closePopup(popupOpenImage))
closeButtonPopupAddCard.addEventListener('click', () => closePopup(popupAddCard))
closeButtonEditForm.addEventListener('click', () => closePopup(popupEditForm))