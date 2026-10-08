const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.primary-nav');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? '메뉴 열기' : '메뉴 닫기');
    nav.classList.toggle('is-open', !isOpen);
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', '메뉴 열기');
      nav.classList.remove('is-open');
    });
  });
}

// Add the company's approved inquiry email here before launch.
const contactEmail = '';
document.querySelectorAll('a[href="mailto:"]').forEach((link) => {
  if (contactEmail) link.href = `mailto:${contactEmail}`;
  else {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      window.alert('문의 이메일을 연결할 예정입니다. 연락처를 확정한 뒤 이 버튼에 연결해 주세요.');
    });
  }
});
