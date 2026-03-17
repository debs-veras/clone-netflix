(function () {
  'use strict';

  /* -------------------------------------------------------
     FAQ Accordion
  ------------------------------------------------------- */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    const btn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    btn.addEventListener('click', function () {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      faqItems.forEach(function (other) {
        if (other !== item) {
          const otherBtn = other.querySelector('.faq-question');
          const otherAnswer = other.querySelector('.faq-answer');
          otherBtn.setAttribute('aria-expanded', 'false');
          otherAnswer.classList.remove('open');
        }
      });

      btn.setAttribute('aria-expanded', String(!isOpen));
      answer.classList.toggle('open', !isOpen);
    });
  });

  /* -------------------------------------------------------
     Email Form Validation
  ------------------------------------------------------- */
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  function handleFormSubmit(form, inputId, errorId) {
    const input = document.getElementById(inputId);
    const errorEl = document.getElementById(errorId);

    if (!form || !input) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const value = input.value.trim();

      if (!value) {
        showError(input, errorEl, 'Por favor, insira seu endereço de email.');
        return;
      }

      if (!validateEmail(value)) {
        showError(input, errorEl, 'Por favor, insira um endereço de email válido.');
        return;
      }

      clearError(input, errorEl);

      const btn = form.querySelector('.btn-primary');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="btn-icon" style="width:28px;height:28px"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Ok!';
      btn.style.backgroundColor = '#22c55e';

      setTimeout(function () {
        btn.innerHTML = originalText;
        btn.style.backgroundColor = '';
        input.value = '';
      }, 2500);
    });

    input.addEventListener('input', function () {
      if (input.value.trim()) {
        clearError(input, errorEl);
      }
    });
  }

  function showError(input, errorEl, message) {
    input.style.borderColor = '#f87171';
    if (errorEl) {
      errorEl.textContent = message;
    }
    input.focus();
  }

  function clearError(input, errorEl) {
    input.style.borderColor = '';
    if (errorEl) {
      errorEl.textContent = '';
    }
  }

  handleFormSubmit(
    document.getElementById('hero-form'),
    'email-input',
    'form-error'
  );

  handleFormSubmit(
    document.getElementById('faq-form'),
    'email-input-2',
    null
  );

  /* -------------------------------------------------------
     Header — shrink on scroll
  ------------------------------------------------------- */
  const header = document.getElementById('header');
  let lastScroll = 0;

  window.addEventListener('scroll', function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 80) {
      header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
      header.style.backdropFilter = 'blur(4px)';
      header.style.position = 'fixed';
    } else {
      header.style.backgroundColor = 'transparent';
      header.style.backdropFilter = '';
      header.style.position = 'absolute';
    }

    lastScroll = scrollTop;
  }, { passive: true });

  /* -------------------------------------------------------
     Preloader
  ------------------------------------------------------- */
  window.addEventListener('load', function () {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 600);
      }, 1000);
    }
  });

})();
