// ============================================================
// CUSTOM CURSOR
// ============================================================
const cursor = document.getElementById("cursor");
const follower = document.getElementById("cursorFollower");
let mx = 0,
  my = 0,
  fx = 0,
  fy = 0;

document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx - 5 + "px";
  cursor.style.top = my - 5 + "px";
});

function animateCursor() {
  fx += (mx - fx) * 0.12;
  fy += (my - fy) * 0.12;
  follower.style.left = fx - 18 + "px";
  follower.style.top = fy - 18 + "px";
  requestAnimationFrame(animateCursor);
}
animateCursor();

document
  .querySelectorAll("a, button, .skill-tag, .service-card, .stat-item")
  .forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform = "scale(2)";
      follower.style.transform = "scale(1.5)";
      follower.style.opacity = "0.8";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.transform = "scale(1)";
      follower.style.transform = "scale(1)";
      follower.style.opacity = "0.5";
    });
  });

// ============================================================
// NAVBAR SCROLL + PROGRESS BAR + BACK-TO-TOP + ACTIVE LINK
// ============================================================
const navbar = document.getElementById("navbar");
const scrollProgress = document.getElementById("scrollProgress");
const backTop = document.getElementById("backTop");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;

  // Scroll progress bar
  scrollProgress.style.width = (scrollTop / docHeight) * 100 + "%";

  // Sticky nav background
  navbar.classList.toggle("scrolled", scrollTop > 50);

  // Back-to-top button visibility
  backTop.classList.toggle("visible", scrollTop > 400);

  // Active nav link highlight
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");
  sections.forEach((sec) => {
    const top = sec.offsetTop - 80;
    const bottom = top + sec.offsetHeight;
    if (scrollTop >= top && scrollTop < bottom) {
      navLinks.forEach((a) => a.classList.remove("active"));
      const active = document.querySelector(`.nav-links a[href="#${sec.id}"]`);
      if (active) active.classList.add("active");
    }
  });
});

// ============================================================
// HAMBURGER / MOBILE MENU
// ============================================================
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  mobileMenu.classList.toggle("open");
  document.body.style.overflow = mobileMenu.classList.contains("open")
    ? "hidden"
    : "";
});

function closeMobile() {
  hamburger.classList.remove("open");
  mobileMenu.classList.remove("open");
  document.body.style.overflow = "";
}

// ============================================================
// SCROLL REVEAL (IntersectionObserver)
// ============================================================
const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        revealObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 },
);

revealEls.forEach((el) => revealObserver.observe(el));

// ============================================================
// COUNTER ANIMATION
// ============================================================
const statNums = document.querySelectorAll(".stat-num[data-target]");
const counterObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const el = e.target;
        const target = parseInt(el.dataset.target);
        const suffix = target === 100 ? "" : "+";
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 60));

        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = current + suffix;
          if (current >= target) clearInterval(timer);
        }, 30);

        counterObs.unobserve(el);
      }
    });
  },
  { threshold: 0.5 },
);

statNums.forEach((el) => counterObs.observe(el));

// ============================================================
// CONTACT FORM SUBMISSION
// ============================================================
function handleSubmit(e) {
  e.preventDefault();
  const btn = document.querySelector(".btn-send");
  btn.textContent = "Sending...";
  btn.disabled = true;

  setTimeout(() => {
    document.getElementById("contactForm").reset();
    document.getElementById("formSuccess").style.display = "block";
    btn.textContent = "Send Message";
    btn.disabled = false;
    setTimeout(() => {
      document.getElementById("formSuccess").style.display = "none";
    }, 4000);
  }, 1200);
}

// ============================================================
// BACK TO TOP BUTTON
// ============================================================
document.getElementById("backTop").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ============================================================
// SKILL TAG RIPPLE ON CLICK
// ============================================================
document.querySelectorAll(".skill-tag").forEach((tag) => {
  tag.addEventListener("click", function () {
    this.style.background = "rgba(232,255,71,0.15)";
    this.style.borderColor = "var(--accent)";
    this.style.color = "var(--accent)";
    setTimeout(() => {
      this.style.background = "";
      this.style.borderColor = "";
      this.style.color = "";
    }, 800);
  });
});
