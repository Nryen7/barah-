import React, { useState, useMemo } from 'react';
import { Calendar, Sparkles, Clock, Check, ArrowRight, ArrowLeft, Send, Info, Filter, X, Tag } from 'lucide-react';
import { Language, EventItem } from '../types/barah';
import { EVENTS } from '../data/barahData';

interface EventsSectionProps {
  lang: Language;
  onOpenPlan: () => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({ lang, onOpenPlan }) => {
  const isAr = lang === 'ar';
  const [selectedKind, setSelectedKind] = useState<string>('all');
  const [selectedEventForModal, setSelectedEventForModal] = useState<EventItem | null>(null);
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const filters = useMemo(() => [
    { key: 'all', labelAr: 'جميع الفعاليات (١٠)', labelEn: 'All Events (10)' },
    { key: 'recurring', labelAr: 'تجارب وأنشطة دورية (٦)', labelEn: 'Experiences & Activities (6)' },
    { key: 'winter', labelAr: 'فعاليات الشتاء (١)', labelEn: 'Winter Events (1)' },
    { key: 'annual', labelAr: 'مناسبات بيئية وسنوية (٢)', labelEn: 'International Observances (2)' },
  ], []);

  const filteredEvents = useMemo(() => {
    if (selectedKind === 'all') return EVENTS;
    return EVENTS.filter((e) => (e.kind || 'recurring') === selectedKind);
  }, [selectedKind]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) return;

    setSuccessToast(
      isAr
        ? `شكراً ${nameInput}! تم تسجيل اهتمامك التوضيحي بفعالية «${selectedEventForModal?.titleAr}». نقدّر دعمك لمشروع بَراح.`
        : `Thank you ${nameInput}! Your conceptual interest in "${selectedEventForModal?.titleEn}" has been recorded.`
    );
    setSelectedEventForModal(null);
    setNameInput('');
    setEmailInput('');

    setTimeout(() => {
      setSuccessToast(null);
    }, 6000);
  };

  return (
    <section id="events" className="py-20 sm:py-28 bg-[#F8F5EF] text-[#2C3224]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E3D8C6] text-[#515638] text-xs font-bold tracking-wider uppercase mb-3">
            <Calendar className="w-3.5 h-3.5 text-[#515638]" />
            <span>{isAr ? 'برامج ومناسبات بَراح المقترحة' : 'Proposed BARAH Events & Programmes'}</span>
          </div>

          <h2 className="font-serif-ar text-3xl sm:text-5xl font-bold text-[#2C3224] leading-tight mb-4">
            {isAr ? (
              <>
                تجارب تترك <span className="text-[#8D7255] italic">أثراً.</span>
              </>
            ) : (
              <>
                Experiences That <span className="text-[#8D7255] italic">Leave a Trace.</span>
              </>
            )}
          </h2>

          <p className="text-base sm:text-lg text-[#57604F] font-light leading-relaxed mb-4">
            {isAr
              ? 'برنامج سنوي مقترح يربط الزوار بنبض الطبيعة في وادي البحير، يجمع بين المبادرات البيئية المستدامة كغرس الشتلات، وأمسيات الشتاء الهادئة، وورش رصد الطيور والتصوير الميداني.'
              : 'A proposed seasonal programme connecting visitors with the pulse of nature in Wadi Al Buhair, ranging from native planting and winter firesides to early birdwatching and eco-photography.'}
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#E3D8C6]/50 border border-[#D8CEBD] text-xs text-[#57604F]">
            <Info className="w-4 h-4 text-[#8D7255]" />
            <span>
              {isAr
                ? 'تنويه: جميع الفعاليات والمواعيد المعروضة هي تصورات ومقترحات تصميمية ضمن دراسة المشروع وليست مواعيد تشغيلية معتمدة.'
                : 'Note: All events and timings are proposed conceptual programmes for the project study and not confirmed operational schedules.'}
            </span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 mb-12 overflow-x-auto pb-2 no-scrollbar">
          {filters.map((f) => {
            const isSelected = selectedKind === f.key;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setSelectedKind(f.key)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#515638] text-white shadow-sm'
                    : 'bg-white border border-[#D8CEBD] text-[#4A533E] hover:border-[#515638] hover:bg-[#F8F5EF]'
                }`}
              >
                {isAr ? f.labelAr : f.labelEn}
              </button>
            );
          })}
        </div>

        {/* Success Alert Toast */}
        {successToast && (
          <div className="mb-8 p-4 rounded-2xl bg-[#515638] text-white flex items-center justify-between shadow-xl animate-fadeIn">
            <div className="flex items-center gap-3 text-sm font-semibold">
              <Check className="w-5 h-5 text-[#CCB798]" />
              <span>{successToast}</span>
            </div>
            <button
              onClick={() => setSuccessToast(null)}
              className="text-white/80 hover:text-white text-xs underline"
            >
              {isAr ? 'إغلاق' : 'Dismiss'}
            </button>
          </div>
        )}

        {/* Flagship Events (Top Row when in 'all' view) */}
        {selectedKind === 'all' && (
          <div className="mb-14">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-4 h-4 text-[#8D7255]" />
              <h3 className="font-serif-ar text-xl font-bold text-[#2C3224]">
                {isAr ? 'التجارب الرئيسية البارزة' : 'Flagship Experiences'}
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {EVENTS.filter((e) => e.isFlagship).map((event) => (
                <div
                  key={event.id}
                  className="rounded-3xl bg-[#FFFCF7] border border-[#D8CEBD] overflow-hidden shadow-lg hover:shadow-xl transition-all flex flex-col justify-between group"
                >
                  <div className="relative h-64 sm:h-72 overflow-hidden bg-[#3C4229]">
                    <img
                      src={event.image}
                      alt={isAr ? event.titleAr : event.titleEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <div className="absolute top-4 right-4 flex gap-2">
                      <span className="px-3 py-1 rounded-full bg-[#CCB798] text-[#2C3224] text-xs font-bold shadow-sm">
                        {isAr ? (event.tagAr || 'مبادرة رئيسية') : (event.tagEn || 'Flagship Experience')}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="flex items-center gap-1.5 text-xs text-[#E0D3BE] font-semibold mb-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{isAr ? event.timingAr : event.timingEn}</span>
                      </div>
                      <h3 className="font-serif-ar text-2xl font-bold leading-snug">
                        {isAr ? event.titleAr : event.titleEn}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-sm text-[#57604F] leading-relaxed mb-4">
                        {isAr ? event.descAr : event.descEn}
                      </p>
                      <div className="p-3.5 rounded-xl bg-[#F8F5EF] border border-[#D8CEBD]/60 text-xs text-[#626B5E] mb-6">
                        <strong className="text-[#515638]">{isAr ? 'الاعتبارات البيئية:' : 'Environmental Details:'}</strong>{' '}
                        {isAr ? event.detailAr : event.detailEn}
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#D8CEBD]/60">
                      <button
                        onClick={() => setSelectedEventForModal(event)}
                        className="flex-1 py-2.5 px-4 rounded-xl bg-[#515638] hover:bg-[#3C4229] text-white font-bold text-xs text-center shadow-md transition-all active:scale-95"
                      >
                        {isAr ? 'سجّل اهتمامك (عرض تجريبي)' : 'Register Interest (Demo)'}
                      </button>
                      <button
                        onClick={onOpenPlan}
                        className="py-2.5 px-4 rounded-xl border border-[#D8CEBD] text-[#515638] hover:bg-[#E3D8C6]/50 text-xs font-semibold transition-colors"
                      >
                        {isAr ? 'تضمين في الزيارة' : 'Add to Plan'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All / Filtered Events Grid */}
        <div>
          {selectedKind === 'all' && (
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="w-4 h-4 text-[#8D7255]" />
              <h3 className="font-serif-ar text-xl font-bold text-[#2C3224]">
                {isAr ? 'المزيد من التجارب والمناسبات' : 'More Experiences & Observances'}
              </h3>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(selectedKind === 'all' ? EVENTS.filter((e) => !e.isFlagship) : filteredEvents).map((event) => (
              <div
                key={event.id}
                className="p-5 rounded-2xl bg-[#FFFCF7] border border-[#D8CEBD] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="h-44 rounded-xl overflow-hidden mb-4 bg-stone-200 relative">
                    <img
                      src={event.image}
                      alt={isAr ? event.titleAr : event.titleEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 right-2.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium">
                        {isAr ? (event.tagAr || 'فعالية') : (event.tagEn || 'Event')}
                      </span>
                    </div>
                  </div>

                  <div className="text-[11px] font-semibold text-[#8D7255] flex items-center gap-1 mb-1.5">
                    <Clock className="w-3 h-3" />
                    <span>{isAr ? event.timingAr : event.timingEn}</span>
                  </div>

                  <h4 className="font-bold text-[#2C3224] text-base mb-2">
                    {isAr ? event.titleAr : event.titleEn}
                  </h4>

                  <p className="text-xs text-[#57604F] leading-relaxed mb-4">
                    {isAr ? event.descAr : event.descEn}
                  </p>

                  <div className="text-[11px] text-[#626B5E] p-2.5 rounded-lg bg-[#F8F5EF] mb-4">
                    {isAr ? event.detailAr : event.detailEn}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedEventForModal(event)}
                  className="w-full py-2 px-3 rounded-lg bg-[#E3D8C6]/60 hover:bg-[#515638] text-[#515638] hover:text-white font-bold text-xs text-center transition-all"
                >
                  {isAr ? 'معرفة المزيد وتسجيل الاهتمام' : 'Learn More & Register'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Registration Demonstration Modal */}
      {selectedEventForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FFFCF7] border border-[#D8CEBD] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono font-bold text-[#8D7255] uppercase tracking-wider">
                BARAH / CONCEPT DEMO
              </span>
              <button
                type="button"
                onClick={() => setSelectedEventForModal(null)}
                className="p-1 rounded-lg hover:bg-stone-200 text-stone-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h3 className="font-serif-ar text-2xl font-bold text-[#515638] mb-1">
              {isAr ? 'تسجيل الاهتمام بالفعالية' : 'Event Interest Registration'}
            </h3>
            <p className="text-xs text-[#8D7255] font-semibold mb-3">
              {isAr ? selectedEventForModal.titleAr : selectedEventForModal.titleEn}
            </p>

            <div className="p-3 rounded-xl bg-[#F8F5EF] border border-[#D8CEBD] text-[11px] text-[#57604F] leading-relaxed mb-4">
              <strong className="block text-[#515638] mb-0.5">
                {isAr ? 'تنويه العرض التجريبي الأكاديمي:' : 'Academic Concept Notice:'}
              </strong>
              {isAr
                ? 'مشروع بَراح وجهة مقترحة قيد دراسة الجدوى. لا يمثل هذا النموذج تسجيلاً فعلياً ملزماً أو حجزاً نهائياً، بل يهدف لجمع اهتمام الزوار وتطوير التجربة.'
                : 'BARAH is a proposed graduation concept. This form records conceptual visitor interest for exhibition demonstration and does not constitute a legal booking.'}
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#2C3224] mb-1">
                  {isAr ? 'الاسم الكريم' : 'Your Name'}
                </label>
                <input
                  type="text"
                  required
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder={isAr ? 'مثال: سارة آل خليفة' : 'e.g. Sarah'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CEBD] bg-white text-sm focus:outline-none focus:border-[#515638]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2C3224] mb-1">
                  {isAr ? 'البريد الإلكتروني أو رقم الهاتف' : 'Email or Phone'}
                </label>
                <input
                  type="text"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder={isAr ? 'example@email.com' : 'example@email.com'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CEBD] bg-white text-sm focus:outline-none focus:border-[#515638]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#515638] hover:bg-[#3C4229] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isAr ? 'تسجيل الاهتمام التوضيحي' : 'Submit Concept Interest'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedEventForModal(null)}
                  className="px-4 py-2.5 rounded-xl border border-[#D8CEBD] text-[#626B5E] hover:bg-stone-100 text-xs font-semibold"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
