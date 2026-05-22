// Shared components: Mascot, HPBar, Buttons, Chips, Slider, Cards, Patterns

// ── Moo mascot (pig — หมู — round friendly face) ────────────
function MooMascot({ size = 120, mood = 'happy', variant = 'pig', wobble = true }) {
  const wrap = {
    width: size, height: size, position: 'relative',
    display: 'inline-block',
  };
  // Original cute placeholder — round body + simple features (no copyrighted likeness)
  const s = size;
  const baseFill = variant === 'pig' ? '#f0c2b3' : variant === 'buffalo' ? '#8a7a66' : '#e3d4b3';
  const accent   = variant === 'pig' ? '#d99a8a' : variant === 'buffalo' ? '#5a4a3a' : '#d49a3a';
  const showHorns = variant === 'buffalo';
  const showLotus = variant === 'lotus';

  // eye shape varies with mood
  const eyeY = s * 0.55;
  const eyePath = mood === 'sleepy'
    ? `M${s*0.35} ${eyeY} q${s*0.05} ${s*0.02} ${s*0.1} 0`
    : mood === 'sad'
    ? `M${s*0.32} ${eyeY+s*0.02} q${s*0.06} -${s*0.04} ${s*0.12} 0`
    : `M${s*0.35} ${eyeY} q${s*0.05} -${s*0.04} ${s*0.1} 0`;
  const eye2Path = mood === 'sleepy'
    ? `M${s*0.55} ${eyeY} q${s*0.05} ${s*0.02} ${s*0.1} 0`
    : mood === 'sad'
    ? `M${s*0.52} ${eyeY+s*0.02} q${s*0.06} -${s*0.04} ${s*0.12} 0`
    : `M${s*0.55} ${eyeY} q${s*0.05} -${s*0.04} ${s*0.1} 0`;

  return (
    <div className={wobble ? 'moo-wobble' : ''} style={wrap}>
      <svg viewBox={`0 0 ${s} ${s}`} width={s} height={s}>
        {/* shadow */}
        <ellipse cx={s/2} cy={s*0.93} rx={s*0.32} ry={s*0.04} fill="rgba(42,31,23,0.18)" />
        {/* horns for buffalo */}
        {showHorns && (
          <g fill={accent}>
            <path d={`M${s*0.18} ${s*0.42} Q${s*0.05} ${s*0.30} ${s*0.16} ${s*0.22} Q${s*0.22} ${s*0.32} ${s*0.28} ${s*0.40} Z`} />
            <path d={`M${s*0.82} ${s*0.42} Q${s*0.95} ${s*0.30} ${s*0.84} ${s*0.22} Q${s*0.78} ${s*0.32} ${s*0.72} ${s*0.40} Z`} />
          </g>
        )}
        {/* lotus petals around head */}
        {showLotus && (
          <g fill={accent} opacity="0.5">
            {[0,60,120,180,240,300].map((deg,i)=>(
              <ellipse key={i} cx={s/2} cy={s*0.15} rx={s*0.08} ry={s*0.14}
                transform={`rotate(${deg} ${s/2} ${s/2})`} />
            ))}
          </g>
        )}
        {/* ears */}
        <path d={`M${s*0.22} ${s*0.36} Q${s*0.12} ${s*0.22} ${s*0.30} ${s*0.24} Z`} fill={baseFill} stroke="#2a1f17" strokeWidth="1.2"/>
        <path d={`M${s*0.78} ${s*0.36} Q${s*0.88} ${s*0.22} ${s*0.70} ${s*0.24} Z`} fill={baseFill} stroke="#2a1f17" strokeWidth="1.2"/>
        <path d={`M${s*0.22} ${s*0.36} Q${s*0.16} ${s*0.27} ${s*0.27} ${s*0.27}`} fill="none" stroke={accent} strokeWidth="1.5" strokeLinecap="round"/>
        <path d={`M${s*0.78} ${s*0.36} Q${s*0.84} ${s*0.27} ${s*0.73} ${s*0.27}`} fill="none" stroke={accent} strokeWidth="1.5" strokeLinecap="round"/>
        {/* head */}
        <circle cx={s/2} cy={s*0.58} r={s*0.32} fill={baseFill} stroke="#2a1f17" strokeWidth="1.5"/>
        {/* cheek blush */}
        <circle cx={s*0.30} cy={s*0.68} r={s*0.045} fill={accent} opacity="0.55"/>
        <circle cx={s*0.70} cy={s*0.68} r={s*0.045} fill={accent} opacity="0.55"/>
        {/* eyes */}
        <path d={eyePath} fill="none" stroke="#2a1f17" strokeWidth="2.4" strokeLinecap="round"/>
        <path d={eye2Path} fill="none" stroke="#2a1f17" strokeWidth="2.4" strokeLinecap="round"/>
        {/* snout */}
        <ellipse cx={s/2} cy={s*0.74} rx={s*0.13} ry={s*0.09} fill={accent} opacity="0.6" stroke="#2a1f17" strokeWidth="1.2"/>
        <circle cx={s*0.46} cy={s*0.74} r={s*0.012} fill="#2a1f17"/>
        <circle cx={s*0.54} cy={s*0.74} r={s*0.012} fill="#2a1f17"/>
      </svg>
    </div>
  );
}

// ── HP bar — gamified, segmented ────────────────────────────
function HPBar({ value = 70, max = 100, label = 'HP', animate = true }) {
  const pct = Math.max(0, Math.min(100, (value/max) * 100));
  const color = pct < 30 ? '#b3503a' : pct < 60 ? '#d49a3a' : '#5a7a3e';
  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, alignItems: 'baseline' }}>
        <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, letterSpacing: '0.15em', color: '#5a4a3a' }}>
          {label}
        </span>
        <span style={{ fontFamily: 'Mitr, sans-serif', fontWeight: 600, fontSize: 14, color: '#2a1f17' }}>
          {Math.round(value)}<span style={{ color: '#8a7a66', fontWeight: 400, fontSize: 11 }}> / {max}</span>
        </span>
      </div>
      <div style={{
        height: 14, background: '#e3d4b3', borderRadius: 999,
        border: '1px solid rgba(42,31,23,0.2)',
        position: 'relative', overflow: 'hidden',
        boxShadow: 'inset 0 1px 2px rgba(42,31,23,0.12)',
      }}>
        <div style={{
          height: '100%',
          width: pct + '%',
          background: `linear-gradient(90deg, ${color}, ${color}dd)`,
          borderRadius: 999,
          transition: 'width 0.8s cubic-bezier(.4,1.6,.5,1)',
          position: 'relative',
        }}>
          {/* hash marks */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'repeating-linear-gradient(135deg, rgba(255,255,255,0.18) 0 6px, transparent 6px 12px)',
          }} />
        </div>
        {/* tick marks */}
        {[25,50,75].map(t => (
          <div key={t} style={{
            position: 'absolute', left: t+'%', top: 2, bottom: 2,
            width: 1, background: 'rgba(42,31,23,0.18)',
          }}/>
        ))}
      </div>
    </div>
  );
}

// ── Primary button ──────────────────────────────────────────
function BigButton({ children, onClick, variant = 'brick', icon, disabled }) {
  const styles = {
    brick: { bg: '#b3503a', shadow: '#8a3a28', color: '#fff8ec' },
    leaf:  { bg: '#5a7a3e', shadow: '#3f5a28', color: '#f4ead7' },
    paper: { bg: '#f4ead7', shadow: '#c3b48a', color: '#2a1f17' },
    ghost: { bg: 'transparent', shadow: 'transparent', color: '#5a4a3a' },
  }[variant];
  const [pressed, setPressed] = React.useState(false);
  return (
    <button type="button"
      onClick={onClick}
      disabled={disabled}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      style={{
        background: styles.bg,
        color: styles.color,
        border: variant === 'paper' ? '1.5px solid rgba(42,31,23,0.5)' : 'none',
        padding: '14px 22px',
        borderRadius: 16,
        fontFamily: 'Mitr, sans-serif',
        fontWeight: 500,
        fontSize: 16,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        boxShadow: variant === 'ghost' ? 'none' : `0 ${pressed ? 1 : 4}px 0 ${styles.shadow}`,
        transform: pressed ? 'translateY(3px)' : 'translateY(0)',
        transition: 'transform 0.08s, box-shadow 0.08s',
        display: 'inline-flex', alignItems: 'center', gap: 8, justifyContent: 'center',
        width: '100%',
        letterSpacing: '0.01em',
      }}>
      {icon && <span style={{ fontSize: 18 }}>{icon}</span>}
      {children}
    </button>
  );
}

// ── Chip group (single or multi-select) ─────────────────────
function ChipGroup({ options, value, onChange, multi = false, columns = 2 }) {
  const isSelected = (v) => multi ? (value || []).includes(v) : value === v;
  const toggle = (v) => {
    if (multi) {
      const set = new Set(value || []);
      set.has(v) ? set.delete(v) : set.add(v);
      onChange([...set]);
    } else {
      onChange(v);
    }
  };
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: 10 }}>
      {options.map((opt, i) => {
        const sel = isSelected(opt.value);
        return (
          <button type="button" key={opt.value} onClick={() => toggle(opt.value)}
            className="float-up"
            style={{
              animationDelay: (i * 40) + 'ms',
              background: sel ? '#2a1f17' : '#f4ead7',
              color: sel ? '#f4ead7' : '#2a1f17',
              border: '1.5px solid ' + (sel ? '#2a1f17' : 'rgba(42,31,23,0.25)'),
              borderRadius: 14,
              padding: '12px 10px',
              fontFamily: 'IBM Plex Sans Thai, sans-serif',
              fontWeight: 500,
              fontSize: 14,
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-start',
              textAlign: 'left',
              transition: 'all 0.15s ease',
              transform: sel ? 'scale(1.02)' : 'scale(1)',
              boxShadow: sel ? '0 2px 0 rgba(42,31,23,0.6)' : '0 1px 0 rgba(42,31,23,0.1)',
            }}>
            <span style={{ fontSize: 18, lineHeight: 1 }}>{opt.icon}</span>
            <span style={{ flex: 1 }}>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ── Energy slider (custom thumb is the Moo) ─────────────────
function EnergySlider({ value, onChange }) {
  const ref = React.useRef(null);
  const onDown = (e) => {
    const move = (ev) => {
      const rect = ref.current.getBoundingClientRect();
      const x = (ev.touches ? ev.touches[0].clientX : ev.clientX) - rect.left;
      const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
      onChange(Math.round(pct));
    };
    move(e);
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('touchmove', move);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('touchend', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('touchmove', move);
    window.addEventListener('mouseup', up);
    window.addEventListener('touchend', up);
  };

  const labels = [
    { v: 10, t: 'หมด', i: '🥱' },
    { v: 35, t: 'เพลีย', i: '😮‍💨' },
    { v: 60, t: 'พอไหว', i: '🙂' },
    { v: 85, t: 'สดชื่น', i: '✨' },
  ];

  return (
    <div style={{ padding: '14px 0 22px' }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', marginBottom: 14,
        fontFamily: 'IBM Plex Mono, monospace', fontSize: 10, color: '#8a7a66',
        letterSpacing: '0.1em',
      }}>
        {labels.map(l => (
          <div key={l.v} style={{
            textAlign: 'center',
            opacity: Math.abs(value - l.v) < 18 ? 1 : 0.45,
            transition: 'opacity 0.2s',
          }}>
            <div style={{ fontSize: 18, marginBottom: 2 }}>{l.i}</div>
            <div>{l.t}</div>
          </div>
        ))}
      </div>
      <div
        ref={ref}
        onMouseDown={onDown}
        onTouchStart={onDown}
        style={{
          height: 24, background: '#e3d4b3',
          borderRadius: 999, position: 'relative',
          border: '1px solid rgba(42,31,23,0.2)',
          cursor: 'pointer',
          boxShadow: 'inset 0 1px 3px rgba(42,31,23,0.15)',
        }}>
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: value+'%',
          background: 'linear-gradient(90deg, #d49a3a, #b3503a)',
          borderRadius: 999,
        }}/>
        {/* tick marks */}
        {[25,50,75].map(t => (
          <div key={t} style={{
            position: 'absolute', left: t+'%', top: 4, bottom: 4,
            width: 1, background: 'rgba(42,31,23,0.18)',
          }}/>
        ))}
        {/* thumb */}
        <div style={{
          position: 'absolute', left: `calc(${value}% - 22px)`, top: -12,
          width: 44, height: 44,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            background: '#f4ead7', border: '2px solid #2a1f17',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 0 rgba(42,31,23,0.3)',
            fontSize: 22,
          }}>
            <MooMascot size={36} wobble={false} mood={value < 30 ? 'sleepy' : value > 70 ? 'happy' : 'happy'}/>
          </div>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: 28,
        fontFamily: 'Charmonman, cursive', fontSize: 28, color: '#b3503a', fontWeight: 700,
      }}>
        {value}<span style={{ fontSize: 14, color: '#8a7a66', fontWeight: 400 }}> / 100</span>
      </div>
    </div>
  );
}

// ── Section header with หน้าจอ pill ─────────────────────────
function ScreenHeader({ step, total, onBack, accent }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '8px 0 18px',
    }}>
      <button type="button" onClick={onBack} style={{
        background: 'transparent', border: '1px solid rgba(42,31,23,0.25)',
        borderRadius: 999, padding: '6px 12px', cursor: 'pointer',
        fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: '#5a4a3a',
        display: 'flex', alignItems: 'center', gap: 4,
      }}>
        ← ย้อน
      </button>
      <div style={{ display: 'flex', gap: 5 }}>
        {Array.from({length: total}).map((_, i) => (
          <div key={i} style={{
            width: i + 1 === step ? 24 : 8, height: 8, borderRadius: 4,
            background: i + 1 <= step ? (accent || '#b3503a') : '#e3d4b3',
            transition: 'all 0.3s',
          }}/>
        ))}
      </div>
      <div style={{
        fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: '#8a7a66',
      }}>
        {step}/{total}
      </div>
    </div>
  );
}

// ── Decorative lai-thai border (top/bottom of cards) ────────
function LaiThaiBorder({ width = 280, color = '#b3503a', flip = false }) {
  return (
    <svg viewBox="0 0 280 14" width={width} height={14} style={{ display:'block', transform: flip ? 'scaleY(-1)' : '' }}>
      <g fill={color} opacity="0.7">
        {Array.from({ length: 14 }).map((_, i) => {
          const x = 10 + i * 20;
          return (
            <g key={i}>
              <path d={`M${x} 12 L${x+6} 4 L${x+12} 12 Z`} />
              <circle cx={x+6} cy={2} r={1.4} />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

// ── Affirmation callout (อาจารย์หมูบอกว่า…) ─────────────────
function MooSays({ children, mood = 'happy', accent = '#b3503a' }) {
  return (
    <div className="float-up" style={{
      display: 'flex', alignItems: 'flex-start', gap: 10,
      background: '#fff8ec',
      border: '1.5px dashed ' + accent,
      borderRadius: 16,
      padding: '12px 14px',
      position: 'relative',
    }}>
      <div style={{ flexShrink: 0, marginTop: -2 }}>
        <MooMascot size={48} mood={mood} wobble />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{
          fontFamily: 'IBM Plex Mono, monospace', fontSize: 9, letterSpacing: '0.18em',
          color: accent, marginBottom: 3, fontWeight: 600,
        }}>
          อาจารย์หมูบอกว่า
        </div>
        <div style={{
          fontFamily: 'IBM Plex Sans Thai, sans-serif',
          fontSize: 14, color: '#2a1f17', lineHeight: 1.5,
        }}>
          {children}
        </div>
      </div>
    </div>
  );
}

// ── Pattern: subtle Thai dotted-line waves ──────────────────
function PatternWaves({ color = 'rgba(179,80,58,0.12)', height = 40 }) {
  return (
    <svg viewBox="0 0 320 40" width="100%" height={height} preserveAspectRatio="none" style={{ display:'block' }}>
      <path d="M0 20 Q40 5 80 20 T160 20 T240 20 T320 20" fill="none" stroke={color} strokeWidth="2" strokeDasharray="2 3"/>
      <path d="M0 30 Q40 15 80 30 T160 30 T240 30 T320 30" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="1 4"/>
    </svg>
  );
}

Object.assign(window, {
  MooMascot, HPBar, BigButton, ChipGroup, EnergySlider,
  ScreenHeader, LaiThaiBorder, MooSays, PatternWaves,
});
