function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
  // Tabs

  const tabs = document.querySelectorAll(tabsSelector),
    tabsContent = document.querySelectorAll(tabsContentSelector),
    tabsParent = document.querySelector(tabsParentSelector);

  function hideTabContent() {
    tabsContent.forEach((item) => {
      // item.style.display = 'none';
      // or
      item.classList.add("hide");
      item.classList.remove("show", "anime");
    });

    tabs.forEach((item) => {
      item.classList.remove(activeClass);
    });
  }

  //вызов функции по умолчанию - передаем в параметрах функции какое-то значение по умолчанию, а при вызове ничего не указываем, так как это значение установиться при вызове
  function showTabContent(i = 0) {
    // tabsContent[i].style.display = 'block';
    // or
    tabsContent[i].classList.add("show", "anime");
    tabsContent[i].classList.remove("hide");

    tabs[i].classList.add(activeClass);
  }

  hideTabContent();
  showTabContent(0);

  // перебирая нодлист сравниваем его с таргетом по клику и если они совпадают, то уже меняем (используем перебор, чтобы могли подставить индекс)
  tabsParent.addEventListener("click", (e) => {
    const target = e.target;

    if (target && target.classList.contains(tabsSelector.slice(1))) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}

export default tabs;
