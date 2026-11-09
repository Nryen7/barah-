import React, { useState } from 'react';
import {
  MapPin,
  Compass,
  Shield,
  Trees,
  Feather,
  Eye,
  Globe2,
  Award,
  ExternalLink,
  Sparkles,
  Info,
  Layers,
  Leaf,
  CheckCircle2,
} from 'lucide-react';
import { Language } from '../types/barah';

interface AboutSectionProps {
  lang: Language;
  onExploreStations: () => void;
  onOpenDossier?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  lang,
  onExploreStations,
}) => {
  const isAr = lang === 'ar';
  const [activeLocationTab, setActiveLocationTab] = useState<'concept' | 'satellite' | 'map'>('concept');

  const sustainabilityValues = [
    {
      num: '01',
      titleAr: 'تدخل خفيف',
      titleEn: 'Light-touch design',
      descAr: 'مرافق محدودة وقابلة للتكيّف والفك مع طبيعة الموقع، ترتكز على أوتاد خشبية مرتفعة دون أعمال حفر عميقة.',
      descEn: 'Limited, demountable facilities suited to site conditions, raised on timber piles without deep concrete excavation.',
      icon: Trees,
    },
    {
      num: '02',
      titleAr: 'حماية الموائل',
      titleEn: 'Habitat protection',
      descAr: 'تحديد مسارات المشي بدقة وتنظيم حركة الزوار قرب المناطق الحساسة ومسطحات الماء لحماية الطيور والكائنات الفطرية.',
      descEn: 'Designated boardwalks and controlled access near sensitive wetland margins to protect nesting birds and fragile flora.',
      icon: Shield,
    },
    {
      num: '03',
      titleAr: 'إدارة واعية',
      titleEn: 'Thoughtful operations',
      descAr: 'مراعاة درجات الحرارة والموسمية وإدارة المياه وتدوير النفايات مع الالتزام التام بمبدأ «لا تترك أي أثر».',
      descEn: 'Comprehensive consideration of seasonal temperature shifts, water management, zero-litter policy, and low-energy lighting.',
      icon: Leaf,
    },
    {
      num: '04',
      titleAr: 'معرفة قبل الزيارة',
      titleEn: 'Learn before you visit',
      descAr: 'توفير معلومات واضحة عن البيئة الجيولوجية وقواعد السلوك المسؤول لرفع الوعي المجتمعي قبل انطلاق الرحلة.',
      descEn: 'Clear ecological interpretation and responsible conduct guidelines provided to enrich visitor awareness before exploring.',
      icon: Globe2,
    },
  ];

  const locationReasons = [
    {
      titleAr: 'مشهد طبيعي متفرّد',
      titleEn: 'A distinctive landscape',
      descAr: 'تشكّل التضاريس الصخرية الرسوبية والعناصر المائية والنباتات مشهدًا بحرينياً فريداً يستحق المشاهدة والتوثيق دون تحويله إلى حديقة مصطنعة.',
      descEn: 'Ancient limestone formations, freshwater pools, and native reed beds form an authentic setting that deserves interpretation without artificial landscaping.',
    },
    {
      titleAr: 'تجربة سياحية مترابطة',
      titleEn: 'One connected journey',
      descAr: 'تربط المحطات الأربع المقترحة بين الاستقبال والترحيب والمشي الخشبي ورصد الطيور والضيافة الأصيلة في مسار زيارة متسلسل وقابل للتنظيم.',
      descEn: 'Four proposed stations harmonize arrival, boardwalk walks, quiet birdwatching, and hospitality into a cohesive, organized visitor sequence.',
    },
    {
      titleAr: 'حماية قبل التطوير',
      titleEn: 'Protection before development',
      descAr: 'تقوم الفكرة على توجيه كافة المرافق الخدمية نحو أطراف ملائمة للتطوير، مع صون القلب الطبيعي الحساس وعدم افتراض السماح بالبناء داخل المحمية.',
      descEn: 'Facilities are strategically oriented toward outer developmental edges, strictly safeguarding the delicate ecological core and wetlands.',
    },
  ];

  const sdgs = [
    {
      num: '15',
      nameAr: 'الحياة في البر',
      nameEn: 'Life on Land',
      descAr: 'حماية النظم الإيكولوجية البرية في وادي البحير ومكافحة تدهور الأراضي.',
      descEn: 'Protecting terrestrial wetland ecosystems and stopping habitat degradation.',
      color: 'bg-emerald-700',
    },
    {
      num: '11',
      nameAr: 'مدن ومجتمعات مستدامة',
      nameEn: 'Sustainable Cities',
      descAr: 'توفير متنفس طبيعي عام ومستدام لسكان المحافظة الجنوبية وعموم البحرين.',
      descEn: 'Providing accessible, low-impact green retreats for the Southern Governorate.',
      color: 'bg-amber-600',
    },
    {
      num: '12',
      nameAr: 'استهلاك وإنتاج مسؤول',
      nameEn: 'Responsible Consumption',
      descAr: '٢٧ مقتنى تذكاري مستدام ومصنوع من مواد صديقة للبيئة وقابلة للتدوير.',
      descEn: 'Circular merchandise designed with recycled, natural materials.',
      color: 'bg-amber-700',
    },
    {
      num: '04',
      nameAr: 'التعليم الجيد والبيئي',
      nameEn: 'Quality Eco-Education',
      descAr: 'رحلات ميدانية مدرسية وجامعية لتعليم الأجيال علوم الجيولوجيا والطيور.',
      descEn: 'Interactive field excursions enriching environmental science literacy.',
      color: 'bg-red-700',
    },
  ];

  return (
    <div id="about" className="py-16 sm:py-24 bg-[#F8F5EF] text-[#2C3224]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* ========================================================= */}
        {/* SECTION 1: IDENTITY & PHILOSOPHY (من المدينة... إلى البَراح) */}
        {/* ========================================================= */}
        <section aria-labelledby="identityHeading" className="scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Visual Identity Card */}
            <div className="lg:col-span-6 space-y-4">
              <div className="rounded-3xl bg-[#E3D8C6]/50 border border-[#D8CEBD] p-6 sm:p-8 shadow-sm flex flex-col items-center text-center">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#8D7255] mb-4">
                  BARAH / BRAND IDENTITY
                </span>

                <div className="w-full max-w-md py-6 px-4 bg-[#F8F5EF] rounded-2xl border border-[#D8CEBD] shadow-inner mb-6 flex items-center justify-center">
                  <img
                    src="/assets/barah-logo-official-cream.webp"
                    alt="شعار بَراح الرسمي المعتمد"
                    className="max-h-36 sm:max-h-44 w-auto object-contain"
                  />
                </div>

                <div className="w-full flex items-center justify-between pt-4 border-t border-[#D8CEBD]/60 text-xs text-[#57604F]">
                  <span className="font-serif-ar font-bold text-[#515638] text-sm">
                    {isAr ? 'للأرض حكاية' : 'Every land has a story'}
                  </span>
                  <span className="font-mono text-[11px] tracking-wider text-[#8D7255]">
                    BAHRAIN · WADI AL BUHAIR
                  </span>
                </div>
              </div>

              {/* Brand Colour Swatches */}
              <div className="p-4 rounded-2xl bg-white border border-[#D8CEBD] flex items-center justify-around gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#515638] border border-black/10 shrink-0" />
                  <span className="font-medium text-[#2C3224]">
                    {isAr ? 'أخضر الطبيعة' : 'Nature Green'}
                  </span>
                </div>
                <div className="w-px h-5 bg-[#D8CEBD]" />
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#6F8286] border border-black/10 shrink-0" />
                  <span className="font-medium text-[#2C3224]">
                    {isAr ? 'أزرق الماء' : 'Water Blue'}
                  </span>
                </div>
                <div className="w-px h-5 bg-[#D8CEBD]" />
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#CCB798] border border-black/10 shrink-0" />
                  <span className="font-medium text-[#2C3224]">
                    {isAr ? 'رمل الوادي' : 'Valley Sand'}
                  </span>
                </div>
              </div>
            </div>

            {/* Identity Copy */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E3D8C6] text-[#515638] text-xs font-bold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isAr ? 'هوية تنتمي إلى المكان' : 'An Identity Rooted in Place'}</span>
              </div>

              <h2
                id="identityHeading"
                className="font-serif-ar text-3xl sm:text-5xl font-bold text-[#2C3224] leading-tight"
              >
                {isAr ? (
                  <>
                    من المدينة... <span className="text-[#8D7255] italic">إلى البَراح.</span>
                  </>
                ) : (
                  <>
                    From the city... <span className="text-[#8D7255] italic">to open space.</span>
                  </>
                )}
              </h2>

              <p className="text-base sm:text-lg text-[#2C3224] leading-relaxed font-medium">
                {isAr
                  ? 'يعني اسم «بَراح» الفضاء المفتوح والمتّسع الخالي من العوائق. ومن هذا المعنى اللغوي والتراثي الأصيل، تستمد الوجهة هويتها من ملامح وادي البحير نفسه؛ حيث تتجاور التكوينات الصخرية القديمة والمسطحات المائية والنباتات الفطرية والطيور في مشهد بحريني مختلف ونادر.'
                  : 'The Arabic word “Barah” evokes open, expansive, and unencumbered space. Rooted in this cultural meaning, the destination takes its identity from Wadi Al Buhair itself, where dramatic rock formations, quiet waters, native vegetation, and migratory birds shape a truly unique Bahraini landscape.'}
              </p>

              <p className="text-sm text-[#57604F] leading-relaxed">
                {isAr
                  ? 'تظهر هذه العناصر في الشعار المعتمد: أخضر يستحضر الطبيعة والغطاء النباتي، وأزرق يشير إلى الماء والحياة، ودرجات رملية تعبّر عن تراب الأرض وصخور الوادي. ليست الهوية زينة منفصلة عن المكان، بل امتداداً لفلسفة سياحية واعية تُتيح اكتشاف الوادي دون إعادة تشكيله أو طمس معالمه الفطرية.'
                  : 'These elements directly inform the approved brand identity: nature green for vegetation, water blue for the quiet wetland pools, and warm sandstone tones for the geological ridges. The visual identity is not merely an ornament; it reflects a tourism philosophy that invites discovery without remaking or distorting the valley.'}
              </p>

              {/* Core Philosophy Callout */}
              <div className="p-5 rounded-2xl bg-[#E3D8C6]/50 border-s-4 border-[#515638] text-[#2C3224]">
                <p className="font-serif-ar text-lg sm:text-xl font-bold italic text-[#3C4229]">
                  {isAr
                    ? '“بَراح لا يصنع الطبيعة؛ بل ينظّم طريقة اكتشافها.”'
                    : '“BARAH does not create nature; it organises how we discover it.”'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 2: PURPOSE, VISION & MISSION (وجهتنا الطبيعة)      */}
        {/* ========================================================= */}
        <section aria-labelledby="purposeHeading" className="scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E3D8C6] text-[#515638] text-xs font-bold tracking-wider uppercase mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>{isAr ? 'ما الذي نؤمن به؟' : 'What We Believe'}</span>
            </div>

            <h2
              id="purposeHeading"
              className="font-serif-ar text-3xl sm:text-4xl font-bold text-[#2C3224] leading-tight mb-4"
            >
              {isAr ? (
                <>
                  وجهتنا الطبيعة. <span className="text-[#8D7255] italic">وغايتنا الحفاظ عليها.</span>
                </>
              ) : (
                <>
                  Inspired by Nature. <span className="text-[#8D7255] italic">Committed to Protecting It.</span>
                </>
              )}
            </h2>

            <p className="text-sm sm:text-base text-[#57604F]">
              {isAr
                ? 'لكل تجربة في بَراح معنى، ولكل خطوة مسؤولية بيئية وأخلاقية تجاه المكان وأهله وأجيال المستقبل.'
                : 'Every BARAH experience carries meaning, and every step carries an environmental responsibility to the land.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision Card */}
            <div className="p-8 rounded-3xl bg-[#FFFCF7] border border-[#D8CEBD] shadow-sm relative overflow-hidden group hover:border-[#515638] transition-colors">
              <span className="text-xs font-mono font-bold text-[#8D7255] uppercase tracking-wider block mb-3">
                01 / VISION
              </span>
              <h3 className="font-serif-ar text-2xl font-bold text-[#2C3224] mb-4">
                {isAr ? 'رؤيتنا' : 'Our Vision'}
              </h3>
              <p className="text-sm sm:text-base text-[#57604F] leading-relaxed">
                {isAr
                  ? 'أن تصبح «بَراح» نموذجاً مميزاً وملهماً للسياحة البيئية منخفضة التأثير في مملكة البحرين ومنطقة الخليج العربي، يجمع بتوازن دقيق بين جودة تجربة الزائر وصون الخصائص الطبيعية والجيولوجية النادرة لوادي البحير.'
                  : 'To become a distinctive and inspiring low-impact eco-tourism model in the Kingdom of Bahrain, seamlessly balancing high-quality visitor experiences with the uncompromised conservation of Wadi Al Buhair’s natural character.'}
              </p>
            </div>

            {/* Mission Card */}
            <div className="p-8 rounded-3xl bg-[#FFFCF7] border border-[#D8CEBD] shadow-sm relative overflow-hidden group hover:border-[#515638] transition-colors">
              <span className="text-xs font-mono font-bold text-[#8D7255] uppercase tracking-wider block mb-3">
                02 / MISSION
              </span>
              <h3 className="font-serif-ar text-2xl font-bold text-[#2C3224] mb-4">
                {isAr ? 'رسالتنا' : 'Our Mission'}
              </h3>
              <p className="text-sm sm:text-base text-[#57604F] leading-relaxed">
                {isAr
                  ? 'تقديم تجربة زيارة منظّمة تربط الاستكشاف والمشي في الطبيعة ومراقبة الطيور والتعلّم الميداني والضيافة البحرينية الأصيلة، من خلال مرافق محدودة الأثر وعمارة خشبية مرتفعة، وتشغيل بيئي مسؤول بالتعاون مع الجهات المختصة والمشروعات الوطنية.'
                  : 'To deliver a structured visitor journey combining respectful exploration, boardwalk walking, wildlife observation, environmental education, and authentic hospitality, executed through minimal-impact facilities and community collaboration.'}
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 3: LOCATION & WHY WADI AL BUHAIR (الموقع ولماذا اختير) */}
        {/* ========================================================= */}
        <section id="location" aria-labelledby="locationHeading" className="scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E3D8C6] text-[#515638] text-xs font-bold tracking-wider uppercase mb-3">
              <MapPin className="w-3.5 h-3.5" />
              <span>{isAr ? 'الموقع · مملكة البحرين' : 'Location · Kingdom of Bahrain'}</span>
            </div>

            <h2
              id="locationHeading"
              className="font-serif-ar text-3xl sm:text-4xl font-bold text-[#2C3224] leading-tight mb-4"
            >
              {isAr ? (
                <>
                  هنا يبدأ <span className="text-[#8D7255] italic">معنى المكان.</span>
                </>
              ) : (
                <>
                  Here is where <span className="text-[#8D7255] italic">place becomes meaning.</span>
                </>
              )}
            </h2>

            <p className="text-sm sm:text-base text-[#57604F]">
              {isAr
                ? 'يقع وادي البحير في المحافظة الجنوبية بمملكة البحرين، بالقرب من منطقتَي الرفاع وسند. ومن طبيعة هذا الوادي تنطلق فكرة بَراح؛ وجهة مقترحة تمنح الزائر وسيلة منظّمة لفهم المشهد الطبيعي والتفاعل معه بمسؤولية.'
                : 'Wadi Al Buhair lies in Bahrain’s Southern Governorate, adjacent to Riffa and Sanad. Its landscape is the inception point for BARAH: a destination inviting visitors to encounter this natural terrain responsibly.'}
            </p>
          </div>

          {/* Interactive 3-Way Media Viewer */}
          <div className="rounded-3xl bg-[#FFFCF7] border border-[#D8CEBD] overflow-hidden shadow-lg p-4 sm:p-6 mb-12">
            {/* View Switcher Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-[#D8CEBD]">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveLocationTab('concept')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeLocationTab === 'concept'
                      ? 'bg-[#515638] text-white shadow-xs'
                      : 'bg-[#F8F5EF] text-[#57604F] hover:bg-[#E3D8C6]'
                  }`}
                >
                  {isAr ? 'تصوّر بَراح المعماري' : 'BARAH Concept'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLocationTab('satellite')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeLocationTab === 'satellite'
                      ? 'bg-[#515638] text-white shadow-xs'
                      : 'bg-[#F8F5EF] text-[#57604F] hover:bg-[#E3D8C6]'
                  }`}
                >
                  {isAr ? 'صورة جوية مرجعية' : 'Satellite View'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLocationTab('map')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeLocationTab === 'map'
                      ? 'bg-[#515638] text-white shadow-xs'
                      : 'bg-[#F8F5EF] text-[#57604F] hover:bg-[#E3D8C6]'
                  }`}
                >
                  {isAr ? 'خريطة Google التفاعلية' : 'Google Maps View'}
                </button>
              </div>

              <a
                href="https://www.google.com/maps/search/?api=1&query=26%C2%B008%2731.2%22N+50%C2%B033%2746.8%22E"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#515638] hover:text-[#3C4229] transition-colors"
              >
                <span>{isAr ? 'عرض الموقع في خرائط Google' : 'Open in Google Maps'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Viewer Stage */}
            <div className="relative rounded-2xl overflow-hidden bg-stone-900 h-[380px] sm:h-[480px]">
              {activeLocationTab === 'concept' && (
                <div className="w-full h-full relative animate-fadeIn">
                  <img
                    src="/assets/wadi-lake.webp"
                    alt="تصور بحيرة وتضاريس وادي البحير"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                  <div className="absolute bottom-5 start-5 end-5 p-4 rounded-xl bg-white/95 backdrop-blur-sm border border-white/30 text-xs text-[#2C3224] flex items-center justify-between">
                    <div>
                      <span className="font-bold block text-sm text-[#515638]">
                        {isAr ? 'تصوّر بصري لبَراح · وادي البحير' : 'BARAH Visual Concept · Wadi Al Buhair'}
                      </span>
                      <span className="text-[#57604F] text-[11px]">
                        {isAr
                          ? 'تكامل المسارات الخشبية مع التكوينات الصخرية والبحيرات الطبيعية'
                          : 'Integration of elevated boardwalks with natural limestone wetlands'}
                      </span>
                    </div>
                    <span className="font-mono text-[11px] bg-[#E3D8C6] px-2.5 py-1 rounded-md font-bold text-[#515638]">
                      CONCEPT ART
                    </span>
                  </div>
                </div>
              )}

              {activeLocationTab === 'satellite' && (
                <div className="w-full h-full relative animate-fadeIn">
                  <img
                    src="/assets/wadi-al-buhair-location-reference.webp"
                    alt="صورة جوية مرجعية لوادي البحير"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                  <div className="absolute bottom-5 start-5 end-5 p-4 rounded-xl bg-white/95 backdrop-blur-sm border border-white/30 text-xs text-[#2C3224] flex items-center justify-between">
                    <div>
                      <span className="font-bold block text-sm text-[#515638]">
                        {isAr ? 'صورة جوية مرجعية للوادي' : 'Satellite Location Reference'}
                      </span>
                      <span className="text-[#57604F] text-[11px]">
                        {isAr
                          ? 'وادي البحير، بين مدينتي الرفاع وسند · المحافظة الجنوبية'
                          : 'Wadi Al Buhair between Riffa and Sanad · Southern Governorate'}
                      </span>
                    </div>
                    <span className="font-mono text-[11px] bg-[#E3D8C6] px-2.5 py-1 rounded-md font-bold text-[#515638]">
                      SATELLITE
                    </span>
                  </div>
                </div>
              )}

              {activeLocationTab === 'map' && (
                <div className="w-full h-full relative animate-fadeIn flex flex-col bg-[#E3D8C6]/20">
                  <iframe
                    title={isAr ? 'خريطة وادي البحير على Google Maps' : 'Google Maps Wadi Al Buhair'}
                    src={`https://maps.google.com/maps?q=26.142000,50.563000&hl=${isAr ? 'ar' : 'en'}&z=15&output=embed`}
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  {/* Floating Coordinates Bar */}
                  <div className="absolute top-4 start-4 end-4 sm:start-auto sm:end-4 p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-[#D8CEBD] shadow-xl flex items-center justify-between sm:justify-start gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                      <div>
                        <div className="text-[11px] font-bold text-[#2C3224]">
                          {isAr ? 'إحداثيات وادي البحير الرسمية' : 'Wadi Al Buhair Coordinates'}
                        </div>
                        <div className="font-mono text-xs text-[#515638] font-bold dir-ltr">
                          26°08'31.2"N 50°33'46.8"E
                        </div>
                      </div>
                    </div>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=26%C2%B008%2731.2%22N+50%C2%B033%2746.8%22E"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-[#515638] hover:bg-[#3C4229] text-white text-[11px] font-bold transition-all shadow-xs inline-flex items-center gap-1.5 shrink-0"
                    >
                      <span>{isAr ? 'فتح في خرائط Google' : 'Open in Maps'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mt-3 text-[11px] text-[#57604F] leading-relaxed">
              <p>
                {isAr
                  ? 'ملاحظة توضيحية: الصورة الأولى تصوّر تصميمي للمشروع، والصورة الجوية مرجعية من خرائط Google. لا تحدد الخريطة حدود أرض بَراح المقترحة أو مدخلها النهائي.'
                  : 'Clarification: The concept image is an architectural visualization; the aerial reference is from Google Maps. The map illustrates the valley generally, not a finalized legal boundary or entrance.'}
              </p>
              <div className="inline-flex items-center gap-1.5 shrink-0 px-2.5 py-1 rounded-md bg-[#E3D8C6]/70 text-[#515638] font-mono font-bold text-[11px] dir-ltr">
                <MapPin className="w-3.5 h-3.5 text-[#515638]" />
                <span>26°08'31.2"N 50°33'46.8"E</span>
              </div>
            </div>
          </div>

          {/* Why Wadi Al Buhair Reasons & Environmental Context */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
            <div className="lg:col-span-8 space-y-6">
              <div>
                <h3 className="font-serif-ar text-2xl sm:text-3xl font-bold text-[#515638] mb-2">
                  {isAr ? 'لماذا اختير وادي البحير؟' : 'Why Wadi Al Buhair?'}
                </h3>
                <p className="text-sm text-[#57604F] leading-relaxed">
                  {isAr
                    ? 'لم يُختر الموقع لمجرد توفر مساحة مفتوحة؛ بل لما يحمله من عناصر طبيعية قائمة وقيمة بيئية وجيولوجية استثنائية تستدعي أسلوبًا مختلفًا وحذراً في تطوير التجربة السياحية.'
                    : 'The site was chosen not simply for open acreage, but for its rare intrinsic natural attributes and ecological significance, warranting a delicate, enlightened approach to eco-tourism.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {locationReasons.map((r, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-[#FFFCF7] border border-[#D8CEBD] shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <span className="w-7 h-7 rounded-lg bg-[#E3D8C6] text-[#515638] font-mono font-bold text-xs flex items-center justify-center mb-3">
                        0{idx + 1}
                      </span>
                      <h4 className="font-bold text-sm text-[#2C3224] mb-2">
                        {isAr ? r.titleAr : r.titleEn}
                      </h4>
                      <p className="text-xs text-[#57604F] leading-relaxed">
                        {isAr ? r.descAr : r.descEn}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Official Verified Environmental Protection Box */}
            <div className="lg:col-span-4 p-6 rounded-3xl bg-[#E3D8C6]/50 border border-[#D8CEBD] shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#8D7255] uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-[#515638]" />
                <span>{isAr ? 'معلومة بيئية موثّقة' : 'Verified Environmental Context'}</span>
              </div>

              <h4 className="font-serif-ar text-lg font-bold text-[#2C3224]">
                {isAr ? 'قرارات الحماية الرسمية للوادي' : 'Official Conservation Directives'}
              </h4>

              <p className="text-xs text-[#57604F] leading-relaxed">
                {isAr
                  ? 'صدرت في يوليو 2022 توجيهات رسمية بمملكة البحرين لحماية المناطق البيئية ذات التضاريس والتلال الصخرية في وادي البحير. ويظل أي تنفيذ لمشروع «بَراح» مشروطًا بالدراسات المتخصصة والتحقق والموافقات البيئية والتنظيمية الرسمية اللازمة.'
                  : 'In July 2022, official governmental directives were issued in the Kingdom of Bahrain to protect the ecologically significant rocky hills and ancient limestone formations of Wadi Al Buhair. Any future BARAH implementation remains subject to all required specialist environmental impact assessments and official regulatory approvals.'}
              </p>

              <div className="pt-2 border-t border-[#D8CEBD]/60 flex items-center justify-between text-[11px] text-[#515638]">
                <span className="font-bold">{isAr ? 'التصنيف' : 'Classification'}:</span>
                <span>{isAr ? 'منطقة بيئية ذات أولوية حماية' : 'Ecological Priority Zone'}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 4: SUSTAINABILITY & RESPONSIBILITY (مسؤوليتنا)   */}
        {/* ========================================================= */}
        <section aria-labelledby="sustainHeading" className="scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E3D8C6] text-[#515638] text-xs font-bold tracking-wider uppercase mb-3">
              <Shield className="w-3.5 h-3.5" />
              <span>{isAr ? 'مسؤوليتنا تجاه المكان' : 'Our Responsibility to the Land'}</span>
            </div>

            <h2
              id="sustainHeading"
              className="font-serif-ar text-3xl sm:text-4xl font-bold text-[#2C3224] leading-tight mb-4"
            >
              {isAr ? (
                <>
                  نحمي الطبيعة، <span className="text-[#8D7255] italic">ونترك أثرًا ينمو.</span>
                </>
              ) : (
                <>
                  Protect Nature. <span className="text-[#8D7255] italic">Let a Positive Trace Grow.</span>
                </>
              )}
            </h2>

            <p className="text-sm sm:text-base text-[#57604F]">
              {isAr
                ? 'في بَراح، جمال المكان هو الأساس والمحور. لذلك تقوم تجربتنا على احترام المسارات المحددة، وحماية الموائل الحساسة، والتعامل الواعي مع الموارد الطبيعية.'
                : 'At BARAH, the integrity of the land is paramount. Our visitor experience is organized strictly around designated boardwalks, habitat protection, and conscientious stewardship.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {sustainabilityValues.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.num}
                  className="p-6 rounded-3xl bg-[#FFFCF7] border border-[#D8CEBD] hover:border-[#515638] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#E3D8C6]/60 group-hover:bg-[#515638] text-[#515638] group-hover:text-white flex items-center justify-center transition-colors">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="font-mono text-xs font-bold text-[#8D7255]">
                        {v.num}
                      </span>
                    </div>

                    <h3 className="font-bold text-[#2C3224] text-base mb-2">
                      {isAr ? v.titleAr : v.titleEn}
                    </h3>

                    <p className="text-xs text-[#57604F] leading-relaxed">
                      {isAr ? v.descAr : v.descEn}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* UN SDGs Alignment Strip */}
          <div className="p-8 rounded-3xl bg-[#E3D8C6]/50 border border-[#D8CEBD] shadow-xs">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8D7255] uppercase tracking-wider mb-1">
                  <Award className="w-4 h-4" />
                  <span>{isAr ? 'أهداف التنمية المستدامة للأمم المتحدة' : 'UN Sustainable Development Goals'}</span>
                </div>
                <h3 className="font-serif-ar text-xl sm:text-2xl font-bold text-[#2C3224]">
                  {isAr
                    ? 'ارتباط وجهة بَراح بالمؤشرات البيئية العالمية'
                    : 'Destination Alignment with Global SDG Targets'}
                </h3>
              </div>
              <span className="text-xs text-[#57604F] max-w-sm">
                {isAr
                  ? 'تدعم وجهة بَراح مباشرة ٤ أهداف استراتيجية من أهداف التنمية المستدامة ورؤية البحرين الاقتصادية ٢٠٣٠.'
                  : 'Directly advancing four strategic UN SDG goals in harmony with Bahrain Economic Vision 2030.'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {sdgs.map((sdg) => (
                <div
                  key={sdg.num}
                  className="p-4 rounded-xl bg-[#FFFCF7] border border-[#D8CEBD] flex items-start gap-3.5 shadow-xs"
                >
                  <div
                    className={`w-10 h-10 rounded-lg ${sdg.color} text-white font-bold flex items-center justify-center text-sm shrink-0`}
                  >
                    {sdg.num}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#2C3224] text-xs">
                      {isAr ? sdg.nameAr : sdg.nameEn}
                    </h4>
                    <p className="text-[11px] text-[#57604F] mt-1 leading-snug">
                      {isAr ? sdg.descAr : sdg.descEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA to Explore Stations */}
        <div className="text-center pt-8">
          <button
            onClick={onExploreStations}
            className="inline-flex items-center gap-2 py-3.5 px-8 rounded-2xl bg-[#515638] hover:bg-[#3C4229] text-white font-bold text-sm shadow-md transition-all active:scale-95"
          >
            <span>{isAr ? 'اكتشف محطات بَراح الأربع بالتفصيل' : 'Explore The 4 BARAH Stations'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
