import {
  validatorSetting,
  buttonTypeEdit,
  buttonAddCard,
  userName,
  description,
  formAddCard,
  inputName,
  inputDescription,
  formEditProfile,
  selectorCardList,
  popupConfig,
  userAvatar,
  buttonChangeAvatar
} from "../utils/constants.js";

import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo";
import Api from "../components/api";

import { FormValidator } from "../components/FormValidator.js";

import { Card } from "../components/Card.js";
import "../pages/index.css";
const { addCardSelector, editFormSelector, openImageSelector, deleteCardSelector, changeAvatarSelector } = popupConfig;

const editFormValidator = new FormValidator(validatorSetting, formEditProfile);
const addCardFormValidator = new FormValidator(validatorSetting, formAddCard);

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-40",
  headers: {
    authorization: "242a0c65-83ea-4aa5-aad5-7b82cd182540",
    "Content-Type": "application/json",
  },
});

// console.log(api)

let cardsList;
api
  .getInitialCards()
  .then((result) => {
    const initialCards = result.map((item) => ({ name: item.name, link: item.link, likes: item.likes, id: item._id})
  )
    cardsList = new Section(
      {
        item: initialCards,
        renderer: (item) => {
          cardsList.addItem(
            createCard(item, "#card", user, api)
          );
        },
      },
      selectorCardList
    );
    cardsList.renderItems();
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

api.getUserData().then((result) => {
  userName.textContent = result.name;
  description.textContent = result.about;
  userAvatar.src = result.avatar;
});

// fetch("https://mesto.nomoreparties.co/v1/cohort-40/cards", {
//   headers: {
//     authorization: "242a0c65-83ea-4aa5-aad5-7b82cd182540",
//   },
// })
//   .then((res) => res.json())
//   .then((result) => {
//     console.log(result);
//   });

// fetch('https://nomoreparties.co/v1/cohort-40/users/me', {
//       headers: {
//         authorization: "242a0c65-83ea-4aa5-aad5-7b82cd182540",
//       },
//     })
//     .then(res => res.json())
//     .then((result) => {
//       console.log(result);
//     });

function createCard(cardData, selector, user) {
  const card = new Card(cardData, selector, user, api, () => {
    popupOpenImage.open(cardData.link, cardData.name);
  }, () => popupDeleteCard.open());
  return card.generateCard();
}

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();

const popupOpenImage = new PopupWithImage(openImageSelector);
popupOpenImage.setEventListeners();


const user = new UserInfo(".profile__name", ".profile__description", api);

const popupEditForm = new PopupWithForm(editFormSelector, (formData) => {
  user.setUserInfo(formData);
});
popupEditForm.setEventListeners();

const popupAddCard = new PopupWithForm(
  addCardSelector,
  ({ placeInput, urlInput }) => {
    cardsList.addItemToTop(createCard({name: placeInput, link: urlInput, likes: []}, "#card", user, api));

    api.saveNewCard(placeInput, urlInput, []);
  }
);
popupAddCard.setEventListeners();

const popupDeleteCard = new PopupWithForm(
  deleteCardSelector, 
  () => {
    // card.handleDelete()

  }
)
popupDeleteCard.setEventListeners();

const popupChangeAvatar = new PopupWithForm(
  changeAvatarSelector,
  ({avatarInput}) => {
    api.changeAvatar(avatarInput)
  }
);
popupChangeAvatar.setEventListeners();


buttonTypeEdit.addEventListener("click", () => {
  inputName.value = userName.textContent;
  inputDescription.value = description.textContent;
  editFormValidator.resetErrors();
  editFormValidator.toggleButtonState();
  popupEditForm.open();
});

buttonAddCard.addEventListener("click", () => {
  popupAddCard.open();
  addCardFormValidator.resetErrors();
  addCardFormValidator.toggleButtonState();
});


buttonChangeAvatar.addEventListener("click", () =>{
  popupChangeAvatar.open()
}) 