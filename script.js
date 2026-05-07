document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("[data-nav]");
  const menu = document.querySelector("[data-menu]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const progress = document.querySelector(".page-progress");
  const hero = document.querySelector(".hero");
  const revealItems = document.querySelectorAll(".reveal");
  const counters = document.querySelectorAll("[data-counter]");
  const serviceCards = document.querySelectorAll(".service-card");

  const setScrollState = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = maxScroll > 0 ? window.scrollY / maxScroll : 0;

    nav.classList.toggle("is-scrolled", window.scrollY > 24);
    progress.style.transform = `scaleX(${ratio})`;

    if (hero) {
      hero.style.setProperty("--parallax", `${Math.min(window.scrollY * 0.18, 90)}px`);
    }
  };

  const closeMenu = () => {
    document.body.classList.remove("menu-open");
    menu.classList.remove("is-open");
    menuToggle.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    document.body.classList.toggle("menu-open", isOpen);
    menuToggle.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const element = entry.target;
      const target = Number(element.dataset.counter);
      const duration = 1500;
      const start = performance.now();

      const tick = (now) => {
        const progressValue = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progressValue, 3);
        element.textContent = Math.floor(target * eased).toLocaleString("pt-BR");

        if (progressValue < 1) {
          requestAnimationFrame(tick);
        }
      };

      requestAnimationFrame(tick);
      observer.unobserve(element);
    });
  }, { threshold: 0.55 });

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.16, rootMargin: "0px 0px -80px 0px" });

  revealItems.forEach((item) => revealObserver.observe(item));
  counters.forEach((counter) => counterObserver.observe(counter));

  serviceCards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 7;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * -7;
      card.style.setProperty("--tilt-x", `${x}deg`);
      card.style.setProperty("--tilt-y", `${y}deg`);
    });

    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
    });
  });

  window.addEventListener("scroll", setScrollState, { passive: true });
  setScrollState();
});
