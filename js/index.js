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

    const deadline = '2023-02-26'

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

            days.innerHTML = getZero(t.days)
            hours.innerHTML = getZero(t.hours)
            minutes.innerHTML = getZero(t.minutes)
            seconds.innerHTML = getZero(t.seconds)
        }

        if(timeInterval <= 0) {
            clearInterval(timeInterval)
        }
        console.log('timer');
    }

    setClock('.timer', deadline)


    // Modal

    const btnsOpen = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'), 
        btnClose = document.querySelector('[data-close]')


    function openModal() {
        modal.classList.add('show')
        modal.classList.remove('hide')
        document.body.style.overflow = 'hidden'
        clearInterval(modalTimerId)
    }

    btnsOpen.forEach( item => {
        item.addEventListener('click', openModal)
    })

    function closeModal() {
        modal.classList.add('hide')
        modal.classList.remove('show')
        document.body.style.overflow = ''
    }

    btnClose.addEventListener('click', closeModal)

    modal.addEventListener('click', (e) => {
        // console.log(e.target);
        if (e.target === modal) {
            closeModal()
        }
    })

    // взаимодействие с клавишами на клавиатуре - event.code
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal()
        }
    })

    const modalTimerId = setTimeout(openModal, 1500)

    function showModalByScroll(){
        if(window.pageXOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll)
        }   
    }

    window.addEventListener('scroll', showModalByScroll)
})

