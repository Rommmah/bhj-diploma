/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    Other.initElemAndEvents(element, this)
    this.update()
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    const createBtn = document.querySelector('.create-account')
    createBtn.onclick = e => {
      const modal = App.getModal('createAccount')
      modal.open()
      modal.element.querySelector('input').focus()
    }

    const accList = document.querySelector('.accounts-panel')
    accList.onclick = e =>{
      const account = e.target.closest('.account')
      if(account){
        e.preventDefault()
        document.querySelector('.remove-account').disabled = false
        this.onSelectAccount(account)
      }
    }

  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    const user = User.current()
    if(user){
      Account.list(user, (err, resp) => {
        if(err){
          console.log(err)
        }
        if(resp?.success){
          this.clear()
          for(let account of resp.data){
            this.renderItem(account)
          }
        }
      })
    }
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    const elems = [...this.element.children]
    elems.forEach( elem => {
      if(!elem.classList.contains('header')){
        elem.remove()   
      }
    })
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {
    const active = this.element.querySelector('.active')
    if(active){
      active.classList.remove('active')
    }
    element.classList.add('active')
    App.showPage('transactions', { account_id: element.dataset.id })
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item){
    return(`
      <li class="account" data-id="${item.id}">
          <a href="#">
              <span>${item.name}</span> /
              <span>${new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(item.sum)}</span>
          </a>
      </li>
    `)
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data){
    this.element.insertAdjacentHTML('beforeEnd', this.getAccountHTML(data))
  }
}
