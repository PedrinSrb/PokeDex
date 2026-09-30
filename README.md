# Pokémon Trainer Hub

Projeto avaliativo de Frontend — Programação para Sistemas Web 2026.2.

## Objetivo

O **Pokémon Trainer Hub** é uma aplicação web para treinadores consultarem a Pokédex, pesquisarem Pokémon, filtrarem por tipo, visualizarem detalhes e manterem uma coleção pessoal de favoritos.

A proposta foi construída para ter um fluxo real de uso:

**Login → Dashboard → Pokédex → Detalhes → Favoritos / Tipos**

Os dados dos Pokémon são consumidos da **PokéAPI** por HTTP.

## Tecnologias

- React
- TypeScript
- Vite
- React Router
- Fetch API
- PokéAPI
- CSS responsivo
- localStorage para login mockado e favoritos

## Funcionalidades

### Login
Autenticação mockada com credenciais locais:

- Usuário: `treinador`
- Senha: `pokemon123`

### Dashboard
- Pokémon em destaque selecionado pela API
- quantidade de favoritos
- atalhos para as áreas principais

### Pokédex
- listagem de Pokémon
- busca por nome ou número
- filtro por tipo
- paginação
- loading
- tratamento de erro
- cards com imagem, número, nome e tipos

### Detalhes
- imagem oficial
- número e tipos
- altura e peso
- experiência base
- habilidades
- estatísticas
- movimentos
- adicionar/remover favorito

### Favoritos
- coleção persistida em `localStorage`
- remoção direta pelos cards
- estado vazio com orientação para explorar a Pokédex

### Tipos
- listagem dos tipos
- seleção de tipo
- Pokémon relacionados ao tipo selecionado

## Estrutura

```text
src/
├── components/
│   ├── ErrorState.tsx
│   ├── Layout.tsx
│   ├── Loading.tsx
│   ├── PokemonCard.tsx
│   └── ProtectedRoute.tsx
├── context/
│   ├── AuthContext.tsx
│   └── FavoritesContext.tsx
├── pages/
│   ├── Dashboard.tsx
│   ├── Favorites.tsx
│   ├── Login.tsx
│   ├── Pokedex.tsx
│   ├── PokemonDetails.tsx
│   └── Types.tsx
├── services/
│   └── pokeApi.ts
├── types/
│   └── pokemon.ts
├── App.tsx
├── main.tsx
└── styles.css
```

## Como executar

### 1. Instalar Node.js

Use uma versão LTS atual do Node.js.

### 2. Instalar dependências

No terminal, dentro da pasta do projeto:

```bash
npm install
```

### 3. Executar em desenvolvimento

```bash
npm run dev
```

O Vite exibirá o endereço local, normalmente:

```text
http://localhost:5173
```

### 4. Gerar versão de produção

```bash
npm run build
```

### 5. Testar o build

```bash
npm run preview
```

## API utilizada

PokéAPI:

https://pokeapi.co/

Principais endpoints utilizados:

- `/pokemon`
- `/pokemon/{name}`
- `/type`
- `/type/{name}`

O projeto utiliza `fetch`, `async/await` e `useEffect` para o consumo dos dados.

## Responsividade

A interface possui adaptações para desktop, tablet e celular, incluindo:

- menu adaptável;
- grids responsivos;
- formulários ajustados;
- cards reorganizados;
- detalhes em coluna no celular.


## Observação acadêmica

Este projeto é uma implementação para fins educacionais. A autenticação é propositalmente mockada e não existe backend nesta etapa.

Pokémon e os respectivos dados pertencem aos seus respectivos detentores. Os dados utilizados pela aplicação são fornecidos pela PokéAPI.
