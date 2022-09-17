/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const sidebarBtn = document.querySelector('.sidebar-toggle')
    sidebarBtn.onclick = () => {
      document.body.classList.toggle('sidebar-open')
      document.body.classList.toggle('sidebar-collapse')
    } 
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    let register = document.querySelector('.menu-item_register')
    register.onclick = e =>{
      e.preventDefault()
      App.modals.register.open()
    }

    let login = document.querySelector('.menu-item_login')
    login.onclick = e =>{
      e.preventDefault()
      App.modals.login.open()
    }

    let logout = document.querySelector('.menu-item_logout')
    logout.onclick = e =>{
      e.preventDefault()
      User.logout( (err, resp) => {
        if(err){
          console.log("Ошибка", err)
        }
        if(resp.success){
          App.setState( 'init' )
        }
      })
    }

  }

}