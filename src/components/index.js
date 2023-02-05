import "../pages/index.css";

import {
  nameProfile,
  jobProfile,
  profileForm,
  nameInput,
  jobInput,
  editProfilePopup,
  addCardPopup,
  cardForm,
  titleInput,
  linkInput,
  addCardSubmit,
  editAvatarPopup,
  avatarSubmit,
  avatarForm,
  avatarLinkInput,
  avatarProfile,
  profileFormSubmit,
} from "./constants";

import { closePopup, showSaving, hideSaving } from "./modal.js";
import { addElement } from "./card.js";
import { enableValidation } from "./validate.js";
import { settingsObject } from "./utils.js";
import { editProfileData, addNewCard, editProfileAvatar } from "./api";

/* Объявляем функцию отправки формы редактирования профиля */
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  showSaving(profileFormSubmit);

  editProfileData(nameInput.value, jobInput.value)
    .then((data) => {
      nameProfile.textContent = data.name;
      jobProfile.textContent = data.about;
      closePopup(editProfilePopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      hideSaving(profileFormSubmit);
    });
}
/* Вешаем слушатель события */
profileForm.addEventListener("submit", handleProfileFormSubmit);

/* Объявляем функцию отправки формы добавления карточки */
function handleAddFormSubmit(evt) {
  evt.preventDefault();

  showSaving(addCardSubmit);

  addNewCard(titleInput.value, linkInput.value)
    .then((data) => {
      addElement(
        data.name,
        data.link,
        data.likes,
        data.likes,
        data._id,
        data.owner._id
      );
      closePopup(addCardPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      evt.target.reset();
      addCardSubmit.setAttribute("disabled", true);
      addCardSubmit.classList.add(settingsObject.inactiveButtonClass);
      hideSaving(addCardSubmit);
    });
}

/* Вешаем слушатель события */
cardForm.addEventListener("submit", handleAddFormSubmit);

/* Объявляем функцию отправки формы редактирования аватара */
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();

  showSaving(avatarSubmit);

  editProfileAvatar(avatarLinkInput.value)
    .then((data) => {
      avatarProfile.src = data.avatar;
      closePopup(editAvatarPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      evt.target.reset();
      avatarSubmit.setAttribute("disabled", true);
      avatarSubmit.classList.add(settingsObject.inactiveButtonClass);
      hideSaving(avatarSubmit);
    });
}
/* Вешаем слушатель события */
avatarForm.addEventListener("submit", handleAvatarFormSubmit);

enableValidation(settingsObject);
