/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    Other.initElemAndEvents(element, this)
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    const options = this.lastOptions || User.current()
    this.render(options)
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    const removeAccBtn = document.querySelector('.remove-account')
    removeAccBtn.onclick = e => {
      e.preventDefault()
      App.getModal('confirmDeletion').open()
    }

    const removeTransactionBtns = document.querySelectorAll('.transaction__remove')
    if(removeTransactionBtns){
      removeTransactionBtns.forEach(btn => {
        btn.onclick = e => {
          e.preventDefault()
          this.removeTransaction({id: btn.dataset.id})
        }
      })
    }
    
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.updateWidgets() и App.updateForms(),
   * либо обновляйте только виджет со счетами и формы создания дохода и расхода
   * для обновления приложения
   * */
  removeAccount() {
    if(!this.lastOptions){
      return
    }
    Account.remove(this.lastOptions, (err, resp) => {
      if(err){
        console.log("Ошибка в методе removeAccount", err)
      }
      if(resp.success){
        this.clear()
        App.updateWidgets()
        App.updateForms()
      }
    })      

  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update(),
   * либо обновляйте текущую страницу (метод update) и виджет со счетами
   * */
  removeTransaction( id ) {
    const approveRemove = confirm('Вы действительно хотите удалить эту транзакцию?')
    if(approveRemove){
      Transaction.remove(id, (err, resp) => {
        if(err){
          console.log("Ошибка в методе removeAccount", err)
        }
        if(resp.success){
          App.update()
          // this.update()
        }
      })      
    }
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options){
    if(!options){
      throw new Error('Не передан options в метод render')
    }

    this.lastOptions = options

    Account.get(options.account_id, (err, resp) => {
      if(err){
        console.log("Ошибка в методе render:", err)
      }
      if(resp.success){
        this.renderTitle(resp.data.name)
      }
    })

    Transaction.list(options, (err, resp) => {
      if(err){
        console.log("Ошибка в методе render", err)
      }
      if(resp.success){
        this.renderTransactions(resp.data)

        const removeTransactionBtns = document.querySelectorAll('.transaction__remove')
        if(removeTransactionBtns){
          removeTransactionBtns.forEach(btn => {
            btn.onclick = e => {
              e.preventDefault()
              this.removeTransaction({id: btn.dataset.id})
            }
          })
        }
      }

    })

  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions([])
    this.renderTitle('Название счёта')
    delete this.lastOptions
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name){
    document.querySelector('.content-title').textContent = name
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date){
    const dateInstance = new Date(date)
    const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
    const formatedDate = new Intl.DateTimeFormat('ru-RU', optionsDate).format(dateInstance);
    const optionsTime = { hour: 'numeric', minute: 'numeric' };
    const time = new Intl.DateTimeFormat('ru-RU', optionsTime).format(dateInstance);

    return formatedDate + ' в ' + time
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item){
    const className = item.type.toLowerCase() == 'income' ? 'transaction_income' : 'transaction_expense'
    const date = this.formatDate(item.created_at)

    return `
      <div class="transaction ${className}">
        <div class="col-md-7 transaction__details">
          <div class="transaction__icon">
            <span class="fa fa-money fa-2x"></span>
          </div>
          <div class="transaction__info">
            <h4 class="transaction__title">${item.name}</h4>
            <div class="transaction__date">${date}</div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="transaction__summ">
            ${item.sum} <span class="currency">₽</span>
          </div>
        </div>
        <div class="col-md-2 transaction__controls">
          <button class="btn btn-danger transaction__remove" data-id="${item.id}">
            <i class="fa fa-trash"></i>  
          </button>
        </div>
      </div>  
    `
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data){
    const content = document.querySelector('.content')

    content.innerHTML = data.reduce( (prev, cur) => prev + this.getTransactionHTML(cur), '')
  }
}