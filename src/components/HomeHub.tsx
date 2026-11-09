import React from 'react';
import { ArrowLeft, ArrowRight, Feather } from 'lucide-react';
import { Language } from '../types/barah';

interface HomeHubProps {
  lang: Language;
  onNavigate: (pageId: string) => void;
}

export const HomeHub: React.FC<HomeHubProps> = ({ lang, onNavigate }) => {
  const isAr = lang === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const directoryCards = [
    {
      id: 'stations',
      tag: 'BARAH / 01',
      titleAr: 'المحطات',
      titleEn: 'The Stations',
      descAr: 'أربع محطات ومعارض صور تفاعلية',
      descEn: 'Four stations & interactive photo galleries',
      image: '/assets/concept-entry.webp',
    },
    {
      id: 'events',
      tag: 'BARAH / 02',
      titleAr: 'الفعاليات',
      titleEn: 'Events',
      descAr: 'الأنشطة والأمسيات والمناسبات',
      descEn: 'Activities, evenings & seasonal gatherings',
      image: '/assets/concept-evening.webp',
    },
    {
      id: 'services',
      tag: 'BARAH / 03',
      titleAr: 'الخدمات',
      titleEn: 'Services',
      descAr: 'تجارب الزوار والتعاون المجتمعي',
      descEn: 'Visitor experiences & community collaboration',
      image: '/assets/concept-visitor.webp',
    },
    {
      id: 'souvenirs',
      tag: 'BARAH / 04',
      titleAr: 'ذكرى بَراح',
      titleEn: 'BARAH Keepsakes',
      descAr: '27 منتجًا مقترحًا في صفحة مستقلة',
      descEn: '27 curated keepsakes on a dedicated page',
      image: '/assets/product-19-premium-gift-box.webp',
    },
    {
      id: 'visit',
      tag: 'BARAH / 05',
      titleAr: 'خطط لزيارتك',
      titleEn: 'Plan Your Visit',
      descAr: 'تجربة افتراضية واستبيان الزوار',
      descEn: 'Interactive journey planner & visitor survey',
      image: '/assets/concept-path.webp',
    },
    {
      id: 'about',
      tag: 'BARAH / 06',
      titleAr: 'عن بَراح',
      titleEn: 'About BARAH',
      descAr: 'الفكرة والهوية والموقع والاستدامة',
      descEn: 'The story, identity, location & sustainability',
      image: '/assets/wadi-lake.webp',
    },
  ];

  return (
    <div className="bg-[#F8F5EF] text-[#303528]">
      {/* 1. Philosophy Section - Exactly as in screenshots IMG_2178_eb556fb8.png & IMG_2182_736830ef.png */}
      <section id="philosophy" className="py-20 sm:py-28 max-w-4xl mx-auto px-5 sm:px-8">
        <div className="space-y-6">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#626B5E]">
            <span>{isAr ? 'فلسفة بَراح' : 'BARAH Philosophy'}</span>
            <span className="w-8 h-px bg-[#8D7255]" />
          </div>

          {/* Heading */}
          <h2 className="font-serif-ar text-3xl sm:text-5xl font-bold leading-[1.3] text-[#303528]">
            {isAr ? (
              <>
                ليست كل الأماكن بحاجة إلى تغيير، <span className="underline decoration-[#CCB798] decoration-2 underline-offset-8">فبعضها يستحق أن يُفهم.</span>
              </>
            ) : (
              <>
                Not all places need to change; <span className="underline decoration-[#CCB798] decoration-2 underline-offset-8">some deserve to be understood.</span>
              </>
            )}
          </h2>

          {/* Body Paragraph */}
          <p className="text-base sm:text-lg text-[#57604F] leading-[2] font-light pt-2">
            {isAr
              ? 'تقوم فكرة بَراح على الطبيعة القائمة في وادي البحير. ومن بوابة الاستقبال إلى المسار والمرصد والمجلس، تُربط أنشطة المشي والمشاهدة والتعلّم والضيافة في تجربة واحدة تحترم خصائص المكان.'
              : 'At BARAH, nature is the heart of the experience. From the arrival centre to the trail, observatory and majlis, walking, observation, learning and hospitality come together in one respectful journey through Wadi Al Buhair.'}
          </p>

          <div className="pt-6 pb-4">
            <div className="w-full h-px bg-[#D8CEBD]" />
          </div>

          {/* Principle Callout */}
          <div className="flex items-start justify-between gap-4 pt-2">
            <div>
              <span className="text-xs font-bold text-[#8D7255] block mb-1">
                {isAr ? 'مبدأنا الأساسي' : 'Our Core Principle'}
              </span>
              <div className="font-serif-ar text-2xl sm:text-3xl font-bold text-[#303528]">
                {isAr ? 'نطوّر الحافة ونحمي قلب الطبيعة.' : 'Develop the edge. Protect the heart of nature.'}
              </div>
            </div>

            <div className="w-10 h-10 rounded-full bg-[#E3D8C6]/60 flex items-center justify-center text-[#8D7255] shrink-0 mt-1">
              <Feather className="w-5 h-5" />
            </div>
          </div>

          {/* Link to About */}
          <div className="pt-6">
            <button
              onClick={() => onNavigate('about')}
              className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#303528] hover:text-[#515638] underline decoration-[#515638] decoration-1 underline-offset-6 transition-colors group"
            >
              <span>{isAr ? 'اكتشف هوية بَراح' : 'Discover BARAH Identity'}</span>
              <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. Directory Section - Exactly as in screenshots IMG_2179_50bb8644.png & IMG_2183_06a7e557.png */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#D8CEBD]/60">
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#626B5E] mb-3">
            <span>{isAr ? 'اكتشف بَراح بطريقتك' : 'Explore BARAH Your Way'}</span>
            <span className="w-8 h-px bg-[#8D7255]" />
          </div>

          <h2 className="font-serif-ar text-3xl sm:text-5xl font-bold text-[#303528] leading-tight mb-3">
            {isAr ? 'كل حكاية لها مكان.' : 'Every Story Has a Place.'}
          </h2>

          <p className="text-sm sm:text-base text-[#57604F] leading-relaxed font-light">
            {isAr
              ? 'اختر ما يهمك مباشرة، بدون تمرير طويل. كل تجربة في صفحة خاصة يسهل الرجوع إليها.'
              : 'Choose what interests you directly, without endless scrolling. Each experience lives on its own dedicated page.'}
          </p>
        </div>

        {/* 2-Column Grid on Mobile matching screenshot IMG_2179_50bb8644.png */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6">
          {directoryCards.map((card) => (
            <div
              key={card.id}
              onClick={() => onNavigate(card.id)}
              className="rounded-3xl bg-[#FFFCF7] border border-[#D8CEBD] overflow-hidden shadow-2xs hover:shadow-lg hover:border-[#515638] transition-all cursor-pointer group flex flex-col justify-between"
            >
              {/* Image Area */}
              <div className="relative aspect-4/3 overflow-hidden bg-[#3C4229]">
                <img
                  src={card.image}
                  alt={isAr ? card.titleAr : card.titleEn}
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                />
              </div>

              {/* Card Body - Exactly matching screenshot */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono font-semibold text-[#8D7255] tracking-wider mb-1.5">
                    <span>{card.tag}</span>
                    <ArrowIcon className="w-4 h-4 text-[#515638] transition-transform group-hover:translate-x-1" />
                  </div>

                  <h3 className="font-serif-ar text-xl sm:text-2xl font-bold text-[#303528] leading-snug mb-1">
                    {isAr ? card.titleAr : card.titleEn}
                  </h3>

                  <p className="text-xs text-[#57604F] leading-relaxed line-clamp-2">
                    {isAr ? card.descAr : card.descEn}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
