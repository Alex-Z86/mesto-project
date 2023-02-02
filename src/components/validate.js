/* Функция, показывающая элемент ошибки */
const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

/* Функция, скрывающая элемент ошибки */
const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
};

/* Функция, проверяющая валидность поля */
const isValid = (formElement, inputElement, config) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

/* Функция, проверяющая наличие невалидного поля */
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

/* Функция, изменяющая состояние кнопки отправки данных в зависимости от колбэка hasInvalidInput */
export const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};

/* Функция, добавляющая обработчики события "инпут" всем полям ввода */
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  ); // Создаем массив из всех полей
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config); // Вызываем функцию, чтобы кнопка была не активной до ввода текста

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config); // Кнопка будет активной, если оба поля валидны
    });
  });
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector)); // Создаем массив из всех форм
  formList.forEach((formElement) => {
    // Перебираем полученную коллекцию и для каждой формы вызываем setEventListeners
    setEventListeners(formElement, config);
  });
};

export { enableValidation };

/* Функция для удаления ошибок при закрытии попапа без отправки формы */
function resetError(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  inputList.forEach((inputElement) =>
    hideInputError(formElement, inputElement, config)
  );
  toggleButtonState(formElement, inputList, config);
}

export { resetError };
