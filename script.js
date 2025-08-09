// script.js — versão robusta
document.addEventListener('DOMContentLoaded', () => {
  const botaoAcessibilidade = document.getElementById('botao-acessibilidade');
  const acessibilidadeWrap = document.getElementById('acessibilidade');
  let opcoesAcessibilidade = document.getElementById('opcoes-acessibilidade');

  // Se o container de opções não existir, tenta criar (fallback)
  if (!opcoesAcessibilidade && acessibilidadeWrap) {
    opcoesAcessibilidade = document.createElement('div');
    opcoesAcessibilidade.id = 'opcoes-acessibilidade';
    opcoesAcessibilidade.className = 'opcoes-acessibilidade';
    opcoesAcessibilidade.setAttribute('hidden', '');

    // botões
    const btnA = document.createElement('button');
    btnA.id = 'aumentar-fonte';
    btnA.type = 'button';
    btnA.className = 'btn btn-primary fw-bold';
    btnA.textContent = 'A+';
    btnA.setAttribute('aria-label', 'Aumentar o tamanho da fonte');

    const btnD = document.createElement('button');
    btnD.id = 'diminuir-fonte';
    btnD.type = 'button';
    btnD.className = 'btn btn-primary fw-bold';
    btnD.textContent = 'A-';
    btnD.setAttribute('aria-label', 'Diminuir o tamanho da fonte');

    const btnC = document.createElement('button');
    btnC.id = 'alterna-contraste';
    btnC.type = 'button';
    btnC.className = 'btn btn-primary fw-bold';
    btnC.innerHTML = '<i class="bi bi-shadows"></i>';
    btnC.setAttribute('aria-label', 'Alternar o contraste de cores');

    opcoesAcessibilidade.appendChild(btnA);
    opcoesAcessibilidade.appendChild(btnD);
    opcoesAcessibilidade.appendChild(btnC);
    acessibilidadeWrap.appendChild(opcoesAcessibilidade);
  }

  // referências (podem ser criadas acima)
  const aumentarFonte = document.getElementById('aumentar-fonte');
  const diminuirFonte = document.getElementById('diminuir-fonte');
  const alternaContraste = document.getElementById('alterna-contraste');
  const body = document.body;

  // --- restauração / inicialização ---
  let fontSize = parseFloat(getComputedStyle(body).fontSize);
  if (isNaN(fontSize)) fontSize = 16; // fallback

  const savedSize = parseFloat(localStorage.getItem('siteFontSize'));
  if (!isNaN(savedSize)) {
    fontSize = savedSize;
    body.style.fontSize = fontSize + 'px';
  }

  if (localStorage.getItem('altoContraste') === '1') {
    body.classList.add('alto-contraste');
  }

  // --- Menu de acessibilidade (toggle) ---
  if (botaoAcessibilidade) {
    if (!botaoAcessibilidade.hasAttribute('aria-expanded')) {
      botaoAcessibilidade.setAttribute('aria-expanded', 'false');
    }

    botaoAcessibilidade.addEventListener('click', () => {
      const expanded = botaoAcessibilidade.getAttribute('aria-expanded') === 'true';
      botaoAcessibilidade.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      if (opcoesAcessibilidade) opcoesAcessibilidade.toggleAttribute('hidden');

      if (opcoesAcessibilidade && !opcoesAcessibilidade.hasAttribute('hidden')) {
        // foca primeiro botão nas opções
        const firstFocusable = opcoesAcessibilidade.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (firstFocusable) firstFocusable.focus();
      } else {
        botaoAcessibilidade.focus();
      }
    });

    // suporte teclado: Enter / Space abre/fecha
    botaoAcessibilidade.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        botaoAcessibilidade.click();
      }
    });
  }

  // fechar com Esc
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && opcoesAcessibilidade && !opcoesAcessibilidade.hasAttribute('hidden')) {
      opcoesAcessibilidade.setAttribute('hidden', '');
      if (botaoAcessibilidade) botaoAcessibilidade.setAttribute('aria-expanded', 'false');
      if (botaoAcessibilidade) botaoAcessibilidade.focus();
    }
  });

  // --- aumentar / diminuir fonte ---
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

  // --- contraste ---
  if (alternaContraste) {
    alternaContraste.addEventListener('click', () => {
      const ativo = body.classList.toggle('alto-contraste');
      localStorage.setItem('altoContraste', ativo ? '1' : '0');
    });
  }
});
