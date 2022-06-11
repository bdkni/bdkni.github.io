window.addEventListener('DOMContentLoaded', () => {
    const selectHeader = document.querySelector('.select__header');
    const selectBody = document.querySelector('.select__body');
    const selectItem = document.querySelectorAll('.select__item');
    const selectSpan = document.querySelector('.select__title');
    const selectImg = document.querySelector('.select__header img');
    selectHeader.addEventListener('click', () => {
        if (selectBody.classList.contains('select__body--active')) {
            selectBody.classList.remove('select__body--active');
            selectImg.style.transform = 'rotate(0deg)';
            selectBody.style.maxHeight = null
        } else {
            selectBody.classList.add('select__body--active');
            selectImg.style.transform = 'rotate(180deg)';
            selectBody.style.maxHeight = selectBody.scrollHeight + 'px'
        }
    });
    selectItem.forEach((item, i) => {
        item.addEventListener('click', () => {
            selectSpan.textContent = item.textContent;
            selectBody.classList.remove('select__body--active');
            selectImg.style.transform = 'rotate(0deg)';
            selectBody.style.maxHeight = null
        })
    });
    let flag = 0;
    window.addEventListener('scroll', function() {
        let scrollY = this.window.scrollY;
        let mapOffset = this.document.querySelector('.map').offsetTop;
        if ((scrollY >= mapOffset - 1000) && (flag == 0)) {
            let center = [55.60970044783877, 37.49502066571046];

            function init() {
                let map = new ymaps.Map('map-element', {
                    center: center,
                    zoom: 12
                });
                let placemark = new ymaps.Placemark(center, {}, {
                    iconLayout: 'default#image',
                    iconImageHref: 'img/map/mark.svg',
                    iconImageSize: [69, 99],
                    iconImageOffset: [-20, -70]
                });
                map.controls.remove('geolocationControl');
                map.controls.remove('searchControl');
                map.controls.remove('trafficControl');
                map.controls.remove('typeSelector');
                map.controls.remove('fullscreenControl');
                map.controls.remove('zoomControl');
                map.controls.remove('rulerControl');
                map.behaviors.disable(['scrollZoom']);
                map.geoObjects.add(placemark)
            }
            ymaps.ready(init);
            flag = 1
        }
    })
    const headerMobile = document.querySelector('.header__mobile'),
        burger = document.querySelector('.header__burger'),
        cross = document.querySelector('.header__cross'),
        body = document.querySelector('body');
    burger.addEventListener('click', () => {
        headerMobile.classList.toggle('active');
        burger.style.display = 'none';
        cross.style.display = 'block';
        body.classList.add('noscroll')
    });
    cross.addEventListener('click', () => {
        headerMobile.classList.toggle('active');
        burger.style.display = 'block';
        cross.style.display = 'none';
        body.classList.remove('noscroll')
    });
    const modal = document.querySelector('.modal'),
        modalButtons = document.querySelectorAll('.button--open');
    modalButtons.forEach((item) => {
        item.addEventListener('click', () => {
            modal.classList.add('active');
            body.classList.add('noscroll')
        })
    });
    modal.addEventListener('click', (e) => {
        const isModal = e.target.closest('.modal__inner');
        if (!isModal) {
            modal.classList.remove('active');
            body.classList.remove('noscroll')
        }
    });
    const swiper = new Swiper('.slider', {
        loop: !0,
        pagination: {
            el: '.slider__pagination',
        },
        navigation: {
            nextEl: '.slider__arrow-right',
            prevEl: '.slider__arrow-left',
        }
    });
    const form = document.querySelector('.form__elements');
    const telSelector = form.querySelector('input[type="tel"]');
    const inputMask = new Inputmask('+7 (999) 999-99-99');
    inputMask.mask(telSelector);
    const validation = new JustValidate('.form__elements');
    validation.addField('#name', [{
        rule: 'minLength',
        value: 2,
        errorMessage: 'Количество символов меньше 2!'
    }, {
        rule: 'maxLength',
        value: 30,
        errorMessage: 'Количество символов больше 30!'
    }, {
        rule: 'required',
        value: !0,
        errorMessage: 'Введите имя!'
    }]).addField('#telephone', [{
        rule: 'required',
        value: !0,
        errorMessage: 'Введите номер телефона!'
    }, {
        rule: 'function',
        validator: function() {
            const phone = telSelector.inputmask.unmaskedvalue();
            return phone.length === 10
        },
        errorMessage: 'Введите корректный номер телефона!'
    }, ]).addField('#check', [{
        rule: 'required',
        value: !0,
        errorMessage: 'Необходимо ваше согласие на обработку личных данных!'
    }]).onSuccess((e) => {
        if (document.querySelector('#check').checked) {
            const sendForm = (data) => {
                return fetch('mail.php', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                }).then(res => res.json())
            };
            const dataForm = new FormData(e.target);
            const user = {};
            dataForm.forEach((val, key) => {
                user[key] = val
            });
            sendForm(user).then(data => {
                modal.classList.add('active');
                body.classList.add('noscroll')

            });
            e.target.reset()
        }
    })
});
let accardion = document.querySelector('.facts__items'),
    tab = document.querySelectorAll('.facts__item'),
    answer = document.querySelectorAll('.facts__answer'),
    plus = document.querySelectorAll('.facts__plus'),
    minus = document.querySelectorAll('.facts__minus');
accardion.addEventListener('click', (e) => {
    const target = e.target.closest('.facts__item');
    if (!target) {
        return
    }
    tab.forEach((item, i) => {
        if (item === target) {
            if (target.classList.contains('facts__item--active')) {
                answer[i].classList.remove('active');
                tab[i].classList.remove('facts__item--active');
                plus[i].style.display = 'flex';
                minus[i].style.display = 'none'
            } else {
                answer[i].classList.add('active');
                tab[i].classList.add('facts__item--active');
                plus[i].style.display = 'none';
                minus[i].style.display = 'flex'
            }
        } else {
            answer[i].classList.remove('active');
            tab[i].classList.remove('facts__item--active');
            plus[i].style.display = 'flex';
            minus[i].style.display = 'none'
        }
    })
})





