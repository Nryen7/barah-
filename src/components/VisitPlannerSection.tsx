import React, { useState, useEffect } from 'react';
import { Compass, Calendar, Users, QrCode, Printer, Check, Star, BarChart3, ExternalLink, ShieldCheck, Heart, Sparkles, Clock, Ticket, ChevronDown, HelpCircle, MapPin } from 'lucide-react';
import { Language, SurveyVote, ItineraryBooking } from '../types/barah';
import { FAQS } from '../data/barahData';

interface VisitPlannerSectionProps {
  lang: Language;
}

export const VisitPlannerSection: React.FC<VisitPlannerSectionProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  // Planner State
  const [visitorName, setVisitorName] = useState('');
  const [experienceType, setExperienceType] = useState('trail');
  const [visitDate, setVisitDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('15:30');
  const [guestCount, setGuestCount] = useState(2);
  const [hasPlanting, setHasPlanting] = useState(true);
  const [hasBinoculars, setHasBinoculars] = useState(false);
  const [hasMajlis, setHasMajlis] = useState(true);
  const [generatedPass, setGeneratedPass] = useState<ItineraryBooking | null>(null);

  // Survey State
  const [surveyRating, setSurveyRating] = useState(5);
  const [surveyStation, setSurveyStation] = useState('observatory');
  const [surveySupport, setSurveySupport] = useState<'yes' | 'maybe' | 'no'>('yes');
  const [surveyVisitorType, setSurveyVisitorType] = useState('family');
  const [surveyFeedback, setSurveyFeedback] = useState('');
  const [surveySubmitted, setSurveySubmitted] = useState(false);
  const [openFaqIds, setOpenFaqIds] = useState<string[]>(['faq-1']);

  const toggleFaq = (id: string) => {
    setOpenFaqIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Survey Aggregate Stats (stored in localStorage)
  const [surveyStats, setSurveyStats] = useState({
    totalVotes: 38,
    avgRating: 4.9,
    supportYesPct: 97,
    stationVotes: {
      centre: 8,
      trail: 12,
      observatory: 14,
      majlis: 4,
    },
  });

  // Calculate pricing
  const baseTicket = 2.5; // BHD
  const plantingPrice = hasPlanting ? 0.5 * guestCount : 0;
  const binocularsPrice = hasBinoculars ? 1.0 * guestCount : 0;
  const majlisPrice = hasMajlis ? 1.5 * guestCount : 0;
  const totalPrice = baseTicket * guestCount + plantingPrice + binocularsPrice + majlisPrice;

  // Handle plan submission
  const handleGeneratePlan = (e: React.FormEvent) => {
    e.preventDefault();
    const pass: ItineraryBooking = {
      id: `pass-${Date.now()}`,
      passNumber: `BARAH-${Math.floor(1000 + Math.random() * 9000)}`,
      visitorName: visitorName.trim() || (isAr ? 'زائر بَراح الكريم' : 'BARAH Honored Guest'),
      experienceType,
      date: visitDate,
      timeSlot,
      guestsCount: guestCount,
      hasPlanting,
      hasBinoculars,
      hasMajlisHospitality: hasMajlis,
      totalBhd: totalPrice,
      createdAt: new Date().toLocaleDateString(isAr ? 'ar-BH' : 'en-GB'),
    };
    setGeneratedPass(pass);
  };

  // Handle survey submission
  const handleSurveySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSurveyStats((prev) => ({
      ...prev,
      totalVotes: prev.totalVotes + 1,
      stationVotes: {
        ...prev.stationVotes,
        [surveyStation as keyof typeof prev.stationVotes]:
          (prev.stationVotes[surveyStation as keyof typeof prev.stationVotes] || 0) + 1,
      },
    }));
    setSurveySubmitted(true);
  };

  const getExperienceTitle = (key: string) => {
    switch (key) {
      case 'trail':
        return isAr ? 'جولة المسار الخشبي والاستكشاف' : 'Boardwalk Trail & Exploration';
      case 'birds':
        return isAr ? 'رصد الطيور والحياة الفطرية' : 'Birdwatching & Nature Hide';
      case 'education':
        return isAr ? 'زيارة تعليمية وأكاديمية' : 'Educational & Study Tour';
      case 'majlis':
        return isAr ? 'أمسية المجلس والضيافة الأصيلة' : 'Majlis Sunset Hospitality';
      default:
        return key;
    }
  };

  return (
    <section id="visit" className="py-20 sm:py-28 bg-[#F2ECE1] text-[#2C3224]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E3D8C6] text-[#515638] text-xs font-bold tracking-wider uppercase mb-3">
            <Ticket className="w-3.5 h-3.5 text-[#515638]" />
            <span>{isAr ? 'التخطيط التفاعلي والاستبيان' : 'Interactive Itinerary & Survey'}</span>
          </div>

          <h2 className="font-serif-ar text-3xl sm:text-5xl font-bold text-[#2C3224] leading-tight mb-4">
            {isAr ? (
              <>
                تخيّل <span className="text-[#8D7255] italic">زيارتك لبَراح.</span>
              </>
            ) : (
              <>
                Envision Your <span className="text-[#8D7255] italic">BARAH Journey.</span>
              </>
            )}
          </h2>

          <p className="text-base sm:text-lg text-[#57604F] font-light leading-relaxed">
            {isAr
              ? 'اختر نوع التجربة المناسبة، وخصص تفاصيل مسارك بين المحطات، واستخرج تصريح الزيارة الرقمي الرسمي، ثم شاركنا رأيك في استبيان تجربة الزوار.'
              : 'Choose your desired experience, customize your trail itinerary, generate a personalized official digital pass, and share your feedback.'}
          </p>
        </div>

        {/* 2-Column Grid: Planner on Left, Boarding Pass on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          {/* Interactive Planner Form */}
          <div className="lg:col-span-6 bg-[#FFFCF7] p-6 sm:p-8 rounded-3xl border border-[#D8CEBD] shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#D8CEBD]">
                <div className="flex items-center gap-2">
                  <Compass className="w-5 h-5 text-[#515638]" />
                  <h3 className="font-serif-ar text-xl font-bold text-[#2C3224]">
                    {isAr ? 'مخطط الزيارة والمسار' : 'Itinerary Builder'}
                  </h3>
                </div>
                <span className="text-xs font-mono font-bold text-[#8D7255] bg-[#E3D8C6]/60 px-2.5 py-1 rounded-full">
                  BARAH / PLANNER
                </span>
              </div>

              <form onSubmit={handleGeneratePlan} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#2C3224] mb-1">
                    {isAr ? 'اسم الزائر أو المجموعة' : 'Visitor or Group Name'}
                  </label>
                  <input
                    type="text"
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    placeholder={isAr ? 'مثال: عائلة أحمد / د. فاطمة' : 'e.g. Ahmed Family'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CEBD] bg-white text-sm focus:outline-none focus:border-[#515638]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2C3224] mb-1">
                    {isAr ? 'نوع التجربة المفضلة' : 'Preferred Experience'}
                  </label>
                  <select
                    value={experienceType}
                    onChange={(e) => setExperienceType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CEBD] bg-white text-sm focus:outline-none focus:border-[#515638]"
                  >
                    <option value="trail">
                      {isAr ? 'جولة المسار الخشبي والاستكشاف الطبيعي' : 'Boardwalk Trail & Scenic Exploration'}
                    </option>
                    <option value="birds">
                      {isAr ? 'رصد الطيور والحياة الفطرية في المرصد' : 'Wildlife & Birdwatching Hide Tour'}
                    </option>
                    <option value="education">
                      {isAr ? 'زيارة تعليمية ميدانية وبحثية' : 'Academic & Ecological Study Visit'}
                    </option>
                    <option value="majlis">
                      {isAr ? 'أمسية المجلس والضيافة والتأمل' : 'Majlis Sunset Hospitality Gathering'}
                    </option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#2C3224] mb-1">
                      {isAr ? 'التاريخ المفضل' : 'Preferred Date'}
                    </label>
                    <input
                      type="date"
                      required
                      value={visitDate}
                      onChange={(e) => setVisitDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CEBD] bg-white text-sm focus:outline-none focus:border-[#515638]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2C3224] mb-1">
                      {isAr ? 'الوقت المقترح' : 'Time Slot'}
                    </label>
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CEBD] bg-white text-sm focus:outline-none focus:border-[#515638]"
                    >
                      <option value="06:30">06:30 AM — {isAr ? 'شروق الشمس ورصد الطيور' : 'Dawn Birding'}</option>
                      <option value="09:00">09:00 AM — {isAr ? 'فترة الصباح' : 'Morning Trail'}</option>
                      <option value="15:30">03:30 PM — {isAr ? 'الساعة الذهبية والغروب' : 'Golden Sunset'}</option>
                      <option value="18:30">06:30 PM — {isAr ? 'ليالي بَراح والنجوم' : 'Starlit Evening'}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2C3224] mb-1">
                    {isAr ? 'عدد الزوار' : 'Number of Guests'}
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 4, 6, 8].map((num) => (
                      <button
                        type="button"
                        key={num}
                        onClick={() => setGuestCount(num)}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                          guestCount === num
                            ? 'bg-[#515638] text-white border-[#515638]'
                            : 'bg-white text-[#2C3224] border-[#D8CEBD] hover:border-[#515638]'
                        }`}
                      >
                        {num} {isAr ? 'زائر' : ''}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Eco Add-ons */}
                <div className="pt-2 space-y-2">
                  <div className="text-xs font-bold text-[#2C3224]">
                    {isAr ? 'إضافات بيئية وتراثية مقترحة:' : 'Recommended Eco Add-ons:'}
                  </div>

                  <label className="flex items-center justify-between p-3 rounded-xl border border-[#D8CEBD] bg-white cursor-pointer hover:border-[#515638] transition-colors">
                    <div className="flex items-center gap-2 text-xs">
                      <input
                        type="checkbox"
                        checked={hasPlanting}
                        onChange={(e) => setHasPlanting(e.target.checked)}
                        className="rounded text-[#515638] focus:ring-[#515638]"
                      />
                      <div>
                        <span className="font-bold text-[#2C3224]">
                          {isAr ? 'غرس شتلة في مبادرة «أثرك في بَراح»' : 'Plant a Native Desert Shrub'}
                        </span>
                        <span className="block text-[11px] text-[#57604F]">
                          {isAr ? 'مساهمة رمزية في إعادة الغطاء النباتي' : 'Symbolic biodiversity donation'}
                        </span>
                      </div>
                    </div>
                    <span className="font-bold text-xs text-[#515638]">+0.500 د.ب</span>
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl border border-[#D8CEBD] bg-white cursor-pointer hover:border-[#515638] transition-colors">
                    <div className="flex items-center gap-2 text-xs">
                      <input
                        type="checkbox"
                        checked={hasBinoculars}
                        onChange={(e) => setHasBinoculars(e.target.checked)}
                        className="rounded text-[#515638] focus:ring-[#515638]"
                      />
                      <div>
                        <span className="font-bold text-[#2C3224]">
                          {isAr ? 'استعارة منظار / دربيل رصد بصري عالي الدقة' : 'High-magnification Spotting Optics'}
                        </span>
                        <span className="block text-[11px] text-[#57604F]">
                          {isAr ? 'مشاهدة مقربة للطيور المائية' : 'For wetland bird viewing'}
                        </span>
                      </div>
                    </div>
                    <span className="font-bold text-xs text-[#515638]">+1.000 د.ب</span>
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl border border-[#D8CEBD] bg-white cursor-pointer hover:border-[#515638] transition-colors">
                    <div className="flex items-center gap-2 text-xs">
                      <input
                        type="checkbox"
                        checked={hasMajlis}
                        onChange={(e) => setHasMajlis(e.target.checked)}
                        className="rounded text-[#515638] focus:ring-[#515638]"
                      />
                      <div>
                        <span className="font-bold text-[#2C3224]">
                          {isAr ? 'ضيافة مجلس بَراح (قهوة بحرينية وتمور فاخرة)' : 'Majlis Hospitality & Gahwa Tasting'}
                        </span>
                        <span className="block text-[11px] text-[#57604F]">
                          {isAr ? 'جلسة ختامية أصيلة ومشروبات دافئة' : 'Traditional Gahwa, tea & dates'}
                        </span>
                      </div>
                    </div>
                    <span className="font-bold text-xs text-[#515638]">+1.500 د.ب</span>
                  </label>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-[#D8CEBD]">
                  <div>
                    <span className="text-[11px] text-[#57604F] block">
                      {isAr ? 'التقدير المالي الإجمالي (افتراضي)' : 'Total Concept Estimate'}
                    </span>
                    <span className="font-serif-ar text-xl font-bold text-[#515638]">
                      {totalPrice.toFixed(3)} {isAr ? 'د.ب' : 'BHD'}
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="py-3 px-6 rounded-xl bg-[#515638] hover:bg-[#3C4229] text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-2"
                  >
                    <Ticket className="w-4 h-4 text-[#CCB798]" />
                    <span>{isAr ? 'استخراج تصريح الزيارة' : 'Generate Digital Pass'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Generated Digital Boarding Pass */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {generatedPass ? (
              <div className="bg-[#FFFCF7] border-2 border-[#515638] rounded-3xl overflow-hidden shadow-2xl relative animate-scaleUp">
                {/* Header ribbon of pass */}
                <div className="bg-[#515638] text-white p-5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src="/assets/barah-logo-official-cream.webp"
                      alt="BARAH Logo"
                      className="h-9 w-auto"
                    />
                    <div>
                      <div className="font-serif-ar font-bold text-lg leading-tight">
                        تصريح زيارة بَراح الافتراضي
                      </div>
                      <div className="text-[10px] text-[#CCB798] tracking-widest uppercase">
                        BARAH OFFICIAL VISITOR PASS
                      </div>
                    </div>
                  </div>

                  <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-white/20 text-[#E0D3BE]">
                    {generatedPass.passNumber}
                  </span>
                </div>

                {/* Pass Body */}
                <div className="p-6 sm:p-7 space-y-4">
                  <div className="flex items-start justify-between pb-4 border-b border-[#D8CEBD]/80">
                    <div>
                      <div className="text-[11px] text-[#8D7255] font-semibold">
                        {isAr ? 'اسم الزائر' : 'Guest Name'}
                      </div>
                      <div className="font-bold text-lg text-[#2C3224]">
                        {generatedPass.visitorName}
                      </div>
                    </div>
                    <div className="text-end">
                      <div className="text-[11px] text-[#8D7255] font-semibold">
                        {isAr ? 'نوع التجربة' : 'Experience'}
                      </div>
                      <div className="font-bold text-sm text-[#515638]">
                        {getExperienceTitle(generatedPass.experienceType)}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 pb-4 border-b border-[#D8CEBD]/80 text-xs">
                    <div>
                      <span className="text-[#626B5E] block">{isAr ? 'التاريخ' : 'Date'}</span>
                      <strong className="text-[#2C3224]">{generatedPass.date}</strong>
                    </div>
                    <div>
                      <span className="text-[#626B5E] block">{isAr ? 'الوقت' : 'Time'}</span>
                      <strong className="text-[#2C3224]">{generatedPass.timeSlot}</strong>
                    </div>
                    <div>
                      <span className="text-[#626B5E] block">{isAr ? 'العدد' : 'Guests'}</span>
                      <strong className="text-[#2C3224]">{generatedPass.guestsCount} {isAr ? 'أفراد' : 'Guests'}</strong>
                    </div>
                  </div>

                  {/* Included Stations itinerary check */}
                  <div className="p-3.5 rounded-2xl bg-[#F8F5EF] border border-[#D8CEBD]/60 space-y-1.5 text-xs">
                    <div className="font-bold text-[#515638] mb-1">
                      {isAr ? 'المحطات المشمولة في مسار الزيارة:' : 'Stations Included in Route:'}
                    </div>
                    <div className="flex items-center gap-2 text-[#4A533E]">
                      <Check className="w-3.5 h-3.5 text-[#515638]" />
                      <span>{isAr ? 'محطة ٠١: مركز بَراح والاستقبال' : 'Station 01: Arrival Centre & Boutique'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#4A533E]">
                      <Check className="w-3.5 h-3.5 text-[#515638]" />
                      <span>{isAr ? 'محطة ٠٢: ممشى درب بَراح فوق الصخور الرسوبية' : 'Station 02: Raised Timber Trail Boardwalk'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#4A533E]">
                      <Check className="w-3.5 h-3.5 text-[#515638]" />
                      <span>{isAr ? 'محطة ٠٣: مرصد الطيور ومراقبة الفلامنغو' : 'Station 03: Quiet Birdwatching Hide'}</span>
                    </div>
                    {generatedPass.hasMajlisHospitality && (
                      <div className="flex items-center gap-2 text-[#4A533E]">
                        <Check className="w-3.5 h-3.5 text-[#515638]" />
                        <span>{isAr ? 'محطة ٠٤: مجلس بَراح والقهوة البحرينية' : 'Station 04: The Majlis & Bahraini Hospitality'}</span>
                      </div>
                    )}
                  </div>

                  {/* Google Maps Location & Coordinates */}
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#D8CEBD] text-xs">
                    <div className="flex items-center gap-1.5 text-[#515638] font-bold">
                      <MapPin className="w-3.5 h-3.5 text-[#8D7255]" />
                      <span>{isAr ? 'موقع الوجهة على الخريطة' : 'Destination Pin'}</span>
                    </div>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=26%C2%B008%2731.2%22N+50%C2%B033%2746.8%22E"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[11px] font-bold text-[#8D7255] hover:text-[#515638] inline-flex items-center gap-1 dir-ltr hover:underline"
                      title={isAr ? 'فتح في خرائط Google' : 'Open in Google Maps'}
                    >
                      <span>26°08'31.2"N 50°33'46.8"E</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  {/* QR code and Barcode Area */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#D8CEBD]/80">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-white border border-[#D8CEBD] shadow-xs">
                        <QrCode className="w-10 h-10 text-[#515638]" />
                      </div>
                      <div className="text-[11px] text-[#626B5E] max-w-[200px]">
                        {isAr
                          ? 'امسح الرمز ضوئياً للتحقق من خط سير الزيارة وتأكيد الدخول.'
                          : 'Scan QR code to verify itinerary and admission.'}
                      </div>
                    </div>

                    <div className="text-end">
                      <div className="text-[10px] text-[#8D7255]">
                        {isAr ? 'الإجمالي التقديري' : 'Estimated Total'}
                      </div>
                      <div className="font-serif-ar text-xl font-bold text-[#515638]">
                        {generatedPass.totalBhd.toFixed(3)} {isAr ? 'د.ب' : 'BHD'}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex gap-2">
                    <button
                      onClick={() => window.print()}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-[#515638] text-white hover:bg-[#3C4229] font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
                    >
                      <Printer className="w-4 h-4" />
                      <span>{isAr ? 'طباعة / حفظ التصريح' : 'Print / Save Pass'}</span>
                    </button>
                    <button
                      onClick={() => setGeneratedPass(null)}
                      className="px-4 py-2.5 rounded-xl border border-[#D8CEBD] text-[#626B5E] hover:bg-stone-100 text-xs font-semibold"
                    >
                      {isAr ? 'تعديل الخطة' : 'Edit Plan'}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[380px] rounded-3xl border-2 border-dashed border-[#CCB798] bg-[#FFFCF7]/70 p-8 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#E3D8C6]/60 text-[#515638] flex items-center justify-center mb-4">
                  <Ticket className="w-8 h-8" />
                </div>
                <h4 className="font-serif-ar text-xl font-bold text-[#2C3224] mb-2">
                  {isAr ? 'معاينة تصريح الزيارة الرقمي' : 'Digital Pass Preview'}
                </h4>
                <p className="text-xs text-[#57604F] max-w-sm leading-relaxed mb-6">
                  {isAr
                    ? 'قم بتعبئة بيانات الزيارة واختيار تفاصيل المسار لاستخراج تصريح زيارة بَراح الرسمي مع رمز الاستجابة السريعة QR.'
                    : 'Fill in your preferences on the left to generate an official digital boarding pass complete with QR badge.'}
                </p>
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#8D7255] bg-white px-3 py-1.5 rounded-full border border-[#D8CEBD]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isAr ? 'تصريح رسمي فوري' : 'Instant Official Pass'}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section 2: Visitor Research & Graduation Survey with Live Visual Analytics */}
        <div id="survey" className="pt-12 border-t border-[#D8CEBD]">
          <div className="max-w-4xl mx-auto bg-[#FFFCF7] rounded-3xl border border-[#D8CEBD] p-6 sm:p-10 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#D8CEBD]">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8D7255] uppercase tracking-wider mb-1">
                  <BarChart3 className="w-4 h-4" />
                  <span>{isAr ? 'استبيان تجربة الزوار' : 'BARAH Visitor Experience Survey'}</span>
                </div>
                <h3 className="font-serif-ar text-2xl sm:text-3xl font-bold text-[#2C3224]">
                  {isAr ? 'صوتك جزء من حكايتنا' : 'Your Voice Shapes the Journey'}
                </h3>
              </div>

              <a
                href="https://tally.so/r/vXrvYA"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#D8CEBD] bg-white hover:bg-[#E3D8C6]/50 text-xs font-bold text-[#515638] transition-all"
              >
                <span>{isAr ? 'الاستبيان الخارجي (Tally)' : 'Open Tally Form'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {surveySubmitted ? (
              <div className="p-8 rounded-2xl bg-[#515638] text-white text-center space-y-4">
                <Check className="w-12 h-12 mx-auto text-[#CCB798] p-2 rounded-full bg-white/10" />
                <h4 className="font-serif-ar text-2xl font-bold">
                  {isAr ? 'شكراً جزيلاً لمشاركتك القيّمة!' : 'Thank You for Your Valuable Feedback!'}
                </h4>
                <p className="text-sm text-white/90 max-w-md mx-auto leading-relaxed">
                  {isAr
                    ? 'تم تسجيل صوتك بنجاح للمساهمة في تطوير وتحسين تجربة الزوار في وادي البحير.'
                    : 'Your response has been registered to help enhance our visitor experience.'}
                </p>

                {/* Live Real-time Chart Display */}
                <div className="mt-6 p-6 rounded-2xl bg-white/10 backdrop-blur-md text-start space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-[#E0D3BE]">
                      {isAr ? 'معدل الرضا والتأييد العام للفكرة:' : 'Community Support Rate:'}
                    </span>
                    <span className="font-bold text-white text-sm">97%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/20 overflow-hidden">
                    <div className="h-full bg-[#CCB798] rounded-full w-[97%]" />
                  </div>

                  <div className="flex justify-between items-center text-xs pt-2">
                    <span className="font-bold text-[#E0D3BE]">
                      {isAr ? 'إجمالي الأصوات المسجلة:' : 'Total Votes Recorded:'}
                    </span>
                    <span className="font-bold text-white text-sm">{surveyStats.totalVotes}</span>
                  </div>
                </div>

                <button
                  onClick={() => setSurveySubmitted(false)}
                  className="mt-4 px-5 py-2 rounded-xl bg-[#CCB798] text-[#2C3224] text-xs font-bold hover:bg-[#E0D3BE] transition-colors"
                >
                  {isAr ? 'إرسال رد آخر' : 'Submit Another Response'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSurveySubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-[#2C3224] mb-2">
                    {isAr
                      ? '١. ما هو تقييمك العام لفكرة تحويل وادي البحير لوجهة سياحة بيئية مستدامة؟'
                      : '1. What is your overall rating for the Wadi Al Buhair eco-tourism concept?'}
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setSurveyRating(star)}
                        className="p-2 transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            star <= surveyRating
                              ? 'text-amber-500 fill-amber-500'
                              : 'text-stone-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-[#515638] mr-2">
                      ({surveyRating} / 5)
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2C3224] mb-2">
                    {isAr
                      ? '٢. ما هي أكثر محطة نالت إعجابك وتود تجربتها أولاً؟'
                      : '2. Which of the four stations appeals to you most?'}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { key: 'centre', labelAr: 'مركز بَراح', labelEn: 'Gateway Centre' },
                      { key: 'trail', labelAr: 'درب بَراح الخشبي', labelEn: 'Boardwalk Trail' },
                      { key: 'observatory', labelAr: 'مرصد الطيور', labelEn: 'Bird Observatory' },
                      { key: 'majlis', labelAr: 'مجلس الضيافة', labelEn: 'The Majlis' },
                    ].map((st) => (
                      <button
                        type="button"
                        key={st.key}
                        onClick={() => setSurveyStation(st.key)}
                        className={`p-3 rounded-xl border text-xs font-bold transition-all text-center ${
                          surveyStation === st.key
                            ? 'bg-[#515638] text-white border-[#515638]'
                            : 'bg-white text-[#2C3224] border-[#D8CEBD] hover:border-[#515638]'
                        }`}
                      >
                        {isAr ? st.labelAr : st.labelEn}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2C3224] mb-2">
                    {isAr
                      ? '٣. هل تؤيد الحفاظ على النباتات والطيور المحلية عبر سياحة منخفضة الأثر؟'
                      : '3. Do you support native habitat conservation through low-impact eco-tourism?'}
                  </label>
                  <div className="flex gap-3">
                    {[
                      { key: 'yes', labelAr: 'نعم، أؤيد بشدة', labelEn: 'Strongly Support' },
                      { key: 'maybe', labelAr: 'موافق باشتراطات', labelEn: 'Support with Terms' },
                      { key: 'no', labelAr: 'محايد', labelEn: 'Neutral' },
                    ].map((opt) => (
                      <button
                        type="button"
                        key={opt.key}
                        onClick={() => setSurveySupport(opt.key as any)}
                        className={`flex-1 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                          surveySupport === opt.key
                            ? 'bg-[#515638] text-white border-[#515638]'
                            : 'bg-white text-[#2C3224] border-[#D8CEBD] hover:border-[#515638]'
                        }`}
                      >
                        {isAr ? opt.labelAr : opt.labelEn}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2C3224] mb-1">
                    {isAr
                      ? '٤. ملاحظاتك أو مقترحاتك لتطوير تجربة الزيارة (اختياري)'
                      : '4. Your remarks or suggestions to enhance the visit (Optional)'}
                  </label>
                  <textarea
                    rows={3}
                    value={surveyFeedback}
                    onChange={(e) => setSurveyFeedback(e.target.value)}
                    placeholder={
                      isAr
                        ? 'اكتب مقترحك لتطوير المشروع أو انطباعك عن التصميم...'
                        : 'Share your remarks on the design, feasibility or suggestions...'
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CEBD] bg-white text-sm focus:outline-none focus:border-[#515638]"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-[#626B5E]">
                    {isAr ? 'مشاركة اختيارية ومجهولة تدعم البحث العلمي' : 'Anonymous academic research input'}
                  </span>
                  <button
                    type="submit"
                    className="py-3 px-6 rounded-xl bg-[#515638] hover:bg-[#3C4229] text-white font-bold text-xs shadow-md transition-all active:scale-95"
                  >
                    {isAr ? 'إرسال المشاركة والاستبيان' : 'Submit Research Survey'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* ========================================================= */}
        {/* FREQUENTLY ASKED QUESTIONS (الأسئلة الشائعة من موقع Wix)   */}
        {/* ========================================================= */}
        <div id="faq" className="scroll-mt-24 pt-8">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E3D8C6] text-[#515638] text-xs font-bold tracking-wider uppercase mb-3">
              <HelpCircle className="w-3.5 h-3.5 text-[#515638]" />
              <span>{isAr ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}</span>
            </div>

            <h3 className="font-serif-ar text-2xl sm:text-4xl font-bold text-[#2C3224] leading-tight mb-3">
              {isAr ? (
                <>
                  قبل أن <span className="text-[#8D7255] italic">تبدأ الحكاية.</span>
                </>
              ) : (
                <>
                  Before Your <span className="text-[#8D7255] italic">Story Begins.</span>
                </>
              )}
            </h3>

            <p className="text-xs sm:text-sm text-[#57604F] leading-relaxed max-w-xl">
              {isAr
                ? 'إجابات واضحة وموثقة عن طبيعة مشروع بَراح، وحالة الموقع، ومواعيد الافتتاح، وإمكانية الحجز والشراء.'
                : 'Clear, transparent answers about the nature of the BARAH project, site status, bookings, and keepsakes.'}
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3.5">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIds.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl border border-[#D8CEBD] bg-[#FFFCF7] overflow-hidden transition-all shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-start gap-4 hover:bg-[#F8F5EF] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-[#E3D8C6] text-[#515638] text-xs font-mono font-bold flex items-center justify-center shrink-0">
                        0{idx + 1}
                      </span>
                      <span className="font-bold text-sm sm:text-base text-[#2C3224]">
                        {isAr ? faq.questionAr : faq.questionEn}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-[#515638] shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#57604F] leading-relaxed border-t border-[#D8CEBD]/40 animate-fadeIn bg-[#FAF7F0]/40">
                      <p className="ps-9">
                        {isAr ? faq.answerAr : faq.answerEn}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
