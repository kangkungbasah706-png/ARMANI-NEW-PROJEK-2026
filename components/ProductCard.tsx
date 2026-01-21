
import React from 'react';
import { FORMAT_CURRENCY } from '../constants';
import { EditableText } from '../App';

interface ProductCardProps {
  product: any;
  onUpdate: (field: string, val: any) => void;
  onDetailClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onUpdate, onDetailClick }) => {
  const isExclusive = product.isExclusive === true;
  
  const displayCommission = isExclusive ? "50" : (product.commission || "0");
  const displayProfit = isExclusive ? FORMAT_CURRENCY(product.price * 0.5) : FORMAT_CURRENCY(product.profit || 0);
  const totalKeuntungan = FORMAT_CURRENCY(product.totalIncome || (product.price + product.profit));
    
  const actionText = product.statusText || 'Detail';
  
  return (
    <div 
      className={`bg-[var(--bg-panel)] border rounded-xl flex flex-row overflow-hidden shadow-2xl transition-all duration-700 group h-full relative 
        ${isExclusive 
          ? 'border-[#D4AF37] border-2 shadow-[0_0_50px_rgba(212,175,55,0.4)] ring-4 ring-[#D4AF37]/10 z-20 scale-[1.01]' 
          : 'border-[var(--color-border-dim)] hover:border-[var(--color-border-mid)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)]'
        }`}
    >
      {isExclusive && <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/5 via-transparent to-[#D4AF37]/5 pointer-events-none z-0"></div>}

      <div className="w-[60%] h-full relative overflow-hidden bg-[#050505] border-r border-white/5">
        <img src={product.imageUrl} alt={product.name} className={`w-full h-full object-cover transition-all duration-[1.5s] group-hover:scale-110 ${isExclusive ? 'opacity-90 grayscale-0 brightness-110' : 'opacity-70 grayscale-[15%] group-hover:opacity-100'}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30"></div>
        <div className="absolute top-2.5 left-2.5 z-10">
           <EditableText value={product.label} onChange={(v:string) => onUpdate('label', v)} className="text-[clamp(10px,0.8vw,11px)] font-black text-white px-2.5 py-1 bg-black/70 backdrop-blur-xl border border-white/10 tracking-[0.2em] uppercase rounded" />
        </div>
        {isExclusive && (
          <div className="absolute top-2.5 right-2.5 z-20">
            <span className="text-[8px] font-black text-black px-3 py-1 bg-gradient-to-r from-[#D4AF37] via-[#F9E79F] to-[#D4AF37] tracking-[0.35em] uppercase rounded-full border border-white/20">EXCLUSIVE</span>
          </div>
        )}
      </div>

      <div className={`w-[40%] flex flex-col p-4 sm:p-5 justify-between relative backdrop-blur-md border-l border-white/10 ${isExclusive ? 'bg-gradient-to-br from-[#221c10] via-[#111111] to-[#080808]' : 'bg-gradient-to-br from-[#1e1e1e] via-[#161616] to-[#0c0c0c]'}`}>
        <div className="space-y-1 relative z-10 shrink-0 mb-1">
          <EditableText value={product.name} onChange={(v:string) => onUpdate('name', v)} className={`text-[clamp(12px,1.6vw,15px)] font-black leading-tight uppercase tracking-wider block ${isExclusive ? 'text-[#F9E79F]' : 'text-white'}`} />
          <div className={`h-[1px] w-1/3 bg-gradient-to-r to-transparent opacity-60 ${isExclusive ? 'from-[#D4AF37]' : 'from-[var(--accent)]'}`}></div>
        </div>

        <div className="relative z-10 my-2.5 flex items-center shrink-0">
          <span className={`text-[14px] font-black tracking-widest px-3.5 py-1.5 rounded-full border-[1.5px] leading-none transition-all shadow-xl ${isExclusive ? 'text-[#F9E79F] bg-[#D4AF37]/30 border-[#D4AF37]/60' : 'text-[var(--accent)] bg-[var(--accent)]/15 border-[var(--accent)]/30'}`}>
            <EditableText value={displayCommission} onChange={(v:string) => onUpdate('commission', Number(v))} />%
          </span>
          <div className={`ml-3 h-[0.5px] flex-grow opacity-10 ${isExclusive ? 'bg-[#D4AF37]' : 'bg-[var(--accent)]'}`}></div>
        </div>

        <div className="space-y-3 mt-auto relative z-10">
          <div className="grid grid-cols-1 gap-3">
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-[#888888] uppercase tracking-[0.2em] mb-0.5 italic opacity-80">PRICE</span>
              <EditableText value={FORMAT_CURRENCY(product.price)} onChange={(v:string) => onUpdate('price', Number(v.replace(/[^0-9]/g, '')))} className="text-[clamp(12px,1.3vw,14px)] font-extrabold text-[#fdfcf0] tracking-wider leading-none" />
            </div>
            <div className="flex flex-col">
              <span className={`text-[9px] font-black uppercase tracking-[0.2em] italic mb-0.5 ${isExclusive ? 'text-[#D4AF37]' : 'text-[var(--accent)]'}`}>COMMISSION</span>
              <EditableText value={displayProfit} onChange={(v:string) => onUpdate('profit', Number(v.replace(/[^0-9]/g, '')))} className={`text-[clamp(12px,1.3vw,14px)] font-extrabold leading-none ${isExclusive ? 'text-[#FFD700]' : 'text-[#94f3b8]'}`} />
            </div>
          </div>
          <div className={`pt-3 border-t flex flex-col ${isExclusive ? 'border-[#D4AF37]/30' : 'border-white/10'}`}>
            <span className="text-[9px] font-black text-[#AAAAAA] uppercase tracking-[0.2em] mb-0.5 italic opacity-80">INCOME</span>
            <EditableText value={totalKeuntungan} onChange={(v:string) => onUpdate('totalIncome', Number(v.replace(/[^0-9]/g, '')))} className={`text-[clamp(15px,1.8vw,18px)] font-black leading-none ${isExclusive ? 'text-[#FFD700]' : 'text-[#ffef9c]'}`} />
          </div>
        </div>

        <div 
          onClick={(e) => {
            e.stopPropagation();
            if (onDetailClick) onDetailClick();
          }}
          className={`flex items-center justify-between mt-3 pt-2 group/btn cursor-pointer relative z-10 border-t ${isExclusive ? 'border-[#D4AF37]/30' : 'border-white/5'}`}
        >
           <EditableText value={actionText} onChange={(v:string) => onUpdate('statusText', v)} className={`text-[9px] font-black uppercase tracking-[0.3em] ${isExclusive ? 'text-[#D4AF37]' : 'text-[#999999]'}`} />
           <div className={`flex-grow ml-3 h-[0.5px] opacity-30 ${isExclusive ? 'bg-[#D4AF37]' : 'bg-[var(--accent)]'}`}></div>
           <svg className={`w-3.5 h-3.5 ml-1.5 opacity-30 ${isExclusive ? 'text-[#D4AF37]' : 'text-[var(--accent)]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M9 5l7 7-7 7" /></svg>
        </div>
      </div>
      <div className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full blur-3xl opacity-[0.05] pointer-events-none ${isExclusive ? 'bg-[#D4AF37]' : 'bg-[var(--accent)]'}`}></div>
    </div>
  );
};

export default ProductCard;
