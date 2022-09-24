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
    User.register(data, (err, resp) => {
      if(err){
        Other.removeMessage(this.element)
        Other.showMessage(this.element, err)      }
      if(resp.success){
        this.element.reset();
        Other.removeMessage(this.element)
        App.setState( 'user-logged' );
        App.getModal('register').close()
      }
    })

  }

}