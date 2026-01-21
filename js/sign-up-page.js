document.addEventListener("DOMContentLoaded", () => {
  const fnext = document.getElementById("fnext-btn");
  const sumbit = document.getElementById("submit-page");
  const next = document.getElementById("next-btn");
  const prev = document.getElementById("prev-btn");
  const lastPrev = document.getElementById("last-prev-btn");
  const secondLastPrev = document.getElementById("second-last-prev-btn");
  const secondLastNext= document.getElementById("second-last-next-btn");
  const f_page = document.getElementById("first-page");
  const s_page = document.getElementById("second-page");
  const t_page = document.getElementById("second-last-page");
  const l_page = document.getElementById("last-page");

  fnext.addEventListener("click", () => {
    f_page.style.display = "none";
    s_page.style.display = "block";
  });

  prev.addEventListener("click", () => {
    f_page.style.display = "block";
    s_page.style.display = "none";
  });

  next.addEventListener("click", () => {
    s_page.style.display = "none";
    t_page.style.display = "block";
  });

  secondLastPrev.addEventListener("click", () => {
    s_page.style.display = "block";
    t_page.style.display = "none";
  })

  secondLastNext.addEventListener("click", () => {
    t_page.style.display = "none";
    l_page.style.display = "block";
  })

  lastPrev.addEventListener("click", () => {
    t_page.style.display = "block";
    l_page.style.display = "none";
  });
});
