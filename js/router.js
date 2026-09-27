/* ==========================================================================
   PATA AMIGA — ROTEADOR DA SPA (Single Page Application)
   ==========================================================================

   ABORDAGEM ADOTADA
   ------------------
   1) Roteamento por HASH (ex.: #/projeto), e não pela History API
      (history.pushState). Motivo: o projeto é aberto localmente como
      arquivo (file://), sem servidor. Navegadores como o Chrome bloqueiam
      pushState nesse contexto (erro de segurança, origem "null"). O hash
      não recarrega a página e funciona 100% em file://.

   2) INTERCEPTAÇÃO DE CLIQUES: um único listener de clique é registrado
      no <body> (delegação de eventos) em vez de um listener por link.
      Ele identifica se o clique foi num link de navegação
      (atributo [data-rota]), chama preventDefault() para impedir que o
      navegador tente tratar aquilo como link comum, e então decide
      manualmente qual conteúdo renderizar.

   3) RENDERIZAÇÃO: cada rota é uma função que devolve uma string HTML
      (template). O roteador injeta essa string dentro da <div id="app">
      via innerHTML — essa é a "manipulação do DOM" central da SPA:
      o documento nunca recarrega, só o conteúdo de um único <main> muda.
   ========================================================================== */


/* --------------------------------------------------------------------------
   1. TEMPLATES — o conteúdo de cada "página" vira uma função que retorna HTML
   -------------------------------------------------------------------------- */

function paginaInicio() {
  return `
    <section class="conteudo" aria-labelledby="titulo-inicio">
        <h2 id="titulo-inicio">Bem vindos ao PATA AMIGA!</h2>

        <img src="../imagens/gato.jpg" alt="Gato branco e preto esticando a pata em sua direção" width="100">

        <p>
            Aqui você encontra gatinhos esperando por um lar cheio de carinho.
            Cada pata que passa por aqui já viveu histórias difíceis - e agora procura uma família disposta a escrever um novo capítulo. Vem conhecer quem está à sua espera!
        </p>
    </section>

    <section class="conteudo" aria-labelledby="titulo-gatinhos">
        <h2 id="titulo-gatinhos">Gatinhos disponíveis</h2>
        <p>Conheça alguns dos gatinhos que estão à espera de um lar:</p>
        <div id="lista-gatos" class="lista-gatos" aria-label="Gatinhos disponíveis para adoção">
            <!-- Preenchido dinamicamente por preencherListaGatos() em router.js -->
        </div>
    </section>

    <section class="conteudo conteudo-claro login-inicio" id="login-inicio" aria-labelledby="titulo-acompanhe-cadastro">
        <h2 id="titulo-acompanhe-cadastro">Acompanhe seu cadastro</h2>
        <p>Já enviou seu cadastro? Digite o CPF, telefone ou nome completo informado no formulário para consultar seus dados de adoção.</p>

        <form id="form-login-inicio" class="login-inicio-form" novalidate>
            <div class="campo-formulario">
                <label for="login-cpf">CPF, telefone ou nome completo:</label>
                <input type="text" id="login-cpf" name="cpf" placeholder="CPF, telefone ou nome completo" maxlength="80" required aria-describedby="ajuda-login-cpf">
                <span id="ajuda-login-cpf" class="texto-ajuda">Informe pelo menos 3 caracteres.</span>
            </div>
            <button type="submit" class="btn-enviar">Consultar cadastro</button>
        </form>

        <div id="resultado-login-inicio" aria-live="polite"></div>
    </section>

    <section class="conteudo">
        <h2>Por que adotar um gatinho?</h2>
        <h3>Amor e companhia!</h3>
        <p>
            Adotar um gatinho é dar uma segunda chance a quem já passou por dificuldades e, ao mesmo tempo, ganhar um companheiro leal e cheio de personalidade. Ao optar pela adoção, você ajuda a combater o abandono, evita o comércio irresponsável de animais e abre espaço para que mais bichinhos sejam resgatados. Além dos benefícios emocionais - como redução do estresse e mais companhia no dia a dia - adotar é um ato de amor que transforma duas vidas: a do gato, que ganha um lar, e a sua, que ganha um amigo para toda a vida.
        </p>
    </section>
  `;
}
function paginaProjeto() {
  return `
    <section class="conteudo" id="sobre">
        <h2>Sobre o projeto</h2>
        <p>
            O Pata Amiga é uma ONG dedicada ao resgate, cuidado e adoção responsável de gatos em situação de abandono.
            Recebemos animais encontrados nas ruas, vítimas de maus-tratos ou abandonados por antigos tutores, e oferecemos
            a eles atendimento veterinário, alimentação, vacinação e um ambiente seguro até que encontrem uma família definitiva.
        </p>
    </section>

    <section class="conteudo">
        <h2>Como a ONG ajuda os gatos</h2>
        <ul>
            <li>Resgate de gatos em situação de rua ou de risco</li>
            <li>Atendimento veterinário, vacinação e castração</li>
            <li>Alimentação e abrigo enquanto aguardam adoção</li>
            <li>Processo de adoção responsável, com acompanhamento pós-adoção</li>
            <li>Campanhas de conscientização sobre a posse responsável de animais</li>
        </ul>
    </section>

    <section class="conteudo">
        <h2>Por que adotar um gatinho?</h2>
        <h3>Amor e companhia!</h3>
        <p>
            Adotar um gatinho é dar uma segunda chance a quem já passou por dificuldades e, ao mesmo tempo, ganhar um
            companheiro leal e cheio de personalidade. Ao optar pela adoção, você ajuda a combater o abandono, evita o
            comércio irresponsável de animais e abre espaço para que mais bichinhos sejam resgatados. Além dos benefícios
            emocionais - como redução do estresse e mais companhia no dia a dia - adotar é um ato de amor que transforma
            duas vidas: a do gato, que ganha um lar, e a sua, que ganha um amigo para toda a vida.
        </p>
    </section>

    <section class="conteudo" id="ajudar">
        <h2>Como ajudar a ONG</h2>
        <p>Nem todo mundo pode adotar, mas existem várias formas de apoiar o nosso trabalho:</p>
        <ul>
            <li>Fazendo doações financeiras para custear ração, medicamentos e atendimento veterinário</li>
            <li>Doando ração, areia, potinhos e cobertores</li>
            <li>Sendo um lar temporário (acolhimento) para gatos que aguardam adoção</li>
            <li>Divulgando nossos gatos disponíveis para adoção nas redes sociais</li>
            <li>Sendo voluntário em feiras de adoção e mutirões de castração</li>
        </ul>
    </section>

    <section class="conteudo">
        <h2>Como fazer uma contribuição financeira</h2>
        <p>Você pode contribuir com qualquer valor através de PIX ou transferência bancária:</p>
        <p>
            <strong>Chave PIX:</strong> pataamiga@ong.org.br<br>
            <strong>Banco:</strong> 000 - Banco Exemplo<br>
            <strong>Agência:</strong> 0001<br>
            <strong>Conta:</strong> 00000-0<br>
            <strong>Titular:</strong> Associação Pata Amiga
        </p>
        <p>
            Todo valor arrecadado é revertido para o cuidado dos gatos resgatados: alimentação, exames, vacinas e
            castração. Muito obrigado por fazer parte dessa corrente do bem!
        </p>
    </section>
  `;
}

function paginaCadastro() {
  return `
    <section class="conteudo" aria-labelledby="titulo-cadastro">
        <h2 id="titulo-cadastro">Fila de espera para adoção</h2>
        <p>
            Preencha o formulário abaixo com seus dados para entrar na nossa fila de espera de adoção.
            Assim que um gatinho compatível com o seu perfil estiver disponível, entraremos em contato.
        </p>

        <form action="#" method="post" id="form-cadastro" novalidate>
            <fieldset>
                <legend>Dados pessoais</legend>

                <div class="campo-formulario">
                    <label for="cpf">CPF:</label>
                    <input type="text" id="cpf" name="cpf" aria-describedby="erro-cpf" placeholder="000.000.000-00" pattern="\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}" title="Digite o CPF no formato 000.000.000-00" maxlength="14" required>
                    <span id="erro-cpf" class="mensagem-erro" aria-live="polite"></span>
                </div>

                <div class="campo-formulario">
                    <label for="nome">Nome completo:</label>
                    <input type="text" id="nome" name="nome" aria-describedby="erro-nome" placeholder="Digite seu nome completo" pattern="\\S+(\\s+\\S+)+" title="Digite nome e sobrenome" required>
                    <span id="erro-nome" class="mensagem-erro" aria-live="polite"></span>
                </div>

                <div class="campo-formulario">
                    <label for="telefone">Telefone:</label>
                    <input type="tel" id="telefone" name="telefone" aria-describedby="erro-telefone" placeholder="(00) 00000-0000" pattern="\\(\\d{2}\\)\\s\\d{4,5}-\\d{4}" title="Digite o telefone no formato (00) 00000-0000" maxlength="15" required>
                    <span id="erro-telefone" class="mensagem-erro" aria-live="polite"></span>
                </div>

                <div class="campo-formulario">
                    <label for="endereco">Endereço:</label>
                    <input type="text" id="endereco" name="endereco" aria-describedby="erro-endereco" placeholder="Rua, número, bairro, cidade" minlength="5" required>
                    <span id="erro-endereco" class="mensagem-erro" aria-live="polite"></span>
                </div>
            </fieldset>

            <fieldset>
                <legend>Motivo da adoção</legend>
                <div class="campo-formulario">
                    <label for="motivo">Por que você quer adotar um gatinho?</label>
                    <textarea id="motivo" name="motivo" aria-describedby="erro-motivo" rows="6" cols="50" placeholder="Conte um pouco sobre o motivo da sua adoção" minlength="10" required></textarea>
                    <span id="erro-motivo" class="mensagem-erro" aria-live="polite"></span>
                </div>
            </fieldset>

            <div id="feedback-cadastro"></div>

            <div class="acoes-formulario">
                <button type="submit" class="btn-enviar" id="btn-enviar-cadastro" disabled>Enviar cadastro</button>
            </div>
        </form>
    </section>

    <section class="conteudo conteudo-claro">
        <h2>Histórico de cadastros (localStorage)</h2>
        <p>
            Estes cadastros ficam salvos no seu navegador — continuam aqui mesmo se você
            fechar a aba ou desligar o computador, mesmo sem um back-end de verdade.
        </p>
        <div id="historico-cadastros" class="lista-gatos">
            <!-- Preenchido dinamicamente por preencherHistoricoCadastros() em router.js -->
        </div>
    </section>

    <section class="conteudo conteudo-claro">
        <h2>Componentes de feedback do sistema</h2>
        <p>
            Exemplos dos componentes visuais padronizados para uso em toda a plataforma
            (badges, alertas, toast e modal), prontos para serem acionados futuramente pelo back-end.
        </p>

        <h3>Badges</h3>
        <span class="badge badge-sucesso">Disponível para adoção</span>
        <span class="badge badge-alerta">Fila de espera</span>
        <span class="badge badge-erro">Adoção cancelada</span>
        <span class="badge badge-info">Novo cadastro</span>

        <h3>Alertas</h3>
        <div class="alerta alerta-sucesso"><strong>Sucesso!</strong>Seu cadastro foi enviado com sucesso. Em breve entraremos em contato.</div>
        <div class="alerta alerta-erro"><strong>Erro!</strong>Não foi possível enviar o formulário. Verifique o CPF informado.</div>
        <div class="alerta alerta-aviso"><strong>Atenção!</strong>Alguns campos obrigatórios ainda não foram preenchidos.</div>

        <h3>Toast</h3>
        <div class="toast toast-sucesso" role="status" aria-live="polite">
            <span class="toast-icone">✓</span>
            <span>Cadastro enviado com sucesso!</span>
        </div>

        <h3 id="titulo-modal-demo">Modal acessível</h3>
        <button type="button" class="btn-enviar modal-abrir" aria-haspopup="dialog" aria-controls="modal-acessivel">Ver detalhes do gatinho</button>

        <p>Status atual do Bento na página:</p>
        <div class="status-adocao" aria-live="polite" aria-label="Status da adoção do Bento">
            <span class="badge badge-alerta status-label status-label-padrao">Fila de espera</span>
            <span class="badge badge-sucesso status-label status-label-aceito" hidden>Entraremos em contato!</span>
            <span class="badge badge-alerta status-label status-label-recusado" hidden>Fila de espera</span>
        </div>

        <div class="modal-overlay" id="modal-acessivel" hidden>
            <div class="modal-caixa" role="dialog" aria-modal="true" aria-labelledby="titulo-modal-bento" aria-describedby="descricao-modal-bento">
                <button type="button" class="modal-fechar" aria-label="Fechar detalhes do Bento">×</button>
                <h3 id="titulo-modal-bento">Bento</h3>
                <img class="modal-foto" src="../imagens/bento.jpg" alt="Bento, gatinho tigrado, deitado de barriga para cima em cima de um tapete">
                <p id="descricao-modal-bento">Gatinho de 2 anos, muito dócil, já castrado e vacinado. Aguardando um lar cheio de carinho.</p>

                <div class="escolha-adocao" aria-label="Decisão sobre a adoção do Bento">
                    <button type="button" class="btn-enviar" data-resposta-bento="aceito">Aceitar</button>
                    <button type="button" class="btn-cancelar" data-resposta-bento="recusado">Não aceitar</button>
                </div>

                <div class="status-adocao" aria-live="polite" aria-label="Resultado da decisão">
                    <span class="badge badge-alerta status-label status-label-padrao">Fila de espera</span>
                    <span class="badge badge-sucesso status-label status-label-aceito" hidden>Entraremos em contato!</span>
                    <span class="badge badge-alerta status-label status-label-recusado" hidden>Fila de espera</span>
                </div>
            </div>
        </div>

        <h3 id="login-simulado">Login (simulado)</h3>
        <p>Este login é fictício — qualquer usuário e senha "funcionam", pois não há back-end validando.</p>

        <div class="login-caixa">
            <div class="campo-formulario">
                <label for="usuario-fake">Usuário:</label>
                <input type="text" id="usuario-fake" placeholder="Digite qualquer usuário">
            </div>
            <div class="campo-formulario">
                <label for="senha-fake">Senha:</label>
                <input type="password" id="senha-fake" placeholder="Digite qualquer senha">
            </div>
            <button type="button" class="btn-enviar" id="btn-login-demo" aria-controls="area-logada-demo" aria-expanded="false">Entrar</button>
        </div>

        <div class="area-logada" id="area-logada-demo" hidden>
            <p>Bem-vindo(a)! Este é o status da sua solicitação de adoção:</p>
            <div class="status-adocao" aria-live="polite">
                <span class="badge badge-alerta status-label status-label-padrao">Fila de espera</span>
                <span class="badge badge-sucesso status-label status-label-aceito" hidden>Entraremos em contato!</span>
                <span class="badge badge-alerta status-label status-label-recusado" hidden>Fila de espera</span>
            </div>
            <button type="button" class="btn-cancelar" id="btn-sair-demo">Sair</button>
        </div>
    </section>
  `;
}

function paginaNaoEncontrada() {
  return `
    <section class="conteudo">
        <h2>Página não encontrada</h2>
        <p>O conteúdo que você tentou acessar não existe.</p>
    </section>
  `;
}


/* --------------------------------------------------------------------------
   1.1 SISTEMA DE TEMPLATES ORIENTADO A DADOS
   ------------------------------------------------------------------------
   Em vez de escrever manualmente um <div class="card-gato"> para cada
   gatinho (repetindo a mesma marcação e arriscando inconsistências),
   guardamos os dados num array de objetos simples e uma função
   "template" (criarCardGato) converte CADA objeto numa string HTML,
   via Template Literals. O array inteiro é percorrido com .map() e
   as strings resultantes são unidas com .join('') numa única string,
   que então é injetada de uma vez no container via innerHTML.
   -------------------------------------------------------------------------- */

const gatosDisponiveis = [
  { nome: 'Bento',  idade: '2 anos', foto: '../imagens/bento.jpg', status: 'padrao'},
  { nome: 'Luna',   idade: '1 ano',  foto: '../imagens/Luna.jpg', status: 'aceito'},
  { nome: 'Simba',  idade: '3 anos', foto: '../imagens/Simba.jpg', status: 'erro' },
];

// Mapa que traduz o "status" (dado bruto) para a aparência do badge
// (reaproveita as classes de badge já definidas em feedback.css)
const rotulosStatus = {
  padrao: { classe: 'badge-alerta',  texto: 'Fila de espera' },
  aceito: { classe: 'badge-sucesso', texto: 'Entraremos em contato!' },
  erro:   { classe: 'badge-erro',    texto: 'Adoção cancelada' },
};

// O TEMPLATE em si: recebe UM objeto "gato" e devolve o HTML dele
function criarCardGato(gato) {
  const rotulo = rotulosStatus[gato.status] || rotulosStatus.padrao;

  return `
    <article class="card-gato" aria-labelledby="titulo-gato-${gato.nome.toLowerCase()}">
      <img src="${gato.foto}" alt="${gato.nome}, gatinho disponível para adoção">
      <h3 id="titulo-gato-${gato.nome.toLowerCase()}">${gato.nome}</h3>
      <p>${gato.idade}</p>
      <span class="badge ${rotulo.classe}">${rotulo.texto}</span>
    </article>
  `;
}

// Percorre TODOS os dados, gera o HTML de cada card e injeta tudo de uma vez
function preencherListaGatos() {
  const container = document.getElementById('lista-gatos');
  if (!container) return; // essa rota não tem a lista de gatos: não faz nada

  container.innerHTML = gatosDisponiveis.map(criarCardGato).join('');
}


/* --------------------------------------------------------------------------
   2. TABELA DE ROTAS — mapeia o nome da rota (na hash) para sua função
   -------------------------------------------------------------------------- */
const rotas = {
  inicio: paginaInicio,
  projeto: paginaProjeto,
  cadastro: paginaCadastro,
};


/* --------------------------------------------------------------------------
   3. RENDERIZAÇÃO — lê a hash atual, escolhe o template certo e injeta
      o HTML dentro da <div id="app"> (é aqui que o DOM é manipulado)
   -------------------------------------------------------------------------- */
function renderizarRota() {
  const nomeRota = location.hash.replace('#/', '') || 'inicio';
  const template = rotas[nomeRota] || paginaNaoEncontrada;

  const app = document.getElementById('app');
  app.innerHTML = template();

  preencherListaGatos(); // popula a lista de cards, se a rota atual tiver o container
  restaurarDadosPersistidosDaTela(); // delega a restauração ao módulo de UI
  destacarLinkAtivo(nomeRota);

  // Anuncia a troca de rota para tecnologias assistivas sem recarregar a página.
  app.focus({ preventScroll: true });

  // Se o link clicado pedia rolagem até uma sub-seção (ex.: #sobre, #ajudar),
  // isso foi guardado antes da troca de hash — ver interceptarCliques()
  if (window.rolarAposRenderizar) {
    const alvo = document.getElementById(window.rolarAposRenderizar);
    if (alvo) alvo.scrollIntoView({ behavior: 'smooth' });
    window.rolarAposRenderizar = null;
  }

  window.scrollTo({ top: 0, behavior: 'instant' });
}

function destacarLinkAtivo(nomeRota) {
  document.querySelectorAll('.menu-lista > li > a[data-rota]').forEach((link) => {
    link.classList.toggle('link-ativo', link.dataset.rota === nomeRota);
  });
}


/* --------------------------------------------------------------------------
   4. INTERCEPTAÇÃO DE CLIQUES — o coração do roteamento da SPA
   -------------------------------------------------------------------------- */
function interceptarCliques(evento) {
  const link = evento.target.closest('a[data-rota]');
  if (!link) return; // clique não foi em um link de navegação: ignora

  evento.preventDefault(); // impede o comportamento padrão do <a>

  const rota = link.dataset.rota;
  window.rolarAposRenderizar = link.dataset.scroll || null;

  const novaHash = `#/${rota}`;
  if (location.hash === novaHash) {
    renderizarRota(); // já estava na rota: força re-render (útil para rolar)
  } else {
    location.hash = novaHash; // muda a hash -> dispara 'hashchange' abaixo
  }

  // Fecha o menu hambúrguer no mobile após navegar.
  window.PataAmigaAcessibilidade?.fecharMenu();
}

/* --------------------------------------------------------------------------
   5. COMUNICAÇÃO COM OS MÓDULOS DE PERSISTÊNCIA E UI
   --------------------------------------------------------------------------
   O roteador não manipula localStorage diretamente.
   Ele apenas pede ao módulo de UI para reconstruir partes que dependem
   de dados persistidos. Assim, roteamento e persistência permanecem
   responsabilidades separadas.
   -------------------------------------------------------------------------- */

function restaurarDadosPersistidosDaTela() {
  if (window.PataAmigaUI) {
    window.PataAmigaUI.preencherHistoricoCadastros();
    window.PataAmigaUI.restaurarStatusBento();
  }
}

/* --------------------------------------------------------------------------
   6. REGISTRO DOS LISTENERS DE NAVEGAÇÃO
   -------------------------------------------------------------------------- */

document.addEventListener('click', interceptarCliques);
window.addEventListener('hashchange', renderizarRota);
window.addEventListener('DOMContentLoaded', renderizarRota);
