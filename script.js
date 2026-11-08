/* ---------- FOOTER YEAR ---------- */
const yearElement = document.getElementById("y");
if (yearElement) yearElement.textContent = new Date().getFullYear();

/* ---------- THEME TOGGLE ---------- */
const root = document.documentElement;
document.getElementById("theme-toggle")?.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  try { localStorage.setItem("theme", next); } catch (e) {}
});

/* ---------- MOBILE MENU ---------- */
const navToggle = document.getElementById("nav-toggle");
document.querySelectorAll(".nav nav a").forEach((link) => {
  link.addEventListener("click", () => {
    if (navToggle) navToggle.checked = false;
  });
});

/* ---------- BACK TO TOP + SCROLL INDICATOR ---------- */
const toTop = document.getElementById("to-top");
const scrollDown = document.querySelector(".scroll-down");

window.addEventListener("scroll", () => {
  toTop?.classList.toggle("show", window.scrollY > 400);
  scrollDown?.classList.toggle("hide", window.scrollY > 80);
});

toTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ---------- TYPING ANIMATION ---------- */
const phrases = [
  "Python Developer.",
  "Backend Learner.",
  "Automation Enthusiast.",
  "Future Problem Solver."
];

const typedEl = document.getElementById("typed-text");

if (typedEl) {
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function type() {
    const current = phrases[phraseIndex];

    if (!deleting) {
      typedEl.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(type, 1400);
        return;
      }
    } else {
      typedEl.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }

    setTimeout(type, deleting ? 40 : 80);
  }

  type();
}

/* ---------- SCROLL REVEAL ---------- */
const revealElements = document.querySelectorAll(".reveal");

if (!("IntersectionObserver" in window)) {
  revealElements.forEach((el) => el.classList.add("visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
  );
  revealElements.forEach((el) => observer.observe(el));
}