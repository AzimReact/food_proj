import { getResource } from "../services/services";

function cards() {
  // Use Classes for cards
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      (this.transfer = 88), 5;
      this.changeToSoms();
    }

    changeToSoms() {
      this.price = this.price * this.transfer;
    }

    render() {
      const card = document.createElement("div");

      if (this.classes.length == 0) {
        this.card = "menu__item";
        card.classList.add(this.card);
      } else {
        this.classes.forEach((className) => card.classList.add(className));
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

      this.parent.append(card);
    }
  }

  getResource("http://localhost:3000/menu").then((data) => {
    data.forEach(({ img, altImg, title, descr, price }) => {
      new MenuCard(
        img,
        altImg,
        title,
        descr,
        price,
        ".menu .container"
      ).render();
    });
  });

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
}

export default cards;
