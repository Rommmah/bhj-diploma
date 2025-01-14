/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
    this.renderAccountsList()
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const user = User.current()
    if(user){
      Account.list(user, (err, resp) => {
        if(err){
          console.log('Ошибка в renderAccountsList (CreateTransactionForm):', err)
        }

        if(resp?.success){
          const selectList = this.element.querySelector('.accounts-select')

          selectList.innerHTML = resp.data.reduce( (prev, cur) => prev + `<option value="${cur.id}">${cur.name}</option>`, '')
        }

      })
    }
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, resp) => {
      if(err){
        Other.removeMessage(this.element)
        Other.showMessage(this.element, err)
      }
      if(resp?.success){
        this.element.reset();
        Other.removeMessage(this.element)
        App.getModal('newIncome').close()
        App.getModal('newExpense').close()
        App.update();
      }
    })
  }
}