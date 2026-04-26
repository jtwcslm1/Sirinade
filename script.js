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

/* Restaurant Image Carousel */
const restaurantCarousel = document.getElementById("restaurantCarousel");
const prevBtn = document.querySelector(".carousel-prev");
const nextBtn = document.querySelector(".carousel-next");
const dots = document.querySelectorAll(".carousel-dot");

let currentSlide = 0;
const totalSlides = dots.length;

function updateCarousel(index) {
  if (!restaurantCarousel || totalSlides === 0) return;

  currentSlide = (index + totalSlides) % totalSlides;
  restaurantCarousel.style.transform = `translateX(-${currentSlide * 100}%)`;

  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === currentSlide);
  });
}

if (restaurantCarousel && prevBtn && nextBtn && totalSlides > 0) {
  prevBtn.addEventListener("click", () => {
    updateCarousel(currentSlide - 1);
  });

  nextBtn.addEventListener("click", () => {
    updateCarousel(currentSlide + 1);
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const slideIndex = Number(dot.dataset.slide);
      updateCarousel(slideIndex);
    });
  });

  setInterval(() => {
    updateCarousel(currentSlide + 1);
  }, 4200);
}
/* Waitlist Form Submission */
const waitlistForm = document.getElementById("waitlistForm");
const waitlistMessage = document.getElementById("waitlistMessage");

const waitlistScriptURL = "https://script.google.com/macros/s/AKfycbzAqfi8S_PeIKX8MOf_UYKIhK5tfo9LMbsjlVpkS5PE1I9NqxrgIMZc8TogkY3Hd8vC/exec";

if (waitlistForm) {
  waitlistForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!fullName || !email) {
      waitlistMessage.textContent = "Please enter your name and email.";
      waitlistMessage.classList.remove("success");
      waitlistMessage.classList.add("error");
      return;
    }

    waitlistMessage.textContent = "Sending...";
    waitlistMessage.classList.remove("success", "error");

    const data = {
      fullName: fullName,
      email: email
    };

    try {
      await fetch(waitlistScriptURL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(data)
      });

      waitlistMessage.textContent = "Thank you! You are on the waitlist.";
      waitlistMessage.classList.remove("error");
      waitlistMessage.classList.add("success");
      waitlistForm.reset();

    } catch (error) {
      waitlistMessage.textContent = "Something went wrong. Please try again.";
      waitlistMessage.classList.remove("success");
      waitlistMessage.classList.add("error");
    }
  });
}