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

//
// const getCards = api
//   .getInitialCards()
//   .then((result) => {
//     const initialCards = result.map((item) => ({
//       name: item.name,
//       link: item.link,
//       likes: item.likes,
//       id: item._id,
//       owner: item.owner._id,
//     }));
//     cardsList = new Section(
//       {
//         item: initialCards,
//         renderer: (item) => {
//           const card = new Card(
//               item,
//               "#card",
//               user,
//               api,
//               () => {
//                 popupOpenImage.open(item.link, item.name);
//
//               },
//               (id) => {
//                 popupDeleteCard.open(id);
//               },
//           );
//           return card.generateCard();
//         },
//       },
//       selectorCardList
//     );
//     // cardsList.addItem();
//     cardsList.renderItems();
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// const getUserData = api.getUserData().
//     then(result => {
//     userName.textContent = result.name;
//     description.textContent = result.about;
//     userAvatar.src = result.avatar;
//     userId = result._id;
//     return result
// }).then(res => {
//    = new UserInfo(
//       ".profile__name",
//       ".profile__description",
//       ".profile__avatar",
//       userId
//   );
// })

Promise.all([api.getUserData(), api.getInitialCards()])
    .then(res => {
        let [userData, cards] = res;
        return [userData, cards]
    })
    .then(([userData, cards]) => {
        userName.textContent = userData.name;
        description.textContent = userData.about;
        userAvatar.src = userData.avatar;
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
                        userId,
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
// function createCard(cardData, selector, user) {
//   const card = new Card(
//     cardData,
//     selector,
//     user,
//     api,
//     () => {
//       popupOpenImage.open(cardData.link, cardData.name);
//
//     },
//     (id) => {
//       popupDeleteCard.open(id);
//
//     },
//   );
//   return card.generateCard();
// }

const popupDeleteCard = new PopupConfirmation(deleteCardSelector, api);
popupDeleteCard.setEventListeners();
popupDeleteCard.setEventListeners();

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();
addAvatarValidator.enableValidation();

const popupOpenImage = new PopupWithImage(openImageSelector);
popupOpenImage.setEventListeners();


const popupEditForm = new PopupWithForm(editFormSelector,
    ({nameInput, descriptionInput, avatar, _id}) => {
        user.setUserInfo({nameInput, descriptionInput, avatar, _id});
        return (api.saveUserData(nameInput, descriptionInput)
            .then(res => {
                console.log(res)
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
                    userId,
                    api,
                );
                return res
            })
            .then((res) => {
                return res
            }))
    }
)
popupAddCard.setEventListeners();


const popupChangeAvatar = new PopupWithForm(
    changeAvatarSelector,
    ({avatarInput}) => {
        api.changeAvatar(avatarInput)
            .then((res) => {
                popupChangeAvatar.close();
                return res
            })
            .then(res => {
                console.log(res)
                return res
            })
        // userAvatar.src = avatarInput
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


