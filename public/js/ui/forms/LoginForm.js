/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit(data) {

    User.login(data, (err, resp) => {
      if(err){
        Other.removeMessage(this.element)
        Other.showMessage(this.element, err)
      }
      if(resp?.success){
        this.element.reset();
        Other.removeMessage(this.element)
        App.setState( 'user-logged' );
        let modal = new Modal(this.element.closest('.modal'))
        modal.close()
      }
    })

  }

}
