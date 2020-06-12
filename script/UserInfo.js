class UserInfo {
  constructor(form,popupEdit) {
    this.form = form;
    this.popupEdit = popupEdit
    this.changePerson = this.changePerson.bind(this)
        
  }

  setFormListener() {
    this
      .form
      .querySelector('.button')
      .addeventListener('submit', this.changePerson)
  }


  changePerson(event) {
    event.preventDefault();
      
    api.updateInfo(pers.value, description.value)
      .then((data) => {

        const userName = document.querySelector('.user-info__name');
        const userDescription = document.querySelector('.user-info__job');
        userName.textContent = data.name;
        userDescription.textContent = data.about;
        
        this.popupEdit.close();
        
      })
            
      .catch(err => {
         console.log(`Упc, что-то пошло не так, например это ${err}`)
    })

  }


}
