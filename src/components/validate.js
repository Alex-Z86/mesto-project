/* Функция, показывающая элемент ошибки */
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("form__item_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__item-error_active");
};

/* Функция, скрывающая элемент ошибки */
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("form__item_type_error");
  errorElement.classList.remove("form__item-error_active");
  errorElement.textContent = "";
};

/* Функция, проверяющая валидность поля */
const isValid = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

/* Функция, проверяющая наличие невалидного поля */
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

/* Функция, изменяющая состояние кнопки отправки данных в зависимости от колбэка hasInvalidInput */
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add("form__button_inactive");
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove("form__button_inactive");
  }
};

/* Функция, добавляющая обработчики события "инпут" всем полям ввода */
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".form__item")); // Создаем массив из всех полей
  const buttonElement = formElement.querySelector(".form__button");

  toggleButtonState(inputList, buttonElement); // Вызываем функцию, чтобы кнопка была не активной до ввода текста

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement); // Кнопка будет активной, если оба поля валидны
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".form")); // Создаем массив из всех форм
  formList.forEach((formElement) => {
    // Перебираем полученную коллекцию и для каждой формы вызываем setEventListeners
    setEventListeners(formElement);
  });
};

export { enableValidation };
