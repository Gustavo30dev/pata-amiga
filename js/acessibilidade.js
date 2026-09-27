/* ============================================================================
   PATA AMIGA — ACESSIBILIDADE
   - alto contraste
   - menu responsivo por botão acessível
   - modal com foco, Escape e retorno de foco
   - estado semântico dos botões de adoção
   ============================================================================ */
(function () {
  'use strict';

  let gatilhoModalAnterior = null;

  function atualizarBotaoContraste() {
    const botao = document.getElementById('btn-alto-contraste');
    if (!botao) return;

    const ativo = document.body.classList.contains('alto-contraste');
    botao.setAttribute('aria-pressed', String(ativo));
    botao.textContent = ativo ? 'Contraste normal' : 'Alto contraste';
  }

  function inicializarContraste() {
    let salvo = false;
    try {
      salvo = localStorage.getItem('pata-amiga-alto-contraste') === 'true';
    } catch (erro) {
      // O modo continua disponível mesmo quando o navegador bloqueia armazenamento local.
    }
    document.body.classList.toggle('alto-contraste', salvo);
    atualizarBotaoContraste();
  }

  function alternarContraste() {
    const ativo = !document.body.classList.contains('alto-contraste');
    document.body.classList.toggle('alto-contraste', ativo);
    try {
      localStorage.setItem('pata-amiga-alto-contraste', String(ativo));
    } catch (erro) {
      // Apenas a persistência é perdida; a alternância visual continua funcionando.
    }
    atualizarBotaoContraste();
  }

  function alternarMenu() {
    const botao = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu-lista');
    if (!botao || !menu) return;

    const aberto = botao.getAttribute('aria-expanded') === 'true';
    botao.setAttribute('aria-expanded', String(!aberto));
    botao.setAttribute('aria-label', aberto ? 'Abrir menu' : 'Fechar menu');
    document.querySelector('.menu-nav')?.classList.toggle('menu-aberto', !aberto);
  }

  function fecharMenu() {
    const botao = document.getElementById('menu-toggle');
    if (!botao) return;

    botao.setAttribute('aria-expanded', 'false');
    botao.setAttribute('aria-label', 'Abrir menu');
    document.querySelector('.menu-nav')?.classList.remove('menu-aberto');
  }

  function abrirModal(modal) {
    if (!modal) return;

    const botaoAbrir = document.querySelector('.modal-abrir');
    gatilhoModalAnterior = botaoAbrir;
    modal.hidden = false;
    document.body.classList.add('modal-aberto');

    const primeiroFoco = modal.querySelector('.modal-fechar, .escolha-adocao button');
    primeiroFoco?.focus();
  }

  function manterFocoNoModal(evento, modal) {
    if (evento.key !== 'Tab' || !modal || modal.hidden) return;

    const focaveis = [...modal.querySelectorAll('button, input, textarea, select, a[href], [tabindex]:not([tabindex="-1"])')];
    if (!focaveis.length) return;

    const primeiro = focaveis[0];
    const ultimo = focaveis[focaveis.length - 1];

    if (evento.shiftKey && document.activeElement === primeiro) {
      evento.preventDefault();
      ultimo.focus();
    } else if (!evento.shiftKey && document.activeElement === ultimo) {
      evento.preventDefault();
      primeiro.focus();
    }
  }

  function alternarLoginDemo(entrar) {
    const area = document.getElementById('area-logada-demo');
    const botao = document.getElementById('btn-login-demo');
    const campos = document.querySelectorAll('#usuario-fake, #senha-fake');
    if (!area || !botao) return;

    area.hidden = !entrar;
    botao.setAttribute('aria-expanded', String(entrar));
    campos.forEach((campo) => { campo.disabled = entrar; });

    if (entrar) {
      document.getElementById('btn-sair-demo')?.focus();
    } else {
      botao.focus();
    }
  }

  function fecharModal(modal) {
    if (!modal) return;

    modal.hidden = true;
    document.body.classList.remove('modal-aberto');
    gatilhoModalAnterior?.focus();
    gatilhoModalAnterior = null;
  }

  function atualizarStatusBento(status) {
    document.querySelectorAll('.status-adocao').forEach((grupo) => {
      grupo.querySelector('.status-label-padrao')?.toggleAttribute('hidden', status !== 'padrao');
      grupo.querySelector('.status-label-aceito')?.toggleAttribute('hidden', status !== 'aceito');
      grupo.querySelector('.status-label-recusado')?.toggleAttribute('hidden', status !== 'recusado');
    });
  }

  document.addEventListener('click', (evento) => {
    const contraste = evento.target.closest('#btn-alto-contraste');
    if (contraste) {
      alternarContraste();
      return;
    }

    const menu = evento.target.closest('#menu-toggle');
    if (menu) {
      alternarMenu();
      return;
    }

    const abrir = evento.target.closest('.modal-abrir');
    if (abrir) {
      abrirModal(document.getElementById('modal-acessivel'));
      return;
    }

    const fechar = evento.target.closest('.modal-fechar');
    if (fechar) {
      fecharModal(document.getElementById('modal-acessivel'));
      return;
    }

    const entrarLogin = evento.target.closest('#btn-login-demo');
    if (entrarLogin) {
      alternarLoginDemo(true);
      return;
    }

    const sairLogin = evento.target.closest('#btn-sair-demo');
    if (sairLogin) {
      alternarLoginDemo(false);
      return;
    }

    const resposta = evento.target.closest('[data-resposta-bento]');
    if (resposta) {
      atualizarStatusBento(resposta.dataset.respostaBento);
      const modal = document.getElementById('modal-acessivel');
      if (modal) fecharModal(modal);
      return;
    }

    if (evento.target.matches('.modal-overlay')) {
      fecharModal(evento.target);
      return;
    }

    if (evento.target.closest('.menu-lista a')) {
      fecharMenu();
    }
  });

  document.addEventListener('keydown', (evento) => {
    const modal = document.getElementById('modal-acessivel');
    if (modal && !modal.hidden) {
      if (evento.key === 'Escape') {
        fecharModal(modal);
      } else {
        manterFocoNoModal(evento, modal);
      }
      return;
    }

    if (evento.key === 'Escape') {
      fecharMenu();
    }
  });

  document.addEventListener('DOMContentLoaded', inicializarContraste);
  document.addEventListener('DOMContentLoaded', atualizarBotaoContraste);

  window.PataAmigaAcessibilidade = {
    fecharMenu,
    atualizarStatusBento
  };
})();
