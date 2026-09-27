/* ==========================================================================
   PATA AMIGA — PERSISTÊNCIA LOCAL
   Responsabilidade única: leitura e gravação no localStorage.
   ========================================================================== */

(function () {
  'use strict';

  const CHAVE_CADASTROS = 'pataAmiga_cadastros';
  const CHAVE_STATUS_BENTO = 'pataAmiga_statusBento';

  function normalizarCpf(cpf) {
    return String(cpf || '').replace(/\D/g, '');
  }

  function obterCadastros() {
    const bruto = localStorage.getItem(CHAVE_CADASTROS) || '[]';

    try {
      return JSON.parse(bruto);
    } catch (erro) {
      console.error('Não foi possível ler os cadastros salvos.', erro);
      return [];
    }
  }

  function salvarCadastro(dados) {
    const listaAtual = obterCadastros();
    listaAtual.push(dados);
    localStorage.setItem(CHAVE_CADASTROS, JSON.stringify(listaAtual));
  }

  function buscarCadastroPorIdentificador(identificador) {
    const valorNormalizado = normalizarCpf(identificador);
    const nomeNormalizado = String(identificador || '').trim().toLocaleLowerCase('pt-BR');
    const cadastros = obterCadastros();

    // Aceita informações que já fazem parte do cadastro: CPF, telefone ou nome.
    for (let i = cadastros.length - 1; i >= 0; i -= 1) {
      const cpf = normalizarCpf(cadastros[i].cpf);
      const telefone = normalizarCpf(cadastros[i].telefone);
      const nome = String(cadastros[i].nome || '').trim().toLocaleLowerCase('pt-BR');

      if (cpf === valorNormalizado || telefone === valorNormalizado || nome === nomeNormalizado) {
        return cadastros[i];
      }
    }

    return null;
  }

  function salvarStatusBento(idRadioMarcado) {
    localStorage.setItem(CHAVE_STATUS_BENTO, idRadioMarcado);
  }

  function obterStatusBento() {
    return localStorage.getItem(CHAVE_STATUS_BENTO);
  }

  window.PataAmigaStorage = Object.freeze({
    obterCadastros,
    salvarCadastro,
    buscarCadastroPorIdentificador,
    salvarStatusBento,
    obterStatusBento
  });
})();
