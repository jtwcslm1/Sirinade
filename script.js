const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (menuBtn && mobileMenu) {
  const mobileLinks = mobileMenu.querySelectorAll("a");

  menuBtn.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("open");
    menuBtn.classList.toggle("active", isOpen);
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      menuBtn.classList.remove("active");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealElements.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.14
  });

  revealElements.forEach((el) => observer.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add("visible"));
}

const brandMark = document.querySelector(".brand-mark");
const heroCard = document.querySelector(".hero-photo-card");

window.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5);
  const y = (e.clientY / window.innerHeight - 0.5);

  if (brandMark) {
    brandMark.style.transform = `translate(${x * 4}px, ${y * 4}px) rotate(${x * 8}deg)`;
  }

  if (heroCard && window.innerWidth > 980) {
    heroCard.style.transform =
      `translateY(${y * -6}px) rotateY(${x * 5}deg) rotateX(${y * -4}deg)`;
  }
});

window.addEventListener("mouseleave", () => {
  if (heroCard && window.innerWidth > 980) {
    heroCard.style.transform = "";
  }

  if (brandMark) {
    brandMark.style.transform = "";
  }
});