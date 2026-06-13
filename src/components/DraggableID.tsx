import { useRef, useState, useEffect } from 'react';

interface DraggableIDProps {
  photoSrc?: string;
  name?: string;
  role?: string;
  school?: string;
  idNumber?: string;
}

const DraggableID = ({
  photoSrc,
  name = 'Aaron',
  role = 'IT Student · Developer',
  school = 'Quezon City University',
  idNumber = '23-2301',
}: DraggableIDProps) => {
  const wrapRef = useRef<HTMLDivElement>(null);

  // Drag state
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  // 3-D tilt
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [shine, setShine] = useState({ x: 50, y: 50 });
  const [lifted, setLifted] = useState(false);

  // lanyard swing angle (follows drag direction)
  const [swing, setSwing] = useState(0);
  const lastX = useRef(0);

  const onPointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    setLifted(true);
    lastX.current = e.clientX;
    dragOffset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging) {
      const dx = e.clientX - lastX.current;
      lastX.current = e.clientX;
      // lanyard swings opposite to drag direction
      setSwing(prev => Math.max(-22, Math.min(22, prev - dx * 0.4)));
      setPos({ x: e.clientX - dragOffset.current.x, y: e.clientY - dragOffset.current.y });
    }
    // Tilt
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setTilt({ rx: -((e.clientY - cy) / (rect.height / 2)) * 12, ry: ((e.clientX - cx) / (rect.width / 2)) * 12 });
    setShine({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  };

  const onPointerUp = () => {
    setDragging(false);
    setLifted(false);
    setTilt({ rx: 0, ry: 0 });
    setSwing(0);
  };

  const onPointerLeave = () => {
    if (!dragging) { setTilt({ rx: 0, ry: 0 }); setLifted(false); setSwing(0); }
  };

  // Hint
  const [hint, setHint] = useState(true);
  useEffect(() => { const t = setTimeout(() => setHint(false), 3500); return () => clearTimeout(t); }, []);

  const cardTransform = `
    translate(${pos.x}px, ${pos.y}px)
    perspective(800px)
    rotateX(${tilt.rx}deg)
    rotateY(${tilt.ry}deg)
    scale(${lifted ? 1.06 : 1})
  `;

  // Lanyard bezier path — starts at clip (top-centre of lace) and curves down to the card
  // The lace is 90px tall above the card. Clip at top, card hole at bottom.
  const laceH = 88;
  const laceW = 48;
  // The two strands run side by side, swing with drag
  const swingPx = swing * 0.6;

  return (
    <div
      ref={wrapRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerLeave}
      style={{
        transform: cardTransform,
        transition: dragging ? 'none' : 'transform 0.45s cubic-bezier(0.34,1.56,0.64,1)',
        cursor: dragging ? 'grabbing' : 'grab',
        touchAction: 'none',
        userSelect: 'none',
        willChange: 'transform',
      }}
      className="relative w-52 select-none"
    >
      {/* ── Lanyard / Lace ── */}
      <div
        className="flex justify-center mb-0 pointer-events-none"
        style={{
          height: laceH,
          position: 'relative',
        }}
      >
        {/* SVG lanyard */}
        <svg
          width={laceW + 16}
          height={laceH}
          viewBox={`0 0 ${laceW + 16} ${laceH}`}
          style={{
            overflow: 'visible',
            transform: `translateX(${swingPx}px)`,
            transition: dragging ? 'none' : 'transform 0.6s cubic-bezier(0.34,1.56,0.64,1)',
          }}
        >
          {/* Clip / holder at the top */}
          <rect x={(laceW + 16) / 2 - 6} y={0} width={12} height={6} rx={2} fill="#6b7280" />
          <rect x={(laceW + 16) / 2 - 3} y={4} width={6} height={4} rx={1} fill="#9ca3af" />

          {/* Left lanyard strand */}
          <path
            d={`M ${(laceW + 16) / 2 - 2} 8 Q ${(laceW + 16) / 2 - laceW / 2} ${laceH * 0.55} ${(laceW + 16) / 2 - 6} ${laceH}`}
            fill="none"
            stroke="url(#laceGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Right lanyard strand */}
          <path
            d={`M ${(laceW + 16) / 2 + 2} 8 Q ${(laceW + 16) / 2 + laceW / 2} ${laceH * 0.55} ${(laceW + 16) / 2 + 6} ${laceH}`}
            fill="none"
            stroke="url(#laceGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Diagonal weave lines on strands (decorative) */}
          {[0.25, 0.45, 0.65].map((t, i) => {
            const lx = (laceW + 16) / 2 - 2 + ((laceW + 16) / 2 - 6 - ((laceW + 16) / 2 - 2)) * t;
            const ly = 8 + (laceH - 8) * t;
            const rx2 = (laceW + 16) / 2 + 2 + ((laceW + 16) / 2 + 6 - ((laceW + 16) / 2 + 2)) * t;
            return (
              <line key={i} x1={lx} y1={ly} x2={rx2} y2={ly}
                stroke="rgba(245,158,11,0.5)" strokeWidth="1.2" strokeLinecap="round" />
            );
          })}

          {/* Badge hole circle at bottom of lace */}
          <circle cx={(laceW + 16) / 2} cy={laceH} r={5} fill="#374151" stroke="#6b7280" strokeWidth="1.5" />
          <circle cx={(laceW + 16) / 2} cy={laceH} r={2} fill="#111827" />

          <defs>
            <linearGradient id="laceGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#92400e" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ── Card body ── */}
      <div
        style={{
          boxShadow: lifted
            ? '0 32px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(245,158,11,0.35)'
            : '0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(245,158,11,0.15)',
          transition: 'box-shadow 0.3s',
        }}
        className="relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border border-white/10 rounded-2xl overflow-hidden"
      >
        {/* Holographic shine */}
        <div
          className="absolute inset-0 pointer-events-none z-10 rounded-2xl opacity-30"
          style={{ background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(245,158,11,0.4) 0%, rgba(139,92,246,0.2) 40%, transparent 70%)` }}
        />

        {/* Top stripe */}
        <div className="h-8 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 flex items-center px-3 gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-white/70" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
          <span className="ml-auto text-[9px] font-black text-amber-900 tracking-widest uppercase">Student ID</span>
        </div>

        {/* School */}
        <div className="px-4 pt-3 pb-1">
          <p className="text-[9px] font-bold tracking-widest text-amber-400/80 uppercase truncate">{school}</p>
        </div>

        {/* Photo */}
        <div className="px-4 pb-3">
          <div className="w-full aspect-[3/4] rounded-xl overflow-hidden border-2 border-amber-500/30 bg-neutral-800 flex items-center justify-center relative">
            {photoSrc ? (
              <img src={photoSrc} alt={name} className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                  <svg className="w-6 h-6 text-amber-500/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                </div>
                <p className="text-[9px] text-neutral-500 font-medium leading-tight">Photo<br />coming soon</p>
              </div>
            )}
            {/* Scanlines */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.04]"
              style={{ backgroundImage: 'repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 4px)' }}
            />
          </div>
        </div>

        {/* Info */}
        <div className="px-4 pb-4 space-y-1">
          <p className="text-white font-black text-sm tracking-wide">{name}</p>
          <p className="text-amber-400 text-[10px] font-semibold tracking-widest uppercase">{role}</p>
          <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between">
            <div>
              <p className="text-[8px] text-neutral-500 uppercase tracking-wider">ID No.</p>
              <p className="text-neutral-300 text-[10px] font-mono font-bold">{idNumber}</p>
            </div>
            {/* QR stub */}
            <div className="w-9 h-9 bg-white rounded-md p-1 grid grid-cols-3 gap-px">
              {[1,1,0,1,0,1,0,1,1].map((on, i) => (
                <div key={i} className={`rounded-[1px] ${on ? 'bg-neutral-900' : 'bg-white'}`} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom rainbow accent */}
        <div className="h-1 bg-gradient-to-r from-amber-500 via-purple-500 to-cyan-500" />
      </div>

      {/* Hint */}
      {hint && (
        <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] text-neutral-500 font-medium flex items-center gap-1 pointer-events-none animate-pulse">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
          </svg>
          Drag me around
        </div>
      )}
    </div>
  );
};

export default DraggableID;
