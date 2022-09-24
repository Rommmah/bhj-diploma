// Дополнительные функции для приложения
class Other{
  // Показвает ошибку
  static showMessage(elem, text){
    let message = document.createElement('p')
    message.className = 'message'
    message.style.color = 'red'
    message.textContent = text
    elem.before(message)
  }

  // скрывает ранее показанную ошибку
	static removeMessage(elem){
    let prevElem = elem.previousElementSibling
    if(prevElem?.className == 'message'){
      prevElem.remove()
    }
	}

  // Стандартная для приложения инициация
  static initElemAndEvents(elem, context){
    if(!elem){
      throw new Error('Передан пустой элемент')
    }
    context.element = elem
    context.registerEvents()
  }
}