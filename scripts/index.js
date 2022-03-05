const editButton = document.querySelector(".profile__button_type_edit")
const addCardButton = document.querySelector('.profile__button_type_add')

const userName = document.querySelector(".profile__name")
const description = document.querySelector(".profile__description")

const cardTemplate = document.querySelector('#card').content;
const cards = document.querySelector('.cards')

const mainBlock = document.querySelector('.page__main')

const popupOpenImage = document.querySelector('.popup_openImage')
const popupImage = popupOpenImage.querySelector('.popup__img')
const closeButtonPopupImage = popupOpenImage.querySelector('.popup__button_type_close');
const popupCaption = popupOpenImage.querySelector('.popup__caption')

const popupAddCard = document.querySelector('.popup_addCard')
const closeButtonPopupAddCard = popupAddCard.querySelector('.popup__button_type_close');
const addForm = popupAddCard.querySelector('.form');
const inputCardTitle = popupAddCard.querySelector('.form__item_el_name');
const inputCardLink = popupAddCard.querySelector('.form__item_el_url');

const popupEditForm = document.querySelector('.popup_editForm')
const inputName = popupEditForm.querySelector(".form__item_el_name");
const inputDescription = popupEditForm.querySelector(".form__item_el_description");
const closeButtonEditForm = popupEditForm.querySelector('.popup__button_type_close');
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
  enableValidation(); 
  addForm.reset()
  openPopup(popupEditForm); 
}

function openEditFormPopup(popupEditForm) {
  enableValidation(); 
  inputName.value = userName.textContent;
  inputDescription.value = description.textContent;
  openPopup(popupEditForm); 
}

function closePopup(popup) {
  popup.classList.remove('popup_open');
  
}

function handleProfileFormSubmit(event) {
  event.preventDefault();
  userName.textContent = inputName.value;
  description.textContent = inputDescription.value;
  closePopup(popupEditForm);
}

function handleAddCardFormSubmit(event) {
  event.preventDefault();
  const newCard = {
    name: inputCardTitle.value,
    link: inputCardLink.value, 
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

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    showInputError(formElement, inputElement, inputElement.validity);
  } else {
    // hideInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(formElement, inputElement);
  }
}; 

const showInputError = (formElement, inputElement, error) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__item_type_error');
  if (error.valueMissing) {
    errorElement.textContent = "Вы пропустили это поле."
  };
  if (error.typeMismatch) {
    errorElement.textContent = "Введите адрес сайта."
  };
  if (error.tooShort) {
    errorElement.textContent = "Минимальная длина 2 символа."
  };
  errorElement.classList.add('form__item-error_active');
};

const hideInputError = (formElement, inputElement) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.remove('form__item_type_error');
  errorElement.classList.remove('form__item-error_active');
  errorElement.textContent = '';
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};


const toggleButtonState = (inputList, buttonElement) => {
  if(hasInvalidInput(inputList)) {
    buttonElement.classList.add('form__submit_inactive');
  } else {
    buttonElement.classList.remove('form__submit_inactive')
  }
}

// function isEmpty(elem) {
//   console.log(elem)
//   return elem.value == "";
// }

const setFormEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(`.form__item`));
  const buttonElement = formElement.querySelector('.form__submit');
  if (formElement == addForm) {
    toggleButtonState(inputList, buttonElement);
  }
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}; 

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setFormEventListeners(formElement);
  });
};






renderCards(initialCards);

editButton.addEventListener('click', () => openEditFormPopup(popupEditForm))

addCardButton.addEventListener('click', () => openAddCardPopup(popupAddCard))

addForm.addEventListener('submit', handleAddCardFormSubmit);

editForm.addEventListener('submit', handleProfileFormSubmit);

closeButtonPopupImage.addEventListener('click', () => closePopup(popupOpenImage))
closeButtonPopupAddCard.addEventListener('click', () => closePopup(popupAddCard))
closeButtonEditForm.addEventListener('click', () => closePopup(popupEditForm))