/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    Other.initElemAndEvents(element, this)
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    const incomeBtn = this.element.querySelector('.create-income-button')
    incomeBtn.onclick = e => {
      Account.list(User.current(), (err, resp) => {
        if(resp.data.length){
          App.getModal('newIncome').open()
        } else {
          App.modals.message.open()
        }
      })
    }
    
    const expenseBtn = this.element.querySelector('.create-expense-button')
    expenseBtn.onclick = e => {
      Account.list(User.current(), (err, resp) => {
        if(resp.data.length){
          App.getModal('newExpense').open()
        } else {
          App.modals.message.open()
        }
      })
    }

  }

}
