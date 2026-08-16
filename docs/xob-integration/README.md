# 🔌 XOB — Integration & Auth

> XOB, bu sizning vazifangiz: Supabase'ni ko'tarish, Google login'ni yoqish, frontend+serverni ulash va deploy qilish. Batafsil qadamlar pastda (ruscha, texnik atamalar inglizcha).

Твоя зона: связать всё вместе и запустить в интернете. Без тебя auth и Google — только заглушки.

## 1. Supabase-проект
1. Создать проект на [supabase.com](https://supabase.com) (регион поближе).
2. Project → Settings → API → скопировать **Project URL** и **anon public key**.
3. Вписать в корневой `.env`:
   ```
   VITE_SUPABASE_URL=https://xxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJ...
   ```
4. Перезапустить `npm run dev` → на страницах входа пропадёт жёлтый баннер «демо-режим», заработает регистрация email/пароль.

## 2. Google-вход (пошагово)
1. [Google Cloud Console](https://console.cloud.google.com) → создать проект → **APIs & Services → Credentials → Create OAuth client ID** → тип **Web application**.
2. В Supabase: **Authentication → Providers → Google** → включить. Там показан **Callback URL** (вида `https://xxxx.supabase.co/auth/v1/callback`).
3. Этот Callback URL вставить в Google Console → **Authorized redirect URIs**.
4. Из Google Console скопировать **Client ID** и **Client Secret** → вставить в панель Google в Supabase → сохранить.
5. Проверить: кнопка «Продолжить с Google» на `/login` → реальный вход Google → редирект на `/host`.
   (Код уже готов: `signInWithOAuth({ provider: "google" })` в `src/lib/auth.tsx`.)

## 3. Схема БД (согласовать с Otabek)
- Таблица `games` для результатов (pin, host_id, quiz_id, podium jsonb, created_at).
- (Стретч) таблица `quizzes` для пользовательских квизов.
- Включить RLS, простые политики (owner видит своё).

## 4. Деплой
- **Фронт** (`packages/web`) → Vercel: root = `packages/web`, env `VITE_*` (URL сервера + Supabase).
- **Сервер** (`packages/server`) → Render / Railway: старт `npm run start -w @codeclash/server`, env `PORT`, `CLIENT_ORIGIN` (домен фронта).
- В Vite выставить `VITE_SERVER_URL` на публичный адрес сервера.
- Добавить домен фронта в **CLIENT_ORIGIN** сервера и в Supabase → Auth → **Redirect URLs**.

## 5. Сквозной тест (обязательно перед демо)
Открыть задеплоенный `/host` на ноутбуке, `/join` — на 2–3 телефонах, сыграть полный круг: вход по PIN → вопросы → лидерборд → подиум. Проверить Google-вход у ведущего.

## Правила
- `anon key` — можно в Vite (публичный). **service_role key — только на сервере**, никогда в `VITE_*`.
- `.env` не коммитить (уже в `.gitignore`).
