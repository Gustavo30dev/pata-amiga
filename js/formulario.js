/* ==========================================================================
   PATA AMIGA — FORMULÁRIO DE CADASTRO
   Responsabilidade única: validação, reatividade e envio do formulário.

   Dependência explícita:
   - PataAmigaStorage: somente a operação de persistir um cadastro.
   - PataAmigaUI: somente a atualização visual do histórico.
   ========================================================================== */

(function () {
  'use strict';

  function obterMensagemErro(campo) {
    const validade = campo.validity;

    if (validade.valueMissing) {
      return 'Este campo é obrigatório.';
    }

    if (validade.patternMismatch) {
      return campo.title || 'Formato inválido.';
    }

    if (validade.tooShort) {
      return `Digite pelo menos ${campo.minLength} caracteres.`;
    }

    return '';
  }

  function exibirMensagemCampo(campo, mensagem) {
    const wrapper = campo.closest('.campo-formulario');
    if (!wrapper) return;

    let elementoMensagem = wrapper.querySelector('.mensagem-erro');

    if (!elementoMensagem) {
      elementoMensagem = document.createElement('span');
      elementoMensagem.className = 'mensagem-erro';
      wrapper.appendChild(elementoMensagem);
    }

    elementoMensagem.textContent = mensagem;
  }

  function validarCampo(campo) {
    if (campo.checkValidity()) {
      exibirMensagemCampo(campo, '');
    } else {
      exibirMensagemCampo(campo, obterMensagemErro(campo));
    }
  }

  function monitorarInput(evento) {
    const formulario = evento.target.closest('#form-cadastro');
    if (!formulario) return;

    validarCampo(evento.target);

    const botaoEnviar = document.getElementById('btn-enviar-cadastro');
    if (botaoEnviar) {
      botaoEnviar.disabled = !formulario.checkValidity();
    }
  }

  function processarSubmit(evento) {
    if (evento.target.id !== 'form-cadastro') return;

    // Impede o comportamento padrão e mantém a SPA no controle.
    evento.preventDefault();

    const formulario = evento.target;
    const campos = formulario.querySelectorAll('input, textarea');

    // Mostra o estado de todos os campos antes de decidir se envia.
    campos.forEach(validarCampo);

    const areaFeedback = document.getElementById('feedback-cadastro');

    if (formulario.checkValidity()) {
      const dadosFormulario = new FormData(formulario);

      // O módulo de formulário NÃO conhece localStorage.
      // Ele apenas chama a operação pública de persistência.
      window.PataAmigaStorage.salvarCadastro({
        cpf: dadosFormulario.get('cpf'),
        nome: dadosFormulario.get('nome'),
        telefone: dadosFormulario.get('telefone'),
        endereco: dadosFormulario.get('endereco'),
        motivo: dadosFormulario.get('motivo'),
        status: 'Fila de espera',
        dataISO: new Date().toISOString()
      });

      if (areaFeedback) {
        areaFeedback.innerHTML = `
          <div class="alerta alerta-sucesso" role="status">
            <strong>Sucesso!</strong>
            Seu cadastro foi enviado com sucesso. Em breve entraremos em contato.
          </div>`;
      }

      formulario.reset();
      campos.forEach((campo) => exibirMensagemCampo(campo, ''));

      const botaoEnviar = document.getElementById('btn-enviar-cadastro');
      if (botaoEnviar) {
        botaoEnviar.disabled = true;
      }

      // Atualiza a interface sem misturar persistência com apresentação.
      window.PataAmigaUI.preencherHistoricoCadastros();

    } else if (areaFeedback) {
      areaFeedback.innerHTML = `
        <div class="alerta alerta-erro" role="alert">
          <strong>Erro!</strong>
          Verifique os campos destacados em vermelho antes de enviar.
        </div>`;
    }
  }

  /*
    Delegação de eventos:
    o formulário é recriado pelo router via innerHTML.
    Por isso os listeners ficam no document, que permanece vivo.
  */
  document.addEventListener('input', monitorarInput);
  document.addEventListener('submit', processarSubmit);
})();
