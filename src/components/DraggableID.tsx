import { useRef, useState, useEffect } from 'react';

interface DraggableIDProps {
  /** Path to the photo. Leave empty to show the placeholder. */
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
  idNumber = 'QCU-2023-IT',
}: DraggableIDProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Drag state
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  // 3-D tilt
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [shine, setShine] = useState({ x: 50, y: 50 });
  const [lifted, setLifted] = useState(false);

  // ── Pointer drag ──────────────────────────────────────────────────────
  const onPointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    setLifted(true);
    dragOffset.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging) {
      setPos({
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y,
      });
    }
    // Tilt relative to card centre
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ rx: -dy * 14, ry: dx * 14 });
    setShine({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  };

  const onPointerUp = () => {
    setDragging(false);
    setLifted(false);
    setTilt({ rx: 0, ry: 0 });
  };

  const onPointerLeave = () => {
    if (!dragging) {
      setTilt({ rx: 0, ry: 0 });
      setLifted(false);
    }
  };

  // Nudge hint on mount
  const [hint, setHint] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setHint(false), 3000);
    return () => clearTimeout(t);
  }, []);

  const transform = `
    translate(${pos.x}px, ${pos.y}px)
    perspective(800px)
    rotateX(${tilt.rx}deg)
    rotateY(${tilt.ry}deg)
    ${lifted ? 'scale(1.06)' : 'scale(1)'}
  `;

  return (
    <div
      ref={cardRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerLeave}
      style={{
        transform,
        transition: dragging ? 'none' : 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s',
        boxShadow: lifted
          ? '0 32px 64px rgba(0,0,0,0.45), 0 0 0 1px rgba(245,158,11,0.3)'
          : '0 8px 32px rgba(0,0,0,0.25), 0 0 0 1px rgba(245,158,11,0.15)',
        cursor: dragging ? 'grabbing' : 'grab',
        touchAction: 'none',
        userSelect: 'none',
        willChange: 'transform',
      }}
      className="relative w-52 rounded-2xl overflow-hidden select-none"
    >
      {/* Card body */}
      <div className="relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border border-white/10 rounded-2xl overflow-hidden">

        {/* Holographic shine layer */}
        <div
          className="absolute inset-0 pointer-events-none z-10 rounded-2xl opacity-30"
          style={{
            background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(245,158,11,0.35) 0%, rgba(139,92,246,0.2) 40%, transparent 70%)`,
          }}
        />

        {/* Top stripe */}
        <div className="h-8 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 flex items-center px-3 gap-1.5">
          <div className="w-2 h-2 rounded-full bg-white/60" />
          <div className="w-2 h-2 rounded-full bg-white/40" />
          <div className="w-2 h-2 rounded-full bg-white/20" />
          <span className="ml-auto text-[9px] font-black text-amber-900 tracking-widest uppercase">Student ID</span>
        </div>

        {/* School name */}
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
              style={{ backgroundImage: 'repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 4px)' }}
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
            {/* QR-ish placeholder */}
            <div className="w-9 h-9 bg-white rounded-md p-1 grid grid-cols-3 gap-px">
              {[1,1,0,1,0,1,0,1,1].map((on, i) => (
                <div key={i} className={`rounded-[1px] ${on ? 'bg-neutral-900' : 'bg-white'}`} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="h-1 bg-gradient-to-r from-amber-500 via-purple-500 to-cyan-500" />
      </div>

      {/* Drag hint */}
      {hint && (
        <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] text-neutral-500 font-medium flex items-center gap-1 pointer-events-none">
          <svg className="w-3 h-3 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" /></svg>
          Drag me around
        </div>
      )}
    </div>
  );
};

export default DraggableID;
