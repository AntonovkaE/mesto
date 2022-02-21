const editButton = document.querySelector(".profile__button_type_edit")
const userName = document.querySelector(".profile__name")
const description = document.querySelector(".profile__description")
const cardTemplate = document.querySelector('#card').content;
const cards = document.querySelector('.cards')
const addCardButton = document.querySelector('.profile__button_type_add')
const mainBlock = document.querySelector('.page__main')
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



function setEventListeners(cardElement) {
  cardElement.querySelector('.card__button_like').addEventListener('click', handleLike);
  cardElement.querySelector('.card__button_delete').addEventListener('click', handleDelete);
  cardElement.querySelector('.card__img').addEventListener('click', openImagePopup)
}

function handleLike(event) {
  const likeButton = event.target;
  if (!likeButton.classList.contains('card__button_like_active')) {
    likeButton.classList.add('card__button_like_active');
  } else if (likeButton.classList.contains('card__button_like_active')) {
    likeButton.classList.remove('card__button_like_active');
  }
}

function handleDelete(event) {
  const cardItem = event.target.parentNode;
  cardItem.remove();
}

function openImagePopup(event) {
  const cardImage = event.target
  const cardElement = event.target.closest('.card')
  const popup = document.querySelector('.popup_openImage')
  const popupImage = popup.querySelector('.popup__img')
  popupImage.src = cardImage.src
  popupImage.alt = cardImage.alt
  const popupCaption = popup.querySelector('.popup__caption')
  popupCaption.textContent = cardElement.querySelector('.card__title').textContent
  openPopup(popup)
}


function openPopup(popup) {
  const closeButton = popup.querySelector(".popup__button_type_close");
  closeButton.addEventListener('click', closePopup)
  popup.classList.add('popup_open');
  mainBlock.append(popup);
}

function openAddCardPopup() {
  const popup = document.querySelector('.popup_addCard')
  console.log(popup);
  const addForm = popup.querySelector('.form');
  addForm.addEventListener('submit', handleAddCardFormSubmit);
  openPopup(popup); 
}

function openEditFormPopup() {
  const popup = document.querySelector('.popup_editForm')
  const newName = popup.querySelector('.form__item_el_name');
  const newDescription = popup.querySelector('.form__item_el_description');
  newName.value = userName.textContent;
  newDescription.value = description.textContent;
  const editForm = popup.querySelector('.form');
  editForm.addEventListener('submit', handleProfileFormSubmit);
  openPopup(popup); 
}

function closePopup(event) {
    event.preventDefault();
    event.target.closest('.popup').classList.remove('popup_open');
  
}

function handleProfileFormSubmit(event) {
  event.preventDefault();
  const form = event.target;
  let newName = form.querySelector(".form__item_el_name");
  let newDescription = form.querySelector(".form__item_el_description");
  userName.textContent = newName.value;
  description.textContent = newDescription.value;
  closePopup(event);
}

function handleAddCardFormSubmit(event) {
  event.preventDefault();
  const form = event.target;
  let newName = form.querySelector('.form__item_el_name').value
  let newUrl = form.querySelector('.form__item_el_url').value
  let newCard = {
    name: newName,
    link: newUrl, 
}
  createCard(newCard)
  closePopup(event);
}

function createCard(card) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true)
  cardElement.querySelector('.card__img').src = card.link;
  cardElement.querySelector('.card__img').alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;
  setEventListeners(cardElement)
  cards.append(cardElement);
}

function renderCards(initialCards) {
  initialCards.forEach(card => {
    createCard(card);
    })
}

renderCards(initialCards);

editButton.addEventListener('click', () => openEditFormPopup())

addCardButton.addEventListener('click', () => openAddCardPopup())