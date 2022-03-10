const isValid = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    showInputError(formElement, inputElement, inputElement.validity, inputErrorClass, errorClass);
  } else {
    // hideInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
}; 

const handleFormSubmit = (evt) => {
  evt.preventDefault();
}

const showInputError = (formElement, inputElement, error, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  if (error.valueMissing) {
    errorElement.textContent = "Вы пропустили это поле."
  };
  if (error.typeMismatch) {
    errorElement.textContent = "Введите адрес сайта."
  };
  if (error.tooShort) {
    errorElement.textContent = "Минимальная длина 2 символа."
  };
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const hasInvalidInput = (inputList) => {
  
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};


const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass)
  }
}

const setFormEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const inputListIterator = (inputElement) => {
    const handleInput = () => {
      isValid(formElement, inputElement, errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    }
    inputElement.addEventListener('input', handleInput);
  }
  const buttonElement = formElement.querySelector(submitButtonSelector);
  if (formElement == addForm) {
    addForm.reset()
    toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  }
  inputList.forEach(inputListIterator);
}; 

const enableValidation = (validatorSetting) => {
  const formList = Array.from(document.querySelectorAll(validatorSetting.formSelector));
  const formListIterator = (formElement) => {
    formElement.addEventListener('submit', handleFormSubmit);
    setFormEventListeners(formElement, validatorSetting.inputSelector, validatorSetting.submitButtonSelector, validatorSetting.inactiveButtonClass, validatorSetting.inputErrorClass, validatorSetting.errorClass);
  }
  formList.forEach(formListIterator);
};

