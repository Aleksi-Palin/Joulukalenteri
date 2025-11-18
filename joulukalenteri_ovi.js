window.addEventListener("DOMContentLoaded", () => {
  const today = new Date().getDate();
  const days = document.querySelectorAll(".days li");

  if (days[today - 1]) {
    const box = days[today - 1];

    box.addEventListener("click", () => {
    box.classList.add("opened");
    });}});