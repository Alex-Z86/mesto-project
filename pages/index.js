/* Объявляем функцию открытия для всех попапов */
function openPopup(popup) {
  popup.classList.add('popup_opened');
};
/* Объявляем функцию закрытия для всех попапов */
function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

const infoProfile = document.querySelector('.profile__info');
const nameProfile = infoProfile.querySelector('.profile__name');
const jobProfile = infoProfile.querySelector('.profile__status');
const profileForm = document.forms["profile-form"];
const nameInput = profileForm.querySelector('.form__item_el_name');
const jobInput = profileForm.querySelector('.form__item_el_status');

/* Выбираем элементы, необходимые для реализации открытия и закрытия модального окна редактирования профиля */
const editProfilePopup = document.querySelector('.popup__edit-profile');
const editProfileButton = document.querySelector('.profile__edit-button');
/* Вешаем слушатель клика на кнопку открытия модального окна редактирования профиля */
editProfileButton.addEventListener('click', () => {
  openPopup(editProfilePopup);
  /* При открытии модального окна присваиваем полям input значения, которые отображаются на странице */
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
});

/* Объявляем функцию отправки формы редактирования профиля */
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  closePopup(editProfilePopup);

  /* Присваиваем полям профиля значения, введенные в форме */
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
}
/* Вешаем слушатель события */
profileForm.addEventListener('submit', handleProfileFormSubmit);

/* Выбираем элементы для реализации открытия и закрытия попапа для добавления карточки */
const addCardPopup = document.querySelector('.popup__add-card');
const addButton = document.querySelector('.profile__add-button');
/* Вешаем слушатель клика на кнопку открытия модального окна добавления карточки */
addButton.addEventListener('click', () => openPopup(addCardPopup));

/* Вешаем слушателeЙ клика на кнопки закрытия всех попапов */
const closeButtons = document.querySelectorAll('.popup__close-icon');
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

/* Выбираем элементы, необходимые для создания карточек */
const elementsList = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('#card').content;
const elementTemplate = cardTemplate.querySelector('.element');
const popupFotoView = document.querySelector('.popup__foto-view');
const popupFotoImage = document.querySelector('.popup__foto-image');
const popupFotoName = document.querySelector('.popup__foto-name');


 /* Объявляем функцию создания карточек, клонирующую template-элемент */
function createCard(elementName, elementLink) {
const cardElement = elementTemplate.cloneNode(true);
const titleElement = cardElement.querySelector('.element__title');
const imageElement = cardElement.querySelector('.element__image');
   
/* Элементу передаем значения для создания карточек */
titleElement.textContent = elementName;
imageElement.src = elementLink;
imageElement.alt = elementName;
 
/* Вешаем на изображение карточки слушатель клика, открывающий попап просмотра изображения */
imageElement.addEventListener('click', function() {
  openPopup(popupFotoView);
  popupFotoName.textContent = elementName;
  popupFotoImage.src = elementLink;
  popupFotoImage.alt = elementName;
}); 
 
/* Вешаем слушатель клика на элемент "лайка" и объявляем функцию, отслеживающую этот "лайк" */
cardElement.querySelector('.element__button-heart').addEventListener('click', function(evt) {
  evt.target.classList.toggle('element__button-heart_active');
});
 
/* Вешаем слушатель клика на кнопку удаления карточки и объявляем функцию удаления карточки */
cardElement.querySelector('.element__delete-icon').addEventListener('click', function() {
  cardElement.remove();
});
 
return cardElement
};   


function addElement(elementName, elementLink) {
  const elementCard = createCard(elementName, elementLink)
  elementsList.prepend(elementCard);
};
  
/* Для добавления 6-ти карточек при загрузке, проходим по элементам массива */
initialCards.forEach(function (item) {
  addElement(item.name, item.link);
});

/* Выбираем элементы для передачи значений */
const cardForm = document.forms["card-form"];
const titleInput = cardForm.querySelector('.form__item_el_title');
const linkInput = cardForm.querySelector('.form__item_el_link');
/* Объявляем функцию отправки формы добавления карточки */
function handleAddFormSubmit(evt) {
  evt.preventDefault();
  closePopup(addCardPopup);
  
  addElement(titleInput.value, linkInput.value);
  evt.target.reset();
};
/* Вешаем слушатель события */
cardForm.addEventListener('submit', handleAddFormSubmit);