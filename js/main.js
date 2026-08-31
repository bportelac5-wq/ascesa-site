'use strict';

/* ============================================================
   ASCESA — MAIN JS
   Nav mobile, scroll behavior, scroll reveal
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- HEADER SCROLL SHADOW ---
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // --- MENU MOBILE ---
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');

  if (menuToggle && mobileDrawer) {
    const openMenu = () => {
      menuToggle.setAttribute('aria-expanded', 'true');
      mobileDrawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileDrawer.classList.remove('open');
      document.body.style.overflow = '';
    };

    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      isOpen ? closeMenu() : openMenu();
    });

    // Fecha ao clicar em link
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Fecha com Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        closeMenu();
        menuToggle.focus();
      }
    });
  }

  // --- SCROLL REVEAL --- (apenas elementos com .fade-in)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    const fadeEls = document.querySelectorAll('.fade-in');
    if (fadeEls.length) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      });

      fadeEls.forEach(el => observer.observe(el));
    }
  } else {
    // Mostra tudo imediatamente se reduced motion
    document.querySelectorAll('.fade-in').forEach(el => {
      el.classList.add('visible');
    });
  }

  // --- ANO NO FOOTER ---
  const yearEl = document.querySelector('.js-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // --- SMOOTH SCROLL para âncoras internas ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPos = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });

});
