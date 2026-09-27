# Pata Amiga

Projeto acadêmico (matéria de Front-end) — site institucional de uma ONG fictícia
de adoção de gatos, implementado como uma **Single Page Application (SPA)** em
HTML, CSS e JavaScript puros (sem frameworks/bibliotecas de UI).

## Estrutura de pastas

```
pata-amiga/
├── html/
│   └── index.html        # shell único da SPA (header + footer fixos + <main id="app">)
├── css/
│   ├── variables.css      # design system (cores, tipografia, espaçamento)
│   ├── grid.css           # grade de 12 colunas + 5 breakpoints responsivos
│   ├── flexbox.css        # alinhamento de cabeçalho, cards e formulário
│   ├── navegacao.css      # menu responsivo (dropdown + hambúrguer via checkbox hack)
│   ├── interatividade.css # estados de botões e validação visual dos campos
│   ├── style.css          # estilos base globais
│   ├── feedback.css       # badges, alertas, toast e modal
│   ├── cards.css          # cards dos gatinhos disponíveis
│   └── login.css          # consulta de cadastro na página inicial
├── imagens/                # fotos e ilustrações usadas no site
└── js/
    ├── router.js           # roteamento por hash e templates de cada página
    ├── formulario.js       # validação e envio reativo do cadastro
    ├── storage.js          # toda a persistência em localStorage
    ├── ui.js               # sincroniza componentes visuais com dados persistidos
    └── login.js            # consulta de cadastro por CPF/telefone/nome
```

## Estratégia de branches (GitFlow)

Este projeto adota o modelo **GitFlow** para organizar o histórico de
desenvolvimento, mesmo sendo um trabalho individual, para demonstrar boas
práticas de versionamento normalmente usadas em equipes.

- **`main`**: contém apenas versões estáveis e prontas para entrega/apresentação.
  Cada merge nesta branch representa um *release* e é marcado com uma *tag* de
  versão (`v1.0`, `v1.0.1`, `v1.1.0`, ...).
- **`develop`**: branch de integração contínua. Todo o trabalho novo é
  desenvolvido em branches próprias e mesclado aqui antes de seguir para
  produção (`main`). Reflete sempre o estado mais atual e testado do projeto.
- **`feature/*`**: cada funcionalidade foi desenvolvida isoladamente em sua
  própria branch a partir da `develop` e mesclada de volta com `--no-ff`
  (preservando o histórico da feature). Exemplos usados neste projeto:
  - `feature/design-system` — variáveis CSS (paleta, tipografia, espaçamento)
  - `feature/grid-responsivo` — grade de 12 colunas e breakpoints
  - `feature/flexbox-layout` — alinhamento de cabeçalho, cards e formulário
  - `feature/estilos-base` — estilos globais do site
  - `feature/menu-responsivo` — navegação com dropdown e menu hambúrguer
  - `feature/interatividade-validacao` — estados de botão e validação visual
  - `feature/feedback-componentes` — badges, alertas, toast e modal
  - `feature/login-consulta` — consulta de cadastro na página inicial
  - `feature/spa-completa` — transformação do site em SPA (roteador,
    validação reativa, persistência local, sincronização de UI e integração
    com a biblioteca externa Day.js)
  - `feature/documentacao-readme` — esta própria documentação técnica
- **`hotfix/*`**: usada para correções urgentes diretamente a partir da
  `main`. Neste projeto, `hotfix/cache-css-desatualizado` corrigiu um bug real
  encontrado durante o desenvolvimento — o navegador servia uma versão antiga
  do CSS em cache. A correção (adicionar `?v=N` nos links dos arquivos CSS)
  foi mesclada tanto na `main` (gerando a tag `v1.0.1`) quanto na `develop`,
  garantindo que produção e desenvolvimento não fiquem dessincronizados.

Essa separação evita que código instável chegue à `main` e permite isolar o
desenvolvimento de cada funcionalidade sem interferir nas demais, mesmo em um
projeto com um único desenvolvedor.

## Commits semânticos

Os commits seguem prefixos que indicam o tipo de mudança:

| Prefixo    | Significado                                             |
|------------|------------------------------------------------------------|
| `feat:`    | nova funcionalidade                                        |
| `fix:`     | correção de bug                                            |
| `hotfix:`  | correção urgente aplicada diretamente a partir da `main`   |
| `refactor:`| reorganização de código sem mudar comportamento            |
| `chore:`   | tarefas de manutenção/estrutura (pastas, configs)           |
| `docs:`    | documentação (README, comentários técnicos)                |

## Histórico de versões

- **v1.0** — primeira versão estável e funcional da SPA.
- **v1.0.1** — hotfix de cache-busting nos arquivos CSS.
- **v1.1.0** — documentação técnica completa no README.
