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
        /* ++REVIEW3. Надо исправить. Команда закрытия формы профиля должна быть именно тут и именно эта:
        this.popupEdit.close();
        Но, для того, чтобы метод класса Popup было правомерно тут вызывать, Вы в конструктор класса
        UserInfo должны передать экземпляр класса Popup popupEdit и сохранить его в свойстве this.popupEdit.
        */

      })
            
      .catch(err => {
      /*++REVIEW3. Вы popupEdit и submitFormEdit берёте из глобальной области видимости файла-точки входа проекта main.js.
       А из неё брать в классах ничего не положено, так как глобальной области с переменными - исходными данными проекта может вообще не
      быть (и лучше бы, чтобы не было), например, если бы код main.js был обёрнут в IIFE-функцию. Поэтому, все переменные, которые определяеются
      в main.js должны передаваться в классы, как параметры. Поэтому, давайте пока оставим только ту инструкцию
      console.log(`... ${err}`), которая требуется по обязательному заданию. К тому же делать открытие формы здесь ни к чему - надо правильно форму
      не закрывать. */
        //popupEdit.open() //REVIEW3
        //submitFormEdit.textContent = `Ой, попробуйте еще` //REVIEW3
        console.log(`Упc, что-то пошло не так, например это ${err}`)
    })

  }


}
