(() => {
  const KEY = 'ageConfirmed';
  const PLACEHOLDER_SEL = '[data-hx-get="global.age-confirm.html"]';
  const POPUP_SEL = '.age-confirm';

  // Удаляем плейсхолдер и попап, если они есть
  function nukeAgeUI() {
    document.querySelectorAll(PLACEHOLDER_SEL + ', ' + POPUP_SEL)
      .forEach(n => n.remove());
  }

  // 1) Если уже подтверждено — снесем всё как можно раньше
  if (localStorage.getItem(KEY) === 'true') {
    // На всякий случай и сразу
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', nukeAgeUI);
    } else {
      nukeAgeUI();
    }
  }

  // 2) Останавливаем HTMX-запрос подгрузки попапа, если уже подтверждено
  //    (нужно, чтобы он даже не дергался)
  document.addEventListener('htmx:beforeRequest', (e) => {
    if (
      e.target &&
      e.target.matches(PLACEHOLDER_SEL) &&
      localStorage.getItem(KEY) === 'true'
    ) {
      e.preventDefault();
      // чтобы HTMX не пытался свапать/считать это ошибкой
      if (e.detail) {
        e.detail.shouldSwap = false;
        e.detail.isError = false;
      }
      // и сразу уберем плейсхолдер
      e.target.remove();
    }
  });

  // 3) ДЕЛЕГИРОВАНИЕ клика по кнопке «Yes, I'm 21+»
  //    Работает и для динамически подгруженного попапа.
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.age-confirm__accept');
    if (!btn) return;

    e.preventDefault();
    localStorage.setItem(KEY, 'true');
    nukeAgeUI();
  });
})();
