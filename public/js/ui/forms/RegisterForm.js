/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    console.log(data)
    User.register(data, (err, resp) => {
      if(err){
        Other.removeMessage(this.element)
        Other.showMessage(this.element, err)      }
      if(resp.success){
        this.element.reset();
        Other.removeMessage(this.element)
        App.setState( 'user-logged' );
        let modal = new Modal(this.element.closest('.modal'))
        modal.close()
      }
    })

  }

}