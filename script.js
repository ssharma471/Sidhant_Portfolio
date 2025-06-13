// ---------- Toggle Navbar Icon ----------
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.addEventListener('click', () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
});

// ---------- Scroll & Section Highlight ----------
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');
const header = document.querySelector('header');
const footer = document.querySelector('footer');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  sections.forEach((sec) => {
    const offset = sec.offsetTop - 100;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');

    if (scrollY >= offset && scrollY < offset + height) {
      // Activate navbar links
      navLinks.forEach((link) => link.classList.remove('active'));
      const activeLink = document.querySelector(`header nav a[href*=${id}]`);
      if (activeLink) activeLink.classList.add('active');

      // Animate section
      sec.classList.add('show-animate');
    } else {
      sec.classList.remove('show-animate');
    }
  });

  // Sticky header
  header.classList.toggle('sticky', scrollY > 100);

  // Close navbar on scroll
  menuIcon.classList.remove('bx-x');
  navbar.classList.remove('active');

  // Footer animation
  const windowBottom = window.innerHeight + scrollY;
  const docHeight = document.documentElement.scrollHeight;
  footer.classList.toggle('show-animate', windowBottom >= docHeight);
});

// ---------- Confetti Animation ----------
class Confettiful {
  constructor(el) {
    this.el = el;
    this.containerEl = null;
    this.confettiFrequency = 3;
    this.confettiColors = ['#EF2964', '#00C09D', '#754ef9', '#48485E', '#ededed'];
    this.confettiAnimations = ['slow', 'medium', 'fast'];

    this.setupElements();
    this.renderConfetti();
  }

  setupElements() {
    const containerEl = document.createElement('div');
    if (!['relative', 'absolute'].includes(this.el.style.position)) {
      this.el.style.position = 'relative';
    }
    containerEl.classList.add('confetti-container');
    this.el.appendChild(containerEl);
    this.containerEl = containerEl;
  }

  renderConfetti() {
    this.confettiInterval = setInterval(() => {
      const confettiEl = document.createElement('div');
      const size = `${Math.floor(Math.random() * 3) + 7}px`;
      const color = this.confettiColors[Math.floor(Math.random() * this.confettiColors.length)];
      const left = `${Math.floor(Math.random() * this.el.offsetWidth)}px`;
      const animation = this.confettiAnimations[Math.floor(Math.random() * this.confettiAnimations.length)];

      confettiEl.classList.add('confetti', `confetti--animation-${animation}`);
      confettiEl.style.left = left;
      confettiEl.style.width = size;
      confettiEl.style.height = size;
      confettiEl.style.backgroundColor = color;

      setTimeout(() => confettiEl.remove(), 3000);
      this.containerEl.appendChild(confettiEl);
    }, 25);
  }
}

// ---------- Trigger Congrats Animation ----------
const showCongrats = () => {
  new Confettiful(document.querySelector('.js-container'));
  document.querySelector('.congrats').style.display = 'block';
};

const hideCongrats = () => {
  const congratsEl = document.querySelector('.congrats');
  const confettiContainer = document.querySelector('.confetti-container');

  if (congratsEl) congratsEl.style.display = 'none';
  if (confettiContainer) confettiContainer.style.display = 'none';
};

document.querySelector('.recruter')?.addEventListener('click', showCongrats);
document.querySelector('#endanim')?.addEventListener('click', hideCongrats);
