# Aether Desk

Help desk com versões **cliente**, **atendente** e **admin**. Mobile em Expo SDK 57.

Empresa fictícia com placeholders em `mobile/company.js` e `api/src/company.js` (`{{CNPJ}}`, `{{RAZAO_SOCIAL}}`, etc.).

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
  mobile/    Expo (cliente, atendente, admin)
```

Na Vercel: publique o subdiretório `api` como projeto da API e `mobile` como front (export estático do Expo: `npx expo export --platform web`).

Arquitetura para slides: `leo-vault/personal/faculdade/dispositivos-moveis/aether-desk/`.
