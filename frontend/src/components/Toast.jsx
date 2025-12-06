import React, { useEffect } from 'react';

const Toast = ({ message, onClose, type = 'success' }) => {
  useEffect(() => {
    
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-5 right-5 z-[9999] animate-[slideIn_0.5s_ease-out]">
      <div className="bg-black border border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)] p-4 max-w-sm flex items-start space-x-3">
        
        {}
        <div className="text-2xl leading-none">
          {type === 'success' ? '✅' : '⚠️'}
        </div>

        <div>
          <h4 className="text-[10px] font-bold text-green-700 uppercase tracking-widest mb-1">
            {type === 'success' ? 'SYSTEM_NOTIFICATION' : 'SYSTEM_WARNING'}
          </h4>
          <p className="text-green-400 font-mono text-sm">
            {message}
          </p>
        </div>

        {}
        <div className="absolute bottom-0 left-0 h-[2px] bg-green-500 w-full animate-[shrink_3s_linear_forwards]"></div>
      </div>
    </div>
  );
};

export default Toast;