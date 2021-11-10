const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector(".fullscreen-menu");
const closeBtn = menu.querySelector(".fullscreen-menu__close");
const body = document.querySelector('body');

hamburger.addEventListener("click", e => {
  e.preventDefault();
  menu.classList.add("active");
  body.classList.add("hidden");
});

closeBtn.addEventListener("click", e => {
  e.preventDefault();
  menu.classList.remove("active");
  body.classList.remove("hidden");
})