import React, { useState } from 'react';
import { Volume2, VolumeX, ShoppingBag, Menu, X, ArrowUpRight, Instagram } from 'lucide-react';
import { Language } from '../types/barah';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  activePage: string;
  onSelectPage: (pageId: string) => void;
  onOpenBag: () => void;
  cartCount: number;
  soundPlaying: boolean;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  activePage,
  onSelectPage,
  onOpenBag,
  cartCount,
  soundPlaying,
  onToggleSound,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAr = lang === 'ar';

  const desktopNavItems = [
    { id: 'home', labelAr: 'الرئيسية', labelEn: 'Home' },
    { id: 'about', labelAr: 'عن بَراح', labelEn: 'About' },
    { id: 'stations', labelAr: 'المحطات', labelEn: 'Stations' },
    { id: 'events', labelAr: 'الفعاليات', labelEn: 'Events' },
    { id: 'services', labelAr: 'الخدمات', labelEn: 'Services' },
    { id: 'souvenirs', labelAr: 'ذكرى بَراح', labelEn: 'Keepsakes' },
    { id: 'visit', labelAr: 'خطط لزيارتك', labelEn: 'Plan Your Visit' },
  ];

  const handleNavClick = (id: string) => {
    onSelectPage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#F8F5EF]/95 backdrop-blur-md border-b border-[#D8CEBD]/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left Controls (Menu & Language Circle Button) */}
            <div className="flex items-center gap-3">
              {/* Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 -mr-2 text-[#303528] hover:text-[#515638] transition-colors"
                aria-label="القائمة"
              >
                <Menu className="w-7 h-7" />
              </button>

              {/* Circular Language Button matching screenshot */}
              <button
                onClick={onToggleLang}
                className="w-11 h-11 rounded-full border border-[#BEB49F] hover:border-[#515638] flex items-center justify-center text-xs font-bold text-[#303528] bg-transparent transition-all active:scale-95 shadow-2xs"
                title={isAr ? 'Switch to English' : 'التحويل إلى العربية'}
              >
                {isAr ? 'EN' : 'عربي'}
              </button>

              {/* Ambient Nature Soundscape Toggle */}
              <button
                onClick={onToggleSound}
                className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs transition-all ${
                  soundPlaying
                    ? 'bg-[#515638]/10 border-[#515638] text-[#515638] font-bold'
                    : 'bg-white/70 border-[#D8CEBD] text-[#626B5E] hover:border-[#515638]'
                }`}
                title={isAr ? 'تشغيل أصوات طبيعة الوادي' : 'Wadi Ambient Sounds'}
              >
                {soundPlaying ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-[#515638] animate-pulse" />
                    <span className="text-[11px]">{isAr ? 'صوت الوادي' : 'Ambient'}</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-stone-400" />
                    <span className="text-[11px]">{isAr ? 'صوت هادئ' : 'Muted'}</span>
                  </>
                )}
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1">
              {desktopNavItems.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-3.5 py-2 text-sm font-bold rounded-xl transition-all relative ${
                      isActive
                        ? 'text-[#515638] bg-[#E3D8C6]'
                        : 'text-[#4A533E] hover:text-[#515638] hover:bg-[#F2ECE1]'
                    }`}
                  >
                    {isAr ? item.labelAr : item.labelEn}
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#8D7255] rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Brand Lockup - Exactly as in the user's screenshot */}
            <div className="flex items-center gap-3">
              {/* Keepsakes Bag Drawer Trigger */}
              <button
                onClick={onOpenBag}
                className="relative p-2.5 rounded-full border border-[#D8CEBD] bg-white/70 hover:bg-[#E3D8C6]/50 text-[#303528] transition-all"
                title={isAr ? 'حقيبة المقتنيات' : 'Keepsakes Bag'}
              >
                <ShoppingBag className="w-4 h-4 text-[#515638]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#8D7255] text-white text-[10px] font-bold flex items-center justify-center animate-bounce">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Brand Logo & Typography */}
              <div
                onClick={() => handleNavClick('home')}
                className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group select-none"
              >
                <div className="flex flex-col text-end">
                  <span className="font-serif font-black text-sm sm:text-base text-[#303528] tracking-widest uppercase leading-none">
                    BARAH
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-semibold text-[#626B5E] tracking-widest uppercase mt-0.5">
                    WADI AL BUHAIR
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-bold text-[#8D7255] mt-0.5">
                    {isAr ? 'للأرض حكاية' : 'Every Land Has a Story'}
                  </span>
                </div>

                <img
                  src="/assets/barah-logo-official-cream.webp"
                  alt="BARAH Official Logo"
                  className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Full-screen Menu Overlay - Exactly matching screenshot IMG_2177_7652c087.png */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#F8F5EF] flex flex-col justify-between overflow-y-auto animate-fadeIn">
          {/* Menu Header with Close Button */}
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between border-b border-[#D8CEBD]">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 -mr-2 text-[#303528] hover:text-[#515638]"
                aria-label="إغلاق القائمة"
              >
                <X className="w-8 h-8" />
              </button>
              <button
                onClick={onToggleLang}
                className="w-11 h-11 rounded-full border border-[#BEB49F] flex items-center justify-center text-xs font-bold text-[#303528]"
              >
                {isAr ? 'EN' : 'عربي'}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex flex-col text-end">
                <span className="font-serif font-black text-sm text-[#303528] tracking-widest uppercase">
                  BARAH
                </span>
                <span className="text-[9px] font-semibold text-[#626B5E] tracking-widest uppercase">
                  WADI AL BUHAIR
                </span>
                <span className="text-[10px] font-bold text-[#8D7255]">
                  {isAr ? 'للأرض حكاية' : 'Every Land Has a Story'}
                </span>
              </div>
              <img
                src="/assets/barah-logo-official-cream.webp"
                alt="BARAH Logo"
                className="h-10 w-auto"
              />
            </div>
          </div>

          {/* 2-Column Menu Grid - Exact replica of screenshot IMG_2177_7652c087.png */}
          <div className="max-w-xl mx-auto w-full px-5 py-8 flex-1 flex flex-col justify-center">
            <div className="grid grid-cols-2 gap-3 text-center">
              {/* Row 1 */}
              <button
                onClick={() => handleNavClick('home')}
                className={`py-4 px-3 rounded-2xl text-base font-bold transition-all shadow-2xs ${
                  activePage === 'home'
                    ? 'bg-[#E3D8C6] text-[#303528]'
                    : 'bg-[#FFFCF7] text-[#303528] border border-[#D8CEBD] hover:bg-[#E3D8C6]/50'
                }`}
              >
                {isAr ? 'الرئيسية' : 'Home'}
              </button>

              <button
                onClick={() => handleNavClick('about')}
                className={`py-4 px-3 rounded-2xl text-base font-bold transition-all shadow-2xs ${
                  activePage === 'about'
                    ? 'bg-[#E3D8C6] text-[#303528]'
                    : 'bg-[#FFFCF7] text-[#303528] border border-[#D8CEBD] hover:bg-[#E3D8C6]/50'
                }`}
              >
                {isAr ? 'عن بَراح' : 'About'}
              </button>

              {/* Row 2 */}
              <button
                onClick={() => handleNavClick('about')}
                className="py-4 px-3 rounded-2xl text-base font-bold bg-[#FFFCF7] text-[#303528] border border-[#D8CEBD] hover:bg-[#E3D8C6]/50 transition-all shadow-2xs"
              >
                {isAr ? 'الموقع' : 'Location'}
              </button>

              <button
                onClick={() => handleNavClick('stations')}
                className={`py-4 px-3 rounded-2xl text-base font-bold transition-all shadow-2xs ${
                  activePage === 'stations'
                    ? 'bg-[#E3D8C6] text-[#303528]'
                    : 'bg-[#FFFCF7] text-[#303528] border border-[#D8CEBD] hover:bg-[#E3D8C6]/50'
                }`}
              >
                {isAr ? 'المحطات' : 'Stations'}
              </button>

              {/* Row 3 */}
              <button
                onClick={() => handleNavClick('stations')}
                className="py-4 px-3 rounded-2xl text-base font-bold bg-[#FFFCF7] text-[#303528] border border-[#D8CEBD] hover:bg-[#E3D8C6]/50 transition-all shadow-2xs"
              >
                {isAr ? 'معرض الصور' : 'Gallery'}
              </button>

              <button
                onClick={() => handleNavClick('events')}
                className={`py-4 px-3 rounded-2xl text-base font-bold transition-all shadow-2xs ${
                  activePage === 'events'
                    ? 'bg-[#E3D8C6] text-[#303528]'
                    : 'bg-[#FFFCF7] text-[#303528] border border-[#D8CEBD] hover:bg-[#E3D8C6]/50'
                }`}
              >
                {isAr ? 'الفعاليات' : 'Events'}
              </button>

              {/* Row 4 */}
              <button
                onClick={() => handleNavClick('services')}
                className={`py-4 px-3 rounded-2xl text-base font-bold transition-all shadow-2xs ${
                  activePage === 'services'
                    ? 'bg-[#E3D8C6] text-[#303528]'
                    : 'bg-[#FFFCF7] text-[#303528] border border-[#D8CEBD] hover:bg-[#E3D8C6]/50'
                }`}
              >
                {isAr ? 'الخدمات' : 'Services'}
              </button>

              <button
                onClick={() => handleNavClick('souvenirs')}
                className={`py-4 px-3 rounded-2xl text-base font-bold transition-all shadow-2xs ${
                  activePage === 'souvenirs'
                    ? 'bg-[#E3D8C6] text-[#303528]'
                    : 'bg-[#FFFCF7] text-[#303528] border border-[#D8CEBD] hover:bg-[#E3D8C6]/50'
                }`}
              >
                {isAr ? 'ذكرى بَراح' : 'Keepsakes'}
              </button>

              {/* Row 5 */}
              <button
                onClick={() => handleNavClick('visit')}
                className={`py-4 px-3 rounded-2xl text-base font-bold transition-all shadow-2xs ${
                  activePage === 'visit'
                    ? 'bg-[#E3D8C6] text-[#303528]'
                    : 'bg-[#FFFCF7] text-[#303528] border border-[#D8CEBD] hover:bg-[#E3D8C6]/50'
                }`}
              >
                {isAr ? 'خطط لزيارتك' : 'Plan Visit'}
              </button>

              <button
                onClick={() => handleNavClick('visit')}
                className="py-4 px-3 rounded-2xl text-base font-bold bg-[#FFFCF7] text-[#303528] border border-[#D8CEBD] hover:bg-[#E3D8C6]/50 transition-all shadow-2xs"
              >
                {isAr ? 'شاركنا رأيك' : 'Feedback'}
              </button>
            </div>

            {/* Social Follow Links - Exact replica of screenshot IMG_2177_7652c087.png */}
            <div className="mt-8 pt-6 border-t border-[#D8CEBD]/80">
              <span className="block text-xs font-bold text-[#515638] mb-3">
                {isAr ? 'تابع بَراح' : 'Follow BARAH'}
              </span>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href="https://www.instagram.com/barah_bh/"
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 px-4 rounded-2xl bg-[#E3D8C6]/70 hover:bg-[#E3D8C6] border border-[#CCB798] flex items-center justify-between text-[#303528] font-bold text-sm transition-colors"
                >
                  <span>{isAr ? 'إنستغرام' : 'Instagram'}</span>
                  <Instagram className="w-4 h-4 text-[#515638]" />
                </a>

                <a
                  href="https://www.tiktok.com/@barah_bh"
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 px-4 rounded-2xl bg-[#E3D8C6]/70 hover:bg-[#E3D8C6] border border-[#CCB798] flex items-center justify-between text-[#303528] font-bold text-sm transition-colors"
                >
                  <span>{isAr ? 'تيك توك' : 'TikTok'}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#515638]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
