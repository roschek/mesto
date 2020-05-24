class UserInfo{
constructor(form){
  this.form = form
}

changePerson(evt){
  evt.preventDefault();
  this.form.addEventListener('submit', function(){
  const userName = document.querySelector('.user-info__name');
  const userDescription = document.querySelector('.user-info__job');
  const { pers, description } = formEdit.elements
  userName.textContent = pers.value;
  userDescription.textContent = description.value;
  console.log('х.з что дальше делать')
  formEdit.reset();})
}


}

const userInfo = new UserInfo();

userInfo.changePerson(formEdit);
