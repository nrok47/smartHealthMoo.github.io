// Main app — router, tweaks, flow map overlay

const SCREEN_ORDER = ['welcome', 'cards', 'result', 'dashboard'];
const SCREEN_LABELS = {
  welcome:   'Welcome',
  cards:     'เซียมซี ๖ ใบ',
  result:    'ใบเซียมซี',
  dashboard: 'แดชบอร์ด',
  // legacy 5-question flow (still reachable via Tweaks)
  q1: 'Q1 · พลัง',
  q2: 'Q2 · ใจ',
  q3: 'Q3 · กาย',
  q4: 'Q4 · กิน',
  q5: 'Q5 · คำขอ',
};

function ScreenRouter({ screen, state, setState, nav, theme, openModal }) {
  switch (screen) {
    case 'welcome':   return <ScreenWelcome   nav={nav} theme={theme}/>;
    case 'cards':     return <ScreenCards     state={state} setState={setState} nav={nav} theme={theme}/>;
    case 'result':    return <ScreenResultV2  state={state} nav={nav} theme={theme} openModal={openModal}/>;
    case 'dashboard': return <ScreenDashboard state={state} nav={nav} theme={theme}/>;
    // legacy
    case 'q1':        return <ScreenQ1   state={state} setState={setState} nav={nav} theme={theme}/>;
    case 'q2':        return <ScreenQ2   state={state} setState={setState} nav={nav} theme={theme}/>;
    case 'q3':        return <ScreenQ3   state={state} setState={setState} nav={nav} theme={theme}/>;
    case 'q4':        return <ScreenQ4   state={state} setState={setState} nav={nav} theme={theme}/>;
    case 'q5':        return <ScreenQ5   state={state} setState={setState} nav={nav} theme={theme}/>;
    default: return null;
  }
}

// Phone shell wrapping screens with iOS frame (demo mode) or fullscreen (app mode)
function Phone({ screen, state, setState, nav, theme, openModal, modal, closeModal, mode = 'demo', scale = 1 }) {
  const screenContent = (
    <div style={{ height: '100%', overflow: 'hidden', position: 'relative', background: '#f4ead7' }}>
      <ScreenRouter screen={screen} state={state} setState={setState} nav={nav} theme={theme} openModal={openModal}/>
      {modal === 'lm'       && <LMModal       onClose={closeModal} onRegister={() => openModal('register')}/>}
      {modal === 'register' && <RegisterModal onClose={closeModal}/>}
      {modal === 'wisdom'   && <WisdomModal   onClose={closeModal} userAnswers={state.pillars}/>}
    </div>
  );

  if (mode === 'app') {
    // Fullscreen — no iOS frame, fills viewport
    return (
      <div className="ios-device-wrap" style={{ width: '100%', height: '100vh', overflow: 'hidden', position: 'relative' }}>
        {screenContent}
      </div>
    );
  }

  return (
    <div className="ios-device-wrap" style={{ transform: `scale(${scale})`, transformOrigin: 'center top' }}>
      <IOSDevice>
        {screenContent}
      </IOSDevice>
    </div>
  );
}

// Flow Map — see all screens at once
function FlowMap({ state, theme, onClose, onPick }) {
  return (
    <div className="flow-overlay">
      <button type="button" className="flow-close" onClick={onClose}>✕ ปิด</button>
      <h2>Flow Map · {SCREEN_ORDER.length} screens</h2>
      <p className="sub">ทุกหน้าจอในแอป — แตะอันไหนเพื่อกระโดดไปดู</p>

      <div className="flow-grid">
        {SCREEN_ORDER.map((s, i) => (
          <div key={s} className="flow-thumb" onClick={() => onPick(s)}>
            <div className="scene-wrap">
              <div className="scene" style={{ width: 390, height: 'auto' }}>
                <div style={{
                  width: 390, height: 844,
                  background: '#f4ead7', borderRadius: 48,
                  overflow: 'hidden', position: 'relative',
                  boxShadow: '0 0 0 6px #000 inset, 0 0 0 8px #1a1a1a',
                }}>
                  <ScreenRouter
                    screen={s}
                    state={state}
                    setState={() => {}}
                    nav={() => {}}
                    theme={theme}
                    openModal={() => {}}/>
                </div>
              </div>
            </div>
            <div className="label">
              <span><b>{String(i+1).padStart(2,'0')}</b> · {SCREEN_LABELS[s]}</span>
              <span style={{ opacity: 0.5 }}>→</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette":  "cream",
  "mascot":   "pig",
  "accent":   "#b3503a",
  "showFlowBtn": true
}/*EDITMODE-END*/;

const PALETTES = {
  cream:  { bg: '#f4ead7', accent: '#b3503a', name: 'ครีมไทยบ้าน' },
  leaf:   { bg: '#e8e8d0', accent: '#5a7a3e', name: 'ใบไม้' },
  indigo: { bg: '#e3dccc', accent: '#3a4f7a', name: 'หม่อฮ่อม' },
  brick:  { bg: '#f0d8c8', accent: '#8a3a28', name: 'อิฐแดง' },
};

function App() {
  // Read mode from <html data-mode="">: 'app' on mobile (fullscreen), 'demo' on desktop (iOS frame)
  const initialMode = (typeof document !== 'undefined' && document.documentElement.dataset.mode) || 'demo';
  const [mode, setMode] = React.useState(initialMode);

  // Load persisted state from localStorage
  const PERSIST_KEY = 'health-moo-v2';
  const persisted = (() => {
    try { return JSON.parse(localStorage.getItem(PERSIST_KEY) || 'null'); }
    catch { return null; }
  })();

  const [screen, setScreen] = React.useState(persisted?.screen || 'welcome');
  const [modal, setModal] = React.useState(null);
  const [state, setState] = React.useState(persisted?.state || {
    // V2 — เซียมซี 6 ใบ
    pillars: {},
    // V1 legacy
    energy: 55, mood: null, signals: [], foods: [], wish: '',
  });
  const [toast, setToast] = React.useState(null);
  const [flowOpen, setFlowOpen] = React.useState(false);
  const [t, setTweak] = (window.useTweaks ? useTweaks(TWEAK_DEFAULTS) : [TWEAK_DEFAULTS, () => {}]);

  // Persist state + screen on change (no PII — only quiz answers)
  React.useEffect(() => {
    try {
      // Skip persisting on the welcome screen so a fresh visit starts clean unless answers exist
      const hasAnswers = state.pillars && Object.keys(state.pillars).length > 0;
      if (hasAnswers || screen !== 'welcome') {
        localStorage.setItem(PERSIST_KEY, JSON.stringify({ screen, state }));
      }
    } catch {}
  }, [screen, state]);

  // Toast helper — show transient message
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2400);
  };
  // Expose for other components
  React.useEffect(() => { window.__showToast = showToast; }, []);

  // Track viewport changes so the user can rotate / resize and have the frame mode follow
  React.useEffect(() => {
    const mql = window.matchMedia('(max-width: 720px)');
    const handler = (e) => {
      const override = new URLSearchParams(window.location.search).get('mode');
      if (override) return;
      const next = e.matches ? 'app' : 'demo';
      setMode(next);
      document.body.classList.toggle('app-mode', next === 'app');
      document.body.classList.toggle('demo-mode', next === 'demo');
    };
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  const openModal = (m) => setModal(m);
  const closeModal = () => setModal(null);

  // Read ?score=N&status=... from URL on mount (for shared links)
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const s = params.get('score');
    if (s && !isNaN(+s)) {
      // Reverse-engineer pillars from a score (demo only — distribute evenly)
      const target = Math.max(0, Math.min(100, +s));
      const demo = {};
      window.PILLARS && window.PILLARS.forEach((p) => {
        // pick closest option
        const opt = p.options.reduce((best, o) =>
          Math.abs(o.s - target) < Math.abs(best.s - target) ? o : best, p.options[0]);
        demo[p.key] = opt;
      });
      setState(prev => ({ ...prev, pillars: demo }));
      setScreen('result');
    }
  }, []);

  const theme = {
    mascot: t.mascot,
    accent: PALETTES[t.palette]?.accent || '#b3503a',
    palette: t.palette,
  };

  // Apply theme to CSS vars
  React.useEffect(() => {
    const p = PALETTES[t.palette];
    if (!p) return;
    document.documentElement.style.setProperty('--paper', p.bg);
    document.documentElement.style.setProperty('--brick', p.accent);
  }, [t.palette]);

  const nav = (s) => setScreen(s);

  return (
    <div className="stage">
      {mode === 'demo' && (
        <div className="stage-label">
          <b>HEALTH-MOO</b> · มูเตลู อีทติ้ง<br/>
          เซียมซีสุขภาพ ๖ ใบ · LM ศอ.10 อุบลฯ<br/>
          <span style={{ opacity: 0.5 }}>?mode=app เพื่อฟูลสกรีน</span>
        </div>
      )}

      <Phone screen={screen} state={state} setState={setState} nav={nav} theme={theme}
             modal={modal} openModal={openModal} closeModal={closeModal} mode={mode}/>

      {mode === 'demo' && t.showFlowBtn && (
        <button type="button" className="flow-btn" onClick={() => setFlowOpen(true)}>
          <span style={{ fontSize: 14 }}>🗺</span>
          <span>Flow Map · {SCREEN_ORDER.length} หน้า</span>
        </button>
      )}

      {flowOpen && (
        <FlowMap
          state={state}
          theme={theme}
          onClose={() => setFlowOpen(false)}
          onPick={(s) => { setScreen(s); setFlowOpen(false); }}/>
      )}

      {/* Toast — transient feedback */}
      {toast && (
        <div role="status" aria-live="polite" style={{
          position: 'fixed', bottom: 28, left: '50%', transform: 'translateX(-50%)',
          background: '#2a1f17', color: '#f4ead7',
          padding: '12px 20px', borderRadius: 999, zIndex: 300,
          fontFamily: 'IBM Plex Sans Thai, sans-serif', fontSize: 14, fontWeight: 500,
          boxShadow: '0 8px 24px rgba(42,31,23,0.4)',
          animation: 'float-up 0.25s ease-out',
          maxWidth: '90vw',
        }}>
          {toast}
        </div>
      )}

      {/* Tweaks panel */}
      {window.TweaksPanel && (
        <TweaksPanel title="Tweaks">
          <TweakSection label="ธีม">
            <TweakRadio label="โทนสี" value={t.palette}
              onChange={(v) => setTweak('palette', v)}
              options={[
                { value: 'cream',  label: 'ครีม' },
                { value: 'leaf',   label: 'ใบไม้' },
                { value: 'indigo', label: 'หม่อฮ่อม' },
                { value: 'brick',  label: 'อิฐ' },
              ]}/>
            <TweakRadio label="หมูตัวเอก" value={t.mascot}
              onChange={(v) => setTweak('mascot', v)}
              options={[
                { value: 'pig',      label: 'หมู' },
                { value: 'buffalo',  label: 'ควาย' },
                { value: 'lotus',    label: 'ดอกบัว' },
              ]}/>
            <TweakToggle label="ปุ่ม Flow Map"
              value={t.showFlowBtn}
              onChange={(v) => setTweak('showFlowBtn', v)}/>
          </TweakSection>

          <TweakSection label="ลัดไปหน้าจอ">
            <TweakSelect label="หน้าจอตอนนี้" value={screen}
              onChange={(v) => setScreen(v)}
              options={SCREEN_ORDER.map((s, i) => ({
                value: s, label: `${String(i+1).padStart(2,'0')} · ${SCREEN_LABELS[s]}`
              }))}/>
            <TweakButton label="↻ รีเซ็ตคำตอบ" onClick={() => {
              setState({ pillars: {}, energy: 55, mood: null, signals: [], foods: [], wish: '' });
              setScreen('welcome');
              try { localStorage.removeItem(PERSIST_KEY); } catch {}
            }}/>
            <TweakButton label="✦ เติมตัวอย่างคำตอบ" onClick={() => {
              // populate V2 pillars with mixed scores
              const demo = {};
              window.PILLARS && window.PILLARS.forEach((p, i) => {
                demo[p.key] = p.options[[2,1,2,1,0,2][i] || 1];
              });
              setState({
                pillars: demo,
                energy: 42, mood: 'tired', signals: ['sleep','eye'],
                foods: ['rice','coffee','sweet'], wish: 'อยากนอนเร็วขึ้น',
              });
              setScreen('result');
            }}/>
            <TweakButton label="🚀 เปิด LM Popup" onClick={() => openModal('lm')}/>
            <TweakButton label="📖 เปิดหอไตรความรู้" onClick={() => openModal('wisdom')}/>
          </TweakSection>
        </TweaksPanel>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
