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
} from "./constants";

import { closePopup } from "./modal.js";
import { addElement } from "./card.js";
import { enableValidation, toggleButtonState } from "./validate.js";
import { settingsObject } from "./utils.js";

/* Объявляем функцию отправки формы редактирования профиля */
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  closePopup(editProfilePopup);

  /* Присваиваем полям профиля значения, введенные в форме */
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
}
/* Вешаем слушатель события */
profileForm.addEventListener("submit", handleProfileFormSubmit);

/* Объявляем функцию отправки формы добавления карточки */
function handleAddFormSubmit(evt) {
  evt.preventDefault();
  closePopup(addCardPopup);

  addElement(titleInput.value, linkInput.value);
  evt.target.reset();

  addCardSubmit.setAttribute("disabled", true);
  addCardSubmit.classList.add(settingsObject.inactiveButtonClass);
}
/* Вешаем слушатель события */
cardForm.addEventListener("submit", handleAddFormSubmit);

enableValidation(settingsObject);
