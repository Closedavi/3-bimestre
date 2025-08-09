document.addEventListener("DOMContentLoaded", () => {
  // 🎮 Acessibilidade: Abrir/Fechar menu
  const botaoAcessibilidade = document.getElementById('botao-acessibilidade');
  const opcoesAcessibilidade = document.getElementById('opcoes-acessibilidade');

  if (botaoAcessibilidade && opcoesAcessibilidade) {
    botaoAcessibilidade.addEventListener('click', () => {
      const expanded = botaoAcessibilidade.getAttribute('aria-expanded') === 'true';
      botaoAcessibilidade.setAttribute('aria-expanded', String(!expanded));

      if (opcoesAcessibilidade.hasAttribute('hidden')) {
        opcoesAcessibilidade.removeAttribute('hidden');
      } else {
        opcoesAcessibilidade.setAttribute('hidden', '');
      }
    });
  }

  // 🔠 Fonte: aumentar e diminuir
  const aumentarFonte = document.getElementById('aumentar-fonte');
  const diminuirFonte = document.getElementById('diminuir-fonte');
  const body = document.body;
  let fontSize = parseFloat(getComputedStyle(body).fontSize);

  if (aumentarFonte) {
    aumentarFonte.addEventListener('click', () => {
      if (fontSize < 24) {
        fontSize += 1;
        body.style.fontSize = fontSize + 'px';
      }
    });
  }

  if (diminuirFonte) {
    diminuirFonte.addEventListener('click', () => {
      if (fontSize > 12) {
        fontSize -= 1;
        body.style.fontSize = fontSize + 'px';
      }
    });
  }

  // 🌙 Contraste: modo noturno
  const alternaContraste = document.getElementById('alterna-contraste');
  if (alternaContraste) {
    alternaContraste.addEventListener('click', () => {
      body.classList.toggle('alto-contraste');
    });
  }
});
