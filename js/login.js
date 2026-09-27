/* ==========================================================================
   PATA AMIGA — CONSULTA DO CADASTRO NA PÁGINA INICIAL
   Responsabilidade única: localizar um cadastro existente e apresentar seus
   próprios dados. A persistência continua isolada em storage.js.
   ========================================================================== */

(function () {
  'use strict';

  function normalizarCpf(cpf) {
    return String(cpf || '').replace(/\D/g, '');
  }



  function escaparHtml(valor) {
    return String(valor || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function formatarData(dataISO) {
    if (!dataISO) return 'Data não informada';
    return new Date(dataISO).toLocaleDateString('pt-BR');
  }

  function mostrarResultado(mensagemHtml, tipo) {
    const area = document.getElementById('resultado-login-inicio');
    if (!area) return;

    area.innerHTML = `
      <div class="resultado-login resultado-login-${tipo}" role="${tipo === 'erro' ? 'alert' : 'status'}">
        ${mensagemHtml}
      </div>
    `;
  }

  function exibirCadastro(cadastro) {
    mostrarResultado(`
      <h3>Cadastro encontrado</h3>
      <p><strong>Nome:</strong> ${escaparHtml(cadastro.nome)}</p>
      <p><strong>CPF:</strong> ${escaparHtml(cadastro.cpf)}</p>
      <p><strong>Telefone:</strong> ${escaparHtml(cadastro.telefone)}</p>
      <p><strong>Endereço:</strong> ${escaparHtml(cadastro.endereco)}</p>
      <p><strong>Motivo da adoção:</strong> ${escaparHtml(cadastro.motivo)}</p>
      <p><strong>Situação:</strong> ${escaparHtml(cadastro.status || 'Fila de espera')}</p>
      <p><strong>Cadastro enviado em:</strong> ${formatarData(cadastro.dataISO)}</p>
    `, 'sucesso');
  }

  function consultarCadastro(evento) {
    if (evento.target.id !== 'form-login-inicio') return;

    evento.preventDefault();

    const campo = document.getElementById('login-cpf');
    const identificador = campo ? campo.value.trim() : '';
    if (identificador.length < 3) {
      mostrarResultado('<strong>Identificador inválido.</strong> Digite pelo menos 3 caracteres.', 'erro');
      return;
    }

    const cadastro = window.PataAmigaStorage.buscarCadastroPorIdentificador(identificador);

    if (!cadastro) {
      mostrarResultado('<strong>Cadastro não encontrado.</strong> Confira o CPF, telefone ou nome utilizado no formulário.', 'erro');
      return;
    }

    exibirCadastro(cadastro);
  }



  document.addEventListener('submit', consultarCadastro);
})();
