(() => {
  const KEY = "ageConfirmed";
  const PLACEHOLDER_SEL = '[data-hx-get="global.age-confirm.html"]';
  const POPUP_SEL = ".age-confirm";

  function nukeAgeUI() {
    document
      .querySelectorAll(PLACEHOLDER_SEL + ", " + POPUP_SEL)
      .forEach((n) => n.remove());
  }

  if (localStorage.getItem(KEY) === "true") {
   
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", nukeAgeUI);
    } else {
      nukeAgeUI();
    }
  }

  document.addEventListener("htmx:beforeRequest", (e) => {
    if (
      e.target &&
      e.target.matches(PLACEHOLDER_SEL) &&
      localStorage.getItem(KEY) === "true"
    ) {
      e.preventDefault();

      if (e.detail) {
        e.detail.shouldSwap = false;
        e.detail.isError = false;
      }

      e.target.remove();
    }
  });

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".age-confirm__accept");
    if (!btn) return;

    e.preventDefault();
    localStorage.setItem(KEY, "true");
    nukeAgeUI();
  });
})();
