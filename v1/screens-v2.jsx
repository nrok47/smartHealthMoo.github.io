// V2 screens — เซียมซีสุขภาพ ๖ ใบ + ใบเซียมซีแก้เคล็ด + หอไตรความรู้ + LM register
// Builds on top of components.jsx

// ── 6 LM Pillars ────────────────────────────────────────────
const PILLARS = [
  { key:'food',   thai:'๑', name:'กิน',      icon:'🍚', color:'#b3503a',
    q:'มื้อหลักของคุณเป็นยังไง?',
    options:[
      { v:'whole',  s:90, t:'ข้าว+ผัก+โปรตีน ครบ',         m:'ลายมือบอกว่า ดวงพุงดี ลำไส้แจ่ม' },
      { v:'mixed',  s:60, t:'ครึ่งๆ บางวันครบ บางวันไม่',  m:'ดวงกลางๆ ปรับเพิ่มผักสักฝ่ามือ' },
      { v:'rush',   s:35, t:'รีบๆ ของทอด เซเว่นบ่อย',       m:'ลางร้าย! ของหวานทอดเริ่มถามหา' },
      { v:'skip',   s:25, t:'งดมื้อ กินไม่เป็นเวลา',         m:'เซียมซีบอก พลังตก ขอเริ่มมื้อเช้า' },
    ]
  },
  { key:'move',   thai:'๒', name:'ขยับ',    icon:'🚶', color:'#d49a3a',
    q:'สัปดาห์นี้ขยับตัวบ่อยแค่ไหน?',
    options:[
      { v:'reg',    s:85, t:'ออกกำลัง 3+ วัน/สัปดาห์',  m:'ดวงปึ๋งปั๋ง รักษาฟอร์มไว้นานๆ' },
      { v:'walk',   s:65, t:'เดินบ้างประปราย',           m:'เริ่มดี เพิ่มขึ้นอีกนิดจะได้พรเต็มๆ' },
      { v:'sit',    s:35, t:'นั่งแทบทั้งวัน',              m:'ลางร้าย! ขา-หลังจะเริ่มฟ้อง' },
      { v:'none',   s:20, t:'แทบไม่ได้ขยับ',              m:'เซียมซีบอก ลองยืดสัก 1 นาทีต่อชั่วโมง' },
    ]
  },
  { key:'sleep',  thai:'๓', name:'นอน',     icon:'🌙', color:'#3a4f7a',
    q:'นอนคืนหนึ่งกี่ชั่วโมง?',
    options:[
      { v:'7-9',    s:90, t:'7-9 ชม. ตื่นสดชื่น',         m:'ดวงดี สมองคมเตรียมจับเงิน' },
      { v:'6-7',    s:65, t:'6-7 ชม. พอไหว',              m:'พอใช้ ปิดจอเร็วๆ จะดีขึ้น' },
      { v:'<6',     s:35, t:'น้อยกว่า 6 ชม.',              m:'ลางร้าย! ภูมิตก หงุดหงิดง่าย' },
      { v:'broken', s:25, t:'หลับๆ ตื่นๆ ทั้งคืน',         m:'เซียมซีบอก ลดกาแฟหลังบ่าย' },
    ]
  },
  { key:'mind',   thai:'๔', name:'ใจ',      icon:'🪷', color:'#5a7a3e',
    q:'ช่วงนี้ใจหนักแค่ไหน?',
    options:[
      { v:'calm',   s:85, t:'นิ่ง สงบ จัดการได้',          m:'ดวงสายมูแจ่ม ใจเย็นเงินมา' },
      { v:'ok',     s:60, t:'ตึงๆ หย่อนๆ',                m:'พอไหว หายใจช้าๆ บ้าง' },
      { v:'heavy',  s:30, t:'หนักมาก ตึงเครียด',          m:'ลางร้าย! ขอวันหยุดใจสักครึ่งวัน' },
      { v:'low',    s:25, t:'เศร้า หมดแรงจะลุก',          m:'เซียมซีบอก ทักหาคน 1 คน' },
    ]
  },
  { key:'toxin',  thai:'๕', name:'เลี่ยงพิษ', icon:'🚫', color:'#8a3a28',
    q:'เหล้า/บุหรี่/พิษบุหรี่ไฟฟ้า?',
    options:[
      { v:'none',   s:95, t:'ไม่แตะเลย',                 m:'ดวงสะอาด เทพกินเงินรอ' },
      { v:'rare',   s:70, t:'นานๆ ที สังคม',              m:'พอใช้ ขอให้ห่างได้ขึ้นเรื่อยๆ' },
      { v:'weekly', s:40, t:'ทุกสัปดาห์',                  m:'ลางร้าย! เริ่มทบทวนได้แล้ว' },
      { v:'daily',  s:20, t:'ทุกวัน',                      m:'เซียมซีบอก ลดทีละก้าวเล็กๆ' },
    ]
  },
  { key:'bond',   thai:'๖', name:'สัมพันธ์', icon:'💌', color:'#c98a8a',
    q:'มีคนคุยเรื่องในใจได้กี่คน?',
    options:[
      { v:'many',   s:90, t:'มีหลายคน เปิดใจได้',          m:'ดวงคนรอบตัวดี สุขใจขั้นสุด' },
      { v:'few',    s:65, t:'1-2 คน',                      m:'พอนะ ลองทักหาเก่าๆ บ้าง' },
      { v:'one',    s:40, t:'แทบไม่มี',                    m:'ลางร้าย! เริ่มชวนเพื่อนเก่าสักคน' },
      { v:'alone',  s:25, t:'อยู่คนเดียวเงียบมาก',          m:'เซียมซีบอก เปิดใจอีกครั้ง คุ้มแน่' },
    ]
  },
];

// ── ScreenCards — 6 cards on one screen, tap to flip & answer ─
function ScreenCards({ state, setState, nav, theme }) {
  const answers = state.pillars || {};
  const allAnswered = PILLARS.every(p => answers[p.key]);
  const [activePillar, setActivePillar] = React.useState(null);

  const pick = (pillarKey, opt) => {
    setState({ ...state, pillars: { ...answers, [pillarKey]: opt } });
    setActivePillar(null);
  };

  return (
    <div className="paper-bg screen-scroll" style={{ height:'100%', overflowY:'auto', padding:'56px 22px 50px', position:'relative' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding:'8px 0 6px' }}>
        <button onClick={() => nav('welcome')} style={{
          background: 'transparent', border: '1px solid rgba(42,31,23,0.25)',
          borderRadius: 999, padding: '6px 12px', cursor: 'pointer',
          fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: '#5a4a3a',
        }}>← ย้อน</button>
        <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: '#8a7a66' }}>
          เปิดแล้ว {Object.keys(answers).length}/6
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: 8 }}>
        <div style={{
          fontFamily: 'Charmonman, cursive', fontSize: 22, color: '#b3503a', fontWeight: 700, lineHeight: 1,
        }}>เสี่ยงเซียมซี~</div>
        <h2 style={{
          fontFamily: 'Mitr, sans-serif', fontWeight: 600, fontSize: 26, color: '#2a1f17',
          margin: '4px 0 4px', lineHeight: 1.2,
        }}>เซียมซีสุขภาพ ๖ ใบ</h2>
        <p style={{ fontFamily: 'IBM Plex Sans Thai, sans-serif', fontSize: 13, color: '#8a7a66', margin: 0 }}>
          แตะใบไหนก่อนก็ได้ ตอบสั้นๆ พอเปิดครบ ๖ ใบ ดวงเปิดเลย
        </p>
      </div>

      <div style={{ marginTop: 18 }}>
        <LaiThaiBorder width={300} color="#b3503a"/>
      </div>

      {/* 2x3 grid of cards */}
      <div style={{
        marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12,
      }}>
        {PILLARS.map((p, i) => {
          const a = answers[p.key];
          const flipped = !!a;
          return (
            <button key={p.key} onClick={() => setActivePillar(p.key)}
              style={{
                background: 'transparent', border: 'none', padding: 0,
                cursor: 'pointer', aspectRatio: '3/4', position: 'relative',
                perspective: '900px',
              }}>
              <div style={{
                width: '100%', height: '100%', position: 'relative',
                transformStyle: 'preserve-3d',
                transform: flipped ? 'rotateY(180deg)' : 'rotateY(0)',
                transition: 'transform 0.6s cubic-bezier(.4,1.6,.5,1)',
              }}>
                {/* front */}
                <div style={{
                  position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
                  background: 'linear-gradient(160deg, #fff8ec, #f4ead7)',
                  borderRadius: 14, border: '1.5px solid ' + p.color,
                  padding: '12px 10px', display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'space-between',
                  boxShadow: '0 4px 0 ' + p.color + '88, 0 1px 0 rgba(42,31,23,0.06)',
                }}>
                  <div style={{
                    fontFamily: 'Mitr, sans-serif', fontSize: 28, color: p.color, fontWeight: 600, lineHeight: 1,
                  }}>{p.thai}</div>
                  <div style={{
                    fontSize: 38, lineHeight: 1,
                  }}>{p.icon}</div>
                  <div style={{
                    fontFamily: 'Mitr, sans-serif', fontSize: 15, color: '#2a1f17', fontWeight: 500,
                  }}>{p.name}</div>
                  <div style={{
                    fontFamily: 'IBM Plex Mono, monospace', fontSize: 8, color: p.color, letterSpacing: '0.18em',
                  }}>แตะเพื่อเปิด</div>
                </div>
                {/* back — answered state */}
                <div style={{
                  position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  background: p.color, borderRadius: 14,
                  padding: '12px 10px', display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'space-between',
                  color: '#fff8ec', boxShadow: '0 4px 0 rgba(42,31,23,0.3)',
                }}>
                  <div style={{
                    fontFamily: 'IBM Plex Mono, monospace', fontSize: 9, letterSpacing: '0.18em',
                    opacity: 0.8, fontWeight: 600,
                  }}>{p.name.toUpperCase()}</div>
                  <div style={{ fontSize: 30, opacity: 0.85 }}>{p.icon}</div>
                  <div style={{
                    fontFamily: 'Mitr, sans-serif', fontSize: 32, fontWeight: 600, lineHeight: 1,
                  }}>{a ? a.s : 0}</div>
                  <div style={{
                    fontFamily: 'IBM Plex Mono, monospace', fontSize: 8, opacity: 0.7, letterSpacing: '0.15em',
                  }}>คะแนน</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: 22, opacity: allAnswered ? 1 : 0.55, transition: 'opacity 0.3s' }}>
        <BigButton variant="brick" disabled={!allAnswered} onClick={() => nav('result')} icon="✦">
          เปิดใบเซียมซี
        </BigButton>
        <div style={{
          textAlign: 'center', marginTop: 10,
          fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, color: '#8a7a66', letterSpacing: '0.1em',
        }}>
          {allAnswered ? '◇ พร้อมแล้ว — แตะเปิดดวง ◇' : '◇ เปิดใบที่เหลือก่อนนะ ◇'}
        </div>
      </div>

      {/* Modal: pillar question */}
      {activePillar && (
        <PillarModal
          pillar={PILLARS.find(p => p.key === activePillar)}
          onPick={(opt) => pick(activePillar, opt)}
          onClose={() => setActivePillar(null)}
          existing={answers[activePillar]}
        />
      )}
    </div>
  );
}

// Question modal inside the phone for picking pillar option
function PillarModal({ pillar, onPick, onClose, existing }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 80,
      background: 'rgba(20,15,10,0.55)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 18,
      animation: 'float-up 0.25s ease-out',
    }} onClick={onClose}>
      <div onClick={(e)=>e.stopPropagation()} style={{
        background: '#fff8ec', borderRadius: 22, width: '100%', maxWidth: 340,
        padding: '18px 16px 16px', border: '2px solid ' + pillar.color,
        boxShadow: '0 14px 30px rgba(42,31,23,0.4)',
        position: 'relative',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12, background: pillar.color,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, color: '#fff8ec', flexShrink: 0,
          }}>{pillar.icon}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9, color: pillar.color, letterSpacing: '0.2em', fontWeight: 600 }}>
              ใบที่ {pillar.thai} · {pillar.name.toUpperCase()}
            </div>
            <div style={{ fontFamily: 'Mitr, sans-serif', fontSize: 16, color: '#2a1f17', fontWeight: 500, marginTop: 2, lineHeight: 1.2 }}>
              {pillar.q}
            </div>
          </div>
          <button onClick={onClose} style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            color: '#8a7a66', fontSize: 20, lineHeight: 1, padding: 4,
          }}>✕</button>
        </div>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {pillar.options.map((o) => {
            const sel = existing && existing.v === o.v;
            return (
              <button key={o.v} onClick={() => onPick(o)}
                style={{
                  background: sel ? pillar.color : '#f4ead7',
                  color: sel ? '#fff8ec' : '#2a1f17',
                  border: '1.5px solid ' + (sel ? pillar.color : 'rgba(42,31,23,0.2)'),
                  borderRadius: 12, padding: '10px 12px',
                  fontFamily: 'IBM Plex Sans Thai, sans-serif', fontSize: 14,
                  cursor: 'pointer', textAlign: 'left',
                  display: 'flex', alignItems: 'center', gap: 10,
                  transition: 'all 0.15s',
                }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                  background: sel ? 'rgba(255,255,255,0.2)' : pillar.color + '22',
                  border: '1px solid ' + (sel ? 'rgba(255,255,255,0.4)' : pillar.color + '44'),
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Mitr, sans-serif', fontSize: 12, fontWeight: 600,
                  color: sel ? '#fff8ec' : pillar.color,
                }}>{o.s}</div>
                <span style={{ flex: 1 }}>{o.t}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── ScreenResultV2 — ใบเซียมซีแก้เคล็ด ตัวที่ ๑๐ ───────────
function ScreenResultV2({ state, nav, theme, openModal }) {
  const answers = state.pillars || {};

  // Compute score
  const filled = PILLARS.filter(p => answers[p.key]);
  const score = filled.length ? Math.round(filled.reduce((s,p) => s + answers[p.key].s, 0) / filled.length) : 0;

  const status = score < 35 ? 'ลางร้าย ดวงตก' : score < 60 ? 'ดวงผันผวน' : score < 80 ? 'ดวงดี ขาขึ้น' : 'เทพกินเงิน!';
  const statusColor = score < 35 ? '#8a3a28' : score < 60 ? '#d49a3a' : score < 80 ? '#5a7a3e' : '#3f5a28';

  // Lowest 2 pillars for prediction
  const sorted = filled.sort((a,b) => answers[a.key].s - answers[b.key].s);
  const lowest = sorted.slice(0, 2);
  const highest = sorted.slice(-1)[0];

  // Share helpers (no real backend, just demo)
  const shareUrl = (() => {
    const u = new URL(window.location.href);
    u.searchParams.set('score', score);
    u.searchParams.set('status', status);
    return u.toString();
  })();
  const shareText = `ฉันเช็กดวงสุขภาพได้ ${score}% — ${status} · ลองเสี่ยงเซียมซีของคุณดูสิ`;

  const shareNative = async () => {
    try {
      if (navigator.share) await navigator.share({ title:'มูเตลู อีทติ้ง — ดวงสุขภาพ', text:shareText, url:shareUrl });
      else {
        await navigator.clipboard.writeText(shareUrl);
        alert('คัดลอกลิงก์แล้ว!');
      }
    } catch (e) {}
  };
  const shareTo = (platform) => {
    const u = encodeURIComponent(shareUrl);
    const t = encodeURIComponent(shareText);
    const url = platform === 'fb'
      ? `https://www.facebook.com/sharer/sharer.php?u=${u}`
      : `https://social-plugins.line.me/lineit/share?url=${u}&text=${t}`;
    window.open(url, '_blank', 'width=600,height=480');
  };

  return (
    <div className="paper-bg screen-scroll" style={{ height:'100%', overflowY:'auto', padding:'56px 16px 48px' }}>
      {/* ── ใบเซียมซี shell ── */}
      <div style={{
        background: 'linear-gradient(180deg, #fffaef, #f4ead7)',
        borderRadius: 14, padding: '0', position: 'relative',
        border: '1.5px solid rgba(42,31,23,0.3)',
        boxShadow: '0 12px 24px -8px rgba(42,31,23,0.3), inset 0 0 0 6px #fff8ec, inset 0 0 0 7px rgba(42,31,23,0.18)',
        overflow: 'hidden',
      }}>
        {/* top stamp band */}
        <div style={{ background: '#8a3a28', padding: '8px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#f4ead7' }}>
          <div style={{ fontFamily: 'Mitr, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em' }}>
            ใบเซียมซีแก้เคล็ด
          </div>
          <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9, letterSpacing: '0.18em', opacity: 0.8 }}>
            ตัวที่ ๑๐ · ศอ.อุบลฯ
          </div>
        </div>

        <div style={{ padding: '18px 16px 16px' }}>
          {/* Big score circle */}
          <div style={{ textAlign: 'center', position: 'relative' }}>
            <div style={{
              fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, color: '#8a7a66',
              letterSpacing: '0.25em', marginBottom: 2,
            }}>คำทำนายดวงสุขภาพ</div>
            <div style={{
              fontFamily: 'Mitr, sans-serif', fontWeight: 700, fontSize: 64,
              color: statusColor, lineHeight: 1,
              textShadow: '0 2px 0 rgba(42,31,23,0.08)',
            }}>
              {score}<span style={{ fontSize: 26, color: '#8a7a66', fontWeight: 400 }}>%</span>
            </div>
            <div style={{
              display: 'inline-block', marginTop: 6,
              background: statusColor, color: '#fff8ec',
              padding: '4px 14px', borderRadius: 999,
              fontFamily: 'Mitr, sans-serif', fontSize: 14, fontWeight: 500,
            }}>
              ✦ {status} ✦
            </div>
          </div>

          {/* 6-pillar bars */}
          <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {PILLARS.map(p => {
              const a = answers[p.key];
              const s = a ? a.s : 0;
              return (
                <div key={p.key} style={{
                  background: '#fff8ec', borderRadius: 10, padding: '8px 10px',
                  border: '1px solid rgba(42,31,23,0.12)',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 14 }}>{p.icon}</span>
                      <span style={{ fontFamily: 'IBM Plex Sans Thai, sans-serif', fontSize: 11, color: '#2a1f17', fontWeight: 500 }}>{p.name}</span>
                    </div>
                    <span style={{ fontFamily: 'Mitr, sans-serif', fontSize: 13, color: p.color, fontWeight: 600 }}>{s}</span>
                  </div>
                  <div style={{ height: 5, background: '#e3d4b3', borderRadius: 999, overflow: 'hidden' }}>
                    <div style={{ width: s+'%', height: '100%', background: p.color, borderRadius: 999, transition: 'width 0.8s' }}/>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Fortune text */}
          <div style={{
            marginTop: 18,
            background: 'rgba(179,80,58,0.08)',
            border: '1.5px dashed rgba(42,31,23,0.35)',
            borderRadius: 12, padding: '14px 14px',
            fontFamily: 'IBM Plex Sans Thai, sans-serif', fontSize: 13.5,
            color: '#2a1f17', lineHeight: 1.65,
          }}>
            <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9, color: '#8a3a28', letterSpacing: '0.22em', marginBottom: 6, fontWeight: 600 }}>
              ◇ คำทำนาย ◇
            </div>
            <div>
              ดวงรวมของคุณ <b style={{ color: statusColor }}>{status.toLowerCase()}</b> {score >= 60 ? 'พอใช้ได้เลย' : 'ต้องระวังหน่อยนะ'} —
              {lowest.length > 0 && (
                <> ลางร้ายชี้ว่า "<b style={{ color: '#8a3a28' }}>{lowest.map(p => p.name).join('" และ "')}</b>" คือจุดที่ดวงตก
                  {lowest[0] && <> {' '}{answers[lowest[0].key]?.m}</>}
                </>
              )}
              {highest && answers[highest.key]?.s >= 70 && <> ส่วนเรื่อง "<b style={{ color: '#5a7a3e' }}>{highest.name}</b>" ดวงคุณแจ่ม รักษาไว้ให้ดี</>}
            </div>
          </div>
        </div>

        {/* bottom torn-paper notch */}
        <svg viewBox="0 0 320 12" width="100%" height="12" preserveAspectRatio="none">
          <path d="M0 12 L20 6 L40 12 L60 4 L80 12 L100 6 L120 12 L140 4 L160 12 L180 6 L200 12 L220 4 L240 12 L260 6 L280 12 L300 4 L320 12 Z" fill="#8a3a28"/>
        </svg>
      </div>

      {/* ── CTA Buttons ── */}
      <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button onClick={() => openModal('lm')} style={{
          background: 'linear-gradient(135deg, #b3503a, #8a3a28)', color: '#fff8ec',
          border: 'none', borderRadius: 16, padding: '14px 18px',
          fontFamily: 'Mitr, sans-serif', fontSize: 16, fontWeight: 500, cursor: 'pointer',
          boxShadow: '0 4px 0 rgba(42,31,23,0.3)',
          display: 'flex', alignItems: 'center', gap: 12,
          textAlign: 'left',
        }}>
          <div style={{ fontSize: 22 }}>🚀</div>
          <div style={{ flex: 1 }}>
            <div>เริ่มก้าวแรกเพื่อตัวเอง</div>
            <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9, opacity: 0.8, letterSpacing: '0.15em', marginTop: 1, fontWeight: 400 }}>
              ปรึกษา LM ศอ.10 อุบลฯ · ฟรี
            </div>
          </div>
          <div style={{ opacity: 0.7 }}>→</div>
        </button>

        <button onClick={() => openModal('wisdom')} style={{
          background: '#fff8ec', color: '#2a1f17',
          border: '1.5px solid rgba(42,31,23,0.35)', borderRadius: 16, padding: '14px 18px',
          fontFamily: 'Mitr, sans-serif', fontSize: 16, fontWeight: 500, cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 12,
          textAlign: 'left',
          boxShadow: '0 4px 0 rgba(42,31,23,0.15)',
        }}>
          <div style={{ fontSize: 22 }}>📖</div>
          <div style={{ flex: 1 }}>
            <div>ศึกษาวิธีการเปลี่ยนแปลง</div>
            <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9, color: '#8a7a66', letterSpacing: '0.15em', marginTop: 1, fontWeight: 400 }}>
              หอไตรความรู้ · กรมอนามัย
            </div>
          </div>
          <div style={{ color: '#8a7a66' }}>→</div>
        </button>
      </div>

      {/* ── Share zone — cream w/ dashed border + square icon buttons ── */}
      <div style={{
        marginTop: 22,
        background: '#fff8ec',
        border: '1.5px dashed rgba(42,31,23,0.25)',
        borderRadius: 18, padding: '16px 14px 14px',
        position: 'relative',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 12 }}>
          <div style={{ fontFamily: 'Mitr, sans-serif', fontSize: 15, fontWeight: 500, color: '#2a1f17' }}>
            แชร์ผลลัพธ์ของคุณ
          </div>
          <div style={{ fontFamily: 'Charmonman, cursive', fontSize: 14, color: '#b3503a', fontWeight: 700, marginTop: -2 }}>
            ส่งต่อให้เพื่อนแก้เคล็ดกัน~
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
          {/* Native share / copy link */}
          <button onClick={shareNative} title="แชร์ / คัดลอกลิงก์" style={{
            background: '#d49a3a', border: 'none',
            borderRadius: 14, width: 64, height: 64,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 2,
            cursor: 'pointer', boxShadow: '0 3px 0 #a87a2a',
            transition: 'transform 0.1s',
          }}>
            <span style={{ fontSize: 22 }}>🔗</span>
            <span style={{ fontSize: 9, fontWeight: 600, color: '#2a1f17', fontFamily: 'IBM Plex Sans Thai, sans-serif' }}>แชร์ลิงก์</span>
          </button>
          {/* Save card */}
          <button onClick={() => downloadShareCard(score, status, statusColor, answers)} title="บันทึกการ์ดเป็นรูป" style={{
            background: '#b3503a', border: 'none',
            borderRadius: 14, width: 64, height: 64,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 2,
            cursor: 'pointer', boxShadow: '0 3px 0 #8a3a28',
          }}>
            <span style={{ fontSize: 22 }}>📥</span>
            <span style={{ fontSize: 9, fontWeight: 600, color: '#fff8ec', fontFamily: 'IBM Plex Sans Thai, sans-serif' }}>บันทึกการ์ด</span>
          </button>
          {/* LINE */}
          <button onClick={() => shareTo('line')} title="แชร์ LINE" style={{
            background: '#06c755', border: 'none',
            borderRadius: 14, width: 64, height: 64,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 2,
            cursor: 'pointer', boxShadow: '0 3px 0 #04a047',
          }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <rect width="22" height="22" rx="4" fill="#06c755"/>
              <path d="M11 4.5C6.86 4.5 3.5 7.17 3.5 10.45c0 2.94 2.66 5.4 6.26 5.87.24.05.57.16.66.36.07.18.05.46.02.65l-.1.65c-.04.19-.16.74.66.4.83-.34 4.43-2.6 6.04-4.46h-.01c1.11-1.22 1.64-2.46 1.64-3.84 0-3.28-3.36-5.96-7.5-5.96Z" fill="#fff"/>
            </svg>
            <span style={{ fontSize: 9, fontWeight: 600, color: '#fff', fontFamily: 'IBM Plex Sans Thai, sans-serif' }}>LINE</span>
          </button>
          {/* Facebook */}
          <button onClick={() => shareTo('fb')} title="แชร์ Facebook" style={{
            background: '#1877f2', border: 'none',
            borderRadius: 14, width: 64, height: 64,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 2,
            cursor: 'pointer', boxShadow: '0 3px 0 #0f5dc4',
          }}>
            <span style={{ fontSize: 22, color: '#fff', fontFamily: 'Georgia, serif', fontWeight: 700, lineHeight: 1 }}>f</span>
            <span style={{ fontSize: 9, fontWeight: 600, color: '#fff', fontFamily: 'IBM Plex Sans Thai, sans-serif' }}>Facebook</span>
          </button>
        </div>

        <div style={{
          marginTop: 12, padding: '6px 10px',
          background: 'rgba(42,31,23,0.04)', borderRadius: 8,
          fontFamily: 'IBM Plex Mono, monospace', fontSize: 9, color: '#8a7a66',
          letterSpacing: '0.1em', textAlign: 'center',
        }}>
          ↗ ?score={score}&amp;status={encodeURIComponent(status).slice(0,16)}…
        </div>
      </div>

      <div style={{ marginTop: 14, display: 'flex', gap: 8 }}>
        <button onClick={() => nav('cards')} style={{
          flex: 1, background: 'transparent', border: '1px solid rgba(42,31,23,0.3)',
          borderRadius: 12, padding: '10px',
          fontFamily: 'IBM Plex Sans Thai, sans-serif', fontSize: 13, color: '#5a4a3a',
          cursor: 'pointer',
        }}>← เปิดใบใหม่</button>
        <button onClick={() => nav('dashboard')} style={{
          flex: 1, background: 'transparent', border: '1px solid rgba(42,31,23,0.3)',
          borderRadius: 12, padding: '10px',
          fontFamily: 'IBM Plex Sans Thai, sans-serif', fontSize: 13, color: '#5a4a3a',
          cursor: 'pointer',
        }}>แดชบอร์ดวันนี้ →</button>
      </div>
    </div>
  );
}

// Download share card as PNG via Canvas
function downloadShareCard(score, status, color, answers) {
  const c = document.createElement('canvas');
  c.width = 1080; c.height = 1080;
  const ctx = c.getContext('2d');
  // bg
  const g = ctx.createLinearGradient(0, 0, 0, 1080);
  g.addColorStop(0, '#fffaef'); g.addColorStop(1, '#f4ead7');
  ctx.fillStyle = g; ctx.fillRect(0, 0, 1080, 1080);
  // outer border
  ctx.strokeStyle = 'rgba(42,31,23,0.3)'; ctx.lineWidth = 4;
  ctx.strokeRect(40, 40, 1000, 1000);
  ctx.strokeStyle = '#fff8ec'; ctx.lineWidth = 18;
  ctx.strokeRect(58, 58, 964, 964);
  // top band
  ctx.fillStyle = '#8a3a28'; ctx.fillRect(80, 80, 920, 70);
  ctx.fillStyle = '#f4ead7';
  ctx.font = 'bold 28px "Mitr", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('ใบเซียมซีแก้เคล็ด · ตัวที่ ๑๐ · ศอ.อุบลฯ', 540, 125);
  // label
  ctx.fillStyle = '#8a7a66';
  ctx.font = '20px "IBM Plex Mono", monospace';
  ctx.fillText('คำทำนายดวงสุขภาพ', 540, 280);
  // score
  ctx.fillStyle = color;
  ctx.font = 'bold 220px "Mitr", sans-serif';
  ctx.fillText(score + '%', 540, 480);
  // status pill
  ctx.fillStyle = color;
  const txt = '✦ ' + status + ' ✦';
  ctx.font = '32px "Mitr", sans-serif';
  const tw = ctx.measureText(txt).width;
  ctx.fillRect(540 - tw/2 - 24, 510, tw + 48, 56);
  ctx.fillStyle = '#fff8ec';
  ctx.fillText(txt, 540, 548);
  // 6 pillars
  let y = 640;
  PILLARS.forEach((p, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 110 + col * 440;
    const yy = y + row * 110;
    ctx.fillStyle = '#fff8ec';
    ctx.fillRect(x, yy, 400, 90);
    ctx.strokeStyle = 'rgba(42,31,23,0.15)'; ctx.lineWidth = 2;
    ctx.strokeRect(x, yy, 400, 90);
    ctx.fillStyle = '#2a1f17';
    ctx.font = '28px "Mitr", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(p.icon + '  ' + p.name, x + 20, yy + 38);
    const s = answers[p.key] ? answers[p.key].s : 0;
    ctx.fillStyle = p.color;
    ctx.font = 'bold 32px "Mitr", sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(s, x + 380, yy + 38);
    // bar
    ctx.fillStyle = '#e3d4b3'; ctx.fillRect(x + 20, yy + 60, 360, 12);
    ctx.fillStyle = p.color; ctx.fillRect(x + 20, yy + 60, (s/100) * 360, 12);
  });
  // footer
  ctx.textAlign = 'center';
  ctx.fillStyle = '#8a3a28';
  ctx.font = '22px "Mitr", sans-serif';
  ctx.fillText('มูเตลู อีทติ้ง · เสี่ยงดวงสุขภาพแบบไทยบ้าน', 540, 1010);
  // download
  const a = document.createElement('a');
  a.download = `health-moo-${score}.png`;
  a.href = c.toDataURL('image/png');
  a.click();
}

// ── LM Modal — ใบเซียมซีแก้เคล็ด LM ศอ.10 ────────────────────
function LMModal({ onClose, onRegister }) {
  return (
    <ModalShell onClose={onClose} accent="#b3503a">
      <div style={{ textAlign: 'center', padding: '4px 4px 0' }}>
        <div style={{
          fontFamily: 'IBM Plex Mono, monospace', fontSize: 9, color: '#b3503a',
          letterSpacing: '0.25em', fontWeight: 600,
        }}>◇ ใบเซียมซีแก้เคล็ด ◇</div>
        <h2 style={{
          fontFamily: 'Mitr, sans-serif', fontSize: 24, color: '#2a1f17',
          margin: '4px 0 2px', fontWeight: 600, lineHeight: 1.2,
        }}>เริ่มก้าวแรกฟรี<br/>กับหมอ LM ศอ.10</h2>
        <div style={{
          fontFamily: 'Charmonman, cursive', fontSize: 18, color: '#b3503a', fontWeight: 700,
        }}>เปลี่ยนเคล็ดได้ ไม่ต้องเจ็บตัว~</div>
      </div>

      <div style={{
        marginTop: 14,
        background: 'linear-gradient(180deg, #fffaef, #f4ead7)',
        border: '1.5px dashed rgba(42,31,23,0.4)', borderRadius: 14,
        padding: '14px 14px',
      }}>
        <div style={{
          fontFamily: 'IBM Plex Sans Thai, sans-serif', fontSize: 13.5,
          color: '#2a1f17', lineHeight: 1.65,
        }}>
          "ดวงตกเรื่องการ<b style={{ color: '#8a3a28' }}>นอน</b>กับ<b style={{ color: '#8a3a28' }}>อาหาร</b>?
          วิธีแก้เคล็ดง่ายๆ คือไปคุยกับหมอ Lifestyle Medicine ที่ศูนย์อนามัยที่ 10 อุบลฯ ฟรีไม่มีค่าใช้จ่าย หมอจะช่วยวางแผนปรับ ‘กิน-นอน-ขยับ-ใจ’ ทีละก้าวเล็กๆ ที่ทำได้จริง"
        </div>
        <div style={{
          marginTop: 10,
          fontFamily: 'IBM Plex Mono, monospace', fontSize: 9, color: '#8a7a66',
          letterSpacing: '0.18em', textAlign: 'right',
        }}>— อาจารย์หมู · ศอ.10</div>
      </div>

      {/* Service highlight strip */}
      <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
        {[
          { i: '🩺', t: 'หมอเฉพาะทาง', s: 'LM Specialist' },
          { i: '🎫', t: 'ฟรี 100%',     s: 'ไม่มีค่าใช้จ่าย' },
          { i: '📋', t: 'แผนรายบุคคล', s: 'ปรับให้พอดี' },
        ].map((x,i) => (
          <div key={i} style={{
            background: 'rgba(179,80,58,0.06)',
            border: '1px solid rgba(179,80,58,0.2)',
            borderRadius: 10, padding: '8px 6px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 18, lineHeight: 1, marginBottom: 3 }}>{x.i}</div>
            <div style={{ fontFamily: 'Mitr, sans-serif', fontSize: 11, color: '#2a1f17', fontWeight: 500, lineHeight: 1.2 }}>{x.t}</div>
            <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 8, color: '#8a7a66', letterSpacing: '0.1em', marginTop: 1 }}>{x.s}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button onClick={onRegister} style={{
          background: '#b3503a', color: '#fff8ec', border: 'none',
          borderRadius: 14, padding: '12px',
          fontFamily: 'Mitr, sans-serif', fontSize: 15, fontWeight: 500, cursor: 'pointer',
          boxShadow: '0 4px 0 #8a3a28',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          ✿ ลงสมุดนัดหมายหมอ LM (ฟรี)
        </button>
        <button onClick={() => window.open('https://line.me/R/ti/p/@hpc10', '_blank')} style={{
          background: '#06c755', color: '#fff', border: 'none',
          borderRadius: 14, padding: '12px',
          fontFamily: 'Mitr, sans-serif', fontSize: 15, fontWeight: 500, cursor: 'pointer',
          boxShadow: '0 4px 0 #04a047',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          แอดไลน์ ศอ.10 → @hpc10
        </button>
        <div style={{
          textAlign: 'center', marginTop: 4,
          fontFamily: 'IBM Plex Mono, monospace', fontSize: 9, color: '#8a7a66',
          letterSpacing: '0.12em',
        }}>
          ◇ ไม่ใช่ปรึกษาแพทย์ฉุกเฉิน · สำหรับงาน LM เท่านั้น ◇
        </div>
      </div>
    </ModalShell>
  );
}

// ── Register form — ลงสมุดแก้กรรม ────────────────────────────
function RegisterModal({ onClose }) {
  const [form, setForm] = React.useState({ name:'', phone:'', concern:'' });
  const [submitted, setSubmitted] = React.useState(false);
  const concerns = [
    { v:'food',  l:'อาหาร / น้ำหนัก',  i:'🍚' },
    { v:'sleep', l:'นอน / พักผ่อน',     i:'🌙' },
    { v:'move',  l:'ขยับ / ปวดเมื่อย',   i:'🚶' },
    { v:'mind',  l:'ใจ / ความเครียด',   i:'🪷' },
  ];
  const submit = () => {
    // demo only — would webhook into Google Sheets
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <ModalShell onClose={onClose} accent="#5a7a3e">
        <div style={{ textAlign: 'center', padding: '20px 4px 6px' }}>
          <div style={{ fontSize: 56, marginBottom: 6 }}>✿</div>
          <h2 style={{ fontFamily: 'Mitr, sans-serif', fontSize: 22, color: '#2a1f17', margin: '0 0 6px', fontWeight: 600 }}>
            ลงสมุดเรียบร้อยจ้า~
          </h2>
          <p style={{ fontFamily: 'IBM Plex Sans Thai, sans-serif', fontSize: 13.5, color: '#5a4a3a', margin: 0, lineHeight: 1.6 }}>
            เจ้าหน้าที่ ศอ.10 จะติดต่อกลับภายใน 2 วันทำการ<br/>
            ผ่านเบอร์ <b>{form.phone || '08x-xxx-xxxx'}</b>
          </p>
          <div style={{
            marginTop: 14, padding: '10px 12px',
            background: 'rgba(90,122,62,0.1)', borderRadius: 10,
            border: '1px dashed #5a7a3e',
            fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, color: '#3f5a28',
            letterSpacing: '0.1em',
          }}>
            ⚐ เลขนัด: HM-{Math.floor(Math.random()*9000+1000)}
          </div>
          <button onClick={onClose} style={{
            marginTop: 16, background: '#5a7a3e', color: '#f4ead7', border: 'none',
            borderRadius: 12, padding: '10px 24px',
            fontFamily: 'Mitr, sans-serif', fontSize: 14, fontWeight: 500, cursor: 'pointer',
          }}>เรียบร้อย</button>
        </div>
      </ModalShell>
    );
  }

  return (
    <ModalShell onClose={onClose} accent="#b3503a">
      <div>
        <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9, color: '#b3503a', letterSpacing: '0.22em', fontWeight: 600 }}>
          ◇ สมุดลงทะเบียนแก้กรรม ◇
        </div>
        <h2 style={{ fontFamily: 'Mitr, sans-serif', fontSize: 20, color: '#2a1f17', margin: '4px 0 12px', fontWeight: 600 }}>
          นัดหมาย LM (3 ช่อง จบ)
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Name */}
          <div>
            <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9, color: '#8a7a66', letterSpacing: '0.18em', marginBottom: 4 }}>
              ⌘ ชื่อ-นามสกุล
            </div>
            <input
              value={form.name}
              onChange={(e) => setForm({...form, name: e.target.value})}
              placeholder="ชื่อจริงเลย หมอจะได้เรียกถูก"
              style={{
                width: '100%', background: '#fff8ec',
                border: '1.5px solid rgba(42,31,23,0.25)', borderRadius: 10,
                padding: '10px 12px',
                fontFamily: 'IBM Plex Sans Thai, sans-serif', fontSize: 14, color: '#2a1f17',
                outline: 'none', boxSizing: 'border-box',
              }}/>
          </div>

          {/* Phone */}
          <div>
            <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9, color: '#8a7a66', letterSpacing: '0.18em', marginBottom: 4 }}>
              ⌘ เบอร์โทร
            </div>
            <input
              value={form.phone}
              onChange={(e) => setForm({...form, phone: e.target.value.replace(/[^\d-]/g,'') })}
              placeholder="08x-xxx-xxxx"
              inputMode="tel"
              style={{
                width: '100%', background: '#fff8ec',
                border: '1.5px solid rgba(42,31,23,0.25)', borderRadius: 10,
                padding: '10px 12px',
                fontFamily: 'IBM Plex Mono, monospace', fontSize: 14, color: '#2a1f17',
                letterSpacing: '0.05em',
                outline: 'none', boxSizing: 'border-box',
              }}/>
          </div>

          {/* Concern chips */}
          <div>
            <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9, color: '#8a7a66', letterSpacing: '0.18em', marginBottom: 4 }}>
              ⌘ เรื่องที่กังวลที่สุด
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {concerns.map(c => {
                const sel = form.concern === c.v;
                return (
                  <button key={c.v} onClick={() => setForm({...form, concern: c.v})}
                    style={{
                      background: sel ? '#2a1f17' : '#fff8ec',
                      color: sel ? '#f4ead7' : '#2a1f17',
                      border: '1.5px solid ' + (sel ? '#2a1f17' : 'rgba(42,31,23,0.2)'),
                      borderRadius: 10, padding: '9px 8px',
                      fontFamily: 'IBM Plex Sans Thai, sans-serif', fontSize: 12.5, cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: 6,
                    }}>
                    <span style={{ fontSize: 16 }}>{c.i}</span>
                    <span>{c.l}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <button onClick={submit} disabled={!form.name || !form.phone || !form.concern}
          style={{
            marginTop: 16, width: '100%',
            background: '#b3503a', color: '#fff8ec',
            border: 'none', borderRadius: 14, padding: '12px',
            fontFamily: 'Mitr, sans-serif', fontSize: 15, fontWeight: 500,
            cursor: (form.name && form.phone && form.concern) ? 'pointer' : 'not-allowed',
            opacity: (form.name && form.phone && form.concern) ? 1 : 0.5,
            boxShadow: '0 4px 0 #8a3a28',
          }}>
          ✦ ส่งให้ ศอ.10 เลย
        </button>
        <div style={{ textAlign: 'center', marginTop: 8, fontFamily: 'IBM Plex Mono, monospace', fontSize: 9, color: '#8a7a66', letterSpacing: '0.12em' }}>
          ↗ ข้อมูลส่งเข้า Google Sheet ของศูนย์ฯ · ไม่เผยแพร่
        </div>
      </div>
    </ModalShell>
  );
}

// ── Wisdom Library — หอไตรความรู้ ────────────────────────────
function WisdomModal({ onClose, userAnswers = {} }) {
  // Sort pillars: lowest score first (focus on what needs work)
  const sortedPillars = React.useMemo(() => {
    const withScore = PILLARS.map(p => ({
      ...p,
      _score: userAnswers[p.key] ? userAnswers[p.key].s : 50,
      _answered: !!userAnswers[p.key],
    }));
    // sort by score ascending — answered low scores first, then unanswered, then high scores
    return withScore.sort((a, b) => {
      if (a._answered !== b._answered) return a._answered ? -1 : 1;
      return a._score - b._score;
    });
  }, [userAnswers]);

  // Auto-expand lowest-scored answered pillar on open
  const lowestKey = sortedPillars.find(p => p._answered)?.key;
  const [expanded, setExpanded] = React.useState(lowestKey || null);

  const library = sortedPillars.map(p => ({
    ...p,
    tips: ({
      food:  ['จานสุขภาพ ½ ผัก ¼ โปรตีน ¼ ข้าว',  'ลดหวาน-มัน-เค็ม 1 อย่างต่อสัปดาห์', 'น้ำเปล่า 8 แก้วต่อวัน'],
      move:  ['เดิน 30 นาที 5 วัน/สัปดาห์',          'ลุกยืดตัวทุก 1 ชม.',                'ขึ้นบันไดแทนลิฟต์'],
      sleep: ['เข้านอนเวลาเดิมทุกวัน',                'งดจอ 30 นาทีก่อนนอน',              'ห้องนอนเย็น มืด เงียบ'],
      mind:  ['หายใจเข้า 4 ออก 7 นับ 3 รอบ',         'เขียน 3 สิ่งที่ขอบคุณก่อนนอน',     'พักจากข่าวสัก 1 ชม.'],
      toxin: ['ลดบุหรี่ทีละมวน นับวัน',                'งดเหล้าเป็นวัน เริ่ม 1 วัน/สัปดาห์', 'เลี่ยงโรงงาน-ฝุ่นควัน'],
      bond:  ['ทักหาคนเก่า 1 คน/สัปดาห์',             'กินข้าวกับครอบครัวอาทิตย์ละครั้ง', 'เข้ากลุ่มงานอดิเรกในละแวกบ้าน'],
    })[p.key],
    pdf: 'https://multimedia.anamai.moph.go.th/',
  }));

  return (
    <ModalShell onClose={onClose} accent="#5a7a3e" wide>
      <div style={{ textAlign: 'center', marginBottom: 14 }}>
        <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9, color: '#5a7a3e', letterSpacing: '0.22em', fontWeight: 600 }}>
          ◇ หอไตรความรู้ ◇
        </div>
        <h2 style={{ fontFamily: 'Mitr, sans-serif', fontSize: 22, color: '#2a1f17', margin: '4px 0 2px', fontWeight: 600 }}>
          ตำราแก้กรรมสุขภาพ
        </h2>
        <p style={{ fontFamily: 'IBM Plex Sans Thai, sans-serif', fontSize: 12, color: '#8a7a66', margin: 0 }}>
          {lowestKey
            ? 'เรียงตามจุดที่ดวงตกสุด · เริ่มแก้จากบนลงล่าง'
            : 'แตะหมวดที่อยากรู้ · เคล็ดสั้นๆ + ลิงก์สื่อกรมอนามัย'}
        </p>
      </div>

      {lowestKey && (
        <div style={{
          background: '#fff8ec',
          border: '1.5px dashed #b3503a',
          borderRadius: 12, padding: '10px 12px', marginBottom: 10,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{ flexShrink: 0 }}>
            <MooMascot size={42} mood="happy" wobble/>
          </div>
          <div style={{ flex: 1, fontFamily: 'IBM Plex Sans Thai, sans-serif', fontSize: 12.5, color: '#2a1f17', lineHeight: 1.5 }}>
            <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9, color: '#b3503a', letterSpacing: '0.18em', fontWeight: 600 }}>
              หมูแนะนำ →
            </span><br/>
            ดวงตกสุดที่ "<b style={{ color: '#b3503a' }}>{sortedPillars.find(p => p.key === lowestKey)?.name}</b>" · ลองอ่านเคล็ดข้อแรกก่อนเลย
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {library.map(p => {
          const open = expanded === p.key;
          return (
            <div key={p.key} style={{
              background: '#fff8ec', borderRadius: 12,
              border: '1.5px solid ' + (open ? p.color : 'rgba(42,31,23,0.18)'),
              overflow: 'hidden', transition: 'border 0.2s',
            }}>
              <button onClick={() => setExpanded(open ? null : p.key)} style={{
                width: '100%', background: 'transparent', border: 'none',
                padding: '10px 12px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 10, textAlign: 'left',
              }}>
                <div style={{
                  width: 34, height: 34, borderRadius: 8, background: p.color + '22',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18, flexShrink: 0, border: '1px solid ' + p.color + '55',
                }}>{p.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9, color: p.color, letterSpacing: '0.2em', fontWeight: 600 }}>
                      {p.thai} · {p.name.toUpperCase()}
                    </div>
                    {p._answered && p._score < 50 && (
                      <div style={{
                        fontFamily: 'IBM Plex Mono, monospace', fontSize: 8, letterSpacing: '0.15em',
                        color: '#8a3a28', background: 'rgba(138,58,40,0.12)',
                        border: '1px solid rgba(138,58,40,0.3)', borderRadius: 4,
                        padding: '1px 5px', fontWeight: 600,
                      }}>ดวงตก {p._score}</div>
                    )}
                    {p._answered && p._score >= 75 && (
                      <div style={{
                        fontFamily: 'IBM Plex Mono, monospace', fontSize: 8, letterSpacing: '0.15em',
                        color: '#3f5a28', background: 'rgba(63,90,40,0.12)',
                        border: '1px solid rgba(63,90,40,0.3)', borderRadius: 4,
                        padding: '1px 5px', fontWeight: 600,
                      }}>แจ่ม {p._score}</div>
                    )}
                  </div>
                  <div style={{ fontFamily: 'IBM Plex Sans Thai, sans-serif', fontSize: 13.5, color: '#2a1f17', marginTop: 1, fontWeight: 500 }}>
                    {p.tips[0]}
                  </div>
                </div>
                <div style={{ color: p.color, fontSize: 16, transform: open ? 'rotate(90deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>›</div>
              </button>
              {open && (
                <div className="float-up" style={{ padding: '0 12px 12px' }}>
                  <div style={{ height: 1, background: 'rgba(42,31,23,0.12)', marginBottom: 8 }}/>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {p.tips.map((t, i) => (
                      <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                        <div style={{
                          flexShrink: 0, width: 18, height: 18, borderRadius: 4,
                          background: p.color, color: '#fff',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, fontWeight: 600,
                        }}>{i+1}</div>
                        <div style={{ fontFamily: 'IBM Plex Sans Thai, sans-serif', fontSize: 13, color: '#2a1f17', lineHeight: 1.5 }}>
                          {t}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => window.open(p.pdf, '_blank')} style={{
                    marginTop: 10, width: '100%',
                    background: p.color, color: '#fff8ec',
                    border: 'none', borderRadius: 10, padding: '8px 10px',
                    fontFamily: 'Mitr, sans-serif', fontSize: 12, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  }}>
                    📚 ดาวน์โหลดสื่อ {p.name} · กรมอนามัย ↗
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{
        marginTop: 14, padding: '8px 10px',
        background: 'rgba(90,122,62,0.08)', borderRadius: 8,
        fontFamily: 'IBM Plex Mono, monospace', fontSize: 9, color: '#3f5a28',
        textAlign: 'center', letterSpacing: '0.12em',
      }}>
        ↗ multimedia.anamai.moph.go.th
      </div>
    </ModalShell>
  );
}

// ── Modal Shell ──────────────────────────────────────────────
function ModalShell({ children, onClose, accent = '#b3503a', wide = false }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 90,
      background: 'rgba(20,15,10,0.6)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      animation: 'float-up 0.25s ease-out',
    }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: '#f4ead7', borderTopLeftRadius: 24, borderTopRightRadius: 24,
        width: '100%', maxWidth: 420,
        maxHeight: '90%', overflowY: 'auto',
        padding: '20px 18px 28px',
        border: '1.5px solid ' + accent,
        borderBottom: 'none',
        position: 'relative',
        animation: 'float-up 0.32s cubic-bezier(.4,1.6,.5,1)',
      }}>
        <div style={{
          width: 40, height: 4, background: 'rgba(42,31,23,0.25)',
          borderRadius: 2, margin: '0 auto 14px',
        }}/>
        <button onClick={onClose} style={{
          position: 'absolute', top: 14, right: 14,
          background: 'transparent', border: 'none', cursor: 'pointer',
          color: '#8a7a66', fontSize: 20, lineHeight: 1, padding: 4,
        }}>✕</button>
        {children}
      </div>
    </div>
  );
}

Object.assign(window, {
  ScreenCards, ScreenResultV2, LMModal, RegisterModal, WisdomModal,
  PILLARS,
});
