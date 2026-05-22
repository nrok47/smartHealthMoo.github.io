# มูเตลู อีทติ้ง · Health-Moo V2

> เซียมซีสุขภาพ ๖ ใบ — เช็คดวงสุขภาพแบบไทยบ้านใน 2 นาที พร้อมแผนแก้เคล็ดจากหมอ LM ศอ.10 อุบลฯ

ใช้แนวคิด **Lifestyle Medicine 6 Pillars** (กิน · ขยับ · นอน · ใจ · เลี่ยงพิษ · สัมพันธ์) มาห่อด้วยอารมณ์สายมู — แตะใบเซียมซีเปิดทีละใบ ตอบสั้นๆ ปิดท้ายด้วยใบเซียมซีแก้เคล็ดและ CTA ส่งต่อเข้างาน LM ศอ.10

## 🚀 Deploy บน GitHub Pages

1. คัดลอกทุกไฟล์ในโฟลเดอร์นี้ไปไว้ที่ **root** ของ repo `nrok47/smartHealthMoo.github.io`
2. ที่ repo settings → Pages → Source = `main` branch, root folder
3. รอประมาณ 1-2 นาที เว็บจะออนไลน์ที่ `https://nrok47.github.io/smartHealthMoo.github.io/`

ระบบเป็น **Pure Front-end** (React via Babel inline, no build step) — ไม่ต้อง `npm install`, ไม่ต้องเปิด server หลังบ้าน

## 📂 โครงสร้างไฟล์

```
index.html          ← Entry point (meta tags, fonts, CSS variables)
favicon.svg         ← ไอคอนหมูจิ๋ว
app.jsx             ← Router, state, mode-detect, tweaks-panel
components.jsx      ← MooMascot, HPBar, ChipGroup, EnergySlider, MooSays
screens.jsx         ← Welcome + Q1-Q5 legacy + Dashboard
screens-v2.jsx      ← 6-pillar Cards, ResultV2 (ใบเซียมซี), LM Popup,
                      Wisdom Library, Register form, share canvas
ios-frame.jsx       ← iPhone bezel (สำหรับ demo mode บน desktop)
tweaks-panel.jsx    ← Tweaks UI helpers
```

## 🎴 Flow

```
Welcome
  → Cards (6 pillars · แตะเปิดใบ)
      → Result · ใบเซียมซีแก้เคล็ด ตัวที่ ๑๐
          ├─ 🚀 LM Popup → Register Form (3 ช่อง)
          ├─ 📖 Wisdom Library (เรียงตามจุดดวงตกสุด)
          └─ Share Zone (Web Share API / Canvas PNG / LINE / Facebook)
      → Dashboard (streak, tasks, bottom nav)
```

## 🔗 URL Query Params

| Param | ค่า | ผลลัพธ์ |
|-------|------|---------|
| `?score=70` | 0–100 | กระโดดไปหน้า Result พร้อมคะแนนที่กำหนด (เหมาะกับลิงก์แชร์) |
| `?mode=app` | — | บังคับโหมด fullscreen (mobile-like) บน desktop |
| `?mode=demo` | — | บังคับโหมด iOS frame บน mobile |

โหมดเริ่มต้น: viewport ≤ 720px → `app` (fullscreen), > 720px → `demo` (iOS frame)

## 🛠 จุดที่ต้องเปลี่ยนก่อน Go-Live

### 1. LINE OA ของ ศอ.10
แก้ใน `screens-v2.jsx` ที่ function `LMModal`:
```jsx
onClick={() => window.open('https://line.me/R/ti/p/@hpc10', '_blank')}
```
เปลี่ยน `@hpc10` เป็น LINE OA ID จริงของศูนย์ฯ

### 2. ลิงก์สื่อกรมอนามัย
แก้ใน `screens-v2.jsx` ที่ function `WisdomModal`:
```jsx
pdf: 'https://multimedia.anamai.moph.go.th/',
```
สามารถปรับให้ละเอียดได้แต่ละ pillar (กิน/ขยับ/นอน/ใจ/เลี่ยงพิษ/สัมพันธ์) → ใส่ลิงก์ตรงไปยังสื่อย่อย

### 3. Register Form → Google Sheets Webhook
ตอนนี้ฟังก์ชัน `submit` ใน `RegisterModal` แค่ mock success — ถ้าจะให้ส่งข้อมูลเข้า Google Sheets จริง:

```js
const submit = async () => {
  try {
    await fetch('https://script.google.com/macros/s/YOUR_DEPLOY_ID/exec', {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, score, status, timestamp: new Date().toISOString() })
    });
    setSubmitted(true);
  } catch (e) {
    alert('ส่งไม่ผ่าน · ลองอีกครั้ง');
  }
};
```

วิธีตั้ง Apps Script Webhook:
1. เปิด Google Sheet ใหม่ → Extensions → Apps Script
2. วางโค้ด:
   ```js
   function doPost(e) {
     const sheet = SpreadsheetApp.getActiveSheet();
     const data = JSON.parse(e.postData.contents);
     sheet.appendRow([new Date(), data.name, data.phone, data.concern, data.score, data.status]);
     return ContentService.createTextOutput(JSON.stringify({ok:true})).setMimeType(ContentService.MimeType.JSON);
   }
   ```
3. Deploy → Web app → Anyone → Copy URL → แปะลงโค้ดข้างต้น

## 🎨 Design System (ไทยบ้าน)

| Token | ค่า |
|-------|------|
| Paper (cream) | `#f4ead7` |
| Brick (accent) | `#b3503a` |
| Turmeric | `#d49a3a` |
| Leaf | `#5a7a3e` |
| Ink | `#2a1f17` |
| Display font | Mitr (Google Fonts) |
| Body font | IBM Plex Sans Thai |
| Handwritten accent | Charmonman |

## 📦 ขนาด

ทุกไฟล์รวมกัน ~120 KB (uncompressed) — เบา โหลดเร็ว ไม่กิน bandwidth

## 📋 License & Credits

ออกแบบและพัฒนาเพื่อใช้ในงานเวชศาสตร์วิถีชีวิตของศูนย์อนามัยที่ 10 อุบลราชธานี · กรมอนามัย กระทรวงสาธารณสุข

---

**คำถาม / ปัญหาการ deploy?** → เปิด Issue ใน repo หรือทักไปที่ ศอ.10
