import {
  nameProfile,
  jobProfile,
  nameInput,
  jobInput,
  editProfilePopup,
  editProfileButton,
  addCardPopup,
  addButton,
  popupList,
} from "./constants";

/* Объявляем функцию открытия для всех попапов */
function openPopup(popup) {
  popup.classList.add("popup_opened");
}
/* Объявляем функцию закрытия для всех попапов */
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

export { openPopup, closePopup };

/* Вешаем слушатель клика на кнопку открытия модального окна редактирования профиля */
editProfileButton.addEventListener("click", () => {
  openPopup(editProfilePopup);
  /* При открытии модального окна присваиваем полям input значения, которые отображаются на странице */
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
});

/* Вешаем слушатель клика на кнопку открытия модального окна добавления карточки */
addButton.addEventListener("click", () => openPopup(addCardPopup));

/* Вешаем слушателeЙ клика на кнопки закрытия всех попапов */
const closeButtons = document.querySelectorAll(".popup__close-icon");
closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

/* Реализуем закрытие попапов нажатием на Esc и нажатием на оверлей */
popupList.forEach((popupElement) => {
  /* Вешаем слушателя события "нажатие кнопки Esc" для закрытия попапа */
  document.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape") {
      closePopup(popupElement);
    }
  });
  /* Вешаем слушателя события "клик на оверлей" для закрытия попапа */
  document.addEventListener("click", function (evt) {
    if (evt.target === popupElement) {
      closePopup(popupElement);
    }
  });
});
