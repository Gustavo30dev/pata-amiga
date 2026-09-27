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
  - `feature/changelog-semver` — CHANGELOG.md e documentação de Conventional Commits/SemVer

> **Nota sobre a permanência das branches:** no fluxo real de trabalho em
> equipe, é comum apagar uma branch `feature/*`/`hotfix/*` logo depois do
> merge (`git branch -d`), já que o histórico dela permanece preservado
> dentro dos commits de merge na `develop`/`main` mesmo sem a branch existir
> mais. Neste repositório, as branches foram mantidas intencionalmente
> (em vez de apagadas) para que a estrutura do GitFlow fique visível e
> navegável diretamente no GitHub, facilitando a avaliação da atividade.
- **`hotfix/*`**: usada para correções urgentes diretamente a partir da
  `main`. Neste projeto, `hotfix/cache-css-desatualizado` corrigiu um bug real
  encontrado durante o desenvolvimento — o navegador servia uma versão antiga
  do CSS em cache. A correção (adicionar `?v=N` nos links dos arquivos CSS)
  foi mesclada tanto na `main` (gerando a tag `v1.0.1`) quanto na `develop`,
  garantindo que produção e desenvolvimento não fiquem dessincronizados.

Essa separação evita que código instável chegue à `main` e permite isolar o
desenvolvimento de cada funcionalidade sem interferir nas demais, mesmo em um
projeto com um único desenvolvedor.

## Commits semânticos (Conventional Commits)

Todos os commits seguem o padrão [Conventional Commits](https://www.conventionalcommits.org/pt-br/),
no formato `tipo: descrição no imperativo`. Isso padroniza o histórico,
facilita a revisão de código (cada commit conta uma única mudança clara) e
permite gerar o `CHANGELOG.md` de forma automatizada a partir dos próprios
commits, em vez de escrevê-lo manualmente.

| Prefixo     | Significado                                                | Efeito na versão (SemVer) |
|-------------|-------------------------------------------------------------|----------------------------|
| `feat:`     | nova funcionalidade                                         | sobe o **MINOR**           |
| `fix:`      | correção de bug                                              | sobe o **PATCH**           |
| `hotfix:`   | correção urgente aplicada direto a partir da `main` (extensão deste projeto ao padrão, para distinguir uma `fix:` que veio de uma branch `feature/*` de uma que veio de uma branch `hotfix/*`) | sobe o **PATCH** |
| `refactor:` | reorganização de código sem mudar comportamento              | não sobe versão            |
| `chore:`    | tarefas de manutenção/estrutura (pastas, configs)             | não sobe versão            |
| `docs:`     | documentação (README, CHANGELOG, comentários técnicos)       | não sobe versão\*          |

\* Ver justificativa na seção seguinte.

## Versionamento Semântico (SemVer)

O projeto segue [SemVer](https://semver.org/lang/pt-BR/): `MAJOR.MINOR.PATCH`.

- **MAJOR**: mudança incompatível, que quebra o que já existia (nenhuma
  ocorreu ainda neste projeto — por isso o major permanece em `1`).
- **MINOR**: nova funcionalidade adicionada de forma compatível com o que já
  existia (originada por commits `feat:`).
- **PATCH**: correção de bug ou ajuste que não muda a funcionalidade
  entregue (originada por commits `fix:`/`hotfix:`).

Cada *release* corresponde a um merge `develop → main` marcado com uma tag
anotada (`git tag -a`).

| Versão (tag) | Tipo de release | Commit(s) que a originaram | Descrição |
|--------------|------------------|------------------------------|-----------|
| **v1.0.0**   | Release inicial  | 13 commits `feat:` + 1 `chore:` (ver `CHANGELOG.md`) | Primeira versão estável e funcional da SPA completa. |
| **v1.0.1**   | Patch (hotfix)   | `hotfix: adiciona parâmetro de versão (?v=N) nos links de CSS...` | Corrige bug real de cache do navegador servindo CSS desatualizado. |
| **v1.0.2**   | Patch (docs)     | `docs: documenta estrutura de pastas, estratégia de branches...` | Documentação técnica completa; sem alteração de comportamento do software. |

> **Por que v1.0.2 e não v1.1.0?** Pela definição estrita do SemVer, o MINOR
> só deve subir quando uma funcionalidade nova e compatível é entregue ao
> usuário final. Um commit `docs:` não altera o comportamento da aplicação —
> por isso, mesmo sendo um release "grande" em conteúdo (documentação
> completa), ele foi tratado como PATCH, e não como MINOR. Essa é a mesma
> lógica usada por ferramentas de automação como o `semantic-release`, que
> mapeiam diretamente o tipo do commit (`feat`/`fix`/`BREAKING CHANGE`) para
> o campo do SemVer que deve subir.

Consulte o [`CHANGELOG.md`](./CHANGELOG.md) para o detalhamento completo de
cada versão, no formato Keep a Changelog.
