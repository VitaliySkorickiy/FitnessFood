function calc() {

  //  вывод результата
  const result = document.querySelector('.calculating__result span');

  //  задаём начальные значения переменных
  let sex, height, weight, age, ratio;

  if (localStorage.getItem('sex')) {

    sex = localStorage.getItem('sex');
  } else {

    sex = 'female';
    localStorage.setItem('sex', 'female');
  }

  if (localStorage.getItem('ratio')) {

    ratio = localStorage.getItem('ratio');
  } else {

    ratio = 1.375;
    localStorage.setItem('ratio', 1.375);
  }

  function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
      elem.classList.remove(activeClass);

      if (elem.getAttribute('id') === localStorage.getItem('sex')) {
        elem.classList.add(activeClass);
      }

      if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
        elem.classList.add(activeClass);
      }

    });
  }

  initLocalSettings('#gender div', 'calculating__choose-item_active');
  initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

  //  формула расчета
  function calcTotal() {

    // начальное значение результата
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = 0;
      return;
    }

    if (sex === 'female') {
      result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    } else {
      result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }
  }
  calcTotal();

  // получение статических данных
  function getStaticInformation(selector, activeClass) {

    //  получаем все блоки родителя (пол(мужской, женский), активность(высокая, средняя))
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {

      //  определяем клик по дочернему элементу
      elem.addEventListener('click', (e) => {

        //  разделяем пол и активность по атрибутам
        if (e.target.getAttribute('data-ratio')) {
          //  если клик на Активности, то работаем с ней
          ratio = +e.target.getAttribute('data-ratio');

          localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
        } else {
          //  если клик на Пол, то работаем с ним
          sex = e.target.getAttribute('id');

          localStorage.setItem('sex', e.target.getAttribute('id'))
        }

        // убираем активный класс со всех элементов
        elements.forEach(elem => {
          elem.classList.remove(activeClass);
        });
        //  добавляем активный класс на кликнутый элемент
        e.target.classList.add(activeClass);

        calcTotal();

      });
    });
  }

  // вызываем функцию для пола
  getStaticInformation('#gender div', 'calculating__choose-item_active');

  // вызываем функцию для активности
  getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

  //  берём значения из инпутов
  function getDynamicInformation(selector) {

    //  беоем каждый инпут по селектору
    const input = document.querySelector(selector);

    // отслеживаем событие на инпуте
    input.addEventListener('input', () => {

      // проверка на число в инпуте
      if (input.value.match(/\D/g)) {
        input.style.border = '3px solid red';
      } else {
        input.style.border = 'none';
      }

      //  определяем на каком инпуте было событие, ориентируемся на атрбуте
      switch (input.getAttribute('id')) {
        case 'height':
          height = +input.value;
          break;
        case 'weight':
          weight = +input.value;
          break;
        case 'age':
          age = +input.value;
          break;
      }

      calcTotal();
    });
  }

  // вызываем функцию для каждого инпута в зависимости от атрибута
  getDynamicInformation('#height');
  getDynamicInformation('#weight');
  getDynamicInformation('#age');

}

export default calc;