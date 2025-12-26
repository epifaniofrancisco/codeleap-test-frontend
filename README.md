# CodeLeap Test Frontend

> Uma aplicação web desenvolvida em React + TypeScript para a CodeLeap, com gerenciamento de posts, comentários, curtidas e autenticação simples de usuário.

## Funcionalidades

- **Cadastro de usuário (nickname):** Permite que o usuário se identifique para acessar a plataforma.
- **Listagem de posts com rolagem infinita:** Exibe os posts em uma lista dinâmica, carregando mais conforme o usuário rola a página.
- **Criação de posts:** Usuários autenticados podem criar novos posts com título e conteúdo.
- **Edição e exclusão de posts:** Usuários podem editar ou excluir seus próprios posts.
- **Curtidas em posts:** Permite curtir e descurtir posts, exibindo o total de curtidas.
- **Comentários em posts:** Usuários podem comentar em qualquer post e visualizar todos os comentários.
- **Menções:** Usuários podem mencionar outros usuários que já criaram posts na plataforma. 
- **Filtros e busca por usuário:** Possibilita filtrar posts por autor e buscar posts por texto.
- **Logout:** O usuário pode sair da aplicação a qualquer momento.

## Tecnologias Utilizadas

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [TanStack React Query](https://tanstack.com/query/latest)
- [Radix UI](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)

## Instalação e Uso

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/epifaniofrancisco/codeleap-test-frontend.git
   cd codeleap-test-frontend
   ```
2. **Instale as dependências:**
   ```bash
   pnpm install
   ```
3. **Inicie o servidor de desenvolvimento:**
   ```bash
   pnpm dev
   ```
4. Acesse [http://localhost:5173](http://localhost:5173) no navegador.

## Estrutura do Projeto

- `src/pages/` — Páginas principais (SignUp, Posts, Lista de Posts)
- `src/components/` — Componentes reutilizáveis (cards, botões, formulários, modais)
- `src/hooks/` — Hooks customizados (ex: rolagem infinita, posts)
- `src/services/` — Integração com API
- `src/store/` — Gerenciamento de estado global (usuário, likes, comentários)
- `src/types/` — Tipos TypeScript
- `src/utils/` — Funções utilitárias

## Como funciona

1. O usuário informa um nome de usuário para acessar a rede.
2. Pode criar, editar, excluir e curtir posts.
3. Pode comentar nos posts e visualizar comentários.
4. Pode filtrar posts por usuário e buscar por texto.
5. Logout disponível a qualquer momento.

## Licença

Este projeto é apenas para fins de teste técnico.
