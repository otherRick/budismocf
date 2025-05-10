# Configuração do Vercel Analytics

Este documento explica como configurar o Vercel Analytics para o seu projeto.

## Pré-requisitos

1. Uma conta no Vercel
2. Um projeto implantado no Vercel

## Passos para Configuração

### 1. Habilitar o Vercel Analytics no Dashboard

1. Acesse o [Dashboard do Vercel](https://vercel.com/dashboard)
2. Selecione seu projeto
3. Clique na aba "Analytics"
4. Clique em "Enable Analytics"

### 2. Obter um Token de API do Vercel

Para que o painel de administração possa exibir dados reais do Vercel Analytics, você precisa criar um token de API:

1. Acesse [Vercel Account Tokens](https://vercel.com/account/tokens)
2. Clique em "Create" para criar um novo token
3. Dê um nome ao token (ex: "Analytics API")
4. Selecione o escopo "Analytics" (ou "Full Access" se necessário)
5. Clique em "Create Token"
6. Copie o token gerado (você não poderá vê-lo novamente)

### 3. Obter o ID do Projeto e da Equipe

1. Acesse o [Dashboard do Vercel](https://vercel.com/dashboard)
2. Selecione seu projeto
3. Na URL do navegador, você verá algo como: `https://vercel.com/[team-id]/[project-id]`
4. Anote o `[team-id]` e o `[project-id]`

### 4. Configurar as Variáveis de Ambiente

Adicione as seguintes variáveis ao arquivo `.env.local` do seu projeto:

```
VERCEL_API_TOKEN=seu_token_aqui
VERCEL_PROJECT_ID=seu_project_id_aqui
VERCEL_TEAM_ID=seu_team_id_aqui  # Opcional, apenas se estiver usando uma equipe
```

### 5. Reiniciar o Servidor de Desenvolvimento

Após configurar as variáveis de ambiente, reinicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

## Como Funciona

1. O componente `Analytics` do Vercel está configurado no arquivo `_app.tsx` para rastrear visualizações de página
2. A API `/api/analytics.ts` busca dados do Vercel Analytics usando o token de API
3. O componente `AnalyticsDashboard` exibe os dados obtidos da API

## Solução de Problemas

Se você estiver enfrentando problemas:

1. Verifique se as variáveis de ambiente estão configuradas corretamente
2. Certifique-se de que o token de API tem as permissões corretas
3. Verifique os logs do console para erros
4. Certifique-se de que o projeto está implantado no Vercel e tem o Analytics ativado

## Recursos Adicionais

- [Documentação do Vercel Analytics](https://vercel.com/docs/analytics)
- [API do Vercel](https://vercel.com/docs/rest-api)
