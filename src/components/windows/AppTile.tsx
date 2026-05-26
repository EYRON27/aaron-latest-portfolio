const AppTile = ({
  icon, label, color, onClick, isActive = false, isDesktop = false, size = 'medium'
}: {
  icon: React.ReactNode; label: string; color: string; onClick: () => void; isActive?: boolean; isDesktop?: boolean; size?: 'small' | 'medium' | 'large';
}) => {
  const baseClass = isDesktop
    ? size === 'small' ? 'w-16 p-1.5' : size === 'large' ? 'w-24 p-3' : 'w-20 p-2'
    : 'w-20 p-2';
  const iconSizeClass = isDesktop
    ? size === 'small' ? 'w-8 h-8' : size === 'large' ? 'w-16 h-16' : 'w-12 h-12'
    : 'w-10 h-10';
  const textSizeClass = isDesktop
    ? size === 'small' ? 'text-[10px]' : size === 'large' ? 'text-xs' : 'text-[11px]'
    : 'text-[11px]';

  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 group transition-all duration-200 ${isActive && !isDesktop ? 'opacity-100' : ''} ${isDesktop ? 'rounded-lg hover:bg-white/10 ' + baseClass : ''}`}
      title={label}
    >
      <div className={`${iconSizeClass} rounded-lg ${color} flex items-center justify-center shadow-md group-hover:scale-110 transition-all duration-200 relative`}>
        {icon}
        {isActive && !isDesktop && (
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white shadow-sm" />
        )}
      </div>
      <span className={`${textSizeClass} font-medium transition-colors leading-tight text-center max-w-[80px] ${isDesktop ? 'text-white drop-shadow-md' : 'text-neutral-600 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white'} line-clamp-2`}>{label}</span>
    </button>
  );
};

export default AppTile;
