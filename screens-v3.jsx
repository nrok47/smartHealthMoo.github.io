// V3 — Gamification layer: Daily Check-in · Streak · เครื่องรางสุขภาพ · เควสแก้กรรม 7 วัน · Snark
// Persists to localStorage key 'health-moo-shrine'

// ── Snark library — คำทำนายจี้ใจดำ สไตล์ไทยบ้าน ────────────
// Indexed by pillar key + score-bracket (low / mid / high)
const SNARK = {
  food: {
    low:  [
      'ดวงกินตกขนาดนี้ ไม่ใช่ผีผลัก แต่เป็นมือคุณเองที่หยิบของทอดเข้าปากจ้า~',
      'ของหวานมันสนิทกับคุณ จนเอวเริ่มถามว่า "เรากันเองมั้ย?"',
      'เซเว่นรู้จักคุณดีกว่าหมอเลยมั้ย? ถึงเวลาเปลี่ยนเพื่อนสนิทแล้วนะ',
    ],
    mid:  ['กลางๆ กินดีบ้าง พังบ้าง คล้ายดวงเศรษฐี—ขึ้นๆ ลงๆ'],
    high: ['ดวงพุงดี ลำไส้แจ่ม เก็บฟอร์มนี้ไว้นานๆ'],
  },
  move: {
    low:  [
      'ขยับน้อยขนาดนี้ หมอนสบายกว่าคุณอีก',
      'นั่งจนเก้าอี้รู้จักก้นคุณดีกว่ารู้จักหน้า ระวังหลังจะหัก',
      'ก้าวเดินวันนี้น้อยกว่าเสียง notification ที่กดอ่าน',
    ],
    mid:  ['เริ่มดีแล้ว ขาดอีกนิดจะปังกว่านี้'],
    high: ['ฟิตจนเงาเริ่มหายใจไม่ทัน เก่งมาก'],
  },
  sleep: {
    low:  [
      'นอนน้อยขนาดนี้ ผีเห็นยังสงสาร—คืนนี้ปิดจอเร็วๆ นะ',
      'ตาคล้ำกว่าหมีแพนด้า ขนาดแพนด้ายังไม่หนักเท่านี้',
      'กาแฟไม่ใช่อาหารหลัก รู้รึยัง?',
    ],
    mid:  ['นอนพอกินบ้าง ขาดบ้าง ใจสู้แต่ตาไม่สู้'],
    high: ['หลับสนิทขนาดสมองเรียงไฟล์เป็นโฟลเดอร์'],
  },
  mind: {
    low:  [
      'ใจหนักขนาดนี้ ยกแบกเองคนเดียวไม่ได้นะคะ คุยกับใครสักคนเถอะ',
      'เครียดจนปุ่ม snooze เริ่มกลัวคุณ',
      'ลองหายใจช้าๆ บ้าง อย่าให้สมองวิ่งเร็วกว่าหัวใจ',
    ],
    mid:  ['ใจตึงๆ หย่อนๆ ปกติของคน ขอแค่ไม่ฝืน'],
    high: ['ใจนิ่งเหมือนน้ำในบาตร เก่งสายมูแน่นอน'],
  },
  toxin: {
    low:  [
      'เหล้าเป็นเพื่อนสนิทใช่มั้ย? เพื่อนแบบนี้เลิกได้นะ',
      'บุหรี่ไม่ใช่ขนมขบเคี้ยว ลองนับวันที่ห่างได้ดูบ้าง',
      'ดวงตับร้องไห้ ขอลาพักร้อนสัก 7 วัน',
    ],
    mid:  ['ลดลงทีละนิด คุ้มกว่าหวยใต้ดิน'],
    high: ['ปอดคุณส่งจดหมายมาขอบคุณ'],
  },
  bond: {
    low:  [
      'อยู่คนเดียวก็ดี แต่ดวงคนจะห่างกว่าดวงดารา ทักหาเพื่อนเก่าสักคนเถอะ',
      'แชทล่าสุดของคุณคือร้านอาหารส่ง... เริ่มน่าเป็นห่วง',
      'ครอบครัวยังจำหน้าคุณได้มั้ย? ลองโทรหาเค้าหน่อย',
    ],
    mid:  ['มีคนอยู่ข้างๆ บ้าง พอใช้เลย'],
    high: ['ดวงคนแน่น ใครเข้ามาก็รัก ออกไปก็คิดถึง'],
  },
};

function pickSnark(pillarKey, score) {
  const bucket = score < 40 ? 'low' : score < 70 ? 'mid' : 'high';
  const arr = (SNARK[pillarKey] && SNARK[pillarKey][bucket]) || [''];
  // Deterministic pick based on score (so same answer → same snark)
  return arr[score % arr.length];
}

// ── Amulet tiers — based on streak ──────────────────────────
const AMULETS = [
  { min: 0,  tier: 'none',     name: 'ยังไม่มีเครื่องราง',     color: '#8a7a66', glow: 'transparent',         icon: '◌', desc: 'เช็คอินวันแรกเพื่อรับเครื่องรางใบแรก' },
  { min: 1,  tier: 'common',   name: 'เครื่องรางใบเริ่ม',       color: '#5a4a3a', glow: 'rgba(212,154,58,0.2)', icon: '✿', desc: 'จุดเริ่มต้นของการดูแลตัวเอง' },
  { min: 3,  tier: 'uncommon', name: 'เครื่องรางใบกล้าหาญ',     color: '#5a7a3e', glow: 'rgba(90,122,62,0.35)', icon: '✤', desc: 'ติดต่อกัน 3 วัน · ดวงเริ่มหมุน' },
  { min: 7,  tier: 'rare',     name: 'เครื่องรางใบนอนเต็มอิ่ม', color: '#3a4f7a', glow: 'rgba(58,79,122,0.4)',  icon: '❋', desc: 'ติดต่อกัน 7 วัน · ดวงแจ่มขึ้น' },
  { min: 14, tier: 'epic',     name: 'เครื่องรางเลี่ยมทอง',     color: '#b3503a', glow: 'rgba(212,154,58,0.55)', icon: '✦', desc: 'ติดต่อกัน 14 วัน · ดวงร้อนแรง' },
  { min: 30, tier: 'legendary',name: 'เครื่องรางเทพอาจารย์หมู', color: '#d49a3a', glow: 'rgba(212,154,58,0.75)', icon: '✷', desc: 'ติดต่อกัน 30 วัน · ขั้นเทพ' },
];
function getAmulet(streak) {
  return [...AMULETS].reverse().find(a => streak >= a.min) || AMULETS[0];
}

// ── Daily check-in question library ─────────────────────────
const DAILY_QUESTIONS = [
  { id:'water',  q:'วันนี้ดื่มน้ำเปล่ามากกว่า 6 แก้วมั้ย?',         pillar:'food',  icon:'💧' },
  { id:'veg',    q:'มื้อใดมื้อหนึ่งวันนี้ มีผักครึ่งจานมั้ย?',         pillar:'food',  icon:'🥬' },
  { id:'sweet',  q:'วันนี้เลี่ยงน้ำหวานสำเร็จมั้ย?',                  pillar:'food',  icon:'🍡' },
  { id:'walk',   q:'วันนี้เดินรวมกัน 30 นาทีขึ้นไปมั้ย?',             pillar:'move',  icon:'🚶' },
  { id:'stretch',q:'วันนี้ลุกยืดตัวอย่างน้อย 3 ครั้งมั้ย?',           pillar:'move',  icon:'🧘' },
  { id:'sleep7', q:'เมื่อคืนนอนครบ 7 ชั่วโมงมั้ย?',                   pillar:'sleep', icon:'🌙' },
  { id:'screen', q:'เมื่อคืนปิดจอก่อนนอน 30 นาทีมั้ย?',                pillar:'sleep', icon:'📵' },
  { id:'breath', q:'วันนี้หายใจช้าๆ ลึกๆ อย่างน้อย 1 รอบมั้ย?',       pillar:'mind',  icon:'🌬' },
  { id:'thanks', q:'วันนี้คิดถึงสิ่งดีๆ ที่เกิดขึ้นมั้ย?',                pillar:'mind',  icon:'🪷' },
  { id:'chat',   q:'วันนี้คุยกับคนรู้ใจอย่างน้อย 1 คนมั้ย?',           pillar:'bond',  icon:'💌' },
];

function pickTodayQuestion() {
  // Deterministic by date — same question all day
  const today = new Date().toISOString().slice(0,10);
  const seed = [...today].reduce((s,c) => s + c.charCodeAt(0), 0);
  return DAILY_QUESTIONS[seed % DAILY_QUESTIONS.length];
}

function todayKey() { return new Date().toISOString().slice(0,10); }

// ── Shrine state helpers (localStorage 'health-moo-shrine') ─
const SHRINE_KEY = 'health-moo-shrine';
function loadShrine() {
  try {
    const raw = JSON.parse(localStorage.getItem(SHRINE_KEY) || 'null');
    return raw || { streak: 0, lastCheckin: null, history: {}, quest: null };
  } catch {
    return { streak: 0, lastCheckin: null, history: {}, quest: null };
  }
}
function saveShrine(s) {
  try { localStorage.setItem(SHRINE_KEY, JSON.stringify(s)); } catch {}
}

function applyCheckin(shrine, answer) {
  const today = todayKey();
  if (shrine.lastCheckin === today) return shrine; // already done
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0,10);
  const newStreak = shrine.lastCheckin === yesterday ? shrine.streak + 1 : 1;
  return {
    ...shrine,
    streak: newStreak,
    lastCheckin: today,
    history: { ...shrine.history, [today]: answer },
  };
}

// ── ScreenAltar — daily home with shrine + amulet + check-in ─
function ScreenAltar({ state, setState, nav, theme, openModal }) {
  const [shrine, setShrine] = React.useState(() => loadShrine());
  const today = todayKey();
  const checkedToday = shrine.lastCheckin === today;
  const amulet = getAmulet(shrine.streak);
  const nextAmulet = AMULETS.find(a => a.min > shrine.streak);
  const todayQ = pickTodayQuestion();

  const doCheckin = (answer) => {
    const updated = applyCheckin(shrine, answer);
    setShrine(updated);
    saveShrine(updated);
  };

  // Last 14 days dot calendar
  const calendar = React.useMemo(() => {
    const out = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000);
      const k = d.toISOString().slice(0,10);
      out.push({
        date: k,
        day: d.getDate(),
        isToday: k === today,
        checked: !!shrine.history[k],
        answer: shrine.history[k],
      });
    }
    return out;
  }, [shrine, today]);

  // Mood face based on streak/checkin
  const mooMood = !shrine.lastCheckin ? 'happy'
    : (shrine.lastCheckin === today ? 'happy'
    : (new Date(Date.now() - 86400000).toISOString().slice(0,10) === shrine.lastCheckin ? 'sleepy' : 'sad'));

  return (
    <div className="paper-bg screen-scroll" style={{ height:'100%', overflowY:'auto', padding:'56px 22px 80px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <button type="button" onClick={() => nav('welcome')} style={{
          background: 'transparent', border: '1px solid rgba(42,31,23,0.25)',
          borderRadius: 999, padding: '6px 12px', cursor: 'pointer',
          fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: '#5a4a3a',
        }}>← หน้าหลัก</button>
        <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, color: '#8a7a66', letterSpacing: '0.15em' }}>
          {new Date().toLocaleDateString('th-TH', { day:'numeric', month:'short' })}
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: 6 }}>
        <div style={{ fontFamily: 'Charmonman, cursive', fontSize: 22, color: '#b3503a', fontWeight: 700, lineHeight: 1 }}>
          ศาลเจ้าหมู~
        </div>
        <h2 style={{
          fontFamily: 'Mitr, sans-serif', fontWeight: 600, fontSize: 22, color: '#2a1f17',
          margin: '4px 0 4px',
        }}>
          ฝากดวงไว้กับอาจารย์หมู
        </h2>
      </div>

      {/* ── Shrine altar card ── */}
      <div style={{
        marginTop: 14, position: 'relative',
        background: 'linear-gradient(180deg, #2a1f17 0%, #3a2a1f 100%)',
        borderRadius: 22, padding: '24px 18px 18px',
        overflow: 'hidden',
        boxShadow: '0 12px 28px -8px rgba(42,31,23,0.5)',
        textAlign: 'center',
      }}>
        {/* radial glow behind amulet */}
        <div style={{
          position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)',
          width: 240, height: 240, borderRadius: '50%',
          background: `radial-gradient(circle, ${amulet.glow} 0%, transparent 65%)`,
          pointerEvents: 'none',
          animation: shrine.streak >= 7 ? 'pulse-soft 3s ease-in-out infinite' : 'none',
        }}/>

        {/* shrine roof lines */}
        <svg viewBox="0 0 200 30" width="100%" height="20" style={{ position: 'absolute', top: 6, left: 0, opacity: 0.4 }}>
          <path d="M0 20 L20 5 L40 20 L60 5 L80 20 L100 5 L120 20 L140 5 L160 20 L180 5 L200 20" fill="none" stroke="#d49a3a" strokeWidth="1.5" strokeDasharray="2 3"/>
        </svg>

        {/* mascot */}
        <div style={{ position: 'relative', zIndex: 1, display: 'inline-block', marginBottom: 4 }}>
          <MooMascot size={92} mood={mooMood} variant={theme.mascot}/>
        </div>

        {/* amulet badge */}
        <div style={{ position: 'relative', zIndex: 1, marginTop: 4 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: amulet.color,
            color: '#f4ead7',
            padding: '6px 14px', borderRadius: 999,
            fontFamily: 'Mitr, sans-serif', fontSize: 13, fontWeight: 500,
            boxShadow: '0 2px 0 rgba(0,0,0,0.3), 0 0 24px ' + amulet.glow,
          }}>
            <span style={{ fontSize: 16 }}>{amulet.icon}</span>
            {amulet.name}
          </div>
        </div>

        {/* streak */}
        <div style={{ position: 'relative', zIndex: 1, marginTop: 14 }}>
          <div style={{
            fontFamily: 'IBM Plex Mono, monospace', fontSize: 9, letterSpacing: '0.25em',
            color: 'rgba(244,234,215,0.55)', fontWeight: 600,
          }}>
            ◇ ติดต่อกัน ◇
          </div>
          <div style={{
            fontFamily: 'Mitr, sans-serif', fontWeight: 700, fontSize: 56,
            color: '#d49a3a', lineHeight: 1,
            textShadow: '0 0 24px rgba(212,154,58,0.5)',
          }}>
            {shrine.streak}<span style={{ fontSize: 18, color: '#f4ead7', opacity: 0.6, fontWeight: 400 }}> วัน</span>
          </div>
          {nextAmulet && (
            <div style={{
              fontFamily: 'IBM Plex Sans Thai, sans-serif', fontSize: 11,
              color: 'rgba(244,234,215,0.65)', marginTop: 4,
            }}>
              อีก <b style={{ color: '#d49a3a' }}>{nextAmulet.min - shrine.streak}</b> วัน → {nextAmulet.name}
            </div>
          )}
        </div>

        {/* Progress to next */}
        {nextAmulet && (
          <div style={{
            position: 'relative', zIndex: 1, marginTop: 12,
            height: 5, background: 'rgba(244,234,215,0.12)',
            borderRadius: 999, overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${Math.min(100, (shrine.streak / nextAmulet.min) * 100)}%`,
              background: 'linear-gradient(90deg, #d49a3a, #b3503a)',
              borderRadius: 999,
              transition: 'width 0.6s',
            }}/>
          </div>
        )}

        {/* 14-day calendar */}
        <div style={{
          position: 'relative', zIndex: 1, marginTop: 16,
          padding: '12px 4px 4px',
          borderTop: '1px dashed rgba(212,154,58,0.3)',
        }}>
          <div style={{
            fontFamily: 'IBM Plex Mono, monospace', fontSize: 9,
            color: 'rgba(244,234,215,0.5)', letterSpacing: '0.2em',
            textAlign: 'left', marginBottom: 6,
          }}>14 วันล่าสุด</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(14, 1fr)', gap: 3 }}>
            {calendar.map((d) => (
              <div key={d.date} title={d.date} style={{
                aspectRatio: '1', borderRadius: 4,
                background: d.checked ? '#d49a3a' : 'rgba(244,234,215,0.1)',
                border: d.isToday ? '1.5px solid #f4ead7' : '1px solid transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'IBM Plex Mono, monospace', fontSize: 9,
                color: d.checked ? '#2a1f17' : 'rgba(244,234,215,0.35)',
                fontWeight: d.isToday ? 700 : 400,
              }}>{d.day}</div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Today's check-in card ── */}
      <div style={{
        marginTop: 14,
        background: checkedToday ? 'rgba(90,122,62,0.08)' : '#fff8ec',
        border: '1.5px ' + (checkedToday ? 'solid #5a7a3e' : 'dashed #b3503a'),
        borderRadius: 16, padding: '14px 14px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <div style={{
            flexShrink: 0,
            width: 48, height: 48, borderRadius: 12,
            background: checkedToday ? '#5a7a3e' : '#b3503a',
            color: '#fff8ec',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22,
          }}>
            {checkedToday ? '✓' : todayQ.icon}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontFamily: 'IBM Plex Mono, monospace', fontSize: 9,
              color: checkedToday ? '#3f5a28' : '#b3503a',
              letterSpacing: '0.2em', fontWeight: 600,
            }}>
              {checkedToday ? '◇ เช็คอินวันนี้แล้ว ◇' : '◇ คำถามวันนี้ ◇'}
            </div>
            <div style={{
              fontFamily: 'Mitr, sans-serif', fontSize: 16,
              color: '#2a1f17', marginTop: 2, fontWeight: 500, lineHeight: 1.3,
            }}>
              {todayQ.q}
            </div>
          </div>
        </div>

        {!checkedToday ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 12 }}>
            <button type="button" onClick={() => doCheckin('no')} style={{
              background: '#fff8ec', border: '1.5px solid rgba(42,31,23,0.25)',
              borderRadius: 12, padding: '10px',
              fontFamily: 'Mitr, sans-serif', fontSize: 14, color: '#5a4a3a', cursor: 'pointer',
            }}>
              ✗ ยังไม่ได้
            </button>
            <button type="button" onClick={() => doCheckin('yes')} style={{
              background: '#5a7a3e', border: 'none', color: '#f4ead7',
              borderRadius: 12, padding: '10px',
              fontFamily: 'Mitr, sans-serif', fontSize: 14, fontWeight: 500, cursor: 'pointer',
              boxShadow: '0 3px 0 #3f5a28',
            }}>
              ✓ ทำแล้วจ้า
            </button>
          </div>
        ) : (
          <div style={{
            marginTop: 10, padding: '8px 10px',
            background: '#fff8ec', borderRadius: 8,
            fontFamily: 'IBM Plex Sans Thai, sans-serif', fontSize: 12,
            color: '#3f5a28', textAlign: 'center',
          }}>
            กลับมาเช็คอินใหม่พรุ่งนี้ · ดวงต่อเนื่อง 🌟
          </div>
        )}
      </div>

      {/* ── Quest CTA ── */}
      <button type="button" onClick={() => openModal('quest')} style={{
        marginTop: 14, width: '100%',
        background: 'linear-gradient(135deg, #d49a3a, #b3503a)',
        color: '#fff8ec', border: 'none', borderRadius: 16,
        padding: '14px 16px',
        fontFamily: 'Mitr, sans-serif', fontSize: 15, fontWeight: 500,
        cursor: 'pointer', boxShadow: '0 4px 0 #8a3a28',
        display: 'flex', alignItems: 'center', gap: 12,
        textAlign: 'left',
      }}>
        <div style={{ fontSize: 22 }}>⚔</div>
        <div style={{ flex: 1 }}>
          <div>เควสแก้กรรม 7 วัน</div>
          <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9, opacity: 0.85, marginTop: 1, letterSpacing: '0.15em', fontWeight: 400 }}>
            ภารกิจรายสัปดาห์ · ปลดล็อกเนื้อเรื่อง
          </div>
        </div>
        <div style={{ opacity: 0.7 }}>→</div>
      </button>

      {/* ── Re-take seance ── */}
      <button type="button" onClick={() => nav('cards')} style={{
        marginTop: 10, width: '100%',
        background: 'transparent', border: '1.5px solid rgba(42,31,23,0.3)',
        borderRadius: 16, padding: '12px',
        fontFamily: 'Mitr, sans-serif', fontSize: 14, color: '#5a4a3a',
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center',
      }}>
        <span>🎴</span> เสี่ยงเซียมซีใหม่
      </button>
    </div>
  );
}

// ── QuestModal — เควสแก้กรรม 7 วัน ──────────────────────────
const QUEST_LIBRARY = {
  food:  { title: 'ภารกิจกินดี 7 วัน',     emoji: '🍚', tasks: ['ผัก 1 ฝ่ามือทุกมื้อ',  'น้ำเปล่า 8 แก้ว/วัน', 'เลี่ยงน้ำหวาน 1 มื้อ', 'ข้าวกล้องแทนข้าวขาว', 'มื้อทอด ≤ 1 ครั้ง', 'ผลไม้แทนของหวาน', 'จดมื้ออาหารวันนี้'] },
  move:  { title: 'ภารกิจขยับ 7 วัน',      emoji: '🚶', tasks: ['เดิน 30 นาที',         'ขึ้นบันไดแทนลิฟต์',   'ยืดตัวทุกชั่วโมง',     'ออกกำลังเบาๆ 15 นาที', 'เดินคุยโทรศัพท์',     'ฝึกหายใจหลังตื่น',   'นับก้าวเดินวันนี้'] },
  sleep: { title: 'ภารกิจนอนเต็ม 7 คืน',   emoji: '🌙', tasks: ['ปิดจอ 30 นาทีก่อนนอน', 'เข้านอนก่อน 23:00',   'งดกาแฟหลังบ่ายสาม',   'ห้องเย็น มืด เงียบ',   'ไม่งีบเกิน 30 นาที',   'อ่านหนังสือก่อนนอน',  'จดเวลานอน-ตื่นวันนี้'] },
  mind:  { title: 'ภารกิจพักใจ 7 วัน',     emoji: '🪷', tasks: ['หายใจ 4-7-8 สามรอบ',  'เขียน 3 สิ่งดีๆ ก่อนนอน', 'พักจอ 1 ชั่วโมง',  'เดินเงียบๆ ในธรรมชาติ', 'พักจากข่าวสาร',       'ฟังเพลงโปรด',         'ทำสมาธิ 5 นาที'] },
  toxin: { title: 'ภารกิจสะอาดปอด 7 วัน',   emoji: '🚫', tasks: ['งดบุหรี่ 1 วัน',        'งดเหล้า 1 วัน',         'เลี่ยงควันรถ',          'ดื่มน้ำชะล้าง 10 แก้ว',  'รดน้ำต้นไม้ในบ้าน',    'เปิดหน้าต่างให้อากาศ', 'จดสิ่งที่งดได้วันนี้'] },
  bond:  { title: 'ภารกิจสร้างใจ 7 วัน',    emoji: '💌', tasks: ['ทักหาเพื่อนเก่า 1 คน', 'โทรหาครอบครัว',         'ขอบคุณใครสักคน',       'กินข้าวกับคนใกล้ตัว',   'ทำอะไรเล็กๆ ให้คนอื่น', 'ฟังคนใกล้ตัว 10 นาที', 'จดคนที่ขอบคุณวันนี้'] },
};

function QuestModal({ onClose, userAnswers = {} }) {
  const [shrine, setShrine] = React.useState(() => loadShrine());

  // Determine lowest pillar from quiz, or pick from user's last selection
  const lowestKey = React.useMemo(() => {
    const answered = window.PILLARS.filter(p => userAnswers[p.key]);
    if (!answered.length) return 'food';
    return answered.sort((a, b) => userAnswers[a.key].s - userAnswers[b.key].s)[0].key;
  }, [userAnswers]);

  const active = shrine.quest;
  const isOldQuest = active && (Date.now() - active.startedAt > 7 * 86400000);
  const showActive = active && !isOldQuest;
  const [chosenPillar, setChosenPillar] = React.useState(showActive ? active.pillar : lowestKey);

  const lib = QUEST_LIBRARY[chosenPillar];

  const startQuest = () => {
    const newQuest = {
      pillar: chosenPillar,
      startedAt: Date.now(),
      checks: [false, false, false, false, false, false, false],
    };
    const updated = { ...shrine, quest: newQuest };
    setShrine(updated);
    saveShrine(updated);
  };

  const toggleDay = (idx) => {
    if (!showActive) return;
    const newChecks = [...active.checks];
    newChecks[idx] = !newChecks[idx];
    const updated = { ...shrine, quest: { ...active, checks: newChecks } };
    setShrine(updated);
    saveShrine(updated);
  };

  const completed = showActive ? active.checks.filter(Boolean).length : 0;

  return (
    <ModalShell onClose={onClose} accent="#d49a3a">
      <div style={{ textAlign: 'center', marginBottom: 12 }}>
        <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9, color: '#b3503a', letterSpacing: '0.22em', fontWeight: 600 }}>
          ◇ เควสแก้กรรม 7 วัน ◇
        </div>
        <h2 style={{ fontFamily: 'Mitr, sans-serif', fontSize: 22, color: '#2a1f17', margin: '4px 0 2px', fontWeight: 600 }}>
          {showActive ? lib.title : 'เลือกภารกิจ'}
        </h2>
      </div>

      {!showActive ? (
        // ── Picker mode ──
        <>
          <div style={{
            background: '#fff8ec', border: '1.5px dashed rgba(179,80,58,0.4)',
            borderRadius: 12, padding: '12px',
            display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12,
          }}>
            <MooMascot size={42} mood="happy" wobble/>
            <div style={{ flex: 1, fontFamily: 'IBM Plex Sans Thai, sans-serif', fontSize: 12.5, color: '#2a1f17', lineHeight: 1.5 }}>
              <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9, color: '#b3503a', letterSpacing: '0.18em', fontWeight: 600 }}>
                หมูแนะนำ →
              </span>{' '}
              {Object.keys(userAnswers).length
                ? <>เริ่มแก้จากจุดที่ดวงตกสุด "<b style={{ color: '#b3503a' }}>{window.PILLARS.find(p=>p.key===lowestKey)?.name}</b>"</>
                : 'ลองเสี่ยงเซียมซีก่อน หมูจะแนะนำได้ตรง ๆ'}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
            {window.PILLARS.map(p => {
              const sel = chosenPillar === p.key;
              return (
                <button type="button" key={p.key} onClick={() => setChosenPillar(p.key)}
                  style={{
                    background: sel ? p.color : '#fff8ec',
                    color: sel ? '#fff8ec' : '#2a1f17',
                    border: '1.5px solid ' + (sel ? p.color : 'rgba(42,31,23,0.2)'),
                    borderRadius: 12, padding: '10px',
                    fontFamily: 'IBM Plex Sans Thai, sans-serif', fontSize: 12.5, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 8,
                    textAlign: 'left',
                  }}>
                  <span style={{ fontSize: 18 }}>{p.icon}</span>
                  <span style={{ flex: 1 }}>{p.name}</span>
                </button>
              );
            })}
          </div>

          <div style={{
            background: 'rgba(212,154,58,0.08)', borderRadius: 12, padding: '10px 12px',
            border: '1px solid rgba(212,154,58,0.3)',
          }}>
            <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9, color: '#8a3a28', letterSpacing: '0.18em', fontWeight: 600, marginBottom: 6 }}>
              ◇ {lib.title} ◇
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {lib.tasks.map((t, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center', fontFamily: 'IBM Plex Sans Thai, sans-serif', fontSize: 12, color: '#5a4a3a' }}>
                  <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, color: '#b3503a', minWidth: 30 }}>วัน {i+1}</span>
                  <span style={{ flex: 1 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>

          <button type="button" onClick={startQuest} style={{
            marginTop: 14, width: '100%',
            background: '#b3503a', color: '#fff8ec',
            border: 'none', borderRadius: 14, padding: '12px',
            fontFamily: 'Mitr, sans-serif', fontSize: 15, fontWeight: 500, cursor: 'pointer',
            boxShadow: '0 4px 0 #8a3a28',
          }}>
            ⚔ เริ่มเควสนี้
          </button>
        </>
      ) : (
        // ── Active quest ──
        <>
          {/* Progress */}
          <div style={{
            background: 'linear-gradient(135deg, #2a1f17, #3a2a1f)',
            borderRadius: 14, padding: '12px 14px', color: '#f4ead7',
            marginBottom: 12,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9, letterSpacing: '0.18em', opacity: 0.7 }}>
                  ความก้าวหน้า
                </div>
                <div style={{ fontFamily: 'Mitr, sans-serif', fontSize: 24, fontWeight: 600 }}>
                  {completed} <span style={{ opacity: 0.5, fontSize: 14, fontWeight: 400 }}>/ 7 วัน</span>
                </div>
              </div>
              {completed === 7 && (
                <div style={{
                  background: '#d49a3a', color: '#2a1f17',
                  padding: '6px 14px', borderRadius: 999,
                  fontFamily: 'Mitr, sans-serif', fontSize: 12, fontWeight: 600,
                }}>✦ ผ่านแล้ว!</div>
              )}
            </div>
            <div style={{
              marginTop: 10, height: 8, background: 'rgba(244,234,215,0.12)',
              borderRadius: 999, overflow: 'hidden',
            }}>
              <div style={{
                height: '100%', width: `${(completed/7)*100}%`,
                background: 'linear-gradient(90deg, #d49a3a, #b3503a)',
                borderRadius: 999, transition: 'width 0.5s',
              }}/>
            </div>
          </div>

          {/* Days */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {lib.tasks.map((t, i) => {
              const done = active.checks[i];
              return (
                <button type="button" key={i} onClick={() => toggleDay(i)} style={{
                  background: done ? 'rgba(90,122,62,0.12)' : '#fff8ec',
                  border: '1.5px solid ' + (done ? '#5a7a3e' : 'rgba(42,31,23,0.18)'),
                  borderRadius: 12, padding: '10px 12px',
                  display: 'flex', alignItems: 'center', gap: 10,
                  cursor: 'pointer', textAlign: 'left',
                }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: 6,
                    background: done ? '#5a7a3e' : 'transparent',
                    border: '1.5px solid ' + (done ? '#5a7a3e' : 'rgba(42,31,23,0.4)'),
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#f4ead7', fontSize: 13, flexShrink: 0,
                  }}>{done && '✓'}</div>
                  <div style={{
                    fontFamily: 'IBM Plex Mono, monospace', fontSize: 9, color: '#b3503a',
                    letterSpacing: '0.15em', minWidth: 38, fontWeight: 600,
                  }}>วัน {i+1}</div>
                  <div style={{
                    flex: 1, fontFamily: 'IBM Plex Sans Thai, sans-serif', fontSize: 13,
                    color: '#2a1f17', textDecoration: done ? 'line-through' : 'none',
                    opacity: done ? 0.6 : 1,
                  }}>{t}</div>
                </button>
              );
            })}
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
            <button type="button" onClick={() => {
              const updated = { ...shrine, quest: null };
              setShrine(updated);
              saveShrine(updated);
            }} style={{
              flex: 1, background: 'transparent', border: '1px solid rgba(42,31,23,0.3)',
              borderRadius: 12, padding: '10px',
              fontFamily: 'IBM Plex Sans Thai, sans-serif', fontSize: 13, color: '#5a4a3a',
              cursor: 'pointer',
            }}>↻ เปลี่ยนเควส</button>
            <button type="button" onClick={onClose} style={{
              flex: 1, background: '#b3503a', color: '#fff8ec',
              border: 'none', borderRadius: 12, padding: '10px',
              fontFamily: 'Mitr, sans-serif', fontSize: 13, fontWeight: 500,
              cursor: 'pointer',
            }}>เรียบร้อย</button>
          </div>
        </>
      )}
    </ModalShell>
  );
}

Object.assign(window, {
  ScreenAltar, QuestModal,
  pickSnark, SNARK, AMULETS, getAmulet, loadShrine, saveShrine, applyCheckin,
  DAILY_QUESTIONS, pickTodayQuestion, QUEST_LIBRARY,
});
