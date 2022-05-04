import {
  validatorSetting,
  buttonTypeEdit,
  buttonAddCard,
  addCardPopupSubmitButton,
  userName,
  description,
  formAddCard,
  inputName,
  inputDescription,
  formEditProfile,
  selectorCardList,
  popupConfig,
  addAvatarForm,
  userAvatar,
  buttonChangeAvatar,
  popupEditProfileSubmit
} from "../utils/constants.js";

import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo";
import Api from "../components/api";

import { FormValidator } from "../components/FormValidator.js";

import { Card } from "../components/Card.js";
import "../pages/index.css";
import PopupWithChoice from "../components/PopupWithChoice.js";
const {
  addCardSelector,
  editFormSelector,
  openImageSelector,
  deleteCardSelector,
  changeAvatarSelector,
} = popupConfig;

const editFormValidator = new FormValidator(validatorSetting, formEditProfile);
const addCardFormValidator = new FormValidator(validatorSetting, formAddCard);
const addAvatarValidator = new FormValidator(validatorSetting, addAvatarForm)

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-40",
  headers: {
    authorization: "242a0c65-83ea-4aa5-aad5-7b82cd182540",
    "Content-Type": "application/json",
  },
});

let userId;



let cardsList;
api
  .getInitialCards()
  .then((result) => {
    const initialCards = result.map((item) => ({
      name: item.name,
      link: item.link,
      likes: item.likes,
      id: item._id,
      owner: item.owner._id,
    }));
    cardsList = new Section(
      {
        item: initialCards,
        renderer: (item) => {
          cardsList.addItem(createCard(item, "#card", user, api));
        },
      },
      selectorCardList
    );
    cardsList.renderItems();
  })
  .catch((err) => {
    console.log(err); 
  });

api.getUserData().then((result) => {
  userName.textContent = result.name;
  description.textContent = result.about;
  userAvatar.src = result.avatar;
  userId = result._id;
});



function createCard(cardData, selector, user) {
  const card = new Card(
    cardData,
    selector,
    user,
    api,
    () => {
      popupOpenImage.open(cardData.link, cardData.name);
      
    },
    () => {
      const popupDeleteCard = new PopupWithChoice(deleteCardSelector, api, card);
      popupDeleteCard.open();
      popupDeleteCard.setEventListeners();
      
    }
  );
  return card.generateCard();
}

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();
addAvatarValidator.enableValidation();

const popupOpenImage = new PopupWithImage(openImageSelector);
popupOpenImage.setEventListeners();

const user = new UserInfo(
  ".profile__name",
  ".profile__description",
  api,
  userId
);

const popupEditForm = new PopupWithForm(editFormSelector, (formData) => {
  user.setUserInfo(formData);
  api.saveUserData(formData.nameInput, formData.descriptionInput, popupEditForm, popupEditProfileSubmit)
});
popupEditForm.setEventListeners();

const popupAddCard = new PopupWithForm(
  addCardSelector,
  ({ placeInput, urlInput }) => {
    api.saveNewCard(placeInput, urlInput, [])
    .then((res) => {addCardPopupSubmitButton.textContent = "Сохранение...";
  return res} 
    )

    .then((res) => {
      cardsList.addItemToTop(
        createCard(
          { name: placeInput, link: urlInput, likes: res.likes, id: res._id },
          "#card",
          user,
          api
        )
      );
      return res
    })
    .then((res) => {popupAddCard.close() 
    return res})
  //   .then((res) => {addCardPopupSubmitButton.textContent = "Создать";
  // return res})
    // .then((res) => {
    //   addCardPopupSubmitButton.textContent = "Сохранить";
    //   return res
    // })

  }
);
popupAddCard.setEventListeners();




const popupChangeAvatar = new PopupWithForm(
  changeAvatarSelector,
  ({ avatarInput }) => {
    api.changeAvatar(avatarInput);
    userAvatar.src = avatarInput
  }
);
popupChangeAvatar.setEventListeners();

buttonTypeEdit.addEventListener("click", () => {
  inputName.value = userName.textContent;
  inputDescription.value = description.textContent;
  editFormValidator.resetErrors();
  editFormValidator.toggleButtonState();

  popupEditForm.open();
  popupEditProfileSubmit.textContent = "Сохранить"
});

buttonAddCard.addEventListener("click", () => {
  addCardPopupSubmitButton.textContent="Создать";
  popupAddCard.open();
  addCardFormValidator.resetErrors();
  addCardFormValidator.toggleButtonState();
});

buttonChangeAvatar.addEventListener("click", () => {
  addAvatarValidator.resetErrors();
  addAvatarValidator.toggleButtonState();
  popupChangeAvatar.open();

});

export { userId };
