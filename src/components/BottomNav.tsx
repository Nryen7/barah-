import React from 'react';
import { Home, Map, Calendar, Gift, MapPin } from 'lucide-react';
import { Language } from '../types/barah';

interface BottomNavProps {
  activePage: string;
  onSelectPage: (pageId: string) => void;
  lang: Language;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activePage, onSelectPage, lang }) => {
  const isAr = lang === 'ar';

  const items = [
    { id: 'home', icon: Home, labelAr: 'الرئيسية', labelEn: 'Home' },
    { id: 'stations', icon: Map, labelAr: 'المحطات', labelEn: 'Stations' },
    { id: 'events', icon: Calendar, labelAr: 'الفعاليات', labelEn: 'Events' },
    { id: 'souvenirs', icon: Gift, labelAr: 'المنتجات', labelEn: 'Keepsakes' },
    { id: 'visit', icon: MapPin, labelAr: 'الزيارة', labelEn: 'Visit' },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#F8F5EF]/95 backdrop-blur-md border-t border-[#D8CEBD] px-2 py-1.5 shadow-lg"
    >
      <div className="max-w-md mx-auto grid grid-cols-5 gap-1">
        {items.map((item) => {
          const isActive = activePage === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onSelectPage(item.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
                isActive
                  ? 'bg-[#E3D8C6] text-[#303528] font-bold shadow-xs'
                  : 'text-[#626B5E] hover:text-[#303528]'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-[#303528]' : 'text-[#626B5E]'}`} />
              <span className="text-[10px] mt-0.5 tracking-tight font-medium">
                {isAr ? item.labelAr : item.labelEn}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
