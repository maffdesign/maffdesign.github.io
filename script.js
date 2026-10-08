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

const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);
    const subject = `[maff 프로젝트 상담] ${formData.get('topic')} - ${formData.get('name')}`;
    const body = [
      'maff 프로젝트 상담 문의',
      '',
      `이름/회사명: ${formData.get('name')}`,
      `회신 이메일: ${formData.get('email')}`,
      `관심 분야: ${formData.get('topic')}`,
      '',
      '현재 고민이나 목표:',
      formData.get('message'),
    ].join('\n');

    const mailto = `mailto:maff@maff.kr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    if (formStatus) formStatus.textContent = '메일 앱에서 문의 내용을 확인한 뒤 보내기를 눌러주세요.';
    window.location.href = mailto;
  });
}
