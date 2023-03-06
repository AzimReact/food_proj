window.addEventListener("DOMContentLoaded", () => {
  const tabs = require("./modules/tabs"),
    cards = require("./modules/cards"),
    timer = require("./modules/timer"),
    slider = require("./modules/slider"),
    calc = require("./modules/calc"),
    modal = require("./modules/modal"),
    forms = require("./modules/forms");

  tabs();
  cards();
  timer();
  slider();
  calc();
  modal();
  forms();
});
// npx json-server --watch db.json --port 3000 - принудительная команда для пользования json-server
