/**
 * Класс ConfirmDeletionForm управляет формой
 * удаления счёта
 * */
class ConfirmDeletionForm extends AsyncForm {
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
    App.getModal('confirmDeletion').close()
    App.pages.transactions.removeAccount()
    document.querySelector('.remove-account').disabled = true
  }
}