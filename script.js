document.body.classList.add('loading');

const loader = document.querySelector('.loader');
const header = document.querySelector('.site-header');
const progress = document.querySelector('.scroll-progress');
const nav = document.querySelector('.site-nav');
const menu = document.querySelector('.menu-toggle');
const navLinks = [...document.querySelectorAll('.site-nav a')];

window.addEventListener('load', () => {
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.classList.remove('loading');
    document.querySelector('.hero-copy')?.classList.add('visible');
    document.querySelector('.hero-visual')?.classList.add('visible');
  }, 1250);
});

menu.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  nav.classList.toggle('open', open);
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});

navLinks.forEach(link => link.addEventListener('click', () => {
  menu.classList.remove('open');
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
}));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const delay = Number(entry.target.dataset.delay || 0);
    setTimeout(() => entry.target.classList.add('visible'), delay);
    revealObserver.unobserve(entry.target);
  });
}, { threshold: .13 });

document.querySelectorAll('.reveal').forEach(el => {
  if (!el.closest('.hero')) revealObserver.observe(el);
});

const sections = [...document.querySelectorAll('main section[id]')];
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-40% 0px -52% 0px' });
sections.forEach(section => sectionObserver.observe(section));

function onScroll() {
  const y = window.scrollY;
  const height = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = `${height ? (y / height) * 100 : 0}%`;
  header.classList.toggle('scrolled', y > 40);
  if (innerWidth > 980) {
    const visual = document.querySelector('.hero-visual');
    if (visual && y < innerHeight) visual.style.transform = `translateY(${y * .055}px)`;
  }
}
addEventListener('scroll', onScroll, { passive: true });
onScroll();

const magnetic = document.querySelector('.magnetic');
if (magnetic && matchMedia('(pointer:fine)').matches) {
  magnetic.addEventListener('mousemove', event => {
    const r = magnetic.getBoundingClientRect();
    magnetic.style.transform = `translate(${(event.clientX-r.left-r.width/2)*.08}px,${(event.clientY-r.top-r.height/2)*.12}px)`;
  });
  magnetic.addEventListener('mouseleave', () => magnetic.style.transform = '');
}
