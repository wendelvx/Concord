import React from 'react';
import ReactDOM from 'react-dom'; // Importação necessária para o Portal
import { FaTimes } from 'react-icons/fa';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  // O conteúdo do modal
  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      {/* z-[9999] garante que fique acima de qualquer coisa no site.
         bg-black/80 cria o fundo escuro que bloqueia cliques atrás.
      */}
      
      <div className="bg-black border border-green-500 w-full max-w-md shadow-[0_0_30px_rgba(34,197,94,0.3)] relative transform transition-all scale-100">
        
        {}
        <div className="flex items-center justify-between px-4 py-2 bg-green-900/20 border-b border-green-800">
            <span className="text-green-400 font-mono font-bold tracking-widest uppercase text-xs">
                {title}
            </span>
            <button onClick={onClose} className="text-green-700 hover:text-red-500 transition">
                <FaTimes />
            </button>
        </div>

        {}
        <div className="p-6 font-mono">
            {children}
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    modalContent,
    document.body
  );
};

export default Modal;