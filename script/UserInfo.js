class UserInfo{
  constructor(form){
    this.form = form;
  }
  
  setFormListener(){
    this
        .form
        .querySelector('.button')
        .addeventListener('click',this.changePerson)
  }

  changePerson(event) {
    event.preventDefault();
    const userName = document.querySelector('.user-info__name');
    const userDescription = document.querySelector('.user-info__job');
    const { pers, description } = this.elements

    userName.textContent = pers.value;
    userDescription.textContent = description.value;
    
    this.reset();

}

}
