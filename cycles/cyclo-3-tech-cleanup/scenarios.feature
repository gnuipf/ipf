# language: pt

Funcionalidade: Site público após limpeza técnica
  Como visitante do site Inaudível Por Favor
  Quero navegar pelas secções activas
  Para aceder a conteúdo editorial e ao catálogo NUKE DB sem referências à loja

  Cenário: Menu principal não inclui loja
    Dado que o visitante abre qualquer página pública com o header visível
    Quando observa os links de navegação
    Então não vê a opção "STORE"
    E continua a ver "INÍCIO", "SOBRE NÓS", "SEJA REVISOR" e "NUKE DB"

  Cenário: URL antiga da loja deixa de funcionar
    Dado que o visitante acede directamente a "/store"
    Quando a aplicação carrega
    Então não vê a página de produtos da loja
    E não consegue comprar ou ver camisetas no site

  Esquema do Cenário: Rotas públicas principais permanecem acessíveis
    Dado que o visitante acede à rota "<rota>"
    Quando a página termina de carregar
    Então vê o conteúdo esperado dessa secção

    Exemplos:
      | rota            |
      | /               |
      | /sobre          |
      | /seja-revisor   |
      | /db             |

Funcionalidade: NUKE DB preservado após limpeza
  Como visitante interessado em discografias
  Quero explorar o catálogo em "/db"
  Para que a remoção de legado não apague os dados do catálogo

  Cenário: Catálogo continua pesquisável
    Dado que existem registros no catálogo NUKE DB
    Quando o visitante abre "/db" e usa a busca textual
    Então vê resultados filtrados por banda, título ou data

  Cenário: Filtro por tipo continua funcional
    Dado que o visitante está em "/db"
    Quando selecciona um tipo de trabalho no dropdown
    Então a listagem mostra apenas obras desse tipo

Funcionalidade: Segurança mínima do conteúdo editorial
  Como visitante que lê postagens
  Quero que links e conteúdo sejam servidos de forma segura
  Para reduzir risco de conteúdo malicioso no site

  Cenário: Links externos em postagens abrem de forma segura
    Dado que uma postagem publicada contém um link externo http ou https
    Quando o visitante abre a página de detalhe do post
    Então o link é clicável
    E abre numa nova aba sem expor a página original a `window.opener`

  Cenário: Painel admin não é indexado por motores de busca
    Dado que o operador acede a "/adminipf"
    Quando a página do painel carrega
    Então a página inclui indicação de noindex para robots
