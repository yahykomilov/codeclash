# ⚔️ CodeClash

Real-time multiplayer IT quiz — **Kahoot-style battles** on HTML, CSS, JavaScript & React.
Built for the **DevX Command** hackathon (theme: *"Build your own Kahoot / quiz constructor"*).

Two ways in from the home screen:

- **🎮 Player** — join a live game with a 6-digit PIN and a nickname, answer from your phone.
- **🎤 Host** — sign in, pick a quiz, open a lobby, run it on the big screen.

Interface in **Russian / Uzbek / English** (i18n), auth by **email/password or Google** (Supabase),
scoring by **answer speed + streak bonus**, ending in a live leaderboard and podium.

## Stack

| Package            | Tech                                             |
| ------------------ | ------------------------------------------------ |
| `packages/web`     | React + Vite + Tailwind + i18next + socket.io-client |
| `packages/server`  | Node + Express + Socket.io (authoritative game engine) |
| `packages/common`  | Shared TS types, socket events, validators, scoring, question bank |
| Auth / DB          | Supabase (email + Google OAuth)                  |

## Run locally

```bash
npm install
cp .env.example .env      # fill Supabase keys (optional — demo mode works without them)
npm run dev               # starts server (:3001) + web (:5173)
```

Open two windows: one on `/host` (big screen), one on `/join` (phone). Real multiplayer — open `/join` on several phones.

## Structure

```
packages/
  common/   shared contracts + question bank
  server/   socket.io game engine
  web/      React client (player + host)
docs/       team tasks & presentation materials
```

## Team — DevX Command

| Who       | Area                          |
| --------- | ----------------------------- |
| Yahyo     | Frontend / web                |
| Otabek    | Backend                       |
| XOB       | Integration & auth            |
| Abdulaziz | Video & presentation          |

See [`docs/tasks.md`](docs/tasks.md) for the per-person breakdown.
