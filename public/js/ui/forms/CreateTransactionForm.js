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
          const selectList = document.querySelectorAll('.accounts-select')

          for(let select of selectList){

            while (select.firstChild) {
                select.removeChild(select.firstChild);
            }

            for(let data of resp.data){
              let option = new Option(data.name, data.id)
              select.append(option)
            }    

          }

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
        let modal = new Modal(this.element.closest('.modal'))
        modal.close()
        App.update();
      }
    })
  }
}