import React, { useState } from 'react';
import { ArrowUpRight, Share2, Check, MapPin, Instagram } from 'lucide-react';
import { Language } from '../types/barah';

interface FooterProps {
  lang: Language;
  onSelectTab: (tabId: string) => void;
  onOpenDossier?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onSelectTab }) => {
  const isAr = lang === 'ar';
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <footer className="bg-[#303528] text-[#F8F5EF] pt-16 pb-24 md:pb-16 border-t border-[#CCB798]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info matching screenshot IMG_2176_64d617ea.png */}
          <div className="space-y-4">
            <div
              onClick={() => onSelectTab('home')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <img
                src="/assets/barah-logo-official-cream.webp"
                alt="BARAH Logo"
                className="h-14 w-auto object-contain"
              />
              <div>
                <div className="font-serif font-black text-xl tracking-widest text-white uppercase">
                  BARAH
                </div>
                <div className="text-[10px] tracking-widest text-[#CCB798] uppercase">
                  WADI AL BUHAIR
                </div>
              </div>
            </div>

            <p className="font-serif-ar text-lg text-[#E0D3BE] font-bold">
              {isAr ? 'للأرض حكاية.' : 'Every Land Has a Story.'}
            </p>

            <p className="text-xs text-[#F8F5EF]/80 font-light leading-relaxed max-w-sm">
              {isAr
                ? 'وجهة سياحية وبيئية مستدامة تصون الطبيعة العذراء لوادي البحير بمملكة البحرين، وتجمع بين استكشاف الطبيعة والضيافة والتراث الأصيل.'
                : 'A sustainable nature tourism destination protecting the raw beauty of Wadi Al Buhair in Bahrain, connecting trails, wildlife and hospitality.'}
            </p>
          </div>

          {/* Navigation Column: اكتشف */}
          <div>
            <h4 className="text-xs font-bold text-[#CCB798] uppercase tracking-wider mb-4">
              {isAr ? 'اكتشف بَراح' : 'Explore'}
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-white/80">
              <button
                onClick={() => onSelectTab('about')}
                className="text-start hover:text-[#CCB798] transition-colors"
              >
                {isAr ? 'عن بَراح' : 'About'}
              </button>
              <button
                onClick={() => onSelectTab('about')}
                className="text-start hover:text-[#CCB798] transition-colors"
              >
                {isAr ? 'الموقع' : 'Location'}
              </button>
              <button
                onClick={() => onSelectTab('stations')}
                className="text-start hover:text-[#CCB798] transition-colors"
              >
                {isAr ? 'المحطات' : 'Stations'}
              </button>
              <button
                onClick={() => onSelectTab('stations')}
                className="text-start hover:text-[#CCB798] transition-colors"
              >
                {isAr ? 'المعرض' : 'Gallery'}
              </button>
              <button
                onClick={() => onSelectTab('events')}
                className="text-start hover:text-[#CCB798] transition-colors"
              >
                {isAr ? 'الفعاليات' : 'Events'}
              </button>
              <button
                onClick={() => onSelectTab('services')}
                className="text-start hover:text-[#CCB798] transition-colors"
              >
                {isAr ? 'الخدمات' : 'Services'}
              </button>
              <button
                onClick={() => onSelectTab('souvenirs')}
                className="text-start hover:text-[#CCB798] transition-colors"
              >
                {isAr ? 'ذكرى بَراح' : 'Keepsakes'}
              </button>
              <button
                onClick={() => onSelectTab('visit')}
                className="text-start hover:text-[#CCB798] transition-colors"
              >
                {isAr ? 'خطط لزيارتك' : 'Plan Visit'}
              </button>
              <button
                onClick={() => onSelectTab('visit')}
                className="text-start hover:text-[#CCB798] transition-colors"
              >
                {isAr ? 'شاركنا رأيك' : 'Feedback'}
              </button>
              <button
                onClick={() => {
                  onSelectTab('visit');
                  setTimeout(() => {
                    document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="text-start hover:text-[#CCB798] transition-colors"
              >
                {isAr ? 'الأسئلة الشائعة' : 'FAQ'}
              </button>
              <button
                onClick={() => onSelectTab('services')}
                className="text-start hover:text-[#CCB798] transition-colors"
              >
                {isAr ? 'التعاونات' : 'Partnerships'}
              </button>
            </div>
          </div>

          {/* Location Details */}
          <div>
            <h4 className="text-xs font-bold text-[#CCB798] uppercase tracking-wider mb-4">
              {isAr ? 'الموقع' : 'Location'}
            </h4>
            <div className="space-y-2 text-xs text-white/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#CCB798] shrink-0 mt-0.5" />
                <span>
                  {isAr
                    ? 'وادي البحير، المحافظة الجنوبية، مملكة البحرين'
                    : 'Wadi Al Buhair, Southern Governorate, Kingdom of Bahrain'}
                </span>
              </div>
              <p className="text-[11px] text-white/60 pt-2 leading-relaxed">
                {isAr
                  ? 'وجهة بيئية طبيعية مفتوحة لجميع الزوار ومحبي الطبيعة والمشي والتصوير.'
                  : 'An open nature destination welcoming hikers, families, birdwatchers and photographers.'}
              </p>
            </div>
          </div>

          {/* Social Follow & Share Button */}
          <div>
            <h4 className="text-xs font-bold text-[#CCB798] uppercase tracking-wider mb-4">
              {isAr ? 'تابع بَراح' : 'Follow BARAH'}
            </h4>
            <div className="space-y-2.5 text-xs">
              <a
                href="https://www.instagram.com/barah_bh/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
              >
                <div className="flex items-center gap-2">
                  <Instagram className="w-4 h-4 text-[#CCB798]" />
                  <span>إنستغرام @barah_bh</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#CCB798]" />
              </a>

              <a
                href="https://www.tiktok.com/@barah_bh"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
              >
                <div className="flex items-center gap-2">
                  <span>تيك توك @barah_bh</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#CCB798]" />
              </a>

              <button
                onClick={handleShare}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#CCB798] hover:bg-[#E0D3BE] text-[#303528] font-bold transition-all text-xs shadow-xs"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>{isAr ? 'تم نسخ الرابط!' : 'Link Copied!'}</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{isAr ? 'مشاركة الموقع' : 'Share Website'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F8F5EF]/60">
          <div>
            © {new Date().getFullYear()} BARAH — Wadi Al Buhair · {isAr ? 'للأرض حكاية' : 'Every Land Has a Story'}
          </div>
          <div>
            {isAr
              ? 'تصوّر لوجهة سياحية بيئية في مملكة البحرين'
              : 'Nature Tourism Destination in the Kingdom of Bahrain'}
          </div>
        </div>
      </div>
    </footer>
  );
};
