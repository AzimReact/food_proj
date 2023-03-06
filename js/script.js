import tabs from "./modules/tabs";
import cards from "./modules/cards";
import timer from "./modules/timer";
import slider from "./modules/slider";
import calc from "./modules/calc";
import modal from "./modules/modal";
import forms from "./modules/forms";
import { openModal } from "./modules/modal";

window.addEventListener("DOMContentLoaded", () => {
  const modalTimerId = setTimeout(() => openModal(".modal", modalTimerId), 300000);

  tabs(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
  modal("[data-modal]", ".modal", modalTimerId);
  timer('.timer', '2023-03-08');
  cards();
  calc();
  forms('form', modalTimerId);
  slider({
    container: ".offer__slider",
    slide: ".offer__slide",
    nextArrow: ".offer__slider-next",
    prevArrow: ".offer__slider-prev",
    totalCounter: "#total",
    currentCounter: "#current",
    wrapper: ".offer__slider-wrapper",
    field: ".offer__slider-inner"

  });
});
// npx json-server --watch db.json --port 3000 - принудительная команда для пользования json-server
