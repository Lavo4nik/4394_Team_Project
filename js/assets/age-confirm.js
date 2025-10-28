document.addEventListener("DOMContentLoaded", () => {
  const popup = document.querySelector(".age-confirm");
  const acceptBtn = document.querySelector(".age-confirm__accept");
  const ageSection = document.querySelector('[data-hx-get="global.age-confirm.html"]');

  // Если в localStorage уже есть отметка — удалить секцию и popup
  if (localStorage.getItem("ageConfirmed") === "true") {
    if (ageSection) ageSection.remove();
    if (popup) popup.remove();
    return;
  }

  // Клик по "Yes, I'm 21+"
  if (acceptBtn) {
    acceptBtn.addEventListener("click", (e) => {
      e.preventDefault();

      // Убираем popup
      if (popup) popup.remove();

      // Сохраняем отметку
      localStorage.setItem("ageConfirmed", "true");

      // Убираем секцию из index
      if (ageSection) ageSection.remove();
    });
  }
});
