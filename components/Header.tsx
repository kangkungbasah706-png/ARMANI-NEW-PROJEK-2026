
import React from 'react';

interface HeaderProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeView, setActiveView }) => {
  const menus = [
    { id: 'catalogue', label: 'Katalog Produk' },
    { id: 'detail', label: 'Detail Tugas' },
    { id: 'system', label: 'Deteksi Sistem' },
    { id: 'bank', label: 'Akun Bank' },
  ];

  return (
    <div className="w-full shrink-0 z-50">
      <header className="w-full bg-transparent border-b border-[var(--color-border-dim)] flex items-center justify-between px-10 py-4 relative">
        <div className="flex items-center gap-6">
          <div className="relative group flex items-center">
            <div className="absolute -inset-1 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-bright)] opacity-20 blur"></div>
            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center overflow-hidden border border-[var(--color-border-mid)] relative">
              <img src="https://i.pinimg.com/736x/28/65/0e/28650ea0dd7f4427b199c2c60fb8142b.jpg" alt="Logo" className="w-full h-full object-cover grayscale brightness-125" />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="font-brand text-[22px] font-black text-[var(--color-text-primary)] tracking-[0.3em] uppercase leading-none italic">GIORGIO ARMANI</h1>
            <span className="text-[10px] font-black text-[var(--accent)] uppercase tracking-[0.6em] mt-1 opacity-80 leading-none">Sistem Internal Privé</span>
          </div>
        </div>

        <nav className="flex items-center gap-8 lg:gap-10">
          {menus.map((menu) => (
            <button
              key={menu.id}
              onClick={() => setActiveView(menu.id)}
              className={`text-[10px] font-black transition-all relative py-1 uppercase tracking-[0.15em] group flex items-center whitespace-nowrap leading-none ${
                activeView === menu.id ? 'text-[var(--accent-bright)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              {menu.label}
              <span className={`absolute -bottom-1 left-0 h-[1.5px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent transition-all duration-500 ${activeView === menu.id ? 'w-full opacity-100' : 'w-0 opacity-0'}`}></span>
            </button>
          ))}
        </nav>
      </header>
    </div>
  );
};

export default Header;
