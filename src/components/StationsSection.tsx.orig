import React, { useState } from 'react';
import {
  Compass,
  ArrowRight,
  ArrowLeft,
  Maximize2,
  Footprints,
  Eye,
  Coffee,
  CheckCircle2,
  Calendar,
  Sparkles,
  MapPin,
  MessageSquare
} from 'lucide-react';
import { Language } from '../types/barah';

interface StationShot {
  id: string;
  label: string;
  src: string;
  thumb: string;
  altAr: string;
  altEn: string;
}

interface StationCardData {
  id: string;
  num: string;
  actionCode: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  shots: StationShot[];
}

const STATIONS_CARDS: StationCardData[] = [
  {
    id: 'centre',
    num: '01',
    actionCode: 'ARRIVE',
    titleAr: 'بوابة بَراح',
    titleEn: 'BARAH Gate',
    descAr: 'تبدأ الرحلة بالاستقبال والتوجيه ومعلومات الزيارة، مع متجر التذكارات في مركز الزوار.',
    descEn: 'The journey begins with welcoming orientation, route briefings, and the Barah keepsake shop within the visitor centre.',
    shots: [
      {
        id: 'c1',
        label: '01',
        src: 'assets/barah-centre-exterior-arrival.webp',
        thumb: 'assets/barah-centre-exterior-arrival-thumb.webp',
        altAr: 'تصور خارجي لمركز استقبال بَراح ومنطقة الوصول',
        altEn: 'BARAH visitor centre arrival and exterior concept'
      },
      {
        id: 'c2',
        label: '02',
        src: 'assets/barah-centre-exterior-view.webp',
        thumb: 'assets/barah-centre-exterior-view-thumb.webp',
        altAr: 'تصور لمعمار مركز بَراح وتناغمه مع الطبيعة',
        altEn: 'BARAH visitor centre architecture concept'
      },
      {
        id: 'c3',
        label: '03',
        src: 'assets/barah-centre-interior.webp',
        thumb: 'assets/barah-centre-interior-thumb.webp',
        altAr: 'تصور داخلي لمركز بَراح ومنطقة استقبال الزوار',
        altEn: 'BARAH visitor centre reception interior concept'
      }
    ]
  },
  {
    id: 'trail',
    num: '02',
    actionCode: 'WANDER',
    titleAr: 'درب بَراح',
    titleEn: 'BARAH Trail',
    descAr: 'مسار للمشي والاستكشاف والجولات الإرشادية والتصوير، مع محطات استراحة ومشاهدة.',
    descEn: 'An elevated wooden boardwalk for walking, guided field exploration, and panoramic nature viewing with resting decks.',
    shots: [
      {
        id: 't1',
        label: '01',
        src: 'assets/barah-trail-daytime-boardwalk.webp',
        thumb: 'assets/barah-trail-daytime-boardwalk-thumb.webp',
        altAr: 'تصور نهاري لدرب بَراح والممر المرتفع على امتداد الوادي',
        altEn: 'Daytime BARAH Trail elevated boardwalk concept'
      },
      {
        id: 't2',
        label: '02',
        src: 'assets/barah-trail-evening-boardwalk.webp',
        thumb: 'assets/barah-trail-evening-boardwalk-thumb.webp',
        altAr: 'تصور مسائي لدرب بَراح والمسار المضاء بنعومة',
        altEn: 'Evening BARAH Trail illuminated boardwalk concept'
      },
      {
        id: 't3',
        label: '03',
        src: 'assets/barah-trail-wayfinding.webp',
        thumb: 'assets/barah-trail-wayfinding-thumb.webp',
        altAr: 'تصور للوحات الإرشاد والمسار البيئي في درب بَراح',
        altEn: 'BARAH Trail wayfinding sign and nature trail concept'
      },
      {
        id: 't4',
        label: '04',
        src: 'assets/barah-trail-path-detail.webp',
        thumb: 'assets/barah-trail-path-detail-thumb.webp',
        altAr: 'تصور تفصيلي لأرضية درب بَراح ومرافق المسار',
        altEn: 'BARAH Trail boardwalk construction detail concept'
      }
    ]
  },
  {
    id: 'observatory',
    num: '03',
    actionCode: 'OBSERVE',
    titleAr: 'مرصد بَراح',
    titleEn: 'BARAH Observatory',
    descAr: 'مساحة هادئة لمراقبة الطيور والتعلّم البيئي، مع مراعاة الحياة الفطرية وتنظيم أعداد المشاركين.',
    descEn: 'A tranquil hide for birdwatching and eco-education, designed with low visual impact to safeguard wild bird species.',
    shots: [
      {
        id: 'o1',
        label: '01',
        src: 'assets/barah-observatory-interior-learning.webp',
        thumb: 'assets/barah-observatory-interior-learning-thumb.webp',
        altAr: 'تصور لمقصورة الرصد الداخلية في مرصد بَراح مع مناظير المراقبة',
        altEn: 'BARAH Observatory interior viewing cabin concept'
      },
      {
        id: 'o2',
        label: '02',
        src: 'assets/barah-observatory-exterior-view.webp',
        thumb: 'assets/barah-observatory-exterior-view-thumb.webp',
        altAr: 'تصور خارجي لمبنى مرصد بَراح والمسار الخشبي المؤدي إليه',
        altEn: 'BARAH Observatory exterior view and connecting boardwalk'
      },
      {
        id: 'o3',
        label: '03',
        src: 'assets/barah-observatory-wildlife-viewing.webp',
        thumb: 'assets/barah-observatory-wildlife-viewing-thumb.webp',
        altAr: 'تصور للجلوس ومراقبة الحياة الفطرية والطيور من مرصد بَراح',
        altEn: 'Wildlife observation through viewing ports concept'
      }
    ]
  },
  {
    id: 'majlis',
    num: '04',
    actionCode: 'UNWIND',
    titleAr: 'مجلس بَراح',
    titleEn: 'BARAH Majlis',
    descAr: 'جلسات مظللة للراحة والضيافة الخفيفة، مع تصور لمقهى موسمي ومشروعات بحرينية محلية.',
    descEn: 'Shaded open-air seating for relaxation and authentic hospitality, showcasing seasonal Bahraini crafts and refreshments.',
    shots: [
      {
        id: 'm1',
        label: '01',
        src: 'assets/concept-majlis.webp',
        thumb: 'assets/concept-majlis-thumb.webp',
        altAr: 'تصور لمجلس بَراح والجلسات المظللة المفتوحة على الوادي',
        altEn: 'BARAH Majlis shaded outdoor seating concept'
      },
      {
        id: 'm2',
        label: '02',
        src: 'assets/concept-evening.webp',
        thumb: 'assets/concept-evening-thumb.webp',
        altAr: 'تصور لأجواء المساء والسكينة في مجلس بَراح',
        altEn: 'BARAH evening atmosphere and warm golden lighting concept'
      }
    ]
  }
];

const JOURNEY_STEPS = [
  {
    num: '01',
    titleAr: 'استقبل المكان',
    titleEn: 'Receive the Place',
    descAr: 'تعرف على المسار وإرشادات السلامة البيئية، وتزود بالخرائط الاستكشافية ودليل الطيور.',
    descEn: 'Get oriented with trail safety, environmental guidance, and curated nature maps.'
  },
  {
    num: '02',
    titleAr: 'امشِ على مهل',
    titleEn: 'Wander at Leisure',
    descAr: 'استكشف المشاهد الطبيعية وتكوينات الوادي الصخرية من المسار الخشبي المرتفع الحامي للتضاريس.',
    descEn: 'Experience natural vistas and limestone cliffs from the low-impact boardwalk.'
  },
  {
    num: '03',
    titleAr: 'راقب وتعلّم',
    titleEn: 'Observe & Learn',
    descAr: 'تأمل تفاصيل الطبيعة وحركة الطيور المهاجرة والمستوطنة في هدوء تام دون إزعاج موائلها.',
    descEn: 'Watch migratory and resident avifauna peacefully through slotted observation blinds.'
  },
  {
    num: '04',
    titleAr: 'استرح في المجلس',
    titleEn: 'Rest at the Majlis',
    descAr: 'اختم الرحلة باستراحة أصيلة تحت ظلال العريش مع القهوة البحرينية والضيافة المحلية الهادئة.',
    descEn: 'Conclude your expedition in shaded pavilions with aromatic Arabic coffee and local tastes.'
  }
];

const GALLERY_PHOTOS = [
  {
    src: 'assets/concept-aerial.webp',
    wide: true,
    captionAr: 'تصور جوي لمشروع بَراح والممرات البيئية في وادي البحير',
    captionEn: 'Aerial panoramic visualization of BARAH and the ecological boardwalks'
  },
  {
    src: 'assets/concept-visitor.webp',
    wide: false,
    captionAr: 'تصور لمركز استقبال الزوار المندمج في تضاريس الوادي',
    captionEn: 'Visitor reception centre integrated into the valley terrain'
  },
  {
    src: 'assets/concept-evening.webp',
    wide: false,
    captionAr: 'تصور مسائي لمجلس بَراح والأجواء الهادئة تحت سماء الوادي',
    captionEn: 'Evening atmosphere at BARAH Majlis under starlit Bahraini skies'
  }
];

interface StationsSectionProps {
  lang: Language;
  onNavigatePage: (page: any) => void;
  onOpenLightbox: (imageUrl: string, title: string) => void;
}

export const StationsSection: React.FC<StationsSectionProps> = ({
  lang,
  onNavigatePage,
  onOpenLightbox
}) => {
  const isAr = lang === 'ar';

  // Active shot index per station card: { centre: 0, trail: 0, observatory: 0, majlis: 0 }
  const [activeShots, setActiveShots] = useState<Record<string, number>>({
    centre: 0,
    trail: 0,
    observatory: 0,
    majlis: 0
  });

  const handleShotChange = (stationId: string, shotIndex: number) => {
    setActiveShots((prev) => ({
      ...prev,
      [stationId]: shotIndex
    }));
  };

  return (
    <div className="bg-[#F8F5EF] text-[#2C3224]">
      {/* 1. Inner Hero Section (Exact copy and layout from stations.html) */}
      <section aria-labelledby="pageHeading" className="relative min-h-[360px] sm:min-h-[440px] flex items-end overflow-hidden bg-[#3C4229]">
        <img
          src="assets/barah-centre-exterior-arrival.webp"
          alt={isAr ? 'مركز بَراح في وادي البحير' : 'BARAH Centre in Wadi Al Buhair'}
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.72]"
        />
        {/* Soft gradient shade */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C3224]/95 via-[#2C3224]/50 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full text-white">
          <p className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#CCB798] mb-3">
            <span className="w-6 h-px bg-[#CCB798]" />
            <span>{isAr ? 'اكتشف المحطات' : 'Discover the Stations'}</span>
          </p>

          <h1
            id="pageHeading"
            className="font-serif-ar text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-[#FFFCF7]"
          >
            {isAr ? (
              <>
                أربع محطات. <span className="text-[#CCB798] italic">حكاية واحدة.</span>
              </>
            ) : (
              <>
                Four Stations. <span className="text-[#CCB798] italic">One Connected Story.</span>
              </>
            )}
          </h1>

          <p className="max-w-2xl text-sm sm:text-base text-[#F8F5EF]/85 font-light leading-relaxed">
            {isAr
              ? 'من الاستقبال إلى المسار والمرصد والمجلس، استكشف المحطات الأربع بتصوراتها البصرية وتفاصيلها المعمارية.'
              : 'From arrival to the trail, observatory, and majlis, explore the four stations through their architectural and ecological visualizations.'}
          </p>
        </div>
      </section>

      {/* 2. Stations Grid Section (#stations) */}
      <section id="stations" className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section top */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 pb-6 border-b border-[#D8CEBD]">
            <div>
              <p className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#8D7255] mb-2">
                <span className="w-5 h-px bg-[#8D7255]" />
                <span>{isAr ? 'محطات المسار البيئي' : 'Eco-Trail Stations'}</span>
              </p>
              <h2 className="font-serif-ar text-3xl sm:text-4xl font-bold text-[#2C3224]">
                {isAr ? (
                  <>
                    أربع محطات.<br />
                    <i className="text-[#515638] not-italic">حكاية متصلة في قلب الوادي.</i>
                  </>
                ) : (
                  <>
                    Four Distinct Stations.<br />
                    <i className="text-[#515638] not-italic">United by Natural Heritage.</i>
                  </>
                )}
              </h2>
            </div>
            <p className="max-w-md text-sm text-[#57604F] leading-relaxed">
              {isAr
                ? 'كل محطة تقرّبك من المكان بطريقة مختلفة، من لحظة الوصول الأولى إلى آخر جلسة هادئة في المجلس.'
                : 'Each station invites you into the valley differently, from the first greeting at arrival to quiet contemplation at sunset.'}
            </p>
          </div>

          {/* 4 Station Cards (2x2 Grid) with individual thumbnail switchers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {STATIONS_CARDS.map((station) => {
              const activeShotIndex = activeShots[station.id] ?? 0;
              const currentShot = station.shots[activeShotIndex] || station.shots[0];

              return (
                <article
                  key={station.id}
                  className="bg-[#FFFCF7] rounded-3xl border border-[#D8CEBD] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  {/* Media container */}
                  <div className="relative aspect-[16/10] bg-[#3C4229] overflow-hidden">
                    <img
                      src={currentShot.src}
                      alt={isAr ? currentShot.altAr : currentShot.altEn}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                      loading="lazy"
                    />

                    {/* Badge */}
                    <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-medium border border-white/15">
                      {isAr ? 'تصور مقترح' : 'Design Concept'}
                    </span>

                    {/* Expand Button */}
                    <button
                      type="button"
                      onClick={() =>
                        onOpenLightbox(
                          currentShot.src,
                          isAr ? `${station.titleAr} - ${currentShot.altAr}` : `${station.titleEn} - ${currentShot.altEn}`
                        )
                      }
                      title={isAr ? 'تكبير الصورة' : 'Expand Image'}
                      aria-label={isAr ? 'تكبير صورة المحطة' : 'Expand station image'}
                      className="absolute top-4 left-4 p-2.5 rounded-full bg-black/60 hover:bg-black/85 text-white backdrop-blur-md border border-white/20 transition-transform active:scale-90"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Thumbnail / Shot Switcher */}
                  <div
                    role="group"
                    aria-label={isAr ? `مشاهد ${station.titleAr}` : `${station.titleEn} views`}
                    className="flex items-center gap-2 p-3 bg-[#F2ECE1] border-b border-[#D8CEBD] overflow-x-auto no-scrollbar"
                  >
                    <span className="text-[11px] font-semibold text-[#8D7255] px-1 shrink-0">
                      {isAr ? 'المشاهد:' : 'Views:'}
                    </span>
                    {station.shots.map((shot, sIdx) => {
                      const isActive = sIdx === activeShotIndex;
                      return (
                        <button
                          key={shot.id}
                          type="button"
                          onClick={() => handleShotChange(station.id, sIdx)}
                          aria-pressed={isActive}
                          aria-label={isAr ? `المشهد ${shot.label}` : `View ${shot.label}`}
                          className={`relative flex items-center gap-1.5 p-1 rounded-xl transition-all shrink-0 ${
                            isActive
                              ? 'bg-[#515638] text-white shadow-sm ring-2 ring-[#515638]'
                              : 'bg-white/80 hover:bg-white text-[#57604F] border border-[#D8CEBD]'
                          }`}
                        >
                          <img
                            src={shot.thumb}
                            alt=""
                            className="w-8 h-8 rounded-lg object-cover"
                            loading="lazy"
                          />
                          <span className="text-xs font-mono font-bold px-1.5">
                            {shot.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Station Content */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono font-bold text-[#8D7255] mb-2 uppercase tracking-wider">
                        <span>{station.num}</span>
                        <span>{station.actionCode}</span>
                      </div>

                      <h3 className="font-serif-ar text-2xl font-bold text-[#2C3224] mb-3">
                        {isAr ? station.titleAr : station.titleEn}
                      </h3>

                      <p className="text-sm text-[#57604F] leading-relaxed mb-6 font-light">
                        {isAr ? station.descAr : station.descEn}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#E3D8C6] flex items-center justify-between">
                      <button
                        onClick={() => onNavigatePage('visit')}
                        className="inline-flex items-center gap-2 text-xs font-bold text-[#515638] hover:text-[#3C4229] transition-colors group/btn"
                      >
                        <span>{isAr ? 'خطط لزيارة هذه المحطة' : 'Plan your visit to this station'}</span>
                        {isAr ? (
                          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover/btn:-translate-x-1" />
                        ) : (
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                        )}
                      </button>

                      <span className="text-[11px] font-mono text-[#8D7255]">
                        WADI AL BUHAIR
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Journey Steps Section (#journey) */}
      <section id="journey" className="py-20 bg-[#EFE9DD] border-t border-b border-[#D8CEBD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Visual Image */}
            <div className="lg:col-span-5 relative rounded-3xl overflow-hidden shadow-lg border border-[#D8CEBD] aspect-[4/5] bg-[#3C4229]">
              <img
                src="assets/concept-path.webp"
                alt={isAr ? 'تصور لممشى منخفض التأثير في البيئة الطبيعية' : 'Low-impact eco-boardwalk concept'}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-medium border border-white/20">
                {isAr ? 'تصور مقترح' : 'Design Concept'}
              </span>

              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/70 backdrop-blur-md text-white border border-white/15">
                <div className="flex items-center gap-2 text-xs font-bold text-[#CCB798] mb-1">
                  <Footprints className="w-4 h-4" />
                  <span>{isAr ? 'مسار المشي المستدام' : 'Sustainable Boardwalk'}</span>
                </div>
                <p className="text-xs text-white/80 leading-relaxed font-light">
                  {isAr
                    ? 'مصمم بارتفاع طفيف عن الأرض لحماية التربة الرسوبية والنباتات البرية المعمرة.'
                    : 'Elevated lightly off the bedrock to protect ancient strata and desert vegetation.'}
                </p>
              </div>
            </div>

            {/* Journey Narrative & 4 Steps */}
            <div className="lg:col-span-7 lg:pr-6">
              <p className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#8D7255] mb-2">
                <span className="w-6 h-px bg-[#8D7255]" />
                <span>{isAr ? 'رحلتك في بَراح' : 'Your Journey at BARAH'}</span>
              </p>

              <h2 className="font-serif-ar text-3xl sm:text-4xl font-bold text-[#2C3224] leading-tight mb-4">
                {isAr ? (
                  <>
                    خطوات تكشف <span className="text-[#515638] italic">حكاية المكان.</span>
                  </>
                ) : (
                  <>
                    Steps That Unveil <span className="text-[#515638] italic">the Valley's Story.</span>
                  </>
                )}
              </h2>

              <p className="text-sm sm:text-base text-[#57604F] font-light leading-relaxed mb-8">
                {isAr
                  ? 'تبدأ الرحلة من بوابة بَراح، وتمتد عبر الدرب والمرصد، وتختتم في المجلس. أربع محطات، وكل محطة تكشف لك جانبًا من الوادي بهدوء وتأمل.'
                  : 'The journey starts at BARAH Gate, unfolds along the boardwalk and observatory, and wraps up at the majlis. Four stations revealing the valley step by gentle step.'}
              </p>

              {/* 4 Steps List */}
              <div className="space-y-4">
                {JOURNEY_STEPS.map((step) => (
                  <div
                    key={step.num}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-[#FFFCF7] border border-[#D8CEBD] hover:border-[#8D7255] transition-colors"
                  >
                    <span className="text-sm font-mono font-bold text-[#8D7255] bg-[#E3D8C6] px-2.5 py-1 rounded-xl shrink-0 mt-0.5">
                      {step.num}
                    </span>
                    <div className="flex-1">
                      <strong className="block text-base font-bold text-[#2C3224] mb-1">
                        {isAr ? step.titleAr : step.titleEn}
                      </strong>
                      <p className="text-xs sm:text-sm text-[#57604F] leading-relaxed font-light">
                        {isAr ? step.descAr : step.descEn}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Photo Gallery Section (#gallery) */}
      <section id="gallery" className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 pb-6 border-b border-[#D8CEBD]">
            <div>
              <p className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#8D7255] mb-2">
                <span className="w-5 h-px bg-[#8D7255]" />
                <span>{isAr ? 'لمحات من المكان والفكرة' : 'Vistas & Concepts'}</span>
              </p>
              <h2 className="font-serif-ar text-3xl sm:text-4xl font-bold text-[#2C3224]">
                {isAr ? (
                  <>
                    من الفكرة...<br />
                    <i className="text-[#8D7255] not-italic">إلى المشهد الطبيعي.</i>
                  </>
                ) : (
                  <>
                    From Concept Vision...<br />
                    <i className="text-[#8D7255] not-italic">To Immersive Landscape.</i>
                  </>
                )}
              </h2>
            </div>
            <p className="max-w-md text-sm text-[#57604F] leading-relaxed">
              {isAr
                ? 'تصورات بصرية تعرض تجربة المحطات والمرافق المقترحة في وادي البحير مع الحفاظ على روح الطبيعة.'
                : 'Architectural perspectives illustrating proposed eco-facilities in Wadi Al Buhair preserving its authentic nature.'}
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY_PHOTOS.map((photo, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() =>
                  onOpenLightbox(
                    photo.src,
                    isAr ? photo.captionAr : photo.captionEn
                  )
                }
                className={`relative rounded-3xl overflow-hidden border border-[#D8CEBD] shadow-sm hover:shadow-xl transition-all duration-300 group text-start bg-[#3C4229] ${
                  photo.wide ? 'md:col-span-2 lg:col-span-2 aspect-[16/9]' : 'aspect-square'
                }`}
              >
                <img
                  src={photo.src}
                  alt={isAr ? photo.captionAr : photo.captionEn}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-medium border border-white/20">
                  {isAr ? 'تصور مقترح' : 'Design Concept'}
                </span>

                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                  <p className="text-xs sm:text-sm font-medium line-clamp-2 max-w-[80%]">
                    {isAr ? photo.captionAr : photo.captionEn}
                  </p>
                  <div className="w-8 h-8 rounded-full bg-white/20 group-hover:bg-[#CCB798] group-hover:text-[#2C3224] flex items-center justify-center transition-colors">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Next Experience Aside Banner (.next-experience) */}
      <aside className="bg-[#515638] text-white py-12 border-t border-[#3C4229]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-[#CCB798] block mb-1">
              CONTINUE THE EXPEDITION
            </span>
            <p className="font-serif-ar text-2xl sm:text-3xl font-bold text-[#FFFCF7]">
              {isAr ? 'تابع حكايتك في بَراح' : 'Continue Your Journey in BARAH'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigatePage('events')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#FFFCF7] text-[#2C3224] text-xs font-bold hover:bg-[#CCB798] transition-colors shadow-md"
            >
              <Calendar className="w-4 h-4 text-[#515638]" />
              <span>{isAr ? 'استكشف الفعاليات' : 'Explore Events'}</span>
              {isAr ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => onNavigatePage('visit')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-transparent border border-white/30 text-white text-xs font-bold hover:bg-white/10 transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-[#CCB798]" />
              <span>{isAr ? 'شاركنا رأيك وخطط' : 'Share Feedback & Plan'}</span>
              {isAr ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};
