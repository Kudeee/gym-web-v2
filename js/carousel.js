const track = document.querySelector(".carousel-track");
let slides = Array.from(track.children);

// Clone slides for looping
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

track.appendChild(firstClone);
track.insertBefore(lastClone, slides[0]);

slides = Array.from(track.children);

let index = 1;
track.style.transform = `translateX(-${index * 100}%)`;

// Activate first slide text
setActiveSlide();

setInterval(() => {
  index++;
  track.style.transition = "transform 0.4s ease";
  track.style.transform = `translateX(-${index * 100}%)`;
  setActiveSlide();
}, 3000);

track.addEventListener("transitionend", () => {
  if (slides[index] === firstClone) {
    track.style.transition = "none";
    index = 1;
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  if (slides[index] === lastClone) {
    track.style.transition = "none";
    index = slides.length - 2;
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  setActiveSlide();
});

function setActiveSlide() {
  slides.forEach(slide => slide.classList.remove("active"));
  slides[index].classList.add("active");
}
