/**
 * Класс CreateAccountFromMessageForm управляет формой
 * создания нового счёта
 * */
class CreateAccountFromMessageForm extends AsyncForm {
  constructor(element){
    super(element)
    Other.initElemAndEvents(element, this)
    this.registerKeyEvents() 
  }

  registerKeyEvents() {
    document.addEventListener('keydown', e => {
      if(e.key == 'Enter' && this.element.closest('.modal').style.display){
        this.submit(e)
      }
    })    
  }

  submit(){
    App.getModal('message').close()
    App.getModal('createAccount').open()
  }
}