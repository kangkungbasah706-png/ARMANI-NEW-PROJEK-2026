
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import { CATALOGS_DATA, FORMAT_CURRENCY } from './constants';
import { Product } from './types';

// Helper for Inline Editing
export const EditableText = ({ value, onChange, className, isMultiline = false }: any) => {
  return (
    <span
      contentEditable
      suppressContentEditableWarning
      onBlur={(e) => onChange(e.currentTarget.textContent || "")}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && !isMultiline) {
          e.preventDefault();
          e.currentTarget.blur();
        }
      }}
      className={`${className} outline-none focus:bg-white/10 focus:ring-1 focus:ring-[var(--accent)]/30 rounded px-0.5 cursor-text transition-all`}
    >
      {value}
    </span>
  );
};

// Helper for Admin UI Components
const AdminCheckbox = ({ label, value, onChange }: any) => (
  <div className="flex items-center gap-3 w-full">
    <input 
      type="checkbox" 
      checked={value} 
      onChange={e => onChange(e.target.checked)} 
      className="w-4 h-4 accent-[var(--accent)] rounded border-white/10 bg-black/60 cursor-pointer" 
    />
    <label className="text-white/40 text-[9px] font-black uppercase tracking-[0.2em] cursor-pointer">{label}</label>
  </div>
);

const AdminInput = ({ label, value, onChange, type = "text" }: any) => (
  <div className="flex flex-col gap-2 w-full">
    <label className="text-[9px] text-[var(--accent)] font-bold uppercase tracking-widest">{label}</label>
    <input 
      type={type}
      className="bg-black/60 border border-white/10 rounded-lg p-3 text-white text-xs outline-none focus:border-[var(--accent)] w-full font-sans" 
      value={value} 
      onChange={(e) => onChange(e.target.value)} 
    />
  </div>
);

const App: React.FC = () => {
  const [activeView, setActiveView] = useState('catalogue');
  const [catalogIndex, setCatalogIndex] = useState(0);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(() => localStorage.getItem('armani_confirmed') === 'true');
  const [currentThemeId, setCurrentThemeId] = useState(() => localStorage.getItem('global_theme_id') || 'IVORY_EXECUTIVE');
  
  const [selectedProductId, setSelectedProductId] = useState<number | null>(() => {
    const saved = localStorage.getItem('armani_selected_p_id');
    return saved ? parseInt(saved) : null;
  });

  const [isDetailChecked, setIsDetailChecked] = useState(false);

  useEffect(() => {
    const handleThemeChange = (e: any) => setCurrentThemeId(e.detail);
    window.addEventListener('themeChanged', handleThemeChange);
    return () => window.removeEventListener('themeChanged', handleThemeChange);
  }, []);

  const [catalogs, setCatalogs] = useState(() => {
    const saved = localStorage.getItem('armani_catalogs');
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map((cat: any) => ({
        ...cat,
        products: cat.products.map((p: any) => ({
          ...p,
          isVisible: p.isVisible !== undefined ? p.isVisible : true,
          statusText: p.statusText || 'Detail',
          totalIncome: p.totalIncome !== undefined ? p.totalIncome : (p.price + p.profit),
          isExclusive: p.isExclusive !== undefined ? p.isExclusive : false
        }))
      }));
    }
    return JSON.parse(JSON.stringify(CATALOGS_DATA)).map((cat: any) => ({
      ...cat,
      products: cat.products.map((p: any) => ({
        ...p,
        isVisible: true,
        statusText: 'Detail',
        totalIncome: (p.price + p.profit),
        isExclusive: false
      }))
    }));
  });

  const [detailContent, setDetailContent] = useState(() => {
    const saved = localStorage.getItem('armani_detail');
    const defaultDetail = {
      title: "DETAIL PEKERJAAN",
      accountName: "INVENT PRATIWI",
      accountPhone: "085240188282",
      contractTitle: "KONTRAK PEKERJAAN",
      detailsTitle: "RINCIAN PEKERJAAN",
      confirmationText: "DETAIL PEKERJAAN DAN KONTRAK TUGAS SUDAH DISETUJUI ANGGOTA",
      taskTimeTitle: "WAKTU TUGAS",
      taskTimeValue: "60 MENIT",
      taskTimeSub: "Waktu maksimum penyelesaian tugas",
      contractItems: [
        "HARAP SETORKAN SESUAI JUMLAH PEKERJAAN YANG DI PILIH",
        "ANGGOTA WAJIB UNTUK MENGIKUTI SEMUA ARAHAN YANG DIBERIKAN PEMBIMBING",
        "KESALAHAN YANG DILAKUKAN OLEH SETIAP ANGGOTA TIDAK AKAN MENJADI TANGGUNG JAWAB PERUSAHAAN",
        "SETIAP ANGGOTA PERLU MEMULAI PEKERJAAN DALAM AKUN BISNIS DIDALAM MENU \"START AUTOMATIC PROMOTION\".",
        "JIKA PENYELESAIAN TUGAS BELUM SELESAI MAKA PENARIKAN BELUM DAPAT DILAKUKAN OLEH ANGGOTA"
      ],
      taskDetails: [
        { l: 'KETENTUAN', d: 'SATU KALI PENYELESAIAN TUGAS SATU KALI PENARIKAN' },
        { l: 'PROSES', d: 'SISTEM AKAN MEMPROSES TUGAS SECARA OTOMATIS' },
        { l: 'TUGAS', d: 'SATU PESANAN TIGA PRODUK TOTAL TIGA PESANAN' },
        { l: 'PENYELESAIAN', d: 'JIKA PESANAN BELUM SELESAI, SISTEM TIDAK DAPAT MENGIZINKAN PENARIKAN' },
        { l: 'PENTING', d: 'HARAP MENYELESAIKAN TUGAS DALAM WAKTU YANG DITENTUKAN' }
      ]
    };
    return saved ? JSON.parse(saved) : defaultDetail;
  });

  const [systemContent, setSystemContent] = useState(() => {
    const saved = localStorage.getItem('armani_system');
    const defaultSystem = {
      visualMode: 'verifikasi',
      common: {
        title: "DETEKSI SISTEM",
        accNo: "0821-2437-2410",
        reportDate: "18 JAN 2026",
        owner: "IWAN EGY",
        status: "VERIFIKASI AKUN",
        bank: "BNI",
        pembayaran: "IDR 9.900.000",
        rek: "0897714140",
        frequency: "1",
        saldo: "IDR 15.850.000",
        pendapatan: "IDR 29.700.000",
      },
      kesalahan: {
        target: "IDR 14.850.000",
        withdrawal: "IDR 15.850.000",
        left_title: "PEMULIHAN",
        left_subtitle: "KESALAHAN TERDETEKSI: SALURAN PENARIKAN ERROR",
        left_note: "SISTEM CRASH DAN INFORMASI TUGAS HILANG. PEMULIHAN SALURAN PENARIKAN DI PERLUKAN !!!",
        footer_label: "VARIANSI PROTOKOL",
        footer_value: "IDR 1.000.000",
        right_title: "INFORMASI",
        right_paragraph: "Anggota melanggar aturan penarikan and jumlah penarikan tidak sesuai dengan jumlah yang di tentukan oleh sistem, sehingga menyebabkan beberapa hal :",
        right_bullets: "SALURAN PENARIKAN TERKUNCI\nINFORMASI TUGAS HILANG\nKREDIBILITAS AKUN MENURUN",
        highlight_title: "PENTING !!!",
        highlight_text: "HARAP SEGERA PULIHKAN SALURAN PENARIKAN UNTUK MEMBUKA KEMBALI PENARIKAN DENGAN SETORAN SEJUMLAH Rp 1.560.000"
      },
      kredit: {
        currentKredit: "56",
        left_title: "PEMULIHAN KREDIT",
        left_subtitle: "KREDIBILITAS MENURUN | PEMULIHAN DIPERLUKAN",
        left_note: "1 Point kredit = 1.044.900 atau 1% dari total saldo akun.\n44 Point x 1.094.900 = 45.975.600",
        footer_label: "KUOTA PEMULIHAN",
        footer_value: "IDR 35.640.000",
        right_title: "INFORMASI",
        right_paragraph: "SETIAP AKUN ANGGOTA AKAN MENDAPATKAN 100 POIN KREDIT SETELAH PROSES PENDAFTARAN SELESAI. POIN KREDIT INI DI GUNAKAN SEBAGAI TOLOK UKUR UNTUK MENGEVALUASI TINGKAT KEPERCAYAAN DAN KUALITAS SEORANG PELANGGAN.",
        highlight_title: "PENTING !!!",
        highlight_text: "HARAP MELAKUKAN SETORAN SEJUMLAH Rp. 35.640.000 UNTUK MENAIKAN POIN KREDIT MENJADI 100 AND SEJUMLAH Rp 330.000.000 DAPAT DITARIK."
      },
      verifikasi: {
        verifList: [
          { label: "KESALAHAN PENARIKAN", val: "IDR 5.000.000" },
          { label: "BATAS WAKTU", val: "IDR 5.000.000" },
          { label: "KREDIT POIN", val: "IDR 1.134.375" }
        ],
        left_title: "VERIFIKASI AKUN",
        left_subtitle: "VERIFIKASI PENARIKAN UNTUK PENCAIRAN",
        left_note: "SESUAI KETENTUAN BIAYA VERIFIKASI ADALAH 50% DARI TOTAL KESALAHAN YANG TERDETEKSI.",
        footer_label: "BIAYA VERIFIKASI",
        footer_value: "IDR 11.134.375",
        right_title: "INFORMASI",
        right_paragraph: "Verifikasi akun di perlukan karena anggota telah melakukan kesalahan berulang kali, sebagai berikut :",
        right_bullets: "Melakukan penarikan yang tidak sesuai dengan ketentuan\nMelebihi batas waktu yang di tentukan\nKredit poin menurun 80 poin",
        highlight_title: "PENTING !!!",
        highlight_text: "Harap melakukan setoran verifikasi sejumlah Rp 11.134.375 and sejumlah Rp 330.000.000 akan langsung di proses ke Rekening anggota tanpa kendala."
      }
    };
    return saved ? JSON.parse(saved) : defaultSystem;
  });

  const [bankContent, setBankContent] = useState(() => {
    const saved = localStorage.getItem('armani_bank');
    const defaultBank = {
      bankName: "BNI",
      rek: "1988 0158 80",
      owner: "IMAN HADI KESUMA",
      logo: "https://upload.wikimedia.org/wikipedia/id/thumb/1/15/BNI_logo.svg/1200px-BNI_logo.svg.png",
      status: "TERVERIFIKASI",
      certTitle: "DETAIL TUGAS TELAH DIKONFIRMASI.",
      certSubtitle: "SURAT PERSETUJUAN KERJA GIORGIO ARMANI BUSINESS",
      certItems: "01. SAYA MENYATAKAN SETUJU UNTUK MENYELESAIKAN SELURUH TUGAS SESUAI KETENTUAN SISTEM.\n02. SAYA MEMAHAMI BAHWA TUGAS YANG TELAH DIMULAI TIDAK DAPAT DIBATALKAN SECARA SEPIHAK.\n03. SAYA BERSEDIA MENGIKUTI ARAHAN MENTOR UNTUK KELANCARAN PROSES PENCAIRAN KOMISI.",
      certStatus: "SIGNED & VERIFIED",
      certFooter: "SECURED BY ARMANI PRIVÉ"
    };
    return saved ? JSON.parse(saved) : defaultBank;
  });

  useEffect(() => {
    localStorage.setItem('armani_catalogs', JSON.stringify(catalogs));
    localStorage.setItem('armani_detail', JSON.stringify(detailContent));
    localStorage.setItem('armani_system', JSON.stringify(systemContent));
    localStorage.setItem('armani_bank', JSON.stringify(bankContent));
    if (selectedProductId) localStorage.setItem('armani_selected_p_id', selectedProductId.toString());
  }, [catalogs, detailContent, systemContent, bankContent, selectedProductId]);

  const updateProduct = (catIdx: number, pIdx: number, field: string, val: any) => {
    const newC = [...catalogs];
    newC[catIdx].products[pIdx][field] = val;
    setCatalogs(newC);
  };

  const nextCatalog = () => setCatalogIndex((prev) => (prev + 1) % catalogs.length);
  const prevCatalog = () => setCatalogIndex((prev) => (prev - 1 + catalogs.length) % catalogs.length);

  const getCurrentProduct = (): { product: Product, category: string } | null => {
    if (selectedProductId === null) return null;
    for (const cat of catalogs) {
      const p = cat.products.find((prod: any) => prod.id === selectedProductId);
      if (p) return { product: p, category: cat.name };
    }
    return null;
  };

  const renderContent = () => {
    if (activeView === 'detail') {
      const current = getCurrentProduct();
      
      if (!current) {
        return (
            <div className="flex flex-col items-center justify-center w-full h-[600px] text-[var(--color-text-secondary)] uppercase font-black tracking-widest text-center px-20">
                <div className="w-16 h-16 mb-6 opacity-20"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg></div>
                Harap pilih produk terlebih dahulu di menu "Katalog Produk" untuk melihat detail tugas.
            </div>
        );
      }

      const { product, category } = current;
      const displayProfit = product.isExclusive ? "20% - 50%" : `${product.commission}% - 50%`;

      return (
        <div className="flex flex-col w-full h-[calc(1000px-72px-30px)] overflow-hidden bg-transparent view-readability-optimized">
          {/* HEADER JUDUL - SAFE AREA & PADAT */}
          <div className="w-full text-center mt-6 mb-4 shrink-0">
             <EditableText 
               value={detailContent.title} 
               onChange={(v:string) => setDetailContent({...detailContent, title: v})} 
               className="text-[48px] font-brand font-black text-[#d13a3a] tracking-[0.2em] italic uppercase leading-none" 
             />
          </div>

          {/* LAYOUT GRID 2 KOLOM - ANTI TERPOTONG */}
          <div className="flex-grow w-full px-12 pb-6 overflow-visible">
            <div className="max-w-[960px] mx-auto grid grid-cols-12 gap-6 h-full items-start">
              
              {/* KOLOM KIRI (35%) */}
              <div className="col-span-4 flex flex-col gap-5 h-full">
                {/* PANEL AKUN (MERAH) - PENYESUAIAN PREMIUM */}
                <div className="bg-gradient-to-b from-[#e64a4a] to-[#d13a3a] rounded-[24px] overflow-hidden shadow-[0_25px_50px_-12px_rgba(209,58,58,0.6)] flex flex-col border border-[#f9e79f]/30 shrink-0 ring-1 ring-white/10">
                   <div className="w-full py-3 bg-white/10 text-center border-b border-white/20 relative">
                      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                      <span className="text-[13px] font-black text-white tracking-[0.5em] uppercase italic drop-shadow-sm">AKUN</span>
                   </div>
                   <div className="px-6 py-7 flex flex-col items-center text-center gap-1">
                      <EditableText 
                        value={detailContent.accountName} 
                        onChange={(v:string) => setDetailContent({...detailContent, accountName: v})} 
                        className="text-[25px] font-brand font-black text-white uppercase italic tracking-widest leading-none drop-shadow-md" 
                      />
                      <EditableText 
                        value={detailContent.accountPhone} 
                        onChange={(v:string) => setDetailContent({...detailContent, accountPhone: v})} 
                        className="text-[19px] font-sans font-black text-white/90 tracking-[0.05em] mt-1" 
                      />
                   </div>
                   <div className="grid grid-cols-1 divide-y divide-white/20 border-t border-white/20 text-[12px] font-bold">
                      <div className="flex justify-between items-center px-8 py-4 bg-white/5">
                         <span className="text-white/70 tracking-[0.2em] uppercase text-[10px] font-black italic">PRICE</span>
                         <span className="text-white font-black text-[19px] drop-shadow-sm">{product.price.toLocaleString('id-ID')}</span>
                      </div>
                      <div className="flex justify-between items-center px-8 py-4">
                         <span className="text-white/70 tracking-[0.2em] uppercase text-[10px] font-black italic">PROFIT</span>
                         <span className="text-[#f9e79f] font-black text-[19px] drop-shadow-sm">{displayProfit}</span>
                      </div>
                      <div className="flex justify-between items-center px-8 py-4 bg-white/5">
                         <span className="text-white/70 tracking-[0.2em] uppercase text-[10px] font-black italic">CATEGORY</span>
                         <span className="text-white font-black uppercase italic truncate text-[14px]">{category} COLLECTION</span>
                      </div>
                   </div>
                </div>

                {/* GAMBAR PRODUK BOX - BERAKHIR RAPI (CLEAN ROUNDED) */}
                <div className="flex-grow bg-[#ff7373] rounded-[24px] overflow-hidden shadow-xl flex flex-col min-h-0 relative border border-white/20">
                   <div className="w-full py-2.5 bg-black/5 text-center border-b border-black/5 shrink-0">
                      <span className="text-[12px] font-black text-black tracking-[0.3em] uppercase italic truncate px-2 block">{product.name}</span>
                   </div>
                   <div className="flex-grow relative w-full overflow-hidden bg-black rounded-b-[24px]">
                      <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover opacity-90" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                      <div className="absolute bottom-8 left-0 right-0 px-8">
                        <span className="text-white text-[24px] font-brand font-black uppercase italic tracking-widest leading-none truncate">{product.name}</span>
                      </div>
                   </div>
                </div>
              </div>

              {/* KOLOM KANAN (65%) */}
              <div className="col-span-8 flex flex-col gap-5 h-full min-h-0">
                {/* KONTRAK PEKERJAAN BOX */}
                <div className="bg-white rounded-[24px] border border-black/10 shadow-lg p-7 flex flex-col shrink-0">
                   <div className="flex items-center gap-4 mb-5">
                      <div className="flex-grow h-[1px] bg-black/10"></div>
                      <EditableText 
                        value={detailContent.contractTitle} 
                        onChange={(v:string) => setDetailContent({...detailContent, contractTitle: v})} 
                        className="text-[16px] font-brand font-black text-black tracking-[0.25em] uppercase italic" 
                      />
                      <div className="flex-grow h-[1px] bg-black/10"></div>
                   </div>
                   <div className="space-y-3">
                      {detailContent.contractItems.map((item: string, i: number) => (
                        <div key={i} className="flex gap-4 items-start">
                           <div className="w-1.5 h-1.5 rounded-full bg-black/30 mt-1.5 shrink-0"></div>
                           <EditableText 
                             value={item} 
                             isMultiline
                             onChange={(v:string) => {
                               const items = [...detailContent.contractItems];
                               items[i] = v;
                               setDetailContent({...detailContent, contractItems: items});
                             }} 
                             className="text-[11px] font-bold text-black/50 leading-snug uppercase tracking-tight" 
                           />
                        </div>
                      ))}
                   </div>
                </div>

                {/* RINCIAN PEKERJAAN BOX */}
                <div className="bg-white rounded-[24px] border border-black/10 shadow-lg p-7 flex flex-col flex-grow min-h-0">
                   <div className="flex items-center gap-4 mb-5 shrink-0">
                      <div className="flex-grow h-[1px] bg-black/10"></div>
                      <EditableText 
                        value={detailContent.detailsTitle} 
                        onChange={(v:string) => setDetailContent({...detailContent, detailsTitle: v})} 
                        className="text-[16px] font-brand font-black text-black tracking-[0.25em] uppercase italic" 
                      />
                      <div className="flex-grow h-[1px] bg-black/10"></div>
                   </div>
                   <div className="space-y-4 flex-grow min-h-0 overflow-hidden">
                      {detailContent.taskDetails.map((item: any, i: number) => (
                        <div key={i} className="flex gap-5 items-start">
                           <div className="w-1.5 h-1.5 rounded-full bg-black mt-2 shrink-0"></div>
                           <div className="flex flex-col sm:flex-row sm:gap-6 flex-grow items-baseline">
                              <EditableText 
                                value={item.l} 
                                onChange={(v:string) => {
                                  const items = [...detailContent.taskDetails];
                                  items[i].l = v;
                                  setDetailContent({...detailContent, taskDetails: items});
                                }} 
                                className="text-[12px] font-black text-black uppercase italic tracking-[0.15em] w-[140px] shrink-0" 
                              />
                              <EditableText 
                                value={item.d} 
                                isMultiline
                                onChange={(v:string) => {
                                  const items = [...detailContent.taskDetails];
                                  items[i].d = v;
                                  setDetailContent({...detailContent, taskDetails: items});
                                }} 
                                className="text-[12px] font-bold text-black/50 leading-tight uppercase tracking-tight" 
                              />
                           </div>
                        </div>
                      ))}
                   </div>

                   {/* FITUR WAKTU TUGAS - MENGISI KOTAK KOSONG */}
                   <div className="mt-auto pt-6 border-t border-black/5 flex flex-col items-center justify-center shrink-0">
                      <div className="bg-black/[0.03] rounded-2xl px-12 py-4 border border-black/5 flex flex-col items-center shadow-inner relative overflow-hidden group">
                         <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#d13a3a]/20 to-transparent"></div>
                         <div className="flex items-center gap-2.5 mb-1.5">
                            <svg className="w-4 h-4 text-black/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <EditableText 
                              value={detailContent.taskTimeTitle} 
                              onChange={(v:string) => setDetailContent({...detailContent, taskTimeTitle: v})} 
                              className="text-[11px] font-black text-black/60 uppercase tracking-[0.3em] leading-none" 
                            />
                         </div>
                         <EditableText 
                           value={detailContent.taskTimeValue} 
                           onChange={(v:string) => setDetailContent({...detailContent, taskTimeValue: v})} 
                           className="text-[36px] font-brand font-black text-black leading-none drop-shadow-sm" 
                         />
                         <EditableText 
                           value={detailContent.taskTimeSub} 
                           onChange={(v:string) => setDetailContent({...detailContent, taskTimeSub: v})} 
                           className="text-[9px] font-bold text-black/30 uppercase tracking-[0.2em] mt-2 italic" 
                         />
                      </div>
                   </div>
                </div>

                {/* BAR KONFIRMASI (BOTTOM - INTEGRATED FLOW) */}
                <div className="bg-[#1f2029] rounded-[24px] overflow-hidden shadow-2xl flex flex-col shrink-0 mt-auto mb-24">
                   <div className="p-4 flex flex-col gap-3">
                      <div className="flex items-center justify-center gap-3 cursor-pointer group" onClick={() => setIsDetailChecked(!isDetailChecked)}>
                         <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${isDetailChecked ? 'bg-[#0095ff] border-[#0095ff]' : 'border-white/20'}`}>
                            {isDetailChecked && <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>}
                         </div>
                         <EditableText 
                           value={detailContent.confirmationText} 
                           isMultiline
                           onChange={(v:string) => setDetailContent({...detailContent, confirmationText: v})} 
                           className="text-[10px] font-black text-white/90 uppercase tracking-[0.05em] italic leading-tight" 
                         />
                      </div>
                      
                      <button 
                        disabled={!isDetailChecked}
                        onClick={() => {
                           localStorage.setItem('armani_confirmed', 'true');
                           setIsConfirmed(true);
                           setActiveView('bank');
                        }}
                        className={`w-full flex items-center justify-center rounded-xl text-[22px] font-brand font-black uppercase italic tracking-[0.3em] transition-all active:scale-[0.98] leading-none h-[54px]
                          ${isDetailChecked 
                            ? 'bg-[#0095ff] text-white hover:brightness-110 shadow-[0_15px_35px_-5px_rgba(0,149,255,0.5)] cursor-pointer' 
                            : 'bg-[#0095ff]/75 text-white/60 cursor-not-allowed border border-[#f9e79f]/40 shadow-[0_0_20px_rgba(249,231,159,0.1)]'}`}
                      >
                         {!isDetailChecked && (
                           <svg className="w-6 h-6 mr-3 opacity-60" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                         )}
                         KONFIRMASI
                      </button>
                   </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      );
    }

    if (activeView === 'system') {
      const s = systemContent;
      const common = s.common;
      const mode = s.visualMode;
      const data = s[mode as keyof typeof s] as any;

      return (
        <div className="flex flex-col items-center w-full h-auto bg-transparent view-readability-optimized">
          <div className="w-full h-auto pt-4 px-12 pb-1 flex flex-col gap-4 justify-start">
            <div className="w-full flex flex-col items-center border-b border-white/10 pb-2 shrink-0 relative">
               <span className="text-[12px] font-black text-[var(--accent)] tracking-[0.8em] uppercase mb-1">Protokol Audit Internal</span>
               <EditableText value={common.title} onChange={(v:string) => setSystemContent({...s, common: {...common, title: v}})} className="text-[46px] font-brand font-black text-[var(--color-text-primary)] tracking-tight uppercase italic" />
            </div>
            <div className="w-full bg-[var(--bg-panel)] rounded-2xl p-6 border border-white/5 luxury-gradient-border shadow-2xl shrink-0">
                <div className="grid grid-cols-2 gap-x-12 gap-y-3">
                   {[
                     { l: "ID AKUN", v: common.accNo, k: 'accNo' }, { l: "TANGGAL", v: common.reportDate, k: 'reportDate' },
                     { l: "NAMA", v: common.owner, k: 'owner' }, { l: "STATUS AKUN", v: common.status, k: 'status', highlight: true },
                     { l: "NAMA BANK", v: common.bank, k: 'bank' }, { l: "PEMBAYARAN", v: common.pembayaran, k: 'pembayaran' },
                     { l: "NOMOR REKENING", v: common.rek, k: 'rek' }, { l: "FREKUENSI", v: common.frequency, k: 'frequency' },
                     { l: "INFORMASI SALDO", v: common.saldo, k: 'saldo' }, { l: "Total Pendapatan", v: common.pendapatan, k: 'pendapatan' }
                   ].map((item, i) => (
                     <div key={i} className="flex justify-between items-end border-b border-white/5 pb-1">
                       <span className="text-[12px] font-black tracking-[0.3em] uppercase text-[var(--color-text-secondary)] italic">{item.l}</span>
                       <EditableText 
                        value={item.v} 
                        onChange={(v:string) => setSystemContent({...s, common: {...common, [item.k]: v}})} 
                        className={`text-[16px] font-sans font-extrabold tracking-tight uppercase ${item.highlight ? 'text-[var(--status-error)]' : 'text-[var(--color-text-primary)]'}`} 
                       />
                     </div>
                   ))}
                </div>
            </div>
            <div className="w-full grid grid-cols-12 gap-4 overflow-visible">
              <div className="col-span-7 flex flex-col h-auto bg-[var(--bg-panel)] border border-white/5 shadow-2xl rounded-2xl overflow-visible">
                 <div className="w-full py-2 bg-white/5 text-center border-b border-white/5 shrink-0">
                   <span className="text-[12px] font-black uppercase tracking-[0.5em] text-[var(--accent)] italic">DETEKSI SISTEM</span>
                 </div>
                 <div className="flex-grow p-6 flex flex-col justify-between h-auto">
                    <div className="flex flex-col gap-4 flex-grow">
                        <div>
                            <EditableText value={data.left_title} onChange={(v:string) => setSystemContent({...s, [mode]: {...data, left_title: v}})} className="text-[24px] font-brand font-black text-[var(--color-text-primary)] uppercase tracking-wide border-l-4 border-[var(--accent)] pl-6 italic block" />
                            <EditableText value={data.left_subtitle} onChange={(v:string) => setSystemContent({...s, [mode]: {...data, left_subtitle: v}})} className="text-[11px] text-[var(--accent)] font-black uppercase tracking-[0.25em] mt-1 opacity-80 italic block" />
                        </div>
                        <div className="flex flex-col justify-center h-auto">
                            {mode === 'kesalahan' && (
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-black/40 p-4 border border-white/5 rounded-xl">
                                        <h4 className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-[0.3em] mb-1 font-black italic">PENARIKAN DITENTUKAN</h4>
                                        <EditableText value={s.kesalahan.target} onChange={(v:string) => setSystemContent({...s, kesalahan: {...s.kesalahan, target: v}})} className="text-[22px] font-sans font-extrabold text-[var(--color-success)]" />
                                    </div>
                                    <div className="bg-black/40 p-4 border border-[var(--status-error)]/20 rounded-xl">
                                        <h4 className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-[0.3em] mb-1 font-black italic">PENARIKAN DILAKUKAN</h4>
                                        <EditableText value={s.kesalahan.withdrawal} onChange={(v:string) => setSystemContent({...s, kesalahan: {...s.kesalahan, withdrawal: v}})} className="text-[22px] font-sans font-extrabold text-[var(--status-error)]" />
                                    </div>
                                </div>
                            )}
                            {mode === 'kredit' && (
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-black/40 p-6 border border-white/5 rounded-xl min-h-[110px]">
                                        <h4 className="text-[11px] mb-2 text-[var(--color-text-secondary)] uppercase tracking-[0.35em] font-black italic border-b border-white/5 pb-1">POIN AWAL</h4>
                                        <span className="text-[32px] font-sans font-black text-[var(--color-text-primary)] leading-none text-glow-gold">100</span>
                                    </div>
                                    <div className="bg-black/40 p-6 border border-[var(--status-error)]/20 rounded-xl min-h-[110px]">
                                        <h4 className="text-[11px] mb-2 text-[var(--status-error)] uppercase tracking-[0.35em] font-black italic border-b border-[var(--status-error)]/10 pb-1">SKOR SAAT INI</h4>
                                        <EditableText value={s.kredit.currentKredit} onChange={(v:string) => setSystemContent({...s, kredit: {...s.kredit, currentKredit: v}})} className="text-[32px] font-sans font-black text-[var(--status-error)] leading-none" />
                                    </div>
                                </div>
                            )}
                            {mode === 'verifikasi' && (
                                <div className="bg-black/40 border border-white/5 rounded-xl overflow-hidden shadow-xl">
                                    <table className="w-full text-[13px] border-collapse">
                                        <tbody>
                                            {s.verifikasi.verifList.map((item: any, idx: number) => (
                                                <tr key={idx} className="border-b border-white/5 last:border-0">
                                                    <td className="py-2 px-4 text-[var(--color-text-secondary)] font-bold uppercase tracking-wider">
                                                      <EditableText value={item.label} onChange={(v:string) => {
                                                        const list = [...s.verifikasi.verifList];
                                                        list[idx].label = v;
                                                        setSystemContent({...s, verifikasi: {...s.verifikasi, verifList: list}});
                                                      }} />
                                                    </td>
                                                    <td className="py-2 px-4 text-right font-sans font-extrabold text-[var(--status-error)]">
                                                      <EditableText value={item.val} onChange={(v:string) => {
                                                        const list = [...s.verifikasi.verifList];
                                                        list[idx].val = v;
                                                        setSystemContent({...s, verifikasi: {...s.verifikasi, verifList: list}});
                                                      }} />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                        <EditableText 
                          value={data.left_note} 
                          isMultiline
                          onChange={(v:string) => setSystemContent({...s, [mode]: {...data, left_note: v}})} 
                          className="text-[14px] whitespace-pre-line leading-relaxed text-[var(--color-text-secondary)] font-bold italic block border-l border-white/10 pl-4" 
                        />
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center bg-black/40 p-6 rounded-xl border-t-[4px] border-t-[var(--accent)] shadow-2xl">
                        <EditableText value={data.footer_label} onChange={(v:string) => setSystemContent({...s, [mode]: {...data, footer_label: v}})} className="text-[12px] font-black text-[var(--accent)] uppercase tracking-[0.5em] italic" />
                        <EditableText value={data.footer_value} onChange={(v:string) => setSystemContent({...s, [mode]: {...data, footer_value: v}})} className="text-[32px] font-sans font-black text-[var(--color-text-primary)] text-glow-gold" />
                    </div>
                 </div>
              </div>
              <div className="col-span-5 bg-[var(--bg-panel)] border border-white/5 flex flex-col p-6 shadow-2xl rounded-2xl h-auto overflow-visible relative">
                 <div className="w-full border-b pb-2 mb-4 border-white/10 flex justify-between items-center shrink-0">
                   <EditableText value={data.right_title} onChange={(v:string) => setSystemContent({...s, [mode]: {...data, right_title: v}})} className="text-[16px] font-brand font-black uppercase tracking-[0.4em] text-[var(--accent)] italic" />
                   <div className="w-3 h-3 bg-[var(--status-error)] rounded-full animate-pulse shadow-[0_0_15px_var(--status-error)]"></div>
                 </div>
                 <div className="flex-grow flex flex-col justify-between h-auto">
                    <div className="flex flex-col gap-4">
                        <EditableText 
                          value={data.right_paragraph} 
                          isMultiline
                          onChange={(v:string) => setSystemContent({...s, [mode]: {...data, right_paragraph: v}})} 
                          className="text-[15px] font-bold leading-relaxed text-[var(--color-text-secondary)] block" 
                        />
                        {data.right_bullets && (
                          <div className="space-y-3 bg-black/40 p-4 rounded-xl border border-white/5">
                              {data.right_bullets.split('\n').map((text: string, i: number) => (
                                  <div key={i} className="flex items-center gap-4">
                                      <div className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full opacity-60"></div>
                                      <EditableText 
                                        value={text} 
                                        onChange={(v:string) => {
                                          const lines = data.right_bullets.split('\n');
                                          lines[i] = v;
                                          setSystemContent({...s, [mode]: {...data, right_bullets: lines.join('\n')}});
                                        }} 
                                        className="text-[12px] text-[var(--color-text-primary)] font-extrabold uppercase tracking-[0.15em] opacity-80" 
                                      />
                                  </div>
                              ))}
                          </div>
                        )}
                    </div>
                    <div className="mt-4">
                        <div className="p-4 bg-gradient-to-br from-[var(--status-error)]/15 to-transparent border border-[var(--status-error)]/30 rounded-2xl space-y-2 border-l-[4px] border-l-[var(--status-error)]">
                            <EditableText value={data.highlight_title} onChange={(v:string) => setSystemContent({...s, [mode]: {...data, highlight_title: v}})} className="text-[13px] font-black text-[var(--status-error)] uppercase tracking-wide border-l-2 border-[var(--status-error)] pl-3 italic block" />
                            <EditableText value={data.highlight_text} isMultiline onChange={(v:string) => setSystemContent({...s, [mode]: {...data, highlight_text: v}})} className="text-[13px] font-extrabold text-[var(--color-text-primary)] uppercase tracking-[0.12em] leading-relaxed italic block" />
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (activeView === 'bank') {
      const b = bankContent;
      const current = getCurrentProduct();
      return (
        <div className="flex flex-col items-center justify-start w-full h-auto bg-transparent px-12 pt-8 pb-6 relative overflow-y-auto custom-scrollbar max-h-full">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--accent)_0%,transparent_70%)] opacity-[0.03] pointer-events-none"></div>
          
          {/* 1) INDIKATOR KONFIRMASI TUGAS - PALING ATAS */}
          {isConfirmed && current && (
            <div className="w-[760px] p-5 bg-[var(--bg-panel)] border border-white/10 rounded-[28px] shadow-2xl mb-5 flex items-center gap-6 relative overflow-hidden shrink-0 group">
               <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/5 to-transparent pointer-events-none"></div>
               
               {/* THUMBNAIL PRODUK (80px) */}
               <div className="w-20 h-20 rounded-2xl overflow-hidden border border-white/20 shadow-lg shrink-0 bg-black">
                  <img src={current.product.imageUrl} alt="Confirmed product" className="w-full h-full object-cover opacity-90" />
               </div>

               {/* KONTEN STATUS */}
               <div className="flex flex-col gap-1.5 flex-grow">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-[#22c55e]/15 border border-[#22c55e]/30 rounded-full text-[10px] font-black text-[#22c55e] uppercase tracking-[0.2em] italic flex items-center gap-1.5 shadow-sm">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                      TASK CONFIRMED
                    </span>
                  </div>
                  <h3 className="text-[15px] font-brand font-black text-[var(--color-text-primary)] uppercase tracking-wider italic">
                    DETAIL TUGAS TELAH DIKONFIRMASI
                  </h3>
                  <p className="text-[10px] text-[var(--color-text-secondary)] font-bold uppercase tracking-widest opacity-60">
                    Sistem telah memverifikasi rincian pekerjaan anggota.
                  </p>
               </div>

               {/* AKSEN DEKORATIF */}
               <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-10">
                  <svg className="w-12 h-12 text-[var(--accent)]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
               </div>
            </div>
          )}

          {/* 2) PANEL SURAT PERSETUJUAN KERJA - DI TENGAH */}
          {isConfirmed && (
            <div className="w-[760px] bg-white border border-[#D4AF37]/30 rounded-[28px] p-8 shadow-xl mb-6 flex flex-col shrink-0 relative overflow-hidden">
              <div className="absolute inset-0 bg-[#faf9f6]/30 pointer-events-none"></div>
              {/* Header kecil */}
              <div className="w-full text-center mb-1 relative z-10">
                 <span className="text-[10px] font-black text-[#B38B4D] tracking-[0.4em] uppercase">SURAT PERSETUJUAN KERJA GIORGIO ARMANI BUSINESS</span>
              </div>
              {/* Judul utama tegas */}
              <div className="w-full text-center mb-6 relative z-10">
                 <h2 className="text-[20px] font-brand font-black text-black tracking-widest uppercase italic border-b border-black/5 pb-4">DETAIL TUGAS TELAH DIKONFIRMASI.</h2>
              </div>
              
              {/* 3 Poin Teks */}
              <div className="space-y-4 px-4 mb-8 relative z-10">
                 <div className="flex gap-4 items-start">
                    <span className="text-[11px] font-black text-[#B38B4D] tracking-tighter shrink-0">01.</span>
                    <p className="text-[11px] font-bold text-black/60 leading-relaxed uppercase">SAYA MENYATAKAN SETUJU UNTUK MENYELESAIKAN SELURUH TUGAS SESUAI KETENTUAN SISTEM.</p>
                 </div>
                 <div className="flex gap-4 items-start">
                    <span className="text-[11px] font-black text-[#B38B4D] tracking-tighter shrink-0">02.</span>
                    <p className="text-[11px] font-bold text-black/60 leading-relaxed uppercase">SAYA MEMAHAMI BAHWA TUGAS YANG TELAH DIMULAI TIDAK DAPAT DIBATALKAN SECARA SEPIHAK.</p>
                 </div>
                 <div className="flex gap-4 items-start">
                    <span className="text-[11px] font-black text-[#B38B4D] tracking-tighter shrink-0">03.</span>
                    <p className="text-[11px] font-bold text-black/60 leading-relaxed uppercase">SAYA BERSEDIA MENGIKUTI ARAHAN MENTOR UNTUK KELANCARAN PROSES PENCAIRAN KOMISI.</p>
                 </div>
              </div>

              {/* Footer Panel */}
              <div className="flex justify-between items-end pt-4 border-t border-black/5 mt-auto relative z-10">
                 <div className="flex flex-col gap-1">
                    <span className="text-[8px] font-black text-black/30 uppercase tracking-[0.2em]">STATUS VERIFIKASI</span>
                    <span className="px-3 py-1 bg-[#22c55e]/10 border border-[#22c55e]/30 rounded-full text-[9px] font-black text-[#22c55e] uppercase tracking-widest italic shadow-sm">SIGNED & VERIFIED</span>
                 </div>
                 <span className="text-[9px] font-black text-black/40 uppercase tracking-[0.3em] italic">SECURED BY ARMANI PRIVÉ</span>
              </div>
            </div>
          )}

          {/* 3) BANK ACCOUNT CARD - POSISI DI BAWAH (DENGAN MARGIN-TOP ±24-32px) */}
          <div className="w-[760px] h-[380px] bg-[var(--bg-panel)] shadow-[0_60px_100px_-30px_rgba(0,0,0,1)] relative overflow-hidden border border-white/5 flex flex-col rounded-[32px] luxury-gradient-border shrink-0 mt-4 mb-8">
            <div className="flex-grow flex flex-col px-12 pt-8 pb-8 relative z-10">
              <div className="absolute top-8 right-12">
                <EditableText value={b.status} onChange={(v:string) => setBankContent({...b, status: v})} className="text-[11px] font-black text-white uppercase tracking-[0.4em] px-6 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 italic" />
              </div>
              <div className="mb-6 border-b border-white/5 pb-5">
                <h2 className="text-[36px] font-brand font-black tracking-tight leading-none uppercase text-[var(--color-text-primary)] italic">
                  BANK ACCOUNT <span className="text-[var(--accent)] font-medium">CARD</span>
                </h2>
                <p className="text-[10px] text-[var(--color-text-secondary)] font-black uppercase tracking-[0.6em] mt-2.5 italic">DIGITAL BUSINESS PROGRAM BY GIORGIO ARMANI</p>
              </div>
              <div className="flex-grow grid grid-cols-12 gap-10 items-center">
                <div className="col-span-4 flex items-center justify-center border-r border-white/5 pr-10">
                  <div className="w-full aspect-square bg-black rounded-2xl shadow-2xl border border-white/5 flex items-center justify-center p-6 relative overflow-hidden">
                    <img src={b.logo} alt="Bank Logo" className="w-full h-full object-contain grayscale brightness-125" />
                  </div>
                </div>
                <div className="col-span-8 pl-10 flex flex-col justify-center gap-5">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-[var(--color-text-secondary)] uppercase tracking-[0.5em] mb-1.5 italic">NAMA BANK</span>
                    <EditableText value={b.bankName} onChange={(v:string) => setBankContent({...b, bankName: v})} className="text-[18px] font-brand font-black text-[var(--color-text-primary)] uppercase tracking-wide leading-none" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-[var(--color-text-secondary)] uppercase tracking-[0.5em] mb-1.5 italic">NOMOR REKENING</span>
                    <EditableText value={b.rek} onChange={(v:string) => setBankContent({...b, rek: v})} className="text-[34px] font-sans font-medium text-[var(--accent)] tracking-normal leading-none" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-[var(--color-text-secondary)] uppercase tracking-[0.5em] mb-1.5 italic">NAMA</span>
                    <EditableText value={b.owner} onChange={(v:string) => setBankContent({...b, owner: v})} className="text-[20px] font-brand font-black text-[var(--color-text-primary)] uppercase tracking-wide leading-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-between w-full h-[calc(1000px-72px-30px)] bg-transparent">
        <div className="w-full h-32 flex flex-col items-center justify-center shrink-0 relative overflow-hidden">
          <div className="relative z-10 flex flex-col items-center">
            <EditableText 
              value={catalogs[catalogIndex].name} 
              onChange={(v:string) => {
                const newC = [...catalogs];
                newC[catalogIndex].name = v;
                setCatalogs(newC);
              }} 
              className="font-brand text-[clamp(24px,3.5vw,42px)] font-black text-[var(--color-text-primary)] tracking-[0.4em] uppercase text-center leading-none italic block" 
            />
            <div className="flex items-center gap-6 mt-4">
               <div className="w-20 h-[1px] bg-[var(--accent)] opacity-40"></div>
               <p className="text-[clamp(10px,1.1vw,13px)] font-black text-[var(--accent)] tracking-[0.8em] uppercase italic">COLLECTION 2026</p>
               <div className="w-20 h-[1px] bg-[var(--accent)] opacity-40"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 grid-rows-2 items-stretch gap-x-8 gap-y-6 w-full max-w-[960px] px-10 py-2 mb-auto flex-grow min-h-0 overflow-hidden">
          {catalogs[catalogIndex].products.map((product: any, pIdx: number) => (
            product.isVisible !== false && (
              <div key={product.id} className="flex flex-col h-full min-h-0">
                <ProductCard 
                  product={product} 
                  onUpdate={(f:string, v:any) => updateProduct(catalogIndex, pIdx, f, v)} 
                  onDetailClick={() => {
                    setSelectedProductId(product.id);
                    setActiveView('detail');
                  }}
                />
              </div>
            )
          ))}
        </div>

        <div className="w-full h-20 flex items-center justify-center gap-16 shrink-0 border-t border-black/5 bg-transparent">
          <button onClick={prevCatalog} className="text-[var(--color-text-secondary)] hover:text-[var(--accent)] transition-all uppercase font-black text-[11px] tracking-[0.5em] italic">SEBELUMNYA</button>
          <div className="flex gap-4">
            {catalogs.map((_: any, i: number) => (
              <div key={i} className={`w-2.5 h-2.5 rounded-full border transition-all duration-700 ${i === catalogIndex ? 'bg-[var(--accent)] scale-150 border-none shadow-[0_0_10px_var(--accent)]' : 'bg-transparent border-[var(--accent)]/40 hover:border-[var(--accent)]'}`} />
            ))}
          </div>
          <button onClick={nextCatalog} className="text-[var(--color-text-secondary)] hover:text-[var(--accent)] transition-all uppercase font-black text-[11px] tracking-[0.5em] italic">SELANJUTNYA</button>
        </div>
      </div>
    );
  };

  return (
    <div className="app-canvas flex flex-col bg-transparent relative" style={{ height: '1000px', minHeight: '1000px', overflow: 'hidden' }}>
      <Header activeView={activeView} setActiveView={setActiveView} />
      <main className="relative z-10 flex-grow flex flex-col overflow-hidden">{renderContent()}</main>
      <footer className="relative z-10 w-full text-center py-2 bg-transparent border-t border-white/5 text-[9px] font-black text-[var(--color-text-secondary)] uppercase tracking-[1em] shrink-0 opacity-20 italic">
        GIORGIO ARMANI SYSTEM 2026
      </footer>

      <button onClick={() => setIsAdminOpen(true)} className="fixed bottom-4 right-4 z-[100] w-10 h-10 bg-black/40 backdrop-blur-md hover:bg-[var(--accent)] border border-white/10 rounded-full flex items-center justify-center transition-all opacity-20 hover:opacity-100 hover:text-black group">
        <svg className="w-5 h-5 transition-transform group-hover:rotate-180" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path></svg>
      </button>

      {isAdminOpen && (
        <div className="fixed inset-0 z-[200] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-6">
          <div className="w-full max-w-[850px] max-h-[90vh] bg-[#080808] border border-white/5 rounded-[40px] shadow-2xl overflow-y-auto p-10 space-y-8 custom-scrollbar">
            <div className="flex justify-between items-center border-b border-white/10 pb-6 sticky top-0 bg-[#080808] z-10">
              <h2 className="text-white font-brand font-black text-2xl uppercase tracking-widest italic">Pusat Kontrol Strategis</h2>
              <button onClick={() => setIsAdminOpen(false)} className="text-[var(--accent)] font-black text-xs uppercase tracking-widest px-6 py-2 border border-[var(--accent)] rounded-lg hover:bg-[var(--accent)] hover:text-black transition-all">Tutup</button>
            </div>
            
            <div className="space-y-8">
              {/* DETAIL TUGAS ADMIN CONTROLS */}
              <div className="bg-white/5 p-6 rounded-2xl space-y-6 border border-white/5">
                <p className="text-[10px] text-white/40 font-black uppercase tracking-[0.4em] italic mb-2">PENGATURAN DETAIL TUGAS</p>
                <div className="grid grid-cols-2 gap-4">
                   <AdminInput label="NAMA AKUN" value={detailContent.accountName} onChange={(v:string) => setDetailContent({...detailContent, accountName: v})} />
                   <AdminInput label="NOMOR TELEPON" value={detailContent.accountPhone} onChange={(v:string) => setDetailContent({...detailContent, accountPhone: v})} />
                   <AdminInput label="JUDUL WAKTU" value={detailContent.taskTimeTitle} onChange={(v:string) => setDetailContent({...detailContent, taskTimeTitle: v})} />
                   <AdminInput label="NILAI WAKTU" value={detailContent.taskTimeValue} onChange={(v:string) => setDetailContent({...detailContent, taskTimeValue: v})} />
                </div>
              </div>

              {/* DETEKSI SISTEM CONTROLS */}
              <div className="bg-white/5 p-6 rounded-2xl space-y-6 border border-white/5">
                <p className="text-[10px] text-white/40 font-black uppercase tracking-[0.4em] italic mb-2">PENGATURAN DETEKSI SISTEM</p>
                <div className="flex gap-4">
                  {['kesalahan', 'kredit', 'verifikasi'].map(m => (
                    <button 
                      key={m} 
                      onClick={() => setSystemContent({...systemContent, visualMode: m})} 
                      className={`flex-grow px-6 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${systemContent.visualMode === m ? 'bg-[var(--accent)] text-black' : 'bg-black/40 text-white/30 border border-white/5'}`}
                    >
                      Mode {m}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-6 mt-4">
                  {systemContent.visualMode === 'kesalahan' && (
                    <>
                      <AdminInput label="PENARIKAN DITENTUKAN" value={systemContent.kesalahan.target} onChange={(v:string) => setSystemContent({...systemContent, kesalahan: {...systemContent.kesalahan, target: v}})} />
                      <AdminInput label="PENARIKAN DILAKUKAN" value={systemContent.kesalahan.withdrawal} onChange={(v:string) => setSystemContent({...systemContent, kesalahan: {...systemContent.kesalahan, withdrawal: v}})} />
                      <div className="col-span-2">
                        <AdminInput label="VALUE PEMULIHAN (FOOTER)" value={systemContent.kesalahan.footer_value} onChange={(v:string) => setSystemContent({...systemContent, kesalahan: {...systemContent.kesalahan, footer_value: v}})} />
                      </div>
                    </>
                  )}
                  {systemContent.visualMode === 'kredit' && (
                    <>
                      <AdminInput label="SKOR KREDIT SAAT INI" value={systemContent.kredit.currentKredit} onChange={(v:string) => setSystemContent({...systemContent, kredit: {...systemContent.kredit, currentKredit: v}})} />
                      <AdminInput label="VALUE KUOTA PEMULIHAN (FOOTER)" value={systemContent.kredit.footer_value} onChange={(v:string) => setSystemContent({...systemContent, kredit: {...systemContent.kredit, footer_value: v}})} />
                    </>
                  )}
                  {systemContent.visualMode === 'verifikasi' && (
                    <div className="col-span-2 space-y-4">
                      <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest">DAFTAR KESALAHAN VERIFIKASI:</p>
                      {systemContent.verifikasi.verifList.map((item: any, idx: number) => (
                        <div key={idx} className="flex gap-4 items-end bg-black/20 p-4 rounded-xl">
                          <AdminInput label="LABEL KESALAHAN" value={item.label} onChange={(v:string) => {
                            const list = [...systemContent.verifikasi.verifList];
                            list[idx].label = v;
                            setSystemContent({...systemContent, verifikasi: {...systemContent.verifikasi, verifList: list}});
                          }} />
                          <AdminInput label="VALUE (50%)" value={item.val} onChange={(v:string) => {
                            const list = [...systemContent.verifikasi.verifList];
                            list[idx].val = v;
                            setSystemContent({...systemContent, verifikasi: {...systemContent.verifikasi, verifList: list}});
                          }} />
                        </div>
                      ))}
                      <AdminInput label="BIAYA VERIFIKASI TOTAL (FOOTER)" value={systemContent.verifikasi.footer_value} onChange={(v:string) => setSystemContent({...systemContent, verifikasi: {...systemContent.verifikasi, footer_value: v}})} />
                    </div>
                  )}
                </div>
              </div>

              {/* MEDIA CONTROLS */}
              <div className="bg-white/5 p-6 rounded-2xl space-y-6 border border-white/5">
                <p className="text-[10px] text-white/40 font-black uppercase tracking-[0.4em] italic mb-2">URL GAMBAR & MODE PRODUK ({catalogs[catalogIndex].name})</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {catalogs.map((cat: any, idx: number) => (
                    <button 
                      key={idx} 
                      onClick={() => setCatalogIndex(idx)}
                      className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-lg transition-all border ${catalogIndex === idx ? 'bg-[var(--accent)] text-black border-[var(--accent)]' : 'bg-black/40 text-white/30 border-white/10 hover:border-white/20'}`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {catalogs[catalogIndex].products.map((p: any, idx: number) => (
                    <div key={p.id} className="flex flex-col gap-3 p-4 bg-black/40 rounded-xl border border-white/5">
                      <div className="flex justify-between items-center">
                        <label className="text-[9px] text-[var(--accent)] font-black uppercase tracking-widest">{p.label} - {p.name}</label>
                        <AdminCheckbox 
                          label="Exclusive Mode (50%)" 
                          value={p.isExclusive === true} 
                          onChange={(v: boolean) => updateProduct(catalogIndex, idx, 'isExclusive', v)} 
                        />
                      </div>
                      <input 
                        className="bg-black/60 border border-white/10 rounded-lg p-3 text-white text-xs outline-none focus:border-[var(--accent)] w-full font-sans" 
                        placeholder="Image URL"
                        value={p.imageUrl} 
                        onChange={(e) => updateProduct(catalogIndex, idx, 'imageUrl', e.target.value)} 
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 p-6 rounded-2xl space-y-4 border border-white/5">
                <p className="text-[10px] text-white/40 font-black uppercase tracking-[0.4em] italic mb-4">LOGO URL KONTROL BANK</p>
                <AdminInput label="BANK LOGO URL" value={bankContent.logo} onChange={(v:string) => setBankContent({...bankContent, logo: v})} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
