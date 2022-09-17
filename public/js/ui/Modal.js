/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 * */
class Modal {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью Modal.registerEvents()
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element){
    Other.initElemAndEvents(element, this)
  }

  /**
   * При нажатии на элемент с data-dismiss="modal"
   * должен закрыть текущее окно
   * (с помощью метода Modal.onClose)
   * */
  registerEvents() {
    let btns = this.element.querySelectorAll('[data-dismiss="modal"]')
    for(let btn of btns){
      btn.onclick = e => {
        this.onClose(e)
      }
      document.addEventListener('keydown', e => {
        if(e.code == 'Escape' && this.element.style.display){
          this.onClose(e)
        }
      })
    }
  }

  /**
   * Срабатывает после нажатия на элементы, закрывающие окно.
   * Закрывает текущее окно (Modal.close())
   * */
  onClose(e) {
    this.close()
    e.preventDefault()
  }
  /**
   * Открывает окно: устанавливает CSS-свойство display
   * со значением «block»
   * */
  open() {
    this.element.style.display = 'block'
    const input = this.element.querySelector('input:not([type=hidden])')
    if(input){
      input.focus()      
    }
  }
  /**
   * Закрывает окно: удаляет CSS-свойство display
   * */
  close(){
    this.element.style.display = ''
  }
}
