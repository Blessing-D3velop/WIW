// Header solid state on scroll
const header = document.getElementById('siteHeader');
function updateHeader(){
  if (window.scrollY > 60) header.classList.add('solid');
  else header.classList.remove('solid');
}
window.addEventListener('scroll', updateHeader);
updateHeader();

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

// Build gallery from images/image1.jpg ... image25.jpg (only runs on gallery.html)
const galleryGrid = document.getElementById('galleryGrid');
if (galleryGrid) {
  const TOTAL_IMAGES = 24;
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.add('open');
  }
  function closeLightbox() { lightbox.classList.remove('open'); }
  lightbox.addEventListener('click', closeLightbox);
  lightboxClose.addEventListener('click', closeLightbox);

  for (let i = 1; i <= TOTAL_IMAGES; i++) {
    const item = document.createElement('div');
    item.className = 'g-item';
    item.innerHTML = `<img src="images/image${i}.jpeg" alt="Women in Wellness Spa gallery photo ${i}" loading="lazy">`;
    item.addEventListener('click', () => openLightbox(`images/image${i}.jpg`));
    galleryGrid.appendChild(item);
  }
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
