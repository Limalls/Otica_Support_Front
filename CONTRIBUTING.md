# Guia de contribuição

## Fluxo de trabalho

1. Crie uma branch a partir da `main`: `feat/pagina-de-catalogo`, `fix/total-do-carrinho`, `docs/atualiza-readme`.
2. Faça commits pequenos, cada um com uma única mudança.
3. Abra um Pull Request para a `main` preenchendo o template.

## Padrão de commits

Formato `tipo: descrição curta no imperativo`.

| Tipo | Quando usar |
|---|---|
| `feat` | nova funcionalidade ou tela |
| `fix` | correção de bug |
| `docs` | documentação |
| `style` | formatação, sem mudar o comportamento |
| `refactor` | melhoria de código sem mudar o comportamento |
| `test` | testes |
| `chore` | configuração e dependências |

## Antes de abrir o PR

- `npm run lint` sem erros
- `npm test` passando
- `npm run build` funcionando
- Nenhum segredo ou arquivo `.env` no commit