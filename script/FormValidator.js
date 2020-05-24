class FormValid {
  constructor(form, errors) {
    this.form = form;
    this.errors = errors;

    this.isValidate = this.isValidate.bind(this);
    this.setEventListeners = this.setEventListeners.bind(this);
    this.formInputs = Array.from(this.form.querySelectorAll("input"));
    this.submit = this.form.querySelector('.button')
  }

  isValidate (input) {
    input.setCustomValidity(""); 
      if (input.validity.valueMissing) {
        input.setCustomValidity(errorMessages.empty);
        return false
      }
      if (input.value.trim().length === 0) {
        input.setCustomValidity(errorMessages.empty);
        return false
    
      }
      if (input.validity.tooShort || input.validity.tooLong) {
        input.setCustomValidity(errorMessages.wrongLength);
        return false
      }
      if (input.validity.typeMismatch && input.type === 'url') {
    
        input.setCustomValidity(errorMessages.wrongUrl);
        return false
      }
    
      input.nextElementSibling.textContent = "";
    return true;
    
    
  }


  // чтобы делать кнопку сабмита активной и неактивной.
  setSubmitButtonState() {
    
      if (this.form.checkValidity() === true)  {
        this.submit.removeAttribute('disabled', true);
        this.submit.classList.add(`popup__button_valid`);
        this.submit.classList.remove(`popup__button_invalid`);
        
      } else {
        this.submit.setAttribute('disabled', true);
        this.submit.classList.add(`popup__button_invalid`);
        this.submit.classList.remove(`popup__button_valid`);
        
      }
    }
  


  setEventListeners() {
    this.form.addEventListener("input", () => {
      this.setSubmitButtonState();
    });
  }

  isFieldValid(input) {
    const errorForm = this.input
    const errorElem = errorForm.querySelector(`#${input.id}-error`);
    const valid = isValidate(input); // устанавливаем инпуту кастомные ошибки, если они есть.
    errorElem.textContent = input.validationMessage;
 this.form.setEventListeners
    return valid;
  }
  
}

