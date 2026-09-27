/* ==========================================================================
   PATA AMIGA — INTERFACE E ESTADOS VISUAIS
   Responsabilidade única: reconstruir componentes visuais que dependem
   de dados persistidos e sincronizar estados de interface.

   Dependência explícita:
   - PataAmigaStorage: somente para ler/gravar o estado persistido.
   ========================================================================== */

(function () {
  'use strict';

  function formatarDataCadastro(dataISO) {
    if (typeof dayjs !== 'undefined') {
      return dayjs(dataISO).fromNow();
    }

    return new Date(dataISO).toLocaleDateString('pt-BR');
  }

  function criarItemHistorico(cadastro) {
    return `
      <div class="card-gato">
        <h3>${cadastro.nome}</h3>
        <p>${cadastro.telefone}</p>
        <p>Enviado ${formatarDataCadastro(cadastro.dataISO)}</p>
        <span class="badge badge-alerta">Fila de espera</span>
      </div>
    `;
  }

  function preencherHistoricoCadastros() {
    const container = document.getElementById('historico-cadastros');
    if (!container) return;

    const cadastros = window.PataAmigaStorage.obterCadastros();

    container.innerHTML = cadastros.length
      ? cadastros.map(criarItemHistorico).join('')
      : '<p>Nenhum cadastro enviado ainda.</p>';
  }

  function restaurarStatusBento() {
    const idSalvo = window.PataAmigaStorage.obterStatusBento();
    if (!idSalvo) return;

    const radio = document.getElementById(idSalvo);
    if (radio) {
      radio.checked = true;
    }
  }

  /*
    O menu já abre/fecha com CSS (:checked).
    O JavaScript só sincroniza aria-expanded para acessibilidade.
  */
  function monitorarMudancasDeInterface(evento) {
    if (evento.target.id === 'menu-toggle') {
      const rotuloHamburguer = document.querySelector('.menu-toggle-label');

      if (rotuloHamburguer) {
        rotuloHamburguer.setAttribute(
          'aria-expanded',
          evento.target.checked ? 'true' : 'false'
        );
      }

      return;
    }

    if (evento.target.name === 'resposta-bento') {
      window.PataAmigaStorage.salvarStatusBento(evento.target.id);
    }
  }

  document.addEventListener('change', monitorarMudancasDeInterface);

  window.PataAmigaUI = Object.freeze({
    preencherHistoricoCadastros,
    restaurarStatusBento
  });
})();
