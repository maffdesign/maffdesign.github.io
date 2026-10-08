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
const formspreeEndpoint = 'https://formspree.io/f/mrpeqkpj';

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    const submitButton = contactForm.querySelector('[type="submit"]');
    const originalButtonContent = submitButton?.innerHTML;
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = '문의 전송 중…';
    }
    if (formStatus) formStatus.textContent = '상담 내용을 전송하고 있습니다.';

    fetch(formspreeEndpoint, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { Accept: 'application/json' },
    })
      .then(async (response) => {
        const result = await response.json().catch(() => ({}));
        if (!response.ok) {
          const detail = result.errors?.map((error) => error.message).filter(Boolean).join(' ');
          throw new Error(detail || '전송에 실패했습니다. 잠시 후 다시 시도해 주세요.');
        }

        contactForm.reset();
        if (formStatus) formStatus.textContent = '문의가 성공적으로 전송되었습니다!';
      })
      .catch((error) => {
        if (formStatus) formStatus.textContent = error.message || '네트워크 오류로 전송하지 못했습니다. 잠시 후 다시 시도해 주세요.';
      })
      .finally(() => {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.innerHTML = originalButtonContent;
        }
      });
  });
}
