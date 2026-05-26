import { useRef } from 'react';
import { Wifi, Battery, Volume2, Moon, Sun, ChevronUp } from 'lucide-react';

interface WinQuickSettingsProps {
  isDark: boolean;
  quickSettingsRef: React.RefObject<HTMLDivElement>;
  toggleDark: () => void;
}

export const WinQuickSettings = ({ isDark, quickSettingsRef, toggleDark }: WinQuickSettingsProps) => (
  <div
    ref={quickSettingsRef}
    className={`fixed bottom-[60px] right-4 z-[60] w-[360px] ${isDark ? 'bg-[#242424]/95 text-white border-white/10' : 'bg-[#f3f3f3]/95 text-neutral-800 border-neutral-300'} backdrop-blur-3xl rounded-xl border shadow-[0_30px_80px_rgba(0,0,0,0.4)] animate-win-open p-5`}
    onClick={e => e.stopPropagation()}
  >
    <div className="grid grid-cols-3 gap-4 mb-5">
      <div className={`flex flex-col items-center justify-center p-3 rounded-lg ${isDark ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-600'} text-white cursor-pointer transition-colors`}>
        <Wifi className="w-5 h-5 mb-2" />
        <span className="text-[11px] font-medium">Wi-Fi</span>
      </div>
      <div className={`flex flex-col items-center justify-center p-3 rounded-lg ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-neutral-50 shadow-sm'} cursor-pointer transition-colors`}>
        <Battery className="w-5 h-5 mb-2" />
        <span className="text-[11px] font-medium">Battery saver</span>
      </div>
      <div className={`flex flex-col items-center justify-center p-3 rounded-lg ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-white hover:bg-neutral-50 shadow-sm'} cursor-pointer transition-colors`} onClick={toggleDark}>
        {isDark ? <Moon className="w-5 h-5 mb-2" /> : <Sun className="w-5 h-5 mb-2" />}
        <span className="text-[11px] font-medium">Theme</span>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <Volume2 className={`w-5 h-5 ${isDark ? 'text-white/70' : 'text-neutral-500'}`} />
      <div className="flex-1 h-1.5 rounded-full bg-blue-500 relative cursor-pointer">
        <div className="absolute top-1/2 -translate-y-1/2 right-[20%] w-3.5 h-3.5 bg-white rounded-full shadow-md" />
      </div>
      <span className={`text-xs font-medium ${isDark ? 'text-white/70' : 'text-neutral-500'}`}>80</span>
    </div>
  </div>
);

interface WinCalendarProps {
  isDark: boolean;
  calendarRef: React.RefObject<HTMLDivElement>;
  currentTime: Date;
}

export const WinCalendar = ({ isDark, calendarRef, currentTime }: WinCalendarProps) => (
  <div
    ref={calendarRef}
    className={`fixed bottom-[60px] right-2 z-[60] w-[320px] ${isDark ? 'bg-[#242424]/95 text-white border-white/10' : 'bg-[#f3f3f3]/95 text-neutral-800 border-neutral-300'} backdrop-blur-3xl rounded-xl border shadow-[0_30px_80px_rgba(0,0,0,0.4)] animate-win-open p-5`}
    onClick={e => e.stopPropagation()}
  >
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-semibold">{currentTime.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}</h3>
      <button className={`p-1.5 rounded ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}><ChevronUp className="w-4 h-4" /></button>
    </div>
    <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
      {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <div key={d} className={`font-semibold ${isDark ? 'text-white/50' : 'text-neutral-500'}`}>{d}</div>)}
    </div>
    <div className="grid grid-cols-7 gap-1 text-center text-xs">
      {Array.from({ length: 31 }, (_, i) => (
        <div key={i} className={`p-2 rounded-full ${i + 1 === currentTime.getDate() ? 'bg-blue-500 text-white font-bold' : isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'} cursor-pointer transition-colors`}>
          {i + 1}
        </div>
      ))}
    </div>
  </div>
);
