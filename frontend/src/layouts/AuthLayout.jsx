import React from 'react';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black font-mono relative overflow-hidden selection:bg-green-500 selection:text-black">
      
      {}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ff0015_1px,transparent_1px),linear-gradient(to_bottom,#00ff0015_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        {}
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-black"></div>
      </div>

      {}
      <div className="relative z-10 w-full max-w-md p-1 bg-gray-950/80 backdrop-blur-sm border border-green-500/50 shadow-[0_0_30px_rgba(0,255,0,0.15)]">
        
        {}
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-green-500"></div>
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-green-500"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-green-500"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-green-500"></div>

        <div className="p-8">
          {/* Cabeçalho */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2 text-green-500 tracking-tighter">
              <span className="animate-pulse mr-2">{'>'}</span>
              {title}
              <span className="animate-pulse ml-1">_</span>
            </h2>
            <p className="text-green-500/60 text-xs uppercase tracking-[0.2em]">
              [ SYSTEM STATUS: {subtitle} ]
            </p>
          </div>
          
          {}
          <div className="text-green-400">
            {children}
          </div>
        </div>
      </div>
      
      {}
      <div className="absolute bottom-4 text-[10px] text-green-500/30 uppercase tracking-widest">
        SECURE CONNECTION ESTABLISHED // V.1.0.4
      </div>
    </div>
  );
};

export default AuthLayout;