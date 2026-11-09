import React from 'react';
import { Language } from '../types/barah';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface PageHeroProps {
  lang: Language;
  eyebrowAr: string;
  eyebrowEn: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  image: string;
  onBackToHome: () => void;
}

export const PageHero: React.FC<PageHeroProps> = ({
  lang,
  eyebrowAr,
  eyebrowEn,
  titleAr,
  titleEn,
  descriptionAr,
  descriptionEn,
  image,
  onBackToHome,
}) => {
  const isAr = lang === 'ar';
  const ArrowIcon = isAr ? ArrowRight : ArrowLeft;

  return (
    <div className="relative min-h-[38vh] sm:min-h-[44vh] flex items-center bg-[#2D3325] text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={image}
          alt={isAr ? titleAr : titleEn}
          className="w-full h-full object-cover object-center filter brightness-[0.6] contrast-[1.1]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F8F5EF] via-[#262B1E]/60 to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="max-w-3xl">
          {/* Breadcrumb / Back button */}
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E0D3BE] hover:text-white transition-colors"
            >
              <ArrowIcon className="w-3.5 h-3.5" />
              <span>{isAr ? 'الرئيسية' : 'Home'}</span>
            </button>
            <span className="text-white/40">/</span>
            <span className="text-xs font-bold text-[#CCB798] tracking-wider uppercase">
              {isAr ? eyebrowAr : eyebrowEn}
            </span>
          </div>

          <h1 className="font-serif-ar text-3xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
            {isAr ? titleAr : titleEn}
          </h1>

          <p className="text-sm sm:text-base text-white/90 font-light leading-relaxed max-w-2xl">
            {isAr ? descriptionAr : descriptionEn}
          </p>
        </div>
      </div>
    </div>
  );
};
