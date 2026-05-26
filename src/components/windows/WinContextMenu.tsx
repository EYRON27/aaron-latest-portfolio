import {
  LayoutGrid, ArrowUpDown, RefreshCw, PlusCircle, Monitor, Paintbrush, TerminalSquare, Code2, ExternalLink,
  Square, Layout, Zap, Check, Grid, Folder, Database, Archive, Image as ImageIcon,
  ChevronRight, FileText, MonitorPlay
} from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';

type IconSize = 'small' | 'medium' | 'large';

interface WinContextMenuProps {
  x: number;
  y: number;
  isDark: boolean;
  iconSize: IconSize;
  setIconSize: (s: IconSize) => void;
  onClose: () => void;
  onRefresh: () => void;
  openWindow: (name: string) => void;
  toggleDark: () => void;
}

const submenuCls = (isDark: boolean) =>
  `absolute top-0 left-[98%] hidden group-hover:block rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.4)] border py-1.5 backdrop-blur-3xl ${isDark ? 'bg-[#2b2b2b]/95 border-white/10 text-white' : 'bg-[#f9f9f9]/95 border-neutral-300 text-neutral-800'}`;

const itemCls = (isDark: boolean) =>
  `flex items-center gap-3 px-4 py-1.5 mx-1.5 rounded hover:${isDark ? 'bg-white/10' : 'bg-black/5'} cursor-pointer`;

const itemBetweenCls = (isDark: boolean) =>
  `flex items-center justify-between px-4 py-1.5 mx-1.5 rounded hover:${isDark ? 'bg-white/10' : 'bg-black/5'} cursor-pointer`;

const divider = (isDark: boolean) =>
  `h-px w-full my-1.5 ${isDark ? 'bg-white/10' : 'bg-black/10'}`;

const WinContextMenu = ({ x, y, isDark, iconSize, setIconSize, onClose, onRefresh, openWindow, toggleDark }: WinContextMenuProps) => {
  const stop = (e: React.MouseEvent) => { e.stopPropagation(); };

  return (
    <div
      className={`fixed z-[100] w-64 rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.4)] border py-1.5 backdrop-blur-3xl text-xs font-medium ${isDark ? 'bg-[#2b2b2b]/95 border-white/10 text-white' : 'bg-[#f9f9f9]/95 border-neutral-300 text-neutral-800'}`}
      style={{ top: y, left: x }}
      onClick={(e) => { stop(e); onClose(); }}
      onContextMenu={e => { e.preventDefault(); stop(e); onClose(); }}
    >
      {/* View */}
      <div className="relative group mx-1.5">
        <div className={`flex items-center justify-between px-3 py-1.5 rounded hover:${isDark ? 'bg-white/10' : 'bg-black/5'} cursor-default`}>
          <div className="flex items-center gap-3"><LayoutGrid className="w-4 h-4 opacity-70" /> View</div>
          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
        </div>
        <div className={`${submenuCls(isDark)} w-[240px]`}>
          <div onClick={(e) => { stop(e); setIconSize('large'); onClose(); }} className={itemBetweenCls(isDark)}>
            <div className="flex items-center gap-3"><div className="w-3 text-center text-[10px] font-black opacity-70">{iconSize === 'large' && '•'}</div><Square className="w-4 h-4 opacity-70" /> Large icons</div>
            <span className="opacity-50 text-[10px]">Ctrl+Shift+2</span>
          </div>
          <div onClick={(e) => { stop(e); setIconSize('medium'); onClose(); }} className={itemBetweenCls(isDark)}>
            <div className="flex items-center gap-3"><div className="w-3 text-center text-[10px] font-black opacity-70">{iconSize === 'medium' && '•'}</div><Layout className="w-4 h-4 opacity-70" /> Medium icons</div>
            <span className="opacity-50 text-[10px]">Ctrl+Shift+3</span>
          </div>
          <div onClick={(e) => { stop(e); setIconSize('small'); onClose(); }} className={itemBetweenCls(isDark)}>
            <div className="flex items-center gap-3"><div className="w-3 text-center text-[10px] font-black opacity-70">{iconSize === 'small' && '•'}</div><LayoutGrid className="w-4 h-4 opacity-70" /> Small icons</div>
            <span className="opacity-50 text-[10px]">Ctrl+Shift+4</span>
          </div>
          <div className={divider(isDark)} />
          <div onClick={(e) => { stop(e); onClose(); }} className={itemCls(isDark)}><div className="w-3" /><Zap className="w-4 h-4 opacity-70" /> Auto arrange icons</div>
          <div onClick={(e) => { stop(e); onClose(); }} className={itemCls(isDark)}><Check className="w-3 h-3 opacity-70" /><Grid className="w-4 h-4 opacity-70" /> Align icons to grid</div>
          <div className={divider(isDark)} />
          <div onClick={(e) => { stop(e); onClose(); }} className={itemCls(isDark)}><Check className="w-3 h-3 opacity-70" /><Monitor className="w-4 h-4 opacity-70" /> Show desktop icons</div>
        </div>
      </div>

      {/* Sort by */}
      <div className="relative group mx-1.5">
        <div className={`flex items-center justify-between px-3 py-1.5 rounded hover:${isDark ? 'bg-white/10' : 'bg-black/5'} cursor-default`}>
          <div className="flex items-center gap-3"><ArrowUpDown className="w-4 h-4 opacity-70" /> Sort by</div>
          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
        </div>
        <div className={`${submenuCls(isDark)} w-48`}>
          {['Name', 'Size', 'Item type', 'Date modified'].map(opt => (
            <div key={opt} onClick={(e) => { stop(e); onClose(); }} className={`px-4 py-1.5 mx-1.5 rounded hover:${isDark ? 'bg-white/10' : 'bg-black/5'} cursor-pointer`}>{opt}</div>
          ))}
        </div>
      </div>

      {/* Refresh */}
      <div onClick={(e) => { stop(e); onRefresh(); }} className={`flex items-center gap-3 px-3 py-1.5 mx-1.5 rounded hover:${isDark ? 'bg-white/10' : 'bg-black/5'} cursor-pointer`}>
        <RefreshCw className="w-4 h-4 opacity-70" /> Refresh
      </div>

      <div className={divider(isDark)} />

      {/* New */}
      <div className="relative group mx-1.5">
        <div className={`flex items-center justify-between px-3 py-1.5 rounded hover:${isDark ? 'bg-white/10' : 'bg-black/5'} cursor-default`}>
          <div className="flex items-center gap-3"><PlusCircle className="w-4 h-4 opacity-70" /> New</div>
          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
        </div>
        <div className={`${submenuCls(isDark)} w-[280px]`}>
          <div onClick={(e) => { stop(e); onClose(); }} className={itemCls(isDark)}><Folder className="w-4 h-4 text-yellow-400 fill-yellow-400" /> Folder</div>
          <div onClick={(e) => { stop(e); onClose(); }} className={itemCls(isDark)}><ArrowUpRight className="w-4 h-4 text-blue-400" /> Shortcut</div>
          <div className={divider(isDark)} />
          <div onClick={(e) => { stop(e); onClose(); }} className={itemCls(isDark)}><Database className="w-4 h-4 text-red-500" /> Microsoft Access Database</div>
          <div onClick={(e) => { stop(e); onClose(); }} className={itemCls(isDark)}><ImageIcon className="w-4 h-4 text-blue-300" /> Bitmap image</div>
          <div onClick={(e) => { stop(e); onClose(); }} className={itemCls(isDark)}><FileText className="w-4 h-4 text-blue-600" /> Microsoft Word Document</div>
          <div onClick={(e) => { stop(e); onClose(); }} className={itemCls(isDark)}><MonitorPlay className="w-4 h-4 text-orange-500" /> Microsoft PowerPoint Presentation</div>
          <div onClick={(e) => { stop(e); onClose(); }} className={itemCls(isDark)}><Layout className="w-4 h-4 text-teal-500" /> Microsoft Publisher Document</div>
          <div onClick={(e) => { stop(e); onClose(); }} className={itemCls(isDark)}><FileText className="w-4 h-4 text-neutral-400" /> Text Document</div>
          <div onClick={(e) => { stop(e); onClose(); }} className={itemCls(isDark)}><Grid className="w-4 h-4 text-green-600" /> Microsoft Excel Worksheet</div>
          <div onClick={(e) => { stop(e); onClose(); }} className={itemCls(isDark)}><Archive className="w-4 h-4 text-yellow-500" /> Compressed (zipped) Folder</div>
        </div>
      </div>

      <div className={divider(isDark)} />

      <div onClick={(e) => { stop(e); onClose(); openWindow('about'); }} className={`flex items-center gap-3 px-3 py-1.5 mx-1.5 rounded hover:${isDark ? 'bg-white/10' : 'bg-black/5'} cursor-pointer`}>
        <Monitor className="w-4 h-4 opacity-70 text-blue-500" /> Display settings
      </div>
      <div onClick={(e) => { stop(e); toggleDark(); onClose(); }} className={`flex items-center gap-3 px-3 py-1.5 mx-1.5 rounded hover:${isDark ? 'bg-white/10' : 'bg-black/5'} cursor-pointer`}>
        <Paintbrush className="w-4 h-4 opacity-70 text-blue-500" /> Personalize
      </div>

      <div className={divider(isDark)} />

      <div onClick={(e) => { stop(e); onClose(); openWindow('projects'); }} className={`flex items-center gap-3 px-3 py-1.5 mx-1.5 rounded hover:${isDark ? 'bg-white/10' : 'bg-black/5'} cursor-pointer`}>
        <TerminalSquare className="w-4 h-4 opacity-70" /> Open in Terminal
      </div>
      <div onClick={(e) => { stop(e); onClose(); openWindow('skills'); }} className={`flex items-center gap-3 px-3 py-1.5 mx-1.5 rounded hover:${isDark ? 'bg-white/10' : 'bg-black/5'} cursor-pointer`}>
        <Code2 className="w-4 h-4 opacity-70" /> Open with Zed
      </div>

      <div className={divider(isDark)} />

      <div onClick={(e) => { stop(e); onClose(); }} className={`flex items-center gap-3 px-3 py-1.5 mx-1.5 rounded hover:${isDark ? 'bg-white/10' : 'bg-black/5'} cursor-pointer`}>
        <ExternalLink className="w-4 h-4 opacity-70" /> Show more options
      </div>
    </div>
  );
};

export default WinContextMenu;
