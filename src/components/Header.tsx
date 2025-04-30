
import React from 'react';

const Header = () => {
  return (
    <header className="bg-[#1C242B] text-white py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img 
            src="https://freeimage.host/i/3XW224e" 
            alt="Syntech Biofuel Logo" 
            className="h-8"
          />
          <h1 className="text-2xl font-bold">Syntech Biofuel</h1>
        </div>
        <div className="text-sm">Social Media Content Generator</div>
      </div>
    </header>
  );
};

export default Header;
