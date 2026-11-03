# Larissa Guerra — Enfermagem e Estética
## Rodar
1. `npm install`  2. copie `.env.example` para `.env` e preencha com o projeto Firebase  3. `npm run dev`
## Firebase
`firebase deploy --only firestore:rules,storage` publica `firestore.rules` e `storage.rules`.
A administradora precisa do custom claim `admin: true` (definido via Admin SDK, na etapa do backend).
## Status
Etapa 1 e base da Etapa 2 criadas. Nada foi instalado, compilado nem testado ainda.

## Painel administrativo (/admin)
1. Firebase Console → Authentication → ative **E-mail/senha** e crie o usuário da administradora.
2. Firestore → crie a coleção `admins` com um documento cujo **ID é o UID** desse usuário (qualquer campo, ex.: `ok: true`).
3. Publique as regras: `firebase deploy --only firestore:rules`.
4. Authentication → Settings → Authorized domains: adicione o domínio do Vercel e o domínio próprio.
