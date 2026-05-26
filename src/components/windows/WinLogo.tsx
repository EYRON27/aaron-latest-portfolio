const WinLogo = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 88 88" fill="none" className={className}>
    <rect x="0" y="0" width="40" height="40" fill="#00A4EF" rx="4" />
    <rect x="48" y="0" width="40" height="40" fill="#00A4EF" rx="4" />
    <rect x="0" y="48" width="40" height="40" fill="#00A4EF" rx="4" />
    <rect x="48" y="48" width="40" height="40" fill="#00A4EF" rx="4" />
  </svg>
);

export default WinLogo;
