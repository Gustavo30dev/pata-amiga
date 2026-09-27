# Changelog

Todas as alterações relevantes deste projeto são documentadas aqui.
O formato segue o [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/)
e o projeto adota [Versionamento Semântico](https://semver.org/lang/pt-BR/).

# Changelog

Todas as alterações relevantes deste projeto são documentadas aqui.
O formato segue o [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/)
e o projeto adota [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [1.0.4] — Documentação

### Documentação
- `docs:` explica no README por que as branches `feature/*`/`hotfix/*` foram
  mantidas no repositório em vez de apagadas após o merge.

## [1.0.3] — Changelog e versionamento

### Documentação
- `docs:` adiciona este CHANGELOG.md e documenta a estratégia de Conventional
  Commits + Versionamento Semântico no README.

## [1.0.2] — Documentação

### Documentação
- `docs:` documenta estrutura de pastas, estratégia de branches (GitFlow),
  convenção de commits semânticos e histórico de versões no README.

> Sem alteração de comportamento do software: por isso o release manteve o
> PATCH em vez de subir o MINOR (ver seção "Versionamento Semântico" no README).

## [1.0.1] — Correção

### Corrigido
- `hotfix:` adiciona parâmetro de versão (`?v=N`) nos links de CSS para forçar
  atualização e evitar cache desatualizado do navegador.

## [1.0.0] — Primeira versão estável

### Adicionado
- `feat:` cria design system em variáveis CSS (paleta de 8 cores, 5 níveis
  tipográficos, escala de espaçamento modular).
- `feat:` implementa grade CSS Grid de 12 colunas com 5 breakpoints
  responsivos (mobile a desktop panorâmico).
- `feat:` adiciona alinhamento com Flexbox para cabeçalho, cards de gatos e
  formulário.
- `feat:` aplica estilos base do site (tipografia global, fundo ilustrado,
  blocos de conteúdo e rodapé).
- `feat:` cria menu de navegação responsivo com submenu dropdown (desktop) e
  hambúrguer via checkbox hack (mobile).
- `feat:` adiciona estados interativos de botões e validação visual dos
  campos do formulário.
- `feat:` cria kit de componentes de feedback (badges, alertas, toast, modal)
  e estiliza os cards de gatos disponíveis.
- `feat:` implementa consulta de cadastro (login simulado) por CPF, telefone
  ou nome na página inicial.
- `feat:` transforma o site em SPA com roteamento por hash, interceptação de
  cliques e templates de página em JS.
- `feat:` adiciona reatividade e validação do formulário de cadastro.
- `feat:` centraliza persistência local em módulo próprio (`window.PataAmigaStorage`).
- `feat:` cria módulo de UI (`window.PataAmigaUI`) para sincronizar componentes
  visuais com os dados persistidos.
- `feat:` integra shell único da SPA com Day.js via CDN para exibir datas
  relativas no histórico.

### Alterado
- `chore:` estrutura inicial do projeto (pastas `html/`, `css/`, `imagens/`, `js/`).

[1.0.2]: #
[1.0.1]: #
[1.0.0]: #
