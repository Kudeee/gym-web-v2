function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  navLinks.classList.toggle("active");
}

function closeMenu() {
  const navLinks = document.getElementById("navLinks");
  navLinks.classList.remove("active");
}

function toggleFAQ(element) {
  const answer = element.querySelector(".faq-answer");
  const symbol = element.querySelector(".faq-question span:last-child");

  answer.classList.toggle("active");
  symbol.textContent = answer.classList.contains("active") ? "−" : "+";
}

function handleSubmit(event) {
  event.preventDefault();
  alert("Thank you for your message! We will get back to you soon.");
  event.target.reset();
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});
