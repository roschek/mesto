
export class FormValid {
  constructor(form, errors) {
    this.form = form;
    this.errors = errors;
    this.errorElement = this.form.querySelectorAll('.error');
    this.isValid = this.isValid.bind(this);
    this.setEventListeners = this.setEventListeners.bind(this);
    this.formInputs = Array.from(this.form.querySelectorAll("input"));
    this.submit = this.form.querySelector('.button')
  }

  isValid(input) {

    input.setCustomValidity('');

    if (input.validity.valueMissing || input.value.trim().length === 0) {
      input.setCustomValidity(this.errors.empty);

    }
    if (input.validity.tooShort || input.validity.tooLong) {
      input.setCustomValidity(this.errors.wrongLength);

    }
    if (input.validity.typeMismatch && input.type === 'url') {

      input.setCustomValidity(this.errors.wrongUrl);

    }

    return input.checkValidity();


  }

  // чтобы делать кнопку сабмита активной и неактивной.
  setSubmitButtonState(state) {

    if (state) {
      this.submit.removeAttribute('disabled', true);
      this.submit.classList.add(`popup__button_valid`);
      this.submit.classList.remove(`popup__button_invalid`);
      this.formInputs.forEach((input) => { input.textContent = ' ' })

    } else {
      this.submit.setAttribute('disabled', '');
      this.submit.classList.add(`popup__button_invalid`);
      this.submit.classList.remove(`popup__button_valid`);

    }
  }


  setEventListeners() {
    this.form.addEventListener("input", () => {
      this.isFieldValid();
      this.setSubmitButtonState();
    });
  }

  isFieldValid(input) {
    const errorElem = input.nextElementSibling;
    const valid = this.isValid(input)
    errorElem.textContent = input.validationMessage
    return valid
  }


  handlerInputForm(evt) {
    this.isFieldValid(evt.target);

    if (this.form.checkValidity()) {
      this.setSubmitButtonState(true);
    } else {
      this.setSubmitButtonState(false)
    }
  }

  setEventListeners() {
    this.form.addEventListener('input', (evt) => this.handlerInputForm(evt))
  }

  resetError() {
    this.errorElement.forEach((elt) => { elt.textContent = ' ' })
  }
}






