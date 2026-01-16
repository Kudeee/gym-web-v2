function toggleView(view) {
  const gridView = document.getElementById("gridView");
  const listView = document.getElementById("listView");
  const buttons = document.querySelectorAll(".view-btn");

  buttons.forEach((btn) => btn.classList.remove("active"));

  if (view === "grid") {
    gridView.style.display = "block";
    listView.classList.remove("active");
    buttons[0].classList.add("active");
  } else {
    gridView.style.display = "none";
    listView.classList.add("active");
    buttons[1].classList.add("active");
  }
}

function bookClass(className) {
  alert(`Booking ${className} class...`);
}
