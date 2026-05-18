import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  // Trigger loader on route change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5 seconds loader

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {/* Overlay loader */}
      <div
        className={`fixed inset-0 z-[99999] bg-stone-50 dark:bg-neutral-950 flex flex-col items-center justify-center transition-opacity duration-500 ease-in-out ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
      >
        <div className="relative flex flex-col items-center">
          {/* The Watermark Design */}
          <div className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 flex items-center mb-6">
            Aarvieve<span className="text-amber-500 animate-pulse">.</span>
          </div>

          {/* Loading Bar */}
          <div className="w-48 h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden relative">
            <div className={`absolute top-0 left-0 h-full bg-amber-500 ${isLoading ? 'animate-loading-bar' : 'w-full'}`}></div>
          </div>

          {/* Text loading indicator */}
          <div className="mt-4 text-[10px] sm:text-xs font-mono text-neutral-500 dark:text-neutral-400 tracking-widest uppercase animate-pulse">
            Loading Environment...
          </div>
        </div>
      </div>

      {/* Actual Content */}
      <div
        className={`transition-opacity duration-1000 ease-in-out w-full ${isLoading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100 min-h-screen'
          }`}
      >
        {children}
      </div>
    </>
  );
};

export default PageTransition;
