# 🏅 Hakamlar fikri — 1-bosqich (16.08), 20.08 kuni to'liq ochildi

Tashkilotchilar 1-bosqich (otbor) uchun batafsil bahoni chiqarishdi: 2 ta jonli hakam +
1 ta AI-hakam (kodni statik o'qish, jonli hujum emas). Quyida — nima yozishgani va biz
buni kod bilan tekshirib chiqqanimiz.

## Ballar

| Mezon | Ball |
|---|---|
| Dizayn | 7.5/10 |
| Ishlashi | 8.5/10 |
| Foydaliligi | 9/10 |
| Murakkabligi | 10/10 |
| To'g'riligi | 8/10 |
| Xronometraj (3-4 daqiqa) | 4/10 |
| Taqdimotning tushunarliligi va tuzilishi | 7.5/10 |
| Mavzuni o'rganganlik | 10/10 |

## Muhim topilmalar

1. **Demo oxirida tizim xato berdi.** 1-hakam: "Boshi ajoyib edi, lekin oxirida
   tizim xato chiqardi, talaba adashib qoldi, pauza qo'ydi." Bu xato qayerdan
   chiqqani hozircha noma'lum — log yo'q. **Finalgacha qayta hosil qilishga
   harakat qilish kerak** (bir necha marta boshidan oxirigacha jonli sinash,
   pauza/davom etish o'rtada ham).
2. **AI-hakam: "claude-opus-4-8" modeli yo'q, deb yozgan.** Tekshirdim — bu,
   aftidan, AI-hakamning o'zining xatosi (eski bilim, yangi modelni tanimayapti),
   bizning kodda emas: repo ichida `ANTHROPIC_API_KEY` umuman yo'q, ya'ni
   AI-hakam buni jonli ishga tushira olmagan, faqat kodni o'qib bashorat qilgan.
   **Lekin real topilma ham bor:** `HOST_RECONNECT`/`TIMER`/`ANSWER_ACK`/
   `PLAYER_LEFT` eventlari `events.ts`da e'lon qilingan, lekin hech qayerda
   ishlatilmaydi (grep bilan tekshirildi — nol natija). Kichik, lekin haqiqiy
   "o'lik kod".
3. **2-hakam:** dizayn biroz qo'polroq, UI ga ko'proq e'tibor kerak. Va yana:
   savol matni faqat ведущий ekranida emas, o'yinchining o'z telefonida ham
   ko'rinsa zo'r bo'lardi.
4. **Xronometraj 4/10** — bu kod muammosi emas, taqdimot vaqti bilan bog'liq,
   spiker (Yahyo) bilan alohida ishlash kerak.

Full texnik tahlil (kod satrlari bilan) — Obsidian:
`CodeClash — Разбор судейства раунда 1 + AI-жюри (20.08)`.

Nima qilish kerakligi — `finalga-tayyorgarlik-royxati.md`.
