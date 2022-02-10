let closeButton = document.querySelector(".popup__button_type_close")
let editForm = document.querySelector(".edit-form")
let editButton = document.querySelector(".profile__button_type_edit")
let popup = document.querySelector(".popup");
let userName = document.querySelector(".profile__name")
let description = document.querySelector(".profile__description")
let newName = document.querySelector(".edit-form__item_el_name");
let newDescription = document.querySelector(".edit-form__item_el_description");
let likeButtons = document.querySelectorAll(".card__button_like")
let popupContainer = document.querySelector(".popup__container")

function openPopup(evt) {
  evt.preventDefault();
  popup.classList.remove('popup_hidden');
  popup.classList.add('popup_open');
  newName.value = userName.textContent;
  newDescription.value = description.textContent;
  popupContainer.classList.add('popup__container_open')
  popupContainer.classList.remove('popup__container_hidden')
}

function closePopup(evt) {
  evt.preventDefault();
  popup.classList.remove('popup_open');
  popup.classList.add('popup_hidden')
  popupContainer.classList.remove('popup__container_open')
  
}

function submitPopup(evt) {
  evt.preventDefault();
  userName.textContent = newName.value;
  description.textContent = newDescription.value;
  closePopup(evt);
}


editButton.addEventListener('click', openPopup)
closeButton.addEventListener('click', closePopup)
editForm.addEventListener('submit', submitPopup)


for (let i = 0; i < likeButtons.length; i++) {
  let likeButton = likeButtons[i];
  likeButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    if (!likeButton.classList.contains('card__button_like_active')) {
      likeButton.classList.add('card__button_like_active');
    } else if (likeButton.classList.contains('card__button_like_active')) {
      likeButton.classList.remove('card__button_like_active');
    }
  });
}