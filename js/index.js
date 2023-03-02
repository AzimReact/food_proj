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

    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Can not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getResource('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altImg, title, descr, price}) => {
            new MenuCard(img, altImg, title, descr, price, '.menu .container').render()
        })
    })

    // -------------axios

    // axios.get('http://localhost:3000/menu')
    // .then(data => {
    //     data.data.forEach(({img, altImg, title, descr, price}) => {
    //         new MenuCard(img, altImg, title, descr, price, '.menu .container').render()
    //     })
    // })

    // ---------------- без классов реализация динамической верстки с сервера, данные на один раз
    // getResource('http://localhost:3000/menu')
    // .then(data => createCard(data));

    // function createCard (data) {
    //     data.forEach(({img, altImg, title, descr, price}) => {
    //         const element = document.createElement('div');
    //         element.classList.add('menu__item');
    //         element.innerHTML = `
    //             <img src=${img} alt=${altImg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price * 85}</span> cом/день</div>
    //             </div>
    //         `
    //         document.querySelector('.menu .container').append(element);
    //     });
    // };


    // // 1-ый классический способ
    // const firstCard = new MenuCard(
    //     "img/tabs/vegy.jpg",
    //     "vegy",
    //     'Меню "Фитнес"',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     229,
    //     '.menu .container',
    // );
    // firstCard.render()

    // // 2-ой способ, если нам нужно один раз отрендерить данные дальше они нам не нужны для хранения
    // new MenuCard(
    //     "img/tabs/elite.jpg",
    //     "elite",
    //     'Меню “Премиум”',
    //     'Меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    //     550,
    //     '.menu .container'
    // ).render();

    // new MenuCard(
    //     "img/tabs/post.jpg",
    //     "post",
    //     'Меню "Постное"',
    //     'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ',
    //     430,
    //     '.menu .container'
    // ).render();
        

    // Forms - собрать данные и отправить на сервер

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        succes: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    }

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    }

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading // если есть класс статус то он добавиться
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage)

            const formData = new FormData(form); // объект formData - который мы сформировали, но можно отправить в JSON формате, разберем позже

            const json = JSON.stringify(Object.fromEntries(formData.entries()));// из формдаты сделали json - так как сразу JSON.stringify не сработает на объекте formData

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data); 
                showThanksModal(message.succes);
                statusMessage.remove() // удалили спиннер
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset(); // валидация. Или можно просто перебрать все инпуты и почистить их value
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
        }, 2500);
    };


    // ------------ Slider 1

    const slides = document.querySelectorAll('.offer__slide'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current');

    let slideIndex = 1;

    showSlides(slideIndex);

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`
    } else {
        total.textContent = slides.length;
    }

    function showSlides(n) {
        if ( n > slides.length) {
            slideIndex = 1
        };
        if ( n < 1) {
            slideIndex = slides.length
        };

        slides.forEach( item => item.style.display = 'none');
        slides[slideIndex - 1].style.display = 'block';

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`
        } else {
            current.textContent = slideIndex;
        };

    }

    function plusSlides(n) {
        showSlides(slideIndex += n)
    };

    prev.addEventListener('click', () => {
        plusSlides(-1)
    });
    next.addEventListener('click', () => {
        plusSlides(1)
    });
});

// npx json-server --watch db.json --port 3000 - принудительная команда для пользования json-server







