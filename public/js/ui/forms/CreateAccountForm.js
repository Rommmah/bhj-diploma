/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {
    Account.create(data, (err, resp) => {
      if(err){
        Other.removeMessage(this.element)
        Other.showMessage(this.element, err)
      }
      if(resp.success){
        this.element.reset();
        Other.removeMessage(this.element)
        App.update();
        let modal = new Modal(this.element.closest('.modal'))
        modal.close()
      }
    })
  }
}