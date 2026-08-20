# ✅ Finalga tayyorgarlik ro'yxati — 1-bosqich hakamlar fikri asosida (20.08)

1-bosqich (16.08) hakamlar fikri batafsil ochilgandan keyin (`hakamlar-fikri-16-08.md`)
finalgacha (23.08) qilinishi kerak bo'lgan ishlar. Muhimlik tartibida.

## 🔴 Muhim (finalgacha albatta)

1. **Demo oxiridagi xatoni qayta hosil qilish.** Hakam ko'rgan xato — sabab
   noma'lum, log yo'q. Butun o'yin siklini bir necha marta boshidan oxirigacha
   jonli sinash kerak (pauza/davom etish ham, uzilish/qayta ulanish ham).
   Agar topilmasa — finalda xato chiqsa nima deyish/qilish haqida qisqa reja
   tayyorlab qo'yish (kod bilan shug'ullanishga vaqt bo'lmaydi).
2. **AI-generatorni haqiqiy `ANTHROPIC_API_KEY` bilan jonli sinash.** 5 daqiqa —
   modeldagi savolni butunlay yopadi (batafsil: `hakamlar-fikri-16-08.md`, 2-band).
3. **O'lik eventlarni tozalash yoki ulash:** `HOST_RECONNECT`/`TIMER`/
   `ANSWER_ACK`/`PLAYER_LEFT` (`packages/common/src/events.ts`) — yoki olib
   tashlash, yoki real ishlatish.

## 🟡 Muhim, lekin vaqt bo'lsa

4. UI'ni silliqlash (hakam: "dizayn biroz qo'polroq").
5. Savol matnini o'yinchi telefonida ham ko'rsatish (hozir asosan ведущий
   ekranida).
6. Taqdimot vaqtini mashq qilish (xronometraj 4/10 — kod emas, mashq masalasi).

## ✅ Tayyor, tasdiqlangan — o'zgartirish shart emas

- Prompt injection himoyasi jonli tekshirildi, ishlayapti
  (`prompt-injection-tekshiruvi.md`).
- Asosiy o'yin sikli (PIN → lobby → savollar → reveal → podium), scoring,
  javoblarni aralashtirish — kod bo'yicha tasdiqlangan, ishonchli.
- Sirlar (API kalitlar va h.k.) repoda yo'q — tekshirildi.

To'liq texnik tahlil: Obsidian `CodeClash — Разбор судейства раунда 1 + AI-жюри (20.08)`.
