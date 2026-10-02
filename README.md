# Aether Desk

Help desk com versões **cliente**, **atendente** e **admin**. Mobile em Expo SDK 57 (React Native 0.86), API em Hono.

Empresa fictícia com placeholders em `mobile/company.js` e `api/src/company.js` (`{{CNPJ}}`, `{{RAZAO_SOCIAL}}`, etc.).

---

## Arquitetura

### Organização das pastas e arquivos

```
aether-desk/
  api/                 backend Hono + SQLite
    src/
      app.js           monta a API (CORS, rotas)
      server.js        sobe o servidor local
      auth.js          JWT (sign / verify)
      password.js      hash / verify de senha (PBKDF2)
      http.js          withUser, requireRoles, helpers
      db.js            conexão SQLite + migrate + mappers
      seed.js          usuários e dados demo
      company.js       dados fictícios da empresa
      routes/
        users.js       /auth e /users
        tickets.js     /tickets e /notifications
  mobile/              app Expo (cliente, atendente, admin)
    app.js             tab state, autenticação, roteamento
    index.js           entry do Expo
    apiClient.js       HTTP + JWT (retries)
    authStore.js       token no SecureStore
    company.js         dados fictícios da empresa
    theme.js           cores, status, prioridade, papel
    ui.js              design system (Screen, Button, Chip…)
    hooks/             estado + chamadas à API por domínio
    screens/           telas agrupadas por domínio
    components/        componentes compostos (BackLink, EmptyState…)
    utils/             helpers (ex.: formatWhen)
  assets/              logo.png (login e perfil)
```

Cada pasta do mobile tem um `index.js` (barrel) pra importar de um lugar só (`from "./hooks"`, `from "./screens"`, etc.).

### Roteamento manual

O projeto **deliberadamente não usa React Navigation**. O roteamento é feito com `useState` no `app.js` — cada valor de `tab` mapeia para um componente React. Isso deixa claro o conceito de "estado controla a UI".

```mermaid
flowchart TD
    A([App]) --> B{auth.boot?}
    B -- sim --> C[ActivityIndicator]
    B -- não --> D{usuário logado?}
    D -- não --> E{authMode}
    E -- login --> F[LoginScreen]
    E -- register --> G[RegisterScreen]
    D -- sim --> H{tickets.creating?}
    H -- sim --> I[NewTicketScreen]
    H -- não --> J{tickets.detail?}
    J -- sim --> K[TicketDetailScreen]
    J -- não --> L{tab}
    L -- "tickets / queue / mine" --> M[TicketListScreen]
    L -- inbox --> N[NotificationsScreen]
    L -- users --> O[UsersScreen]
    L -- profile --> P[ProfileScreen]
```

As abas disponíveis dependem do papel do usuário (`tabsFor` no `app.js`). A `TabBar` some enquanto um chamado está sendo criado ou aberto.

```mermaid
flowchart LR
    cliente([cliente]) --> t1[tickets] & p1[profile]
    atendente([atendente]) --> q2[queue] & m2[mine] & i2[inbox] & p2[profile]
    admin([admin]) --> q3[queue] & u3[users] & i3[inbox] & p3[profile]
```

### Módulos

```mermaid
flowchart TD
    app["app.js<br/>tab state, autenticação, roteamento"]
    hooks["hooks/<br/>estado + chamadas à API"]
    screens["screens/<br/>telas agrupadas por domínio"]
    components["components/<br/>componentes compostos"]
    ui["ui.js<br/>design system"]
    theme["theme.js<br/>cores, status, prioridade, categoria, papel"]
    utils["utils/<br/>formatWhen (datas pt-BR)"]
    api["apiClient.js<br/>XMLHttpRequest + JWT, 3 tentativas"]
    store["authStore.js<br/>token no SecureStore"]
    company["company.js<br/>dados fictícios da empresa"]

    app --> hooks
    app --> screens
    app --> ui
    hooks --> api
    hooks --> store
    screens --> components
    screens --> ui
    screens --> utils
    screens --> company
    components --> ui
    ui --> theme
    screens --> theme
```

### Fluxo de dados (Props)

```mermaid
flowchart TD
    subgraph hooks [Hooks]
        useAuth["useAuth<br/>token, user"]
        useTickets["useTickets<br/>tickets, detail, creating"]
        useUsers["useUsers<br/>users, agents"]
        useNotifications["useNotifications<br/>notifications, unread"]
    end

    app[app.js]
    screen["TicketListScreen<br/>title, tickets, onOpen"]
    card["TicketCard<br/>ticket, onPress"]

    useAuth & useTickets & useUsers & useNotifications -- estado --> app
    app -- props --> screen
    screen -- props --> card
    card -. onPress .-> screen
    screen -. onOpen .-> app
    app -. openTicket .-> useTickets
```

Exemplo de uma ação subindo e o estado descendo — atendente muda o status de um chamado:

```mermaid
sequenceDiagram
    actor Atendente
    participant Tela as TicketDetailScreen
    participant App as app.js
    participant Hook as useTickets
    participant API as API Hono

    Atendente->>Tela: toca no status
    Tela->>App: onStatus(status)
    App->>Hook: patchTicket(id, { status }, tab)
    Hook->>API: PATCH /tickets/:id
    API-->>Hook: 200
    Hook->>API: GET /tickets/:id
    Hook->>API: GET /tickets
    Hook-->>App: detail e tickets atualizados
    App-->>Tela: novas props
```

**Padrão:** Dados descem, ações sobem. A tela não faz fetch — o hook faz. A tela não muta estado — chama callback que o hook expõe.

---

## Componentes reutilizáveis (`ui.js`)

Biblioteca de design system. Cada componente é uma função que retorna JSX com estilos consistentes, usando as cores de `theme.js`.

| Componente | O que faz | Por quê |
|---|---|---|
| `Screen` | Wrapper de todas as telas. `KeyboardAvoidingView` (padding no iOS) + padding por plataforma | Evita que teclado cubra inputs no iOS |
| `Card` | Container branco com borda, cantos arredondados e sombra sutil | Agrupa visualmente informações relacionadas |
| `Title` | Texto grande (28px, peso 800) | Cabeçalho de cada tela |
| `Muted` | Texto menor (14px, cinza) | Descrições e textos secundários |
| `Badge` | Pílula colorida (fundo + texto) | Indica estado de forma compacta |
| `Field` | Label + `TextInput` estilizado, com `secure` e `multiline` | Todo formulário precisa de input |
| `Button` | Botão com 3 variantes (primary, ghost, danger) e estado `loading` | Ações principais, secundárias e destrutivas |
| `Chip` | Pílula clicável (selecionado/não selecionado) | Seleção visual de prioridade, status, papel e atendente |
| `TabBar` | Barra inferior com abas + badge de contagem | Navegação principal (polegar acessível) |

### Componentes compostos (`components/`)

| Componente | O que faz | Por quê |
|---|---|---|
| `BackLink` | Texto clicável "Voltar" (label configurável) | Navegação de retorno mais leve que um botão |
| `ChipGroup` | Label + linha de `Chip` a partir de `options` `[key, label]` | Evita repetir o mapeamento de chips em cada formulário |
| `EmptyState` | `Card` com texto em negrito via `children` | Lista vazia sem parecer erro de rede |
| `ErrorText` | Texto vermelho de erro — só renderiza se houver `children` | Feedback de formulário sem ocupar espaço quando não há erro |

O `TicketCard` não fica em `components/`: ele é exportado de `screens/tickets.js`, junto das telas de chamado. Mostra status, prioridade, título, descrição, categoria, data e atendente.

---

## Telas (`screens/`)

As telas ficam agrupadas por domínio, e `screens/index.js` reexporta todas:

| Arquivo | Exporta |
|---|---|
| `auth.js` | `LoginScreen`, `RegisterScreen` |
| `tickets.js` | `TicketCard`, `TicketListScreen`, `NewTicketScreen`, `TicketDetailScreen` |
| `notifications.js` | `NotificationsScreen` |
| `profile.js` | `ProfileScreen` |
| `users.js` | `UsersScreen` |

| Tela | Componentes usados | Estado local | Descrição |
|---|---|---|---|
| `LoginScreen` | Screen, ScrollView, Pressable, Image, Title, Muted, Card, Field, Button, ErrorText | useState (email, password) | Login, já preenchido com a conta de cliente demo |
| `RegisterScreen` | Screen, ScrollView, Pressable, Title, Muted, Card, Field, Button, ErrorText | useState (name, email, password) | Cadastro de cliente |
| `TicketListScreen` | Screen, Title, Muted, Button, FlatList, TicketCard, EmptyState | — | Lista de chamados: "Meus chamados" (cliente), "Fila" e "Comigo" (equipe). Só o cliente vê "Novo chamado" |
| `NewTicketScreen` | Screen, BackLink, Title, Muted, ScrollView, Card, Field, ChipGroup, Picker, Button | useState (title, description, priority, category) | Abertura de chamado |
| `TicketDetailScreen` | Screen, BackLink, ScrollView, Badge, Title, Muted, Card, Chip, ChipGroup, Slider, Button | useState (satisfaction) | Detalhe e histórico. Equipe atribui atendente e muda status; cliente cancela chamado aberto; admin exclui; cliente avalia chamado resolvido (1–5, só local, não vai para a API) |
| `NotificationsScreen` | Screen, Title, Pressable, Muted, FlatList, Card, EmptyState | — | "Fila ao vivo" da equipe, alimentada pelo polling do `useNotifications`. "Limpar" zera a lista |
| `ProfileScreen` | Screen, Title, Card, Image, Muted, Badge, Switch, Button | useState (notifyEnabled), useMemo | Perfil do usuário + dados da empresa. O Switch de notificações é só local. Sair pede confirmação com `Alert` |
| `UsersScreen` | Screen, Title, Muted, Button, Card, Field, ChipGroup, ScrollView, Chip | useState (open, name, email, password, role) | CRUD de usuários (só admin): criar, mudar papel, ativar/desativar, remover |

---

## Hooks customizados (`hooks/`)

| Hook | Estado | Funções |
|---|---|---|
| `useAuth()` | token, user, boot, authError, authLoading | login(), register(), logout(), setAuthError() |
| `useTickets(token)` | tickets, detail, creating, saving | refreshTickets(), openTicket(), createTicket(), patchTicket(), deleteTicket(), clearDetail(), startCreating(), cancelCreating() |
| `useUsers(token, isStaff)` | users, agents | refreshUsers(), createUser(), toggleUser(), changeRole(), deleteUser() |
| `useNotifications(token, isStaff, onRefreshTickets)` | notifications, unread | openNotification(), markSeen(), clearNotifications() |

- `useAuth` restaura o token salvo no boot e valida com `GET /auth/me`; se falhar, apaga o token.
- `useTickets.refreshTickets(tab)` chama `GET /tickets`, com `?mine=1` na aba `mine`. Quem filtra por cliente é a API.
- `useUsers` só busca quando o usuário é da equipe. `agents` são os usuários com papel atendente ou admin.
- `useNotifications` faz polling de `GET /notifications?since=…` a cada 8s, só para a equipe, e chama `onRefreshTickets` quando chega algo novo.

---

## Componentes nativos e bibliotecas

| Componente | De onde vem | Onde |
|---|---|---|
| `View`, `Text` | `react-native` | Todos os componentes e telas |
| `Image` | `react-native` | LoginScreen (logo) + ProfileScreen (avatar), ambos com `assets/logo.png` |
| `TextInput` | `react-native` | Via `Field` em ui.js |
| `Pressable` | `react-native` | Button, Chip, TabBar, BackLink, TicketCard e links de texto |
| `ScrollView` | `react-native` | Login, Register, NewTicket, TicketDetail, Users |
| `FlatList` | `react-native` | TicketListScreen + NotificationsScreen |
| `Switch` | `react-native` | ProfileScreen (toggle de notificações) |
| `Slider` | `react-native` | TicketDetailScreen (avaliação de satisfação 1–5) |
| `ActivityIndicator` | `react-native` | Boot do app + `Button` em loading |
| `KeyboardAvoidingView` | `react-native` | Via `Screen` em ui.js |
| `Alert` | `react-native` | ProfileScreen (confirmação de saída) |
| `Picker` | `@react-native-picker/picker` | NewTicketScreen (seletor de categoria) |
| `SecureStore` | `expo-secure-store` | authStore.js (token JWT) |
| `StatusBar` | `expo-status-bar` | app.js |

---

## API (`api/`)

- Hono com rotas `/health`, `/auth`, `/users`, `/tickets` e `/notifications`.
- Banco SQLite nativo do Node (`node:sqlite`, exige Node 22.5+). Localmente fica em `api/data/aether.db`; `DATABASE_URL=file:...` troca o caminho.
- Na Vercel o banco é **em memória**: os dados somem quando a function reinicia. Os usuários demo são recriados toda vez que a API sobe.
- Senhas com PBKDF2-SHA256 (`node:crypto`), JWT com `jose`.

### Autenticação

Fluxo JWT Bearer (sem cookies, sem refresh, sem logout no servidor):

1. Login/registro → `POST /auth/login` ou `/auth/register`
2. API valida a senha e assina um JWT HS256 (12h) com `sub`, `role`, `name`, `email`
3. App guarda o token no SecureStore (`aether.token`)
4. Cada request manda `Authorization: Bearer …`
5. Handlers usam `withUser` / `requireRoles` (não há middleware global)
6. Logout no mobile só apaga o token local — o JWT segue válido até expirar

```mermaid
sequenceDiagram
    participant App as Mobile
    participant API as API Hono
    participant DB as SQLite

    App->>API: POST /auth/login
    API->>DB: busca user por email
    API-->>App: { token, user }
    App->>App: SecureStore(token)
    App->>API: GET /tickets (Bearer JWT)
    API->>API: jwtVerify (assinatura)
    API->>DB: SELECT user WHERE id = payload.sub
    API-->>App: dados (role vem do banco)
```

#### Por que não dá para forjar outra role?

O JWT carrega uma claim `role`, mas a API **não usa essa claim para autorizar**. Em `withUser`, o token só entrega o `sub` (id do usuário). A role vem do banco:

```js
const payload = await readToken(token);
const result = await db.execute({
  sql: "SELECT * FROM users WHERE id = ? LIMIT 1",
  args: [payload.sub],
});
const user = mapUser(result.rows[0]);
```

`requireRoles` olha `user.role` desse registro — não `payload.role`.

Se alguém alterar o JWT na mão:

1. **Sem o `JWT_SECRET`**, qualquer mudança no payload quebra a assinatura HS256 → `jwtVerify` falha → 401.
2. **Mesmo com um JWT válido**, a claim `role` no token é só informativa; a autorização sempre reconsulta o usuário no DB.

Forjar `role: "admin"` no token não muda nada — ou a assinatura invalida o token, ou a role real continua sendo a do banco.

---

## Como rodar

Sem `EXPO_PUBLIC_API_URL`, o app usa a API de produção (`https://react-native-apps.vercel.app`). No **iPhone**, `localhost` é o próprio aparelho: para usar a API local, aponte `EXPO_PUBLIC_API_URL` para o IP da máquina na mesma rede. O `npm start` sobe o Metro com túnel (`expo start --tunnel`) para o Expo Go carregar o JS.

```bash
cd mobile
npm install
npm start
```

Backend local (opcional):

```bash
cd api
npm install
npm run seed
npm run dev
```

```bash
cd mobile
EXPO_PUBLIC_API_URL=http://localhost:3001 npx expo start --lan
```

## Contas de demo

| Papel | Email | Senha |
|---|---|---|
| Cliente | `cliente@aether.desk` | `Cliente#123` |
| Atendente | `agente@aether.desk` | `Agente#123` |
| Admin | `admin@aether.desk` | `Admin#123` |

## Layout do projeto

```
aether-desk/
  api/       backend Hono + node:sqlite (Vercel)
  mobile/    Expo (cliente, atendente, admin)
  assets/    logo.png usado no login e no perfil
```

Na Vercel: publique o subdiretório `api` como projeto da API (`api/vercel.json` manda tudo para a function `api/index.js`) e `mobile` como front (`mobile/vercel.json` roda `npx expo export --platform web` e publica `dist`).

Arquitetura para slides: `leo-vault/personal/faculdade/dispositivos-moveis/aether-desk/`.
