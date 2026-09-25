// Header solid state on scroll
const header = document.getElementById('siteHeader');
function updateHeader(){
  if (window.scrollY > 60) header.classList.add('solid');
  else header.classList.remove('solid');
}
window.addEventListener('scroll', updateHeader);
updateHeader();

// Mobile menu - full-screen overlay, with body scroll lock
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuClose = document.getElementById('mobileMenuClose');

function lockScroll(){
  document.documentElement.classList.add('no-scroll');
  document.body.classList.add('no-scroll');
}
function unlockScroll(){
  document.documentElement.classList.remove('no-scroll');
  document.body.classList.remove('no-scroll');
}
function openMenu(){
  mobileMenu.classList.add('open');
  lockScroll();
}
function closeMenu(){
  mobileMenu.classList.remove('open');
  unlockScroll();
}
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    if (mobileMenu.classList.contains('open')) closeMenu();
    else openMenu();
  });
  if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMenu);
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  // Esc closes the mobile menu too
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMenu();
  });
}

// Gallery + lightbox (only runs on gallery.html, where #galleryGrid exists)
const galleryGrid = document.getElementById('galleryGrid');
if (galleryGrid) {
  const TOTAL_IMAGES = 24;
  const images = [];
  for (let i = 1; i <= TOTAL_IMAGES; i++) images.push(`images/image${i}.jpeg`);

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let currentIndex = 0;

  function renderImage(index){
    currentIndex = (index + images.length) % images.length;
    lightboxImg.classList.add('fading');
    window.setTimeout(() => {
      lightboxImg.src = images[currentIndex];
      lightboxImg.alt = `Women in Wellness Spa gallery photo ${currentIndex + 1}`;
      lightboxImg.classList.remove('fading');
    }, 150);
  }

  function openLightbox(index){
    renderImage(index);
    lightbox.classList.add('open');
    lockScroll();
  }
  function closeLightbox(){
    lightbox.classList.remove('open');
    unlockScroll();
  }
  function showPrev(e){ if (e) e.stopPropagation(); renderImage(currentIndex - 1); }
  function showNext(e){ if (e) e.stopPropagation(); renderImage(currentIndex + 1); }

  if (lightboxClose) lightboxClose.addEventListener('click', (e) => { e.stopPropagation(); closeLightbox(); });
  if (lightboxPrev) lightboxPrev.addEventListener('click', showPrev);
  if (lightboxNext) lightboxNext.addEventListener('click', showNext);

  // Click outside the image/buttons (on the dark backdrop) closes the lightbox
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowLeft') showPrev();
    else if (e.key === 'ArrowRight') showNext();
  });

  images.forEach((src, i) => {
    const item = document.createElement('div');
    item.className = 'g-item';
    item.innerHTML = `<img src="${src}" alt="Women in Wellness Spa gallery photo ${i + 1}" loading="lazy">`;
    item.addEventListener('click', () => openLightbox(i));
    galleryGrid.appendChild(item);
  });
}

// Scroll reveal animations
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
}, { threshold: 0.15 });
document.querySelectorAll('.fade').forEach(el => io.observe(el));

// Booking form -> pre-filled WhatsApp message (only runs on booking.html)
const SPA_WHATSAPP = '27645157086';
const bookingForm = document.getElementById('bookingForm');
const formNote = document.getElementById('formNote');
if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(bookingForm);
    const name = data.get('name');
    const phone = data.get('phone');
    const email = data.get('email') || 'Not provided';
    const service = data.get('service');
    const date = data.get('date');
    const time = data.get('time');
    const notes = data.get('notes') || 'None';

    const message =
`Hi Women in Wellness Spa, I'd like to request an appointment:

Name: ${name}
Phone: ${phone}
Email: ${email}
Treatment: ${service}
Preferred Date: ${date}
Preferred Time: ${time}
Notes: ${notes}`;

    const url = `https://wa.me/${SPA_WHATSAPP}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    formNote.textContent = "Thanks! We've opened WhatsApp with your request pre-filled — just hit send.";
  });
}
