window.addEventListener('DOMContentLoaded', () => {

    // Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            // item.style.display = 'none';
            // or
        
            item.classList.add('hide')
            item.classList.remove('show', 'anime')
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active')
        });
    };

    //вызов функции по умолчанию - передаем в параметрах функции какое-то значение по умолчанию, а при вызове ничего не указываем, так как это значение установиться при вызове
    function showTabContent(i = 0) {
        // tabsContent[i].style.display = 'block';
        // or
        tabsContent[i].classList.add('show', 'anime')
        tabsContent[i].classList.remove('hide')

        tabs[i].classList.add('tabheader__item_active')
    };

    hideTabContent();
    showTabContent(0);

    // перебирая нодлист сравниваем его с таргетом по клику и если они совпадают, то уже меняем (используем перебор, чтобы могли подставить индекс)
    tabsParent.addEventListener('click', (e) => {
        const target = e.target

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            })
        }
    })


    // Timer

    const deadline = '2023-02-29'

    function getTimeRemaining(endTime) {
        const t = Date.parse(deadline) - Date.parse(new Date()),
            days = Math.floor( t / (1000 * 60 * 60 * 24) )
            hours = Math.floor( t / (1000 * 60 * 60) % 24 )
            minutes = Math.floor( t / (1000 * 60) % 60 )
            seconds = Math.floor( t / (1000) % 60 );

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    function getZero(num) {
        if( num >= 0 && num < 10) {
            return `0${num}`
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining()

            if( t.total <= 0 ) {
                days.innerHTML = '00'
                hours.innerHTML = '00'
                minutes.innerHTML = '00'
                seconds.innerHTML = '00'
            } else {
                days.innerHTML = getZero(t.days)
                hours.innerHTML = getZero(t.hours)
                minutes.innerHTML = getZero(t.minutes)
                seconds.innerHTML = getZero(t.seconds)
            }

        }

        if(timeInterval <= 0) {
            clearInterval(timeInterval)
        }
        // console.log('timer');
    }

    setClock('.timer', deadline)


    // Modal

    const btnsOpen = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');


    function openModal() {
        modal.classList.add('show')
        modal.classList.remove('hide')
        document.body.style.overflow = 'hidden'
    }

    btnsOpen.forEach( item => {
        item.addEventListener('click', openModal)
    })

    function closeModal() {
        modal.classList.add('hide')
        modal.classList.remove('show')
        document.body.style.overflow = ''
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal()
        }
    })

    // взаимодействие с клавишами на клавиатуре - event.code
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal()
        }
    })

    const modalTimerId = setTimeout(openModal, 50000)

    function showModalByScroll(){
        if(window.pageXOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll)
        }   
    }

    window.addEventListener('scroll', showModalByScroll)

    // Use Classes for cards

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes ) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 88,5;
            this.changeToSoms();
        }

        changeToSoms() {
            this.price = this.price * this.transfer
        }

        render() {
            const card = document.createElement('div')
            
            if( this.classes.length == 0) {
                this.card = 'menu__item'
                card.classList.add(this.card)
            } else {
                this.classes.forEach(className => card.classList.add(className))
            }
            card.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> cом/день</div>
                </div>
            `;

            this.parent.append(card)
        };
    };

    // 1-ый классический способ
    const firstCard = new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        229,
        '.menu .container',
    );
    firstCard.render()

    // 2-ой способ, если нам нужно один раз отрендерить данные дальше они нам не нужны для хранения
    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'Меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        550,
        '.menu .container'
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ',
        430,
        '.menu .container'
    ).render();
        

    // Forms - собрать данные и отправить на сервер

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        succes: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    }

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading // если есть класс статус то он добавиться
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            // form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage)


            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');

            request.setRequestHeader('Content-type', 'application/json');
            const formData = new FormData(form); // объект formData - который мы сформировали, но можно отправить в JSON формате, разберем позже


            const object = {

            } // создал объект, чтобы туда закинуть formData

            formData.forEach(function (value, key) {
                object[key] = value
            })

            const json = JSON.stringify(object)

            request.send(json);

            request.addEventListener('load', () => {
                if ( request.status === 200 ) {
                    console.log(request.response); 
                    showThanksModal(message.succes);
                    form.reset(); // валидация. Или можно просто перебрать все инпуты и почистить их value
                    statusMessage.remove() // удалили спиннер
                } else {
                    showThanksModal(message.failure);
                };

            });


        });
    };


    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog')

        prevModalDialog.classList.add('hide')
        openModal()

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>x</div>
                <div class="modal__title">${message}</div>
            </div>
        `
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show')
            prevModalDialog.classList.remove('hide')
            closeModal();
        }, 4000);
    }

});


