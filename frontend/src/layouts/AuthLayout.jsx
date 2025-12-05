import React from 'react';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#5865F2]">
      {}
      
      <div className="bg-[#36393f] w-full max-w-md p-8 rounded shadow-lg text-white">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-gray-400 text-sm">{subtitle}</p>
        </div>
        
        {}
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;