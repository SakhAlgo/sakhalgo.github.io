const toggle = document.querySelector(".nav__toggle");
const navLinks = document.querySelector(".nav__links");

if (toggle && navLinks) {
  toggle.addEventListener("click", () => {
    navLinks.classList.toggle("is-open");
    toggle.classList.toggle("is-active");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      toggle.classList.remove("is-active");
    });
  });
}
