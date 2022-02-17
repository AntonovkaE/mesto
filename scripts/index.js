const editButton = document.querySelector(".profile__button_type_edit")
let userName = document.querySelector(".profile__name")
let description = document.querySelector(".profile__description")
const cardTemplate = document.querySelector('#card').content;
const cards = document.querySelector('.cards')
const addCardButton = document.querySelector('.profile__button_type_add')
const popupTemplate = document.querySelector('#popup').content
const closeButton = popupTemplate.querySelector(".popup__button_type_close")
const popup = popupTemplate.querySelector('.popup');
const editForm = popupTemplate.querySelector('.edit-form')
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

const popups = [{
  name: 'editProfile',
  heading: 'Редактировать профиль',
  button: 'Сохранить',
  firstInput: 'edit-form__item_el_name',
  secondInput: 'edit-form__item_el_description',
  secondInputType: 'text',
  placeholderFirstInput: 'Ваше имя',
  placeholderSecondInput: 'О себе',
},
{
  name: 'addCard',
  heading: 'Новое место',
  button: 'Сохранить',
  firstInput: 'edit-form__item_el_name',
  secondInputType: 'url',
  secondInput: 'edit-form__item_el_url',
  placeholderFirstInput: 'Название',
  placeholderSecondInput: 'Ссылка на картинку',
}]

function openPopup(popupContent) {
  popup.cloneNode(true)
  popup.querySelector('.popup__heading').textContent = popupContent.heading;
  popup.querySelector('.edit-form').name = popupContent.name;
  popup.querySelector('.edit-form__btn_type_submit').textContent = popupContent.button;
  popup.querySelector('.edit-form__btn_type_submit')['aria-label'] = popupContent.button;
  const editFormInputFirst = popup.querySelector('.edit-form__input_first')
  editFormInputFirst.classList.add(popupContent.firstInput);
  editFormInputFirst.placeholder = popupContent.placeholderFirstInput;
  editFormInputFirst.value = ''
  const editFormInputSecond = popup.querySelector('.edit-form__input_second')
  editFormInputSecond.classList.add(popupContent.secondInput);
  editFormInputSecond.placeholder = popupContent.placeholderSecondInput;
  editFormInputSecond.type = popupContent.secondInputType
  editFormInputSecond.value = ''

  
  if (popupContent.name === 'editProfile') {
    let newName = popup.querySelector(".edit-form__item_el_name");
    let newDescription = popup.querySelector(".edit-form__item_el_description");
    newName.value = userName.textContent;
    newDescription.value = description.textContent;
}
  popup.classList.add('popup_open');
  mainBlock.append(popup);  
}

function closePopup(evt) {
  evt.preventDefault();
  popup.classList.remove('popup_open');
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  if (editForm.name === 'editProfile') {
    let newName = popup.querySelector(".edit-form__item_el_name");
    let newDescription = popup.querySelector(".edit-form__item_el_description");
    console.log(newName, newDescription)
    userName.textContent = newName.value;
    description.textContent = newDescription.value;
  }
  if (editForm.name === 'addCard') {
    let newName = popup.querySelector('.edit-form__item_el_name').value
    let newUrl = popup.querySelector('.edit-form__item_el_url').value
    let newCard = {
      name: newName,
      link: newUrl, 
    }
    console.log(newCard)
    createCard(newCard)
  }
  closePopup(evt);
}

function createCard(card) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true)
  cardElement.querySelector('.card__img').src = card.link;
  cardElement.querySelector('.card__img').alt = card.name;
  cardElement.querySelector('.card__title').textContent = card.name;
  cards.append(cardElement);

  
}

initialCards.forEach(card => {
  createCard(card);
  })



function deleteCard(deleteCardButton) {
  const cardItem = deleteCardButton.parentNode;
  cardItem.remove();
}


function likeCard(likeButton) {
  console.log(likeButton)
  if (!likeButton.classList.contains('card__button_like_active')) {
    likeButton.classList.add('card__button_like_active');
  } else if (likeButton.classList.contains('card__button_like_active')) {
    likeButton.classList.remove('card__button_like_active');
  }
}


const likeButtons = document.querySelectorAll(".card__button_like")

likeButtons.forEach((likeButton) => {
  likeButton.addEventListener('click', () => {likeCard(likeButton)
})})


const deleteCardButtons = document.querySelectorAll('.card__button_delete')
deleteCardButtons.forEach((deleteCardButton) => {
  deleteCardButton.addEventListener('click', () => {deleteCard(deleteCardButton)})
  
})

editButton.addEventListener('click', () => openPopup(popups[0]))
closeButton.addEventListener('click', closePopup)
editForm.addEventListener('submit', handleProfileFormSubmit);

addCardButton.addEventListener('click', () => openPopup(popups[1]))