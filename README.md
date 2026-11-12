# Ótica Support — Front-end

Site da **Ótica Support**: catálogo de óculos de sol, carrinho e checkout, e agendamento de consultas de vista. Este repositório contém só o front-end. Ele consome a API do repositório [Otica_Support_Back](https://github.com/Limalls/Otica_Support_Back).

## Tecnologias

- React (JavaScript/JSX) com Vite
- React Router, TanStack Query, Axios e Zustand
- React Hook Form e Zod
- Tailwind CSS e shadcn/ui
- ESLint, Prettier e Vitest

## Como rodar

```bash
git clone https://github.com/Limalls/Otica_Support_Front.git
cd Otica_Support_Front
cp .env.example .env
npm install
npm run dev
```

O site abre em http://localhost:5173. A API precisa estar rodando em `VITE_API_URL` (por padrão, http://localhost:8000).

## Scripts

| Comando | O que faz |
|---|---|
| `npm run dev` | Inicia o site em modo desenvolvimento |
| `npm run build` | Gera a versão de produção em `dist/` |
| `npm run lint` | Verifica o código com ESLint |
| `npm run format` | Formata o código com Prettier |
| `npm test` | Roda os testes |

## Estrutura

```
src/
├── pages/        # Home, Catálogo, Produto, Carrinho, Checkout, Agendamento
├── components/   # botões, cards de produto, cabeçalho, rodapé
├── services/     # chamadas à API
├── hooks/        # lógica reutilizável
├── store/        # estado global (carrinho)
└── assets/       # logo e imagens
```

## Variáveis de ambiente

| Variável | Descrição |
|---|---|
| `VITE_API_URL` | Endereço da API |

Tudo que começa com `VITE_` fica visível no navegador. Nunca coloque segredos aqui e nunca envie o `.env` para o GitHub.

## Contribuindo

Veja o [CONTRIBUTING.md](CONTRIBUTING.md).

## Licença

Distribuído sob a licença MIT. Veja o arquivo [LICENSE](LICENSE).