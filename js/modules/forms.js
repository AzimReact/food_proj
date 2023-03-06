import { closeModal, openModal } from "./modal";
import { postData } from "../services/services";

function forms(formSelector, modalTimerId) {
  // Forms - собрать данные и отправить на сервер

  const forms = document.querySelectorAll(formSelector);

  const message = {
    loading: "img/form/spinner.svg",
    succes: "Спасибо! Скоро мы с вами свяжемся",
    failure: "Что-то пошло не так...",
  };

  forms.forEach((item) => {
    bindPostData(item);
  });

  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("img");
      statusMessage.src = message.loading; // если есть класс статус то он добавиться
      statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
      form.insertAdjacentElement("afterend", statusMessage);

      const formData = new FormData(form); // объект formData - который мы сформировали, но можно отправить в JSON формате, разберем позже

      const json = JSON.stringify(Object.fromEntries(formData.entries())); // из формдаты сделали json - так как сразу JSON.stringify не сработает на объекте formData

      postData("http://localhost:3000/requests", json)
        .then((data) => {
          console.log(data);
          showThanksModal(message.succes);
          statusMessage.remove(); // удалили спиннер
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset(); // валидация. Или можно просто перебрать все инпуты и почистить их value
        });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");

    prevModalDialog.classList.add("hide");
    openModal('.modal', modalTimerId);

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>x</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      closeModal('.modal');
    }, 4000);
  }
}

export default forms;
