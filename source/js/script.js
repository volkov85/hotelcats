// Оживление мобильного меню
const menuMobile = document.getElementById(`menu`);
const menuMobileOpenBtn = document.querySelector(`.header__menu-toggle`);
const menuMobileCloseBtn = menuMobile.querySelector(`.menu-mobile__close`);

menuMobileOpenBtn.onclick = (evt) => {
  evt.preventDefault();
  elementOpen(menuMobile, `menu-mobile--shown`, false);
};

menuMobileCloseBtn.onclick = (evt) => {
  evt.preventDefault();
  elementClose(menuMobile, `menu-mobile--shown`, false);
};

// Плавная прокрутка к якорю
const menuLinks = document.querySelectorAll(`.menu__link`);

for (let i = 0; i < menuLinks.length; i++) {
  if (menuLinks[i].getAttribute(`href`)[0] === `#`) {
    menuLinks[i].onclick = (evt) => {
      evt.preventDefault();
      document.getElementById(menuLinks[i].hash.substring(1)).scrollIntoView({behavior: `smooth`});
      history.pushState(null, null, menuLinks[i].hash);

      // Закрытие мобильного меню после клика по ссылке
      if (menuMobile.contains(menuLinks[i])) {
        elementClose(menuMobile, `menu-mobile--shown`, false);
      }
    };
  }
}

// Оживление фильтра каталога
const overlay = document.querySelector(`.overlay`);
const filter = document.querySelector(`.filter`);

if (filter) {
  const filterOpenBtn = document.querySelector(`.catalog__filter`);
  const filterCloseBtn = filter.querySelector(`.filter__close`);

  filterOpenBtn.onclick = (evt) => {
    evt.preventDefault();
    elementOpen(filter, `filter--shown`);
  };

  filterCloseBtn.onclick = (evt) => {
    evt.preventDefault();
    elementClose(filter, `filter--shown`);
  };
}

// Оживление выпадающего меню сортировки
const sorting = document.querySelector(`.sorting`);

if (sorting) {
  const sortingToggleBtn = sorting.querySelector(`.sorting__option--toggle`);
  const sortingOptions = sorting.querySelectorAll(`.sorting__options .sorting__option`);

  // Создание CSS-правил для анимации меню сортировки
  const sortingOptionsHeight = sortingToggleBtn.offsetHeight * sortingOptions.length;
  const styleElmnt = document.createElement(`style`);

  document.head.appendChild(styleElmnt);
  styleElmnt.sheet.insertRule(`@keyframes sorting{from{height:0}to{height:${sortingOptionsHeight}px}}`, 0);

  // Появление и закрытие меню сортировки
  sortingToggleBtn.onclick = (evt) => {
    evt.preventDefault();

    if (sorting.classList.contains(`sorting--opened`)) {
      sortingClose();
    } else {
      elementOpen(sorting, `sorting--opened`, false);
      window.addEventListener(`click`, handleOutsideClick);
    }
  };

  for (let i = 0; i < sortingOptions.length; i++) {
    sortingOptions[i].onclick = () => {
      sortingClose();
    };
  }
}

// Оживление всплывающих окон бронирования и подтверждения заявки
const reservation = document.querySelector(`.modal--reservation`);
const thanks = document.querySelector(`.modal--thanks`);

if (reservation) {
  // Оживление всплывающего окна бронирования
  const reservationOpenBtn = document.querySelector(`.room__button`);
  const reservationCloseBtn = reservation.querySelector(`.modal__close`);

  reservationOpenBtn.onclick = (evt) => {
    evt.preventDefault();
    elementOpen(reservation, `modal--shown`);
  };

  reservationCloseBtn.onclick = (evt) => {
    evt.preventDefault();
    elementClose(reservation, `modal--shown`);
  };

  // Оживление всплывающего окна подтверждения заявки
  const thanksOkBtn = thanks.querySelector(`.button`);
  const thanksCloseBtn = thanks.querySelector(`.modal__close`);
  const reservationForm = reservation.querySelector(`.reservation-form`);

  reservationForm.onsubmit = (evt) => {
    evt.preventDefault(); // Форма не отправляется, это сделано для демонстрации всплывающих окон
    elementClose(reservation, `modal--shown`, false);
    elementOpen(thanks, `modal--shown`, false);
  };

  for (let i = 0, j = [thanksOkBtn, thanksCloseBtn]; i < j.length; i++) {
    j[i].onclick = (evt) => {
      evt.preventDefault();
      elementClose(thanks, `modal--shown`);
    };
  }
}

// Закрытие всплывающих окон клавишей ESC
window.onkeydown = (evt) => {
  if (evt.keyCode === 27) {
    evt.preventDefault();

    // Закрытие мобильного меню
    if (menuMobile.classList.contains(`menu-mobile--shown`)) {
      elementClose(menuMobile, `menu-mobile--shown`, false);
    }

    // Закрытие фильтра каталога
    if (filter && filter.classList.contains(`filter--shown`)) {
      elementClose(filter, `filter--shown`);
    }

    // Закрытие меню сортировки
    if (sorting && sorting.classList.contains(`sorting--opened`)) {
      sortingClose();
    }

    // Закрытие окна бронирования
    if (reservation && reservation.classList.contains(`modal--shown`)) {
      elementClose(reservation, `modal--shown`);
    }

    // Закрытие окна подтверждения заявки
    if (thanks && thanks.classList.contains(`modal--shown`)) {
      elementClose(thanks, `modal--shown`);
    }
  }
};

// Закрытие всплывающих окон по клику вне окна
if (overlay) {
  overlay.onclick = () => {
    // Закрытие фильтра каталога
    if (filter && filter.classList.contains(`filter--shown`)) {
      elementClose(filter, `filter--shown`);
    }

    // Закрытие окна бронирования
    if (reservation && reservation.classList.contains(`modal--shown`)) {
      elementClose(reservation, `modal--shown`);
    }

    // Закрытие окна подтверждения заявки
    if (thanks && thanks.classList.contains(`modal--shown`)) {
      elementClose(thanks, `modal--shown`);
    }
  };
}

// Оживление слайдера номеров
if (document.querySelector(`.slider--rooms .slider__inner`)) {
  new Glide(`.slider--rooms .slider__inner`, {
    type: `carousel`,
    gap: 30,
    classes: {
      activeNav: `slider__bullet--active`
    }
  }).mount();
}

// Оживление слайдера отзывов
if (document.querySelector(`.slider--testimonials .slider__inner`)) {
  new Glide(`.slider--testimonials .slider__inner`, {
    type: `carousel`,
    perView: 2,
    gap: 30,
    breakpoints: {
      943: {
        perView: 1
      },
      767: {
        perView: 2
      },
      639: {
        perView: 1
      }
    },
    classes: {
      activeNav: `slider__bullet--active`
    }
  }).mount();
}

// Оживление галереи номера
if (document.querySelector(`.room__gallery`)) {
  new Glide(`.room__gallery`, {
    type: `carousel`,
    gap: 30,
    classes: {
      activeNav: `room__gallery-preview--active`
    }
  }).mount();
}

// Создание скрипта интерактивной карты
window.setTimeout(() => {
  const scriptElmnt = document.createElement(`script`);

  scriptElmnt.src = `https://api-maps.yandex.ru/2.1/?apikey=56dd7dfa-9b89-4846-bd0c-6d22404cf29e&lang=ru_RU&load=package.standard&onload=initYaMap`;
  document.body.appendChild(scriptElmnt);
}, 2000);

// Инициализация интерактивной карты
function initYaMap(ymaps) {
  const map = new ymaps.Map(document.querySelector(`.contacts__map`), {
    center: [59.938635, 30.323118],
    zoom: 16
  });
  map.controls.remove(`searchControl`);
  map.controls.remove(`routeButtonControl`);
  map.controls.remove(`trafficControl`);
  map.controls.remove(`typeSelector`);
  map.controls.remove(`rulerControl`);

  const mapPlacemark = new ymaps.Placemark(map.getCenter(), {
    hintContent: `Санкт-Петербург,<br>ул Большая Конюшенная, д 19`
  }, {
    iconLayout: `default#image`,
    iconImageHref: `img/contacts_map-marker.svg`,
    iconImageSize: [54, 77],
    iconImageOffset: [-27, -52]
  });
  map.geoObjects.add(mapPlacemark);
}

// Появление элемента
function elementOpen(elmnt, cls, ovrl = true) {
  elmnt.classList.add(cls);

  if (ovrl) {
    elementOpen(overlay, `overlay--shown`, false);
  }
}

// Закрытие элемента
function elementClose(elmnt1, cls, ovrl = true, elmnt2 = elmnt1) {
  cssAnimationReset(elmnt1, cls);
  elmnt2.style.animationDirection = `reverse`;

  if (ovrl) {
    elementClose(overlay, `overlay--shown`, false);
  }

  window.setTimeout(() => {
    elmnt1.classList.remove(cls);
    elmnt2.removeAttribute(`style`);
  }, 500);
}

// Закрытие меню сортировки
function sortingClose() {
  elementClose(sorting, `sorting--opened`, false, sorting.lastChild);
  window.removeEventListener(`click`, handleOutsideClick);
}

// Закрытие меню сортировки по клику вне меню
function handleOutsideClick(evt) {
  if (!sorting.contains(evt.target)) {
    evt.preventDefault();
    sortingClose();
  }
}

// Сброс CSS-анимации
function cssAnimationReset(elmnt, cls) {
  elmnt.classList.remove(cls);
  void elmnt.offsetWidth;
  elmnt.classList.add(cls);
}
