

const isValid = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      inputErrorClass,
      errorClass
    );

  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

const handleFormSubmit = (evt) => {
  evt.preventDefault();
};


const showInputError = (
  formElement,
  inputElement,
  validationMessage,
  inputErrorClass,
  errorClass
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = validationMessage;
  errorElement.classList.add(errorClass);
  inputElement.style.borderBottom = '1px #FF0000 solid';
};

const hideInputError = (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'disabled')
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled')
  }
};


const setFormEventListeners = (
  formElement,
  ...args
) => {
  const inputList = Array.from(formElement.querySelectorAll(args[0]));
  formElement.setAttribute("novalidate", "true");
  const inputListIterator = (inputElement) => {

    const handleInput = () => {
      isValid(formElement, inputElement, args[3], args[4]);
      toggleButtonState(inputList, buttonElement, args[2]);
    };
    inputElement.addEventListener("input", handleInput);
  };

  const buttonElement = formElement.querySelector(args[1]);
  toggleButtonState(inputList, buttonElement, args[2])


  inputList.forEach(inputListIterator);
};


const enableValidation = (validatorSetting) => {
  const formList = Array.from(
    document.querySelectorAll(validatorSetting.formSelector)
  );
  const formListIterator = (formElement) => {
    formElement.addEventListener("submit", handleFormSubmit);
    setFormEventListeners(
      formElement,
      validatorSetting.inputSelector,
      validatorSetting.submitButtonSelector,
      validatorSetting.inactiveButtonClass,
      validatorSetting.inputErrorClass,
      validatorSetting.errorClass
    );
  };
  formList.forEach(formListIterator);
};

enableValidation(validatorSetting);
