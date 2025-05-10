# Configuração do Vercel Analytics

Este documento explica como configurar o Vercel Analytics para o seu projeto.

## Pré-requisitos

1. Uma conta no Vercel
2. Um projeto implantado no Vercel

## Importante: Funcionamento em Ambiente de Desenvolvimento

**Nota**: O Vercel Analytics API geralmente não funciona corretamente em ambiente de desenvolvimento local, pois requer dados de um projeto já implantado no Vercel.

Para contornar essa limitação, implementamos as seguintes soluções:

1. Em ambiente de desenvolvimento, a API `/api/analytics.ts` retorna dados simulados automaticamente
2. Em produção (após o deploy no Vercel), a API tentará buscar dados reais do Vercel Analytics

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

### 5. Fazer o Deploy para o Vercel

Para que o Vercel Analytics funcione corretamente, você precisa fazer o deploy do seu projeto para o Vercel:

```bash
vercel deploy
```

## Como Funciona

1. O componente `Analytics` do Vercel está configurado no arquivo `_app.tsx` para rastrear visualizações de página
2. A API `/api/analytics.ts` busca dados do Vercel Analytics usando o token de API
3. O componente `AnalyticsDashboard` exibe os dados obtidos da API

## Solução de Problemas

Se você estiver enfrentando problemas:

1. **Erro em ambiente de desenvolvimento**: Isso é esperado. A API do Vercel Analytics geralmente não funciona localmente. Dados simulados serão exibidos.

2. **Erro após o deploy**: Verifique:

   - Se as variáveis de ambiente estão configuradas corretamente no Vercel
   - Se o token de API tem as permissões corretas
   - Se o projeto ID está correto
   - Se o Vercel Analytics está habilitado no seu projeto

3. **Dados não aparecem após o deploy**:
   - O Vercel Analytics pode levar algum tempo para começar a coletar dados
   - Verifique se o componente `Analytics` está corretamente implementado em `_app.tsx`
   - Certifique-se de que há tráfego no seu site para gerar dados de analytics

## Recursos Adicionais

- [Documentação do Vercel Analytics](https://vercel.com/docs/analytics)
- [API do Vercel](https://vercel.com/docs/rest-api)
