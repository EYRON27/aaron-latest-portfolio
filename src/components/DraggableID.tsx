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

  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const lastX = useRef(0);

  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [shine, setShine] = useState({ x: 50, y: 50 });
  const [lifted, setLifted] = useState(false);
  const [swing, setSwing] = useState(0);

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
      setSwing(prev => Math.max(-18, Math.min(18, prev - dx * 0.35)));
      setPos({ x: e.clientX - dragOffset.current.x, y: e.clientY - dragOffset.current.y });
    }
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setTilt({
      rx: -((e.clientY - cy) / (rect.height / 2)) * 10,
      ry: ((e.clientX - cx) / (rect.width / 2)) * 10,
    });
    setShine({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  };

  const onPointerUp = () => {
    setDragging(false); setLifted(false);
    setTilt({ rx: 0, ry: 0 }); setSwing(0);
  };

  const onPointerLeave = () => {
    if (!dragging) { setTilt({ rx: 0, ry: 0 }); setLifted(false); setSwing(0); }
  };

  const [hint, setHint] = useState(true);
  useEffect(() => { const t = setTimeout(() => setHint(false), 3500); return () => clearTimeout(t); }, []);

  const cardTransform = `
    translate(${pos.x}px, ${pos.y}px)
    perspective(800px)
    rotateX(${tilt.rx}deg)
    rotateY(${tilt.ry}deg)
    scale(${lifted ? 1.05 : 1})
  `;

  // Lanyard SVG dimensions
  const W = 208; // same as card width (w-52 = 208px)
  const H = 110; // height of lanyard above card
  const strapW = 18; // wide strap width in px
  const midX = W / 2;

  // The two straps spread from centre-top and converge at bottom
  // Left strap centre line, right strap centre line
  const topSpread = 28; // half-spread at top (loop fold)
  const botGap = 12;    // half-gap at bottom (where buckle clips attach)

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
        width: W,
      }}
      className="relative select-none"
    >
      {/* ── QCU Lanyard ── */}
      <div
        className="pointer-events-none"
        style={{
          transform: `rotate(${swing}deg)`,
          transformOrigin: `${midX}px 0px`,
          transition: dragging ? 'none' : 'transform 0.55s cubic-bezier(0.34,1.56,0.64,1)',
        }}
      >
        <svg
          width={W}
          height={H}
          viewBox={`0 0 ${W} ${H}`}
          style={{ display: 'block', overflow: 'visible' }}
        >
          <defs>
            {/* Dark strap fill with subtle texture */}
            <linearGradient id="strapL" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1a1a1a" />
              <stop offset="40%" stopColor="#2d2d2d" />
              <stop offset="100%" stopColor="#111" />
            </linearGradient>
            <linearGradient id="strapR" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#111" />
              <stop offset="60%" stopColor="#2d2d2d" />
              <stop offset="100%" stopColor="#1a1a1a" />
            </linearGradient>
            {/* Buckle metal */}
            <linearGradient id="buckle" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6b7280" />
              <stop offset="50%" stopColor="#374151" />
              <stop offset="100%" stopColor="#1f2937" />
            </linearGradient>
            {/* Clip metal */}
            <linearGradient id="clip" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9ca3af" />
              <stop offset="100%" stopColor="#6b7280" />
            </linearGradient>
          </defs>

          {/* ── Left Strap ── */}
          {/* Left strap: starts at loop top (midX - topSpread), curves down to (midX - botGap - strapW/2) */}
          <path
            d={`
              M ${midX - topSpread - strapW / 2} 4
              C ${midX - topSpread - strapW / 2} ${H * 0.4}, ${midX - botGap - strapW} ${H * 0.55}, ${midX - botGap - strapW / 2} ${H - 22}
              L ${midX - botGap + strapW / 2} ${H - 22}
              C ${midX - botGap + strapW / 2} ${H * 0.55}, ${midX - topSpread + strapW / 2} ${H * 0.4}, ${midX - topSpread + strapW / 2} 4
              Z
            `}
            fill="url(#strapL)"
          />
          {/* Left strap edge highlight */}
          <path
            d={`M ${midX - topSpread + strapW / 2} 4 C ${midX - topSpread + strapW / 2} ${H * 0.4}, ${midX - botGap + strapW / 2} ${H * 0.55}, ${midX - botGap + strapW / 2} ${H - 22}`}
            fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1"
          />

          {/* Left strap text: "QUEZON CITY UNIVERSITY" rotated */}
          <text
            transform={`translate(${midX - topSpread} 8) rotate(90)`}
            fontSize="5.5"
            fontFamily="Arial, sans-serif"
            fontWeight="bold"
            letterSpacing="1.2"
            fill="rgba(255,255,255,0.55)"
            textAnchor="start"
          >
            QUEZON CITY UNIVERSITY
          </text>
          {/* Left strap QCU large text */}
          <text
            transform={`translate(${midX - topSpread - 2} 28) rotate(90)`}
            fontSize="14"
            fontFamily="Georgia, serif"
            fontWeight="bold"
            letterSpacing="3"
            fill="rgba(255,255,255,0.12)"
            textAnchor="start"
          >
            QCU
          </text>

          {/* ── Right Strap ── */}
          <path
            d={`
              M ${midX + topSpread - strapW / 2} 4
              C ${midX + topSpread - strapW / 2} ${H * 0.4}, ${midX + botGap - strapW} ${H * 0.55}, ${midX + botGap - strapW / 2} ${H - 22}
              L ${midX + botGap + strapW / 2} ${H - 22}
              C ${midX + botGap + strapW / 2} ${H * 0.55}, ${midX + topSpread + strapW / 2} ${H * 0.4}, ${midX + topSpread + strapW / 2} 4
              Z
            `}
            fill="url(#strapR)"
          />
          {/* Right strap edge highlight */}
          <path
            d={`M ${midX + topSpread - strapW / 2} 4 C ${midX + topSpread - strapW / 2} ${H * 0.4}, ${midX + botGap - strapW / 2} ${H * 0.55}, ${midX + botGap - strapW / 2} ${H - 22}`}
            fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1"
          />

          {/* Right strap text */}
          <text
            transform={`translate(${midX + topSpread + 2} 8) rotate(90)`}
            fontSize="5.5"
            fontFamily="Arial, sans-serif"
            fontWeight="bold"
            letterSpacing="1.2"
            fill="rgba(255,255,255,0.55)"
            textAnchor="start"
          >
            QUEZON CITY UNIVERSITY
          </text>
          <text
            transform={`translate(${midX + topSpread + 5} 28) rotate(90)`}
            fontSize="14"
            fontFamily="Georgia, serif"
            fontWeight="bold"
            letterSpacing="3"
            fill="rgba(255,255,255,0.12)"
            textAnchor="start"
          >
            QCU
          </text>

          {/* ── Loop / fold at the top ── */}
          <rect
            x={midX - topSpread - strapW / 2}
            y={0}
            width={topSpread * 2 + strapW}
            height={10}
            rx={3}
            fill="#111"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="0.8"
          />
          {/* Fold crease */}
          <line x1={midX - topSpread} y1={0} x2={midX - topSpread} y2={10} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          <line x1={midX + topSpread} y1={0} x2={midX + topSpread} y2={10} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

          {/* ── Left Buckle ── */}
          {/* Buckle body */}
          <rect x={midX - botGap - strapW / 2} y={H - 22} width={strapW} height={14} rx={2} fill="#1f2937" stroke="#374151" strokeWidth="0.8" />
          {/* Buckle release button */}
          <rect x={midX - botGap - strapW / 2 + 2} y={H - 20} width={strapW - 4} height={5} rx={1.5} fill="#374151" />
          <rect x={midX - botGap - strapW / 2 + 2} y={H - 14} width={strapW - 4} height={5} rx={1.5} fill="#374151" />
          {/* Buckle side rivets */}
          <circle cx={midX - botGap - strapW / 2 + 2.5} cy={H - 15} r={1.5} fill="#6b7280" />
          <circle cx={midX - botGap + strapW / 2 - 2.5} cy={H - 15} r={1.5} fill="#6b7280" />
          {/* Metal swivel hook */}
          <ellipse cx={midX - botGap} cy={H - 3} rx={4} ry={3} fill="none" stroke="url(#clip)" strokeWidth="2" />
          <rect x={midX - botGap - 1.5} y={H - 6} width={3} height={4} rx={0.5} fill="#9ca3af" />

          {/* ── Right Buckle ── */}
          <rect x={midX + botGap - strapW / 2} y={H - 22} width={strapW} height={14} rx={2} fill="#1f2937" stroke="#374151" strokeWidth="0.8" />
          <rect x={midX + botGap - strapW / 2 + 2} y={H - 20} width={strapW - 4} height={5} rx={1.5} fill="#374151" />
          <rect x={midX + botGap - strapW / 2 + 2} y={H - 14} width={strapW - 4} height={5} rx={1.5} fill="#374151" />
          <circle cx={midX + botGap - strapW / 2 + 2.5} cy={H - 15} r={1.5} fill="#6b7280" />
          <circle cx={midX + botGap + strapW / 2 - 2.5} cy={H - 15} r={1.5} fill="#6b7280" />
          <ellipse cx={midX + botGap} cy={H - 3} rx={4} ry={3} fill="none" stroke="url(#clip)" strokeWidth="2" />
          <rect x={midX + botGap - 1.5} y={H - 6} width={3} height={4} rx={0.5} fill="#9ca3af" />
        </svg>
      </div>

      {/* ── ID Card ── */}
      <div
        style={{
          boxShadow: lifted
            ? '0 32px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(245,158,11,0.35)'
            : '0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(245,158,11,0.15)',
          transition: 'box-shadow 0.3s',
          width: W,
        }}
        className="relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border border-white/10 rounded-2xl overflow-hidden"
      >
        {/* Holographic shine */}
        <div
          className="absolute inset-0 pointer-events-none z-10 rounded-2xl opacity-25"
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
            <div className="w-9 h-9 bg-white rounded-md p-1 grid grid-cols-3 gap-px">
              {[1,1,0,1,0,1,0,1,1].map((on, i) => (
                <div key={i} className={`rounded-[1px] ${on ? 'bg-neutral-900' : 'bg-white'}`} />
              ))}
            </div>
          </div>
        </div>

        <div className="h-1 bg-gradient-to-r from-amber-500 via-purple-500 to-cyan-500" />
      </div>

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
