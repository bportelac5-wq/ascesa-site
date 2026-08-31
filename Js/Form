'use strict';

/* ============================================================
   ASCESA — FORM JS
   Validação client-side + envio via Formspree
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  const form = document.querySelector('.contact-form');
  if (!form) return;

  const statusEl = form.querySelector('.form-status');
  const submitBtn = form.querySelector('[type="submit"]');

  // --- VALIDAÇÃO ---
  const rules = {
    nome:      v => v.trim().length >= 2,
    email:     v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    telefone:  v => v.replace(/\D/g, '').length >= 10,
    assunto:   v => v !== '',
    mensagem:  v => v.trim().length >= 10,
  };

  const messages = {
    nome:     'Informe seu nome completo.',
    email:    'Informe um e-mail válido.',
    telefone: 'Informe um telefone com DDD.',
    assunto:  'Selecione um assunto.',
    mensagem: 'A mensagem deve ter pelo menos 10 caracteres.',
  };

  const getField = name => form.querySelector(`[name="${name}"]`);
  const getError = name => form.querySelector(`[data-error="${name}"]`);

  const validateField = (name) => {
    const field = getField(name);
    const errorEl = getError(name);
    if (!field || !rules[name]) return true;

    const valid = rules[name](field.value);
    field.classList.toggle('error', !valid);
    if (errorEl) {
      errorEl.textContent = valid ? '' : messages[name];
      errorEl.classList.toggle('visible', !valid);
    }
    return valid;
  };

  // Validação em blur
  Object.keys(rules).forEach(name => {
    const field = getField(name);
    if (field) {
      field.addEventListener('blur', () => validateField(name));
      field.addEventListener('input', () => {
        if (field.classList.contains('error')) validateField(name);
      });
    }
  });

  // --- ENVIO ---
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Valida todos
    const allValid = Object.keys(rules).map(validateField).every(Boolean);
    if (!allValid) {
      const firstError = form.querySelector('.error');
      if (firstError) firstError.focus();
      return;
    }

    // UI de loading
    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando…';
    if (statusEl) statusEl.className = 'form-status';

    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        if (statusEl) {
          statusEl.textContent = 'Mensagem enviada. Entraremos em contato em breve.';
          statusEl.className = 'form-status success';
        }
        form.reset();
      } else {
        throw new Error('Resposta não-ok do servidor');
      }
    } catch {
      if (statusEl) {
        statusEl.textContent = 'Ocorreu um erro ao enviar. Por favor, tente novamente ou entre em contato por e-mail.';
        statusEl.className = 'form-status error';
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });

  // Máscara simples de telefone
  const telField = getField('telefone');
  if (telField) {
    telField.addEventListener('input', () => {
      let v = telField.value.replace(/\D/g, '').slice(0, 11);
      if (v.length > 10) {
        v = v.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
      } else if (v.length > 6) {
        v = v.replace(/^(\d{2})(\d{4})(\d*)$/, '($1) $2-$3');
      } else if (v.length > 2) {
        v = v.replace(/^(\d{2})(\d*)$/, '($1) $2');
      }
      telField.value = v;
    });
  }

});
