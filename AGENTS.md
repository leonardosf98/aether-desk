# AGENTS

Help desk Aether Desk: API Hono + SQLite nativo do Node (`node:sqlite`) + mobile Expo.

## Pastas

| Pasta | Papel |
|---|---|
| `api/` | Backend Hono + `node:sqlite` (Node 22.5+, deploy Vercel com banco em memória) |
| `mobile/` | App Expo SDK 57 (cliente, atendente, admin) |

## Como trabalhar

1. Confirme a pasta (`api` ou `mobile`) antes de editar.
2. Rode `npm install` só dentro dessa pasta.
3. Não commite a menos que peçam.
4. Não adicione comentários, TODOs ou JSDoc.
5. Prefira nomes e funções pequenas a anotações.
6. Textos da interface em **português**.

## Rodar

```bash
cd api && npm install && npm run seed && npm run dev
cd mobile && EXPO_PUBLIC_API_URL=http://localhost:3001 npx expo start --lan
```
