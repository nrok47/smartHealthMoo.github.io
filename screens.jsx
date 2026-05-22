// Screen components for Health-Moo prototype
// Each screen is a function that takes (state, setState, nav, theme) and returns JSX

// ── Welcome screen ──────────────────────────────────────────
function ScreenWelcome({ nav, theme }) {
  return (
    <div className="paper-bg" style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      padding: '70px 28px 110px',
      position: 'relative',
    }}>
      {/* top decorative pattern */}
      <div style={{ position: 'absolute', top: 50, left: 0, right: 0, opacity: 0.6 }}>
        <PatternWaves color="rgba(179,80,58,0.18)" height={28}/>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        {/* sun-rays behind mascot */}
        <svg viewBox="0 0 200 200" width="280" height="280" style={{ position: 'absolute', top: -10, opacity: 0.45 }}>
          {Array.from({length: 12}).map((_, i) => {
            const a = (i / 12) * Math.PI * 2;
            const x1 = 100 + Math.cos(a) * 70;
            const y1 = 100 + Math.sin(a) * 70;
            const x2 = 100 + Math.cos(a) * 95;
            const y2 = 100 + Math.sin(a) * 95;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#d49a3a" strokeWidth="3" strokeLinecap="round"/>;
          })}
        </svg>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <MooMascot size={180} variant={theme.mascot} mood="happy"/>
        </div>

        <div style={{
          fontFamily: 'Charmonman, cursive', fontSize: 22, color: '#b3503a',
          marginTop: 6, fontWeight: 700, textAlign: 'center',
        }}>
          สวัสดีจ้า~ มาเสี่ยงดวงกัน
        </div>

        <h1 style={{
          fontFamily: 'Mitr, sans-serif', fontWeight: 600,
          fontSize: 30, color: '#2a1f17', margin: '6px 0 8px',
          textAlign: 'center', letterSpacing: '0.01em',
          lineHeight: 1.15,
        }}>
          มูเตลู อีทติ้ง<br/>เช็กดวงสุขภาพ
        </h1>

        <p style={{
          fontFamily: 'IBM Plex Sans Thai, sans-serif',
          fontSize: 14, color: '#5a4a3a', textAlign: 'center',
          margin: 0, lineHeight: 1.55, maxWidth: 290,
        }}>
          เปิดเซียมซี 6 ใบ ตอบสั้นๆ ใน 2 นาที<br/>เดี๋ยวรู้เลยว่าดวงคุณขึ้นหรือตกตรงไหน
        </p>

        <div style={{ marginTop: 22, display: 'flex', alignItems: 'center', gap: 18 }}>
          {[
            { i: '⚶', t: '6 ใบ พอ' },
            { i: '⏱', t: '2 นาที' },
            { i: '🪷', t: 'ไม่ต้องสมัคร' },
          ].map(x => (
            <div key={x.t} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18, marginBottom: 2 }}>{x.i}</div>
              <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9, color: '#8a7a66', letterSpacing: '0.1em' }}>{x.t}</div>
            </div>
          ))}
        </div>
              <div style={{ paddingBottom: 16 }}>
        <BigButton variant="brick" onClick={() => nav('cards')} icon="✦">
          เริ่มเสี่ยงเซียมซีเลย
        </BigButton>
        <div style={{
          textAlign: 'center', marginTop: 12,
          fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, color: '#8a7a66',
        }}>
          ✿ ปลอดภัย ข้อมูลอยู่ในเครื่องคุณเท่านั้น ✿
        </div>
      </div>
      </div>


    </div>
  );
}

// ── Question 1: Energy slider ───────────────────────────────
function ScreenQ1({ state, setState, nav, theme }) {
  const v = state.energy;
  return (
    <div className="paper-bg" style={{ height:'100%', display:'flex', flexDirection:'column', padding:'56px 24px 44px' }}>
      <ScreenHeader step={1} total={5} onBack={() => nav('welcome')} accent={theme.accent}/>

      <div className="screen-scroll" style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
        <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, color: '#b3503a', letterSpacing: '0.15em', marginBottom: 6 }}>
          ๐๑ — พลังงาน
        </div>
        <h2 style={{ fontFamily: 'Mitr, sans-serif', fontWeight: 500, fontSize: 24, margin: '0 0 4px', color: '#2a1f17', lineHeight: 1.25 }}>
          วันนี้พลังเหลือแค่ไหน?
        </h2>
        <p style={{ fontFamily: 'IBM Plex Sans Thai, sans-serif', fontSize: 13, color: '#8a7a66', margin: 0 }}>
          ลากหมูไปวางตรงที่ตรงกับวันนี้
        </p>

        <div style={{ marginTop: 30 }}>
          <EnergySlider value={v} onChange={(n) => setState({...state, energy: n})}/>
        </div>

        <div style={{ marginTop: 18 }}>
          <MooSays mood={v < 30 ? 'sleepy' : 'happy'} accent={theme.accent}>
            {v < 25 ? 'แบตเหลือน้อยแหละ วันนี้ขอเอนตัวก่อนนะ ไม่ต้องเก่งทุกวันก็ได้'
              : v < 55 ? 'พลังกลางๆ พอใช้ทั้งวันได้ ค่อยๆ ก็ทันนะ'
              : v < 80 ? 'พลังโอเค ลองใช้แสงตอนเช้าให้ครบ ระวังเล่นเกินตอนค่ำ'
              : 'พลังเต็มมาก ระวังเอาไปใช้หมดในชั่วโมงเดียว'}
          </MooSays>
        </div>
      </div>

      <BigButton variant="brick" onClick={() => nav('q2')}>ต่อไป →</BigButton>
    </div>
  );
}

// ── Question 2: Mood chips ──────────────────────────────────
function ScreenQ2({ state, setState, nav, theme }) {
  const opts = [
    { value: 'calm',  icon: '🪷', label: 'สงบ ใจอยู่กับตัว' },
    { value: 'happy', icon: '☀️', label: 'อารมณ์ดี เบาๆ' },
    { value: 'tired', icon: '🌧', label: 'เหนื่อย ล้าๆ' },
    { value: 'tense', icon: '🌪', label: 'หงุดหงิด ตึง' },
    { value: 'lonely',icon: '🌙', label: 'เหงา เงียบ' },
    { value: 'mixed', icon: '🍃', label: 'หลายอย่างปนกัน' },
  ];
  return (
    <div className="paper-bg" style={{ height:'100%', display:'flex', flexDirection:'column', padding:'56px 24px 44px' }}>
      <ScreenHeader step={2} total={5} onBack={() => nav('q1')} accent={theme.accent}/>
      <div className="screen-scroll" style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
        <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, color: '#b3503a', letterSpacing: '0.15em', marginBottom: 6 }}>
          ๐๒ — ใจ
        </div>
        <h2 style={{ fontFamily: 'Mitr, sans-serif', fontWeight: 500, fontSize: 24, margin: '0 0 4px', color: '#2a1f17', lineHeight: 1.25 }}>
          ใจดวงนี้เป็นยังไง?
        </h2>
        <p style={{ fontFamily: 'IBM Plex Sans Thai, sans-serif', fontSize: 13, color: '#8a7a66', margin: '0 0 18px' }}>
          เลือก 1 อันที่ตรงสุด
        </p>

        <ChipGroup options={opts} value={state.mood}
          onChange={(v) => setState({...state, mood: v})} columns={2}/>

        {state.mood && (
          <div style={{ marginTop: 16 }}>
            <MooSays mood={state.mood === 'tired' || state.mood === 'lonely' ? 'sad' : 'happy'} accent={theme.accent}>
              {state.mood === 'calm'   && 'นั่นแหละสภาพดีๆ พยายามเก็บไว้ทั้งวันนะ'}
              {state.mood === 'happy'  && 'ส่งต่อความใจดีให้คนรอบตัวสักคนสิ'}
              {state.mood === 'tired'  && 'เหนื่อยไม่ใช่ขี้ ลองตัดงานที่ไม่ด่วนออกซัก 1 อันก่อน'}
              {state.mood === 'tense'  && 'หายใจยาวๆ 3 ครั้ง แล้วค่อยกลับมาคิดอีกที'}
              {state.mood === 'lonely' && 'ทักหาคนหนึ่งคนที่อยากเจอ ส่งสติกเกอร์ก็ได้'}
              {state.mood === 'mixed'  && 'ปนกันก็ปกติของคน วันนี้ขอแค่ไม่ฝืน'}
            </MooSays>
          </div>
        )}
      </div>
      <BigButton variant="brick" onClick={() => nav('q3')} disabled={!state.mood}>ต่อไป →</BigButton>
    </div>
  );
}

// ── Question 3: Body signals (multi) ────────────────────────
function ScreenQ3({ state, setState, nav, theme }) {
  const opts = [
    { value: 'sleep',  icon: '🌙', label: 'นอนไม่พอ' },
    { value: 'sore',   icon: '🦴', label: 'ปวดเมื่อย' },
    { value: 'belly',  icon: '🍵', label: 'ท้องไม่สบาย' },
    { value: 'eye',    icon: '👁', label: 'ตาล้า ปวดหัว' },
    { value: 'thirst', icon: '💧', label: 'น้ำน้อย' },
    { value: 'none',   icon: '✿', label: 'ไม่มี สบายดี' },
  ];
  return (
    <div className="paper-bg" style={{ height:'100%', display:'flex', flexDirection:'column', padding:'56px 24px 44px' }}>
      <ScreenHeader step={3} total={5} onBack={() => nav('q2')} accent={theme.accent}/>
      <div className="screen-scroll" style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
        <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, color: '#b3503a', letterSpacing: '0.15em', marginBottom: 6 }}>
          ๐๓ — ร่างกาย
        </div>
        <h2 style={{ fontFamily: 'Mitr, sans-serif', fontWeight: 500, fontSize: 24, margin: '0 0 4px', color: '#2a1f17', lineHeight: 1.25 }}>
          ตัวมีสัญญาณอะไรบ้าง?
        </h2>
        <p style={{ fontFamily: 'IBM Plex Sans Thai, sans-serif', fontSize: 13, color: '#8a7a66', margin: '0 0 18px' }}>
          เลือกได้หลายอัน
        </p>
        <ChipGroup options={opts} value={state.signals} multi columns={2}
          onChange={(v) => setState({...state, signals: v})}/>

        {(state.signals || []).length > 0 && (
          <div style={{ marginTop: 16 }}>
            <MooSays accent={theme.accent}>
              {(state.signals.includes('sleep')) && 'นอนน้อยทำใจหงุดหงิดเอง คืนนี้ปิดจอเร็วๆ นะ '}
              {(state.signals.includes('thirst')) && 'จิบน้ำตอนนี้สัก 1 แก้วก่อน '}
              {(state.signals.includes('belly')) && 'กินอ่อนๆ ดีสุด ข้าวต้มกะหมูสับเอามั้ย? '}
              {(state.signals.includes('sore')) && 'ลุกบิดตัวสัก 1 นาที จะรู้สึกขึ้น '}
              {(state.signals.includes('eye'))  && 'ทุก 20 นาที มองไกลๆ สัก 20 วินาที '}
              {(state.signals.includes('none')) && 'ดีมากเลย เก็บฟอร์มนี้ไว้นานๆ '}
            </MooSays>
          </div>
        )}
      </div>
      <BigButton variant="brick" onClick={() => nav('q4')} disabled={!(state.signals||[]).length}>ต่อไป →</BigButton>
    </div>
  );
}

// ── Question 4: Eating today ────────────────────────────────
function ScreenQ4({ state, setState, nav, theme }) {
  const opts = [
    { value: 'rice',  icon: '🍚', label: 'ข้าว แป้ง' },
    { value: 'veg',   icon: '🥬', label: 'ผัก' },
    { value: 'fruit', icon: '🍌', label: 'ผลไม้' },
    { value: 'meat',  icon: '🍳', label: 'ไข่ เนื้อ' },
    { value: 'sweet', icon: '🍡', label: 'หวานๆ' },
    { value: 'fried', icon: '🍢', label: 'ของทอด' },
    { value: 'coffee',icon: '☕', label: 'กาแฟ ชา' },
    { value: 'water', icon: '💧', label: 'น้ำเปล่า' },
  ];
  return (
    <div className="paper-bg" style={{ height:'100%', display:'flex', flexDirection:'column', padding:'56px 24px 44px' }}>
      <ScreenHeader step={4} total={5} onBack={() => nav('q3')} accent={theme.accent}/>
      <div className="screen-scroll" style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
        <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, color: '#b3503a', letterSpacing: '0.15em', marginBottom: 6 }}>
          ๐๔ — กิน
        </div>
        <h2 style={{ fontFamily: 'Mitr, sans-serif', fontWeight: 500, fontSize: 24, margin: '0 0 4px', color: '#2a1f17', lineHeight: 1.25 }}>
          วันนี้กินอะไรไปแล้ว?
        </h2>
        <p style={{ fontFamily: 'IBM Plex Sans Thai, sans-serif', fontSize: 13, color: '#8a7a66', margin: '0 0 18px' }}>
          แตะหมวดที่เข้ามาในท้องวันนี้
        </p>
        <ChipGroup options={opts} value={state.foods} multi columns={2}
          onChange={(v) => setState({...state, foods: v})}/>

        {(state.foods || []).length > 0 && (
          <div style={{ marginTop: 16 }}>
            <MooSays accent={theme.accent}>
              {(() => {
                const f = state.foods;
                if (!f.includes('water')) return 'ลืมน้ำเปล่า? เติมเลยอีกแก้วหนึ่ง';
                if (!f.includes('veg') && !f.includes('fruit')) return 'มื้อต่อไปเสริมผักหรือผลไม้สัก 1 ฝ่ามือ';
                if (f.includes('fried') && f.includes('sweet')) return 'มันส์เลยวันนี้ มื้อต่อไปจัดเบาๆ สมดุลกันนะ';
                return 'จานวันนี้โอเคทีเดียว เก็บไว้ทำต่อพรุ่งนี้';
              })()}
            </MooSays>
          </div>
        )}
      </div>
      <BigButton variant="brick" onClick={() => nav('q5')} disabled={!(state.foods||[]).length}>ต่อไป →</BigButton>
    </div>
  );
}

// ── Question 5: Wish text ───────────────────────────────────
function ScreenQ5({ state, setState, nav, theme }) {
  const [val, setVal] = React.useState(state.wish || '');
  const presets = [
    'อยากนอนเร็วขึ้น',
    'อยากกินผักมากขึ้น',
    'อยากเดินทุกวัน',
    'อยากเลิกจอตอนค่ำ',
  ];
  return (
    <div className="paper-bg" style={{ height:'100%', display:'flex', flexDirection:'column', padding:'56px 24px 44px' }}>
      <ScreenHeader step={5} total={5} onBack={() => nav('q4')} accent={theme.accent}/>
      <div className="screen-scroll" style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
        <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, color: '#b3503a', letterSpacing: '0.15em', marginBottom: 6 }}>
          ๐๕ — คำขอเล็กๆ
        </div>
        <h2 style={{ fontFamily: 'Mitr, sans-serif', fontWeight: 500, fontSize: 24, margin: '0 0 4px', color: '#2a1f17', lineHeight: 1.25 }}>
          พรุ่งนี้อยากให้อะไรดีขึ้น?
        </h2>
        <p style={{ fontFamily: 'IBM Plex Sans Thai, sans-serif', fontSize: 13, color: '#8a7a66', margin: '0 0 18px' }}>
          ขอแค่อย่างเดียวพอ ไม่ต้องเยอะ
        </p>

        <div style={{
          background: '#fff8ec', border: '1.5px dashed rgba(42,31,23,0.35)',
          borderRadius: 14, padding: 14, position: 'relative',
        }}>
          <textarea
            value={val}
            onChange={(e) => { setVal(e.target.value); setState({...state, wish: e.target.value}); }}
            placeholder="พิมพ์สั้นๆ ก็ได้…"
            style={{
              width: '100%', border: 'none', outline: 'none',
              background: 'transparent', resize: 'none',
              fontFamily: 'IBM Plex Sans Thai, sans-serif',
              fontSize: 15, color: '#2a1f17',
              minHeight: 80,
              lineHeight: 1.5,
            }}
          />
          <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9, color: '#8a7a66', textAlign: 'right', letterSpacing: '0.1em' }}>
            {val.length} / 140
          </div>
        </div>

        <div style={{ marginTop: 14 }}>
          <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9, color: '#8a7a66', letterSpacing: '0.18em', marginBottom: 8 }}>
            ◇ หรือเลือกจากนี้
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {presets.map(p => (
              <button type="button" key={p} onClick={() => { setVal(p); setState({...state, wish: p}); }}
                style={{
                  background: val === p ? '#2a1f17' : 'transparent',
                  color: val === p ? '#f4ead7' : '#2a1f17',
                  border: '1px solid rgba(42,31,23,0.4)',
                  borderRadius: 999, padding: '7px 12px',
                  fontFamily: 'IBM Plex Sans Thai, sans-serif',
                  fontSize: 12, cursor: 'pointer',
                }}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
      <BigButton variant="brick" onClick={() => nav('result')} disabled={!val.trim()}>
        ดูแผนวันนี้ ✦
      </BigButton>
    </div>
  );
}

// ── Result screen — HP gauge + plan cards ───────────────────
function ScreenResult({ state, nav, theme }) {
  // Compute HP from inputs
  const hp = React.useMemo(() => {
    let n = state.energy * 0.6;
    const goodMood = ['calm','happy'].includes(state.mood);
    const badMood  = ['tired','tense','lonely'].includes(state.mood);
    n += goodMood ? 15 : badMood ? -8 : 5;
    n -= (state.signals || []).filter(s => s !== 'none').length * 4;
    const f = state.foods || [];
    if (f.includes('water')) n += 4;
    if (f.includes('veg'))   n += 4;
    if (f.includes('fruit')) n += 3;
    if (f.includes('fried')) n -= 3;
    if (f.includes('sweet')) n -= 2;
    return Math.max(15, Math.min(100, Math.round(n)));
  }, [state]);

  // Plan items
  const plan = React.useMemo(() => {
    const items = [];
    if (state.energy < 50) items.push({ time: '12:30', icon: '🌙', t: 'งีบสั้น 15 นาที', tag: 'พักก่อน' });
    if ((state.signals||[]).includes('thirst') || !(state.foods||[]).includes('water')) items.push({ time: 'เดี๋ยวนี้', icon: '💧', t: 'น้ำเปล่า 1 แก้ว', tag: 'ง่ายๆ' });
    if (!(state.foods||[]).includes('veg') && !(state.foods||[]).includes('fruit')) items.push({ time: 'มื้อต่อไป', icon: '🥬', t: 'ผักหรือผลไม้ 1 ฝ่ามือ', tag: 'กิน' });
    if ((state.signals||[]).includes('sore') || (state.signals||[]).includes('eye')) items.push({ time: 'ทุกชั่วโมง', icon: '🧘', t: 'ยืดตัว 1 นาที', tag: 'ขยับ' });
    if (state.mood === 'tense' || state.mood === 'mixed') items.push({ time: 'ก่อนนอน', icon: '🌬', t: 'หายใจ 4-7-8 สามรอบ', tag: 'ใจ' });
    if ((state.signals||[]).includes('sleep')) items.push({ time: '21:30', icon: '📵', t: 'ปิดจอ ดับไฟใหญ่', tag: 'นอน' });
    if (state.mood === 'lonely') items.push({ time: 'วันนี้', icon: '✉️', t: 'ทักหาคน 1 คน', tag: 'ใจ' });
    if (items.length < 3) items.push({ time: 'เช้าพรุ่งนี้', icon: '☀️', t: 'รับแสงแดด 10 นาที', tag: 'สดชื่น' });
    return items.slice(0, 5);
  }, [state]);

  const hpLabel = hp < 35 ? 'ขอพัก' : hp < 60 ? 'พอใช้' : hp < 80 ? 'ดี' : 'แจ่ม';
  const hpColor = hp < 35 ? '#b3503a' : hp < 60 ? '#d49a3a' : '#5a7a3e';

  return (
    <div className="paper-bg screen-scroll" style={{ height:'100%', overflowY:'auto', padding:'56px 22px 48px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, color: '#b3503a', letterSpacing: '0.18em' }}>
          แผนวันนี้ ✦ {new Date().toLocaleDateString('th-TH', { day:'numeric', month:'short' })}
        </div>
        <button type="button" onClick={() => nav('welcome')} style={{
          background: 'transparent', border: '1px solid rgba(42,31,23,0.25)',
          borderRadius: 999, padding: '4px 10px', cursor: 'pointer',
          fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, color: '#5a4a3a',
        }}>↻ ใหม่</button>
      </div>

      {/* HP gauge — big circular */}
      <div style={{
        background: '#fff8ec', borderRadius: 22, padding: '18px 18px 16px',
        border: '1.5px solid rgba(42,31,23,0.2)', position: 'relative',
        boxShadow: '0 1px 0 rgba(42,31,23,0.06)',
      }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          {/* gauge SVG */}
          <div style={{ position: 'relative', width: 110, height: 110, flexShrink: 0 }}>
            <svg viewBox="0 0 100 100" width="110" height="110">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#e3d4b3" strokeWidth="10"/>
              <circle cx="50" cy="50" r="42" fill="none" stroke={hpColor} strokeWidth="10"
                strokeDasharray={`${(hp/100)*264} 264`}
                strokeDashoffset="0"
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
                style={{ transition: 'stroke-dasharray 1.2s cubic-bezier(.4,1.6,.5,1)' }}/>
              {/* tick marks */}
              {Array.from({length: 12}).map((_,i)=> {
                const a = (i / 12) * Math.PI * 2;
                const x1 = 50 + Math.cos(a) * 32;
                const y1 = 50 + Math.sin(a) * 32;
                const x2 = 50 + Math.cos(a) * 28;
                const y2 = 50 + Math.sin(a) * 28;
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(42,31,23,0.3)" strokeWidth="1"/>;
              })}
            </svg>
            <div style={{
              position: 'absolute', inset: 0, display: 'flex',
              flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ fontFamily: 'Mitr, sans-serif', fontWeight: 600, fontSize: 28, color: '#2a1f17', lineHeight: 1 }}>
                {hp}
              </div>
              <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9, color: '#8a7a66', letterSpacing: '0.15em', marginTop: 2 }}>
                HP
              </div>
            </div>
          </div>

          <div className="screen-scroll" style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
            <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9, color: '#8a7a66', letterSpacing: '0.18em' }}>
              สถานะหมูวันนี้
            </div>
            <div style={{
              fontFamily: 'Mitr, sans-serif', fontWeight: 600, fontSize: 22, color: hpColor, marginTop: 2,
            }}>
              {hpLabel}
            </div>
            <div style={{ marginTop: 8 }}>
              <HPBar value={hp} label="พลังรวม"/>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 14, paddingTop: 12, borderTop: '1px dashed rgba(42,31,23,0.18)' }}>
          {[
            { l: 'กาย', v: Math.min(100, state.energy + ((state.foods||[]).includes('water')?5:0)) },
            { l: 'ใจ',  v: ['calm','happy'].includes(state.mood) ? 80 : ['tired','tense','lonely'].includes(state.mood) ? 40 : 60 },
            { l: 'กิน', v: Math.min(100, ((state.foods||[]).filter(f=>['veg','fruit','water'].includes(f)).length * 25) + 20) },
          ].map(s => (
            <div key={s.l} style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9, color: '#8a7a66', letterSpacing: '0.15em', marginBottom: 4 }}>{s.l}</div>
              <div style={{ height: 6, background: '#e3d4b3', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{
                  height: '100%', width: s.v + '%',
                  background: s.v < 40 ? '#b3503a' : s.v < 70 ? '#d49a3a' : '#5a7a3e',
                  borderRadius: 999,
                  transition: 'width 1s',
                }}/>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wish callout */}
      {state.wish && (
        <div style={{ marginTop: 14 }}>
          <MooSays accent={theme.accent}>
            ขอจดไว้ว่า "<b style={{ color: '#b3503a' }}>{state.wish}</b>" หมูจะค่อยๆ ช่วยให้ใกล้ขึ้นทีละนิด
          </MooSays>
        </div>
      )}

      {/* Plan list */}
      <div style={{ marginTop: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <LaiThaiBorder width={100} color="#b3503a"/>
          <div style={{ fontFamily: 'Mitr, sans-serif', fontSize: 14, color: '#2a1f17', fontWeight: 500 }}>
            แผนเล็กๆ วันนี้
          </div>
          <LaiThaiBorder width={100} color="#b3503a"/>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {plan.map((p, i) => (
            <div key={i} className="float-up" style={{
              animationDelay: (200 + i * 80) + 'ms',
              background: '#fff8ec', borderRadius: 14,
              border: '1px solid rgba(42,31,23,0.18)',
              padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                background: '#f4ead7', border: '1.5px solid rgba(42,31,23,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, flexShrink: 0,
              }}>{p.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9, color: '#b3503a', letterSpacing: '0.18em', fontWeight: 600 }}>
                  {p.time} · {p.tag}
                </div>
                <div style={{ fontFamily: 'IBM Plex Sans Thai, sans-serif', fontSize: 14, color: '#2a1f17', fontWeight: 500, marginTop: 1 }}>
                  {p.t}
                </div>
              </div>
              <div style={{
                width: 22, height: 22, borderRadius: 6,
                border: '1.5px solid rgba(42,31,23,0.4)',
                flexShrink: 0,
              }}/>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <BigButton variant="leaf" onClick={() => nav('dashboard')} icon="✦">
          เก็บแผนนี้ไว้
        </BigButton>
        <BigButton variant="ghost" onClick={() => nav('welcome')}>
          เริ่มใหม่อีกครั้ง
        </BigButton>
      </div>
    </div>
  );
}

// ── Dashboard — daily home after saving plan ────────────────
function ScreenDashboard({ state, nav, theme }) {
  const [done, setDone] = React.useState({});
  const tasks = React.useMemo(() => ([
    { id:'a', icon:'💧', t:'จิบน้ำ 1 แก้ว', time:'เช้านี้' },
    { id:'b', icon:'🥬', t:'กินผักสักจาน',    time:'มื้อกลางวัน' },
    { id:'c', icon:'🧘', t:'ยืดตัว 1 นาที',  time:'ทุก 2 ชม.' },
    { id:'d', icon:'🌬', t:'หายใจช้า 3 ครั้ง', time:'ก่อนนอน' },
    { id:'e', icon:'📵', t:'ปิดจอ 30 นาที',  time:'21:30' },
  ]), []);
  const doneCount = Object.values(done).filter(Boolean).length;
  const pct = (doneCount / tasks.length) * 100;

  const days = ['จ','อ','พ','พฤ','ศ','ส','อา'];
  const today = 3; // Thursday-ish demo
  const streak = [70, 45, 80, pct, null, null, null];

  return (
    <div className="paper-bg screen-scroll" style={{ height:'100%', overflowY:'auto', padding:'56px 22px 110px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
        <div>
          <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, color: '#8a7a66', letterSpacing: '0.18em' }}>
            {new Date().toLocaleDateString('th-TH', { weekday: 'long', day:'numeric', month:'long' })}
          </div>
          <div style={{ fontFamily: 'Mitr, sans-serif', fontSize: 24, fontWeight: 500, color: '#2a1f17', marginTop: 2 }}>
            สวัสดีจ้า~
          </div>
        </div>
        <div style={{
          width: 44, height: 44, borderRadius: '50%',
          background: '#fff8ec', border: '1.5px solid rgba(42,31,23,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <MooMascot size={38} variant={theme.mascot} wobble={false}/>
        </div>
      </div>

      {/* Streak strip */}
      <div style={{
        background: '#fff8ec', borderRadius: 18, padding: '14px 14px 12px',
        border: '1px solid rgba(42,31,23,0.18)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9, color: '#8a7a66', letterSpacing: '0.18em' }}>
            สัปดาห์นี้
          </div>
          <div style={{ fontFamily: 'Charmonman, cursive', fontSize: 18, color: '#b3503a', fontWeight: 700, lineHeight: 1 }}>
            ติดต่อกัน 3 วัน 🔥
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end' }}>
          {days.map((d, i) => {
            const v = streak[i];
            const isToday = i === today;
            return (
              <div key={d} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{
                  height: 48, background: '#f4ead7', borderRadius: 8,
                  border: isToday ? '1.5px solid #2a1f17' : '1px solid rgba(42,31,23,0.15)',
                  position: 'relative', overflow: 'hidden',
                  display: 'flex', alignItems: 'flex-end',
                }}>
                  {v != null && (
                    <div style={{
                      width: '100%', height: v + '%',
                      background: isToday ? 'linear-gradient(to top, #b3503a, #d49a3a)' : '#d49a3a',
                      opacity: isToday ? 1 : 0.65,
                      transition: 'height 0.8s',
                    }}/>
                  )}
                </div>
                <div style={{
                  fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, marginTop: 4,
                  color: isToday ? '#2a1f17' : '#8a7a66',
                  fontWeight: isToday ? 600 : 400,
                }}>{d}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Today summary card */}
      <div style={{
        marginTop: 14,
        background: 'linear-gradient(135deg, #2a1f17, #3a2a1f)',
        borderRadius: 18, padding: '16px 16px 14px',
        color: '#f4ead7', position: 'relative', overflow: 'hidden',
      }}>
        {/* corner ornament */}
        <svg viewBox="0 0 100 100" width="120" height="120" style={{
          position: 'absolute', right: -20, bottom: -20, opacity: 0.15,
        }}>
          {[0,60,120,180,240,300].map((deg,i)=>(
            <ellipse key={i} cx="50" cy="20" rx="8" ry="22" fill="#d49a3a"
              transform={`rotate(${deg} 50 50)`}/>
          ))}
        </svg>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9, color: 'rgba(244,234,215,0.6)', letterSpacing: '0.2em' }}>
              ภารกิจวันนี้
            </div>
            <div style={{ fontFamily: 'Mitr, sans-serif', fontSize: 22, fontWeight: 500, marginTop: 2 }}>
              {doneCount} / {tasks.length} <span style={{ color: 'rgba(244,234,215,0.6)', fontSize: 14, fontWeight: 400 }}>เสร็จแล้ว</span>
            </div>
          </div>
          <div style={{
            background: 'rgba(212,154,58,0.18)', border: '1px solid rgba(212,154,58,0.45)',
            borderRadius: 999, padding: '4px 10px',
            fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, color: '#d49a3a',
            letterSpacing: '0.1em',
          }}>+{Math.round(pct * 0.3)} HP</div>
        </div>

        <div style={{
          marginTop: 14, height: 8, background: 'rgba(244,234,215,0.12)',
          borderRadius: 999, overflow: 'hidden',
        }}>
          <div style={{
            height: '100%', width: pct + '%',
            background: 'linear-gradient(90deg, #d49a3a, #b3503a)',
            borderRadius: 999, transition: 'width 0.5s',
          }}/>
        </div>
      </div>

      {/* Tasks */}
      <div style={{
        fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, color: '#b3503a',
        letterSpacing: '0.18em', margin: '20px 0 10px', fontWeight: 600,
      }}>
        ◇ แตะเพื่อทำเสร็จ
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {tasks.map((t) => {
          const isDone = !!done[t.id];
          return (
            <button type="button" key={t.id} onClick={() => setDone({...done, [t.id]: !isDone})}
              style={{
                background: isDone ? 'rgba(90,122,62,0.12)' : '#fff8ec',
                border: '1.5px solid ' + (isDone ? '#5a7a3e' : 'rgba(42,31,23,0.18)'),
                borderRadius: 14, padding: '12px 14px',
                display: 'flex', alignItems: 'center', gap: 12,
                cursor: 'pointer', width: '100%', textAlign: 'left',
                transition: 'all 0.2s',
              }}>
              <div style={{
                width: 26, height: 26, borderRadius: 8, flexShrink: 0,
                border: '1.5px solid ' + (isDone ? '#5a7a3e' : 'rgba(42,31,23,0.4)'),
                background: isDone ? '#5a7a3e' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#f4ead7', fontSize: 14,
              }}>{isDone && '✓'}</div>
              <div className="screen-scroll" style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
                <div style={{ fontFamily: 'IBM Plex Sans Thai, sans-serif', fontSize: 14,
                  color: '#2a1f17', fontWeight: 500,
                  textDecoration: isDone ? 'line-through' : 'none',
                  opacity: isDone ? 0.55 : 1,
                }}>
                  {t.t}
                </div>
                <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9, color: '#8a7a66', letterSpacing: '0.12em', marginTop: 1 }}>
                  {t.time}
                </div>
              </div>
              <div style={{ fontSize: 22, opacity: isDone ? 0.4 : 1 }}>{t.icon}</div>
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: 18 }}>
        <BigButton variant="paper" onClick={() => nav('welcome')}>
          เช็คอินใหม่พรุ่งนี้
        </BigButton>
      </div>

      {/* Bottom nav */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: '#fff8ec', borderTop: '1px solid rgba(42,31,23,0.15)',
        padding: '10px 24px 24px',
        display: 'flex', justifyContent: 'space-around',
      }}>
        {[
          { i: '🏠', t: 'วันนี้', active: true },
          { i: '🗓', t: 'แผน', active: false },
          { i: '📊', t: 'ย้อน', active: false },
          { i: '◌', t: 'หมู', active: false, onClick: () => nav('welcome') },
        ].map(b => (
          <button type="button" key={b.t} onClick={b.onClick}
            style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              textAlign: 'center', padding: 4,
              opacity: b.active ? 1 : 0.45,
            }}>
            <div style={{ fontSize: 18 }}>{b.i}</div>
            <div style={{
              fontFamily: 'IBM Plex Mono, monospace', fontSize: 9, color: '#2a1f17',
              letterSpacing: '0.12em', marginTop: 2,
              fontWeight: b.active ? 600 : 400,
            }}>{b.t}</div>
            {b.active && (
              <div style={{ height: 2, width: 18, background: '#b3503a', borderRadius: 999, margin: '4px auto 0' }}/>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, {
  ScreenWelcome, ScreenQ1, ScreenQ2, ScreenQ3, ScreenQ4, ScreenQ5,
  ScreenResult, ScreenDashboard,
});
