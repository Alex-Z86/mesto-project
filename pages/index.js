/* Выбираем элементы, необходимые для реализации открытия и закрытия модального окна редактирования профиля */
const editProfilePopup = document.querySelector('.popup__edit-profile');
const editButton = document.querySelector('.profile__edit-button');
const infoProfile = document.querySelector('.profile__info');
const nameProfile = infoProfile.querySelector('.profile__name');
const jobProfile = infoProfile.querySelector('.profile__status');
const formElement = document.querySelector('.form__edit-form');
const nameInput = formElement.querySelector('.form__item_el_name');
const jobInput = formElement.querySelector('.form__item_el_status');
const editProfileCloseButton = document.querySelector('.popup__edit-profile-close-icon');
/* Объявляем функцию открытия/закрытия модального окна редактирования профиля */
function openClosePopup () {
  editProfilePopup.classList.toggle('popup_opened');
  /* При открытии модального окна присваиваем полям input значения, которые отображаются на странице */
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
};
/* Вешаем слушатель клика на кнопки открытия и закрытия модального окна  редактирования профиля */
editButton.addEventListener('click', openClosePopup);
editProfileCloseButton.addEventListener('click', openClosePopup);

/* Выбираем элемент для реализации закрытия модального окна редактирования профиля при нажатии на кнопку сохранения */
const saveEditProfileButton = document.querySelector('.form__edit-profile-button');
function closePopup () {
  editProfilePopup.classList.remove('popup_opened');
};
/* Вешаем слушатель клика на кнопку сохранения формы */
saveEditProfileButton.addEventListener('click', closePopup);

/* Объявляем функцию отправки формы редактирования профиля */
function handleFormSubmit(evt) {
    evt.preventDefault();
    /* Присваиваем полям профиля значения, введенные в форме */
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
}
/* Вешаем слушатель события на кнопку отправки формы */
formElement.addEventListener('submit', handleFormSubmit);

/* Выбираем элементы, необходимые для создания карточек */
const elementsList = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('#card').content;
const elementTemplate = cardTemplate.querySelector('.element');
const popupFotoView = document.querySelector('.popup__foto-view');
const popupFotoImage = document.querySelector('.popup__foto-image');
const popupFotoName = document.querySelector('.popup__foto-name');
/* Объявляем функцию, клонирующую template-элемент */
function addElement(elementName, elementLink) {
    const elementCard = elementTemplate.cloneNode(true);
    /* Элементу передаем значения для создания карточек */
    elementCard.querySelector('.element__title').textContent = elementName;
    elementCard.querySelector('.element__image').src = elementLink;
    elementCard.querySelector('.element__image').alt = elementName;

    /* Вешаем на изображение карточки слушатель клика, открывающий попап просмотра изображения */
    elementCard.querySelector('.element__image').addEventListener('click', function() {
      popupFotoView.classList.toggle('popup_opened');
      popupFotoName.textContent = elementName;
      popupFotoImage.src = elementLink;
      popupFotoImage.alt = elementName;
    }); 

    /* Вешаем слушатель клика на элемент "лайка" и объявляем функцию, отслеживающую этот "лайк" */
    elementCard.querySelector('.element__button-heart').addEventListener('click', function(evt) {
      evt.target.classList.toggle('element__button-heart_active');
    });

    /* Вешаем слушатель клика на кнопку удаления карточки и объявляем функцию удаления карточки */
    elementCard.querySelector('.element__delete-icon').addEventListener('click', function() {
      elementCard.remove();
    });

    /* Помещаем созданную карточку в начало контейнера с карточками */
    elementsList.prepend(elementCard);
};
/* Для добавления 6-ти карточек при загрузке, проходим по элементам массива */
initialCards.forEach(function (item) {
    addElement(item.name, item.link);
});

/* Выбираем элементы для реализации открытия и закрытия попапа для добавления карточки */
const popupAddCard = document.querySelector('.popup__add-card');
const addButton = document.querySelector('.profile__add-button');
const closeAddCardButton = document.querySelector('.popup__add-card-close-icon');
const saveAddCardButton = document.querySelector('.form__add-card-button');
/* Объявляем функцию открытия/закрытия попапа */
function openCloseAddCardPopup () {
  popupAddCard.classList.toggle('popup_opened');
}
/* Вешаем слушатель клика на кнопки открытия/закрытия попапа */
addButton.addEventListener('click', openCloseAddCardPopup);
closeAddCardButton.addEventListener('click', openCloseAddCardPopup);
saveAddCardButton.addEventListener('click', openCloseAddCardPopup);
/* Выбираем элементы для передачи значений */
const addFormElement = document.querySelector('.form__add-form');
const titleInput = addFormElement.querySelector('.form__item_el_title');
const linkInput = addFormElement.querySelector('.form__item_el_link');
/* Объявляем функцию отправки формы добавления карточки */
function addFormSubmit(evt) {
    evt.preventDefault();
    
    addElement(titleInput.value, linkInput.value);
}
/* Вешаем слушатель события на кнопку отправки формы */
addFormElement.addEventListener('submit', addFormSubmit);

/* Выбираем элемент для реализации открытия/закрытия попапа для просмотра карточек */
const closeFotoViewButton = document.querySelector('.popup__foto-view-close-icon');
/* Объявляем функцию открытия/закрытия попапа */
function openCloseFotoViewPopup () {
  popupFotoView.classList.toggle('popup_opened');
}
/* Вешаем слушатель клика на кнопку закрытия формы */
closeFotoViewButton.addEventListener('click', openCloseFotoViewPopup);