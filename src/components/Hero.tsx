import React, { useRef, useEffect } from 'react';
import { ArrowLeft, ArrowRight, ArrowDown } from 'lucide-react';
import { Language } from '../types/barah';

interface HeroProps {
  lang: Language;
  onExploreStations: () => void;
  onPlanVisit: () => void;
  onPlayFilm?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  lang,
  onExploreStations,
  onPlanVisit,
}) => {
  const isAr = lang === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure the video plays continuously and seamlessly in the background
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Handled silently for autoplay policies
      });
    }
  }, []);

  return (
    <section className="relative min-h-[92svh] sm:min-h-[88vh] flex flex-col justify-between overflow-hidden bg-[#242A1D] text-[#F8F5EF]">
      {/* 1. Cinematic Background Video Layer (Permanently looping cleanly with no controls) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        {/* Fallback image */}
        <img
          src="/assets/concept-trail.webp"
          alt="BARAH Valley Landscape"
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.05]"
        />

        <video
          ref={videoRef}
          src="/assets/barah-journey-film.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.80] contrast-[1.08]"
        />

        {/* Artistic Multi-Layer Gradients for ultimate text readability and atmospheric luxury */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#202519] via-black/40 to-black/35" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#202519]/20 to-[#202519]/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.45)_100%)] pointer-events-none" />
      </div>

      {/* Spacer to preserve top breathing room */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8" />

      {/* 2. Main Hero Typography & Call-To-Action (Matching Exact Screenshot) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20 flex flex-col justify-end">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#E0D3BE] tracking-wide mb-3">
            <span>{isAr ? 'وادي البحير · مملكة البحرين' : 'Wadi Al Buhair · Kingdom of Bahrain'}</span>
            <span className="w-6 h-px bg-[#E0D3BE]/60" />
          </div>

          {/* Main Title: "هنا، للأرض حكاية." */}
          <h1 className="font-serif-ar text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.15] mb-5 drop-shadow-md">
            {isAr ? 'هنا، للأرض حكاية.' : 'Where Every Land Has a Story.'}
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-[#F8F5EF]/90 font-light leading-relaxed mb-8 max-w-xl drop-shadow-xs">
            {isAr
              ? 'بين ممرات الوادي ومراقبة الطيور والجلسات الهادئة، تتكشف تجربة طبيعية تروي جانبًا مختلفًا من البحرين.'
              : 'Follow the trails, discover the quiet of birdwatching, and take a moment to unwind. Explore a different side of Bahrain, where every land has a story.'}
          </p>

          {/* Two Buttons Matching Screenshot */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {/* Button 1: Tan Fill */}
            <button
              onClick={onExploreStations}
              className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-xl bg-[#CCB798] hover:bg-[#E0D3BE] text-[#303528] font-bold text-sm shadow-xl transition-all active:scale-95 group"
            >
              <span>{isAr ? 'اكتشف بَراح' : 'Explore BARAH'}</span>
              <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Button 2: Transparent with White Border */}
            <button
              onClick={onPlanVisit}
              className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-xl bg-transparent hover:bg-white/10 text-white border border-white/60 font-bold text-sm backdrop-blur-xs transition-all active:scale-95"
            >
              <span>{isAr ? 'خطط لزيارتك' : 'Plan Your Visit'}</span>
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Bottom Sub-notes Matching Screenshot */}
      <div className="relative z-10 border-t border-white/15 py-3 px-4 sm:px-6 lg:px-8 bg-black/40 backdrop-blur-sm text-[11px] text-white/75">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => {
              const el = document.getElementById('philosophy');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 text-white/90 hover:text-white transition-colors"
          >
            <ArrowDown className="w-3.5 h-3.5" />
            <span>{isAr ? 'تابع الاستكشاف' : 'Scroll to explore'}</span>
          </button>

          <span>
            {isAr
              ? 'مشاهد تصميمية لبَراح · ليست تصويرًا لمنشآت قائمة'
              : 'Architectural visualizations · not footage of existing facilities'}
          </span>
        </div>
      </div>
    </section>
  );
};
