# Aether Desk

Help desk com versões **cliente**, **atendente** e **admin**. Mobile em Expo SDK 57.

Empresa fictícia com placeholders em `company.js` e `api/src/company.js` (`{{CNPJ}}`, `{{RAZAO_SOCIAL}}`, etc.).

---

## Arquitetura

```
┌─────────────────────────────┐
│  autenticando?              │
│  Sim → ActivityIndicator    │
│  Não → usuário logado?      │
│         Não → Login/Register│
│         Sim → tab atual:    │
│           tickets → TicketListScreen
│           queue   → TicketListScreen (fila)
│           mine    → TicketListScreen (meus)
│           inbox   → NotificationsScreen
│           users   → UsersScreen
│           profile → ProfileScreen
│           (criando) → NewTicketScreen
│           (detalhe) → TicketDetailScreen
└─────────────────────────────┘
```

O projeto **deliberadamente não usa React Navigation**. O roteamento é feito com `useState` no `App.js` — cada valor de `tab` mapeia para um componente React. Isso deixa claro o conceito de "estado controla a UI".

```

  app.js              → orquestração: tab state, autenticação, roteamento manual
  ui.js               → biblioteca de componentes reutilizáveis (Card, Button, Field, etc.)
  theme.js            → paleta de cores, metadados de status/prioridade/categoria
  screens/            → telas (uma export por arquivo)
  components/         → componentes compostos específicos do domínio
  hooks/              → hooks customizados (lógica de estado + API)
  apiClient.js        → wrapper fetch com JWT
  authStore.js        → AsyncStorage para token
  company.js          → dados fictícios da empresa (CNPJ, endereço, etc.)
```

### Fluxo de dados (Props)

```
app.js (estado global)
  ├── useAuth → token, user
  ├── useTickets → tickets, detail, creating
  ├── useUsers → users, agents
  └── useNotifications → notifications, unread

app.js passa props para cada Screen:
  <TicketListScreen
    title="Fila"
    tickets={tickets.tickets}     ← props
    onOpen={tickets.openTicket}   ← callback (também é prop)
  />

Screen passa props para componentes:
  <TicketCard ticket={ticket} onPress={onOpen} />
```

**Padrão:** Dados descem, ações sobem. A tela não faz fetch — o hook faz. A tela não muta estado — chama callback que o hook expõe.

---

## Componentes reutilizáveis (`ui.js`)

Biblioteca de design system. Cada componente é uma função que retorna JSX com estilos consistentes.

| Componente | O que faz | Por quê |
|---|---|---|
| `Screen` | Wrapper de todas as telas. `KeyboardAvoidingView` + padding responsivo | Evita que teclado cubra inputs no iOS |
| `Card` | Container branco, bordas arredondadas, sombra sutil | Agrupa visualmente informações relacionadas |
| `Title` | Texto grande (28px, extra-bold) | Cabeçalho de cada tela |
| `Muted` | Texto menor (14px, cinza) | Descrições e textos secundários |
| `Badge` | Pílula colorida (fundo + texto) | Indica estado de forma compacta |
| `Field` | Label + `TextInput` estilizado | Todo formulário precisa de input |
| `Button` | Botão com 3 variantes: primary, ghost, danger | Ações principais, secundárias e destrutivas |
| `Chip` | Pílula clicável (selecionado/não selecionado) | Substitui Picker/Radio de forma visual |
| `TabBar` | Barra inferior com abas + badge | Navegação principal (polegar acessível) |

### Componentes compostos (`components/`)

| Componente | O que faz |
|---|---|
| `BackLink` | Texto clicável "Voltar" — mais leve que um botão |
| `ChipGroup` | Label + linha de Chips — para seleção de prioridade, categoria, status |
| `EmptyState` | Card com "nenhum resultado" — lista vazia sem parecer erro |
| `ErrorText` | Texto vermelho de erro — só renderiza se houver children |
| `TicketCard` | Resumo de chamado: status, prioridade, título, descrição, data |

---

## Telas (`screens/`)

| Tela | Componentes usados | Hook | Descrição |
|---|---|---|---|
| `LoginScreen` | Screen, ScrollView, Field, Button, ErrorText | useState (email, password) | Login com credenciais demo |
| `RegisterScreen` | Screen, ScrollView, Field, Button, ErrorText | useState (name, email, password) | Cadastro de cliente |
| `TicketListScreen` | Screen, FlatList, Title, Button, EmptyState, TicketCard | — | Lista de chamados (fila/meus/cliente) |
| `NewTicketScreen` | Screen, ScrollView, BackLink, Field, Picker, ChipGroup, Button | useState (title, description, priority, category) | Abertura de chamado |
| `TicketDetailScreen` | Screen, ScrollView, BackLink, Badge, Chip, ChipGroup, Slider, Button | useState (satisfaction) | Detalhe + ações (atribuir, status, avaliar) |
| `NotificationsScreen` | Screen, FlatList, Pressable, Card, EmptyState | — | Fila ao vivo (polling 8s) |
| `ProfileScreen` | Screen, Card, Image, Badge, Switch, Button | useState (notifyEnabled), useMemo | Perfil do usuário + empresa |
| `UsersScreen` | Screen, ScrollView, Field, Picker, Chip, ChipGroup, Button | useState (open, name, email, password, role) | CRUD de usuários |

---

## Hooks customizados (`hooks/`)

| Hook | Estado | Funções |
|---|---|---|
| `useAuth` | token, user, boot, authError, authLoading | login(), register(), logout() |
| `useTickets` | tickets[], detail, creating, saving | refreshTickets(), openTicket(), createTicket(), patchTicket(), deleteTicket() |
| `useUsers` | users[], agents[] | refreshUsers(), createUser(), toggleUser(), changeRole(), deleteUser() |
| `useNotifications` | notifications[], unread | openNotification(), markSeen(), clearNotifications() |

---

## Componentes nativos do React Native

| Componente | Onde |
|---|---|
| `View` | Todos os componentes e telas |
| `Text` | Todos os componentes e telas |
| `Image` | LoginScreen (logo) + ProfileScreen (avatar) |
| `TextInput` | Via `Field` em ui.js |
| `Picker` | NewTicketScreen (seletor de categoria) |
| `Slider` | TicketDetailScreen (avaliação de satisfação 1-5) |
| `Switch` | ProfileScreen (toggle de notificações) |
| `ScrollView` | Login, Register, TicketDetail, NewTicket |
| `FlatList` | TicketListScreen + NotificationsScreen |

---

## Como rodar

No **iPhone**, `localhost` é o próprio aparelho. Configure `EXPO_PUBLIC_API_URL` para a API em produção ou use LAN no emulador/dispositivo na mesma rede. O Metro usa túnel (`npm start`) para o Expo Go carregar o JS.

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
  api/       backend Hono + LibSQL (Vercel)
  (raiz)     Expo (cliente, atendente, admin) — branch snack
```

Na Vercel: publique o subdiretório `api` como projeto da API e o app Expo (esta branch) como front (export estático do Expo: `npx expo export --platform web`).

Arquitetura para slides: `leo-vault/personal/faculdade/dispositivos-moveis/aether-desk/`.
