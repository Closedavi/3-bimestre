// script.js — versão corrigida e mais robusta
document.addEventListener('DOMContentLoaded', () => {
  const botaoAcessibilidade = document.getElementById('botao-acessibilidade');
  const opcoesAcessibilidade = document.getElementById('opcoes-acessibilidade');
  const aumentarFonte = document.getElementById('aumentar-fonte');
  const diminuirFonte = document.getElementById('diminuir-fonte');
  const alternaContraste = document.getElementById('alterna-contraste');
  const body = document.body;

  // inicializa tamanho da fonte (fallback se parse falhar)
  let fontSize = parseFloat(getComputedStyle(body).fontSize);
  if (isNaN(fontSize)) fontSize = 16;

  // restaura tamanho salvo (se houver)
  const savedSize = parseFloat(localStorage.getItem('siteFontSize'));
  if (!isNaN(savedSize)) {
    fontSize = savedSize;
    body.style.fontSize = fontSize + 'px';
  }

  // restaura contraste salvo
  if (localStorage.getItem('altoContraste') === '1') {
    body.classList.add('alto-contraste');
  }

  /* ---------------------------
     Menu de acessibilidade
     --------------------------- */
  if (botaoAcessibilidade && opcoesAcessibilidade) {
    // garante estado inicial consistente
    if (!botaoAcessibilidade.hasAttribute('aria-expanded')) {
      botaoAcessibilidade.setAttribute('aria-expanded', 'false');
    }
    // se opcoes estiver sem atributo hidden, adiciona por segurança
    if (!opcoesAcessibilidade.hasAttribute('hidden')) {
      opcoesAcessibilidade.setAttribute('hidden', '');
    }

    botaoAcessibilidade.addEventListener('click', () => {
      const expanded = botaoAcessibilidade.getAttribute('aria-expanded') === 'true';
      botaoAcessibilidade.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      opcoesAcessibilidade.toggleAttribute('hidden');

      if (!opcoesAcessibilidade.hasAttribute('hidden')) {
        // foca no primeiro botão dentro das opções (melhora acessibilidade)
        const firstFocusable = opcoesAcessibilidade.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (firstFocusable) firstFocusable.focus();
      } else {
        botaoAcessibilidade.focus();
      }
    });

    // fechar ao pressionar Esc
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !opcoesAcessibilidade.hasAttribute('hidden')) {
        opcoesAcessibilidade.setAttribute('hidden', '');
        botaoAcessibilidade.setAttribute('aria-expanded', 'false');
        botaoAcessibilidade.focus();
      }
    });
  }

  /* ---------------------------
     Aumentar / Diminuir fonte
     --------------------------- */
  if (aumentarFonte) {
    aumentarFonte.addEventListener('click', () => {
      if (fontSize < 24) {
        fontSize = Math.round((fontSize + 1) * 10) / 10;
        body.style.fontSize = fontSize + 'px';
        localStorage.setItem('siteFontSize', String(fontSize));
      }
    });
  }

  if (diminuirFonte) {
    diminuirFonte.addEventListener('click', () => {
      if (fontSize > 12) {
        fontSize = Math.round((fontSize - 1) * 10) / 10;
        body.style.fontSize = fontSize + 'px';
        localStorage.setItem('siteFontSize', String(fontSize));
      }
    });
  }

  /* ---------------------------
     Alternar contraste
     --------------------------- */
  if (alternaContraste) {
    alternaContraste.addEventListener('click', () => {
      const ativo = body.classList.toggle('alto-contraste');
      localStorage.setItem('altoContraste', ativo ? '1' : '0');
    });
  }
});
