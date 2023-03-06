// Каждый модуль должен быть независим друг от друга
function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";

    console.log(modalTimerId);
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}
function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    // Modal

    const btnsOpen = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);

    btnsOpen.forEach((item) => {
        item.addEventListener("click", () => openModal(modalSelector, modalTimerId));
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal || e.target.getAttribute("data-close") == "") {
            closeModal(modalSelector);
        }
    });

    // взаимодействие с клавишами на клавиатуре - event.code
    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape" && modal.classList.contains("show")) {
            closeModal(modalSelector);
        }
    });

    function showModalByScroll() {
        if (
            window.pageXOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight
        ) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener("scroll", showModalByScroll);
        }
    }

    window.addEventListener("scroll", showModalByScroll);
}

export default modal;
export { openModal };
export { closeModal };
