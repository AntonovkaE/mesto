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
    addAvatarForm,
    userAvatar,
    buttonChangeAvatar,
    popupEditProfileSubmit,
} from "../utils/constants.js";

import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo";
import Api from "../components/Api";

import {FormValidator} from "../components/FormValidator.js";

import {Card} from "../components/Card.js";
import "../pages/index.css";
import PopupConfirmation from "../components/PopupConfirmation.js";

const {
    addCardSelector,
    editFormSelector,
    openImageSelector,
    deleteCardSelector,
    changeAvatarSelector,
} = popupConfig;

//Спасибо за рекомендацию с валидайией формы, постараюсь реализвать после сдачи
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


Promise.all([api.getUserData(), api.getInitialCards()])
    .then(([userData, cards]) => {
        user.setUserInfo(userData)
        userId = userData._id;

        const initialCards = cards.map(item => ({
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
                    const card = new Card(
                        item,
                        "#card",
                        user._id,
                        api,
                        () => {
                            popupOpenImage.open(item.link, item.name);

                        },
                        (id) => {
                            popupDeleteCard.open(id);
                        },
                    );
                    return card.generateCard();
                },
            },
            selectorCardList
        );
        cardsList.renderItems()
    })
    .catch(err => {
        console.log(err)
    });

const user = new UserInfo(
    ".profile__name",
    ".profile__description",
    ".profile__avatar",
    userId
);


const popupDeleteCard = new PopupConfirmation(deleteCardSelector, api);
popupDeleteCard.setEventListeners();

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();
addAvatarValidator.enableValidation();

const popupOpenImage = new PopupWithImage(openImageSelector);
popupOpenImage.setEventListeners();


const popupEditForm = new PopupWithForm(editFormSelector,
    ({nameInput, descriptionInput}) => {
        return (api.saveUserData(nameInput, descriptionInput)
            .then(res => {
                user.setUserInfo(res)
                return res
            }))
    })
popupEditForm.setEventListeners();

const popupAddCard = new PopupWithForm(
    addCardSelector,
    ({placeInput, urlInput}) => {
        return (api.saveNewCard(placeInput, urlInput, [])
            .then((res) => {
                cardsList.addItemToTop({name: placeInput, link: urlInput, likes: res.likes, id: res._id},
                    "#card",
                    user._id,
                    api,
                );
                return res
            })
        )
    }
)
popupAddCard.setEventListeners();


const popupChangeAvatar = new PopupWithForm(
    changeAvatarSelector,
    ({avatarInput}) => {

        return (api.changeAvatar(avatarInput)
            .then(res => {
            user.setAvatar(avatarInput)
            return res
        }))
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

buttonChangeAvatar.addEventListener("click", () => {
    addAvatarValidator.resetErrors();
    addAvatarValidator.toggleButtonState();
    popupChangeAvatar.open();
});


