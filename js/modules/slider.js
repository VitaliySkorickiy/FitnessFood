function slider({ container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field }) {

  //  начальный слайд
  let slideIndex = 1;

  //  отступ для трансформа, чтоб знать какой слайд показвать
  let offset = 0;

  const slides = document.querySelectorAll(slide),
    slider = document.querySelector(container),
    next = document.querySelector(nextArrow),
    prev = document.querySelector(prevArrow),
    total = document.querySelector(totalCounter),
    current = document.querySelector(currentCounter),
    slidesWrapper = document.querySelector(wrapper),
    slidesField = document.querySelector(field),
    width = window.getComputedStyle(slidesWrapper).width;

  // ноль в счетчике слайдов
  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

  // ширина карусели
  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';

  //  зона видимости карусели
  slidesWrapper.style.overflow = 'hidden';

  //  одинаковая ширина слайдов
  slides.forEach(slide => {
    slide.style.width = width;
  });

  // точки слайдера

  slider.style.position = 'relative';

  const indicators = document.createElement('ol'),
    dots = [];
  indicators.classList.add('carousel-indicators');

  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {

    const dot = document.createElement('li');

    dot.setAttribute('data-slide-to', i + 1);

    dot.classList.add('dot');

    if (i == 0) {
      dot.style.opacity = 1;
    }

    indicators.append(dot);

    dots.push(dot);
  }

  // получаем числовое значение из строки
  function deleteNotDigits(str) {
    return +str.replace(/\D/g, '');
  }

  //  изменение стилей точек
  function dotsStyle() {
    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = 1;
  }

  //  прописываем ноль для номера слайда
  function currentZero() {

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  }

  //  кнопка next
  next.addEventListener('click', () => {

    if (offset == deleteNotDigits(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += deleteNotDigits(width);
    }

    // смещение слайдера
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    currentZero();

    dotsStyle();
  });

  // кнопка prev
  prev.addEventListener('click', () => {

    // прокрутка слайдера
    if (offset == 0) {
      offset = deleteNotDigits(width) * (slides.length - 1);
    } else {
      offset -= deleteNotDigits(width);
    }

    // смещение слайдера
    slidesField.style.transform = `translateX(-${offset}px)`;

    // смена номера слайда 
    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    currentZero();

    dotsStyle();
  });

  //  точки
  dots.forEach(dot => {

    dot.addEventListener('click', (e) => {

      const slideTo = e.target.getAttribute('data-slide-to');

      slideIndex = slideTo;
      offset = deleteNotDigits(width) * (slideTo - 1);

      slidesField.style.transform = `translateX(-${offset}px)`;

      currentZero();

      dotsStyle();
    });
  });

}

export default slider;