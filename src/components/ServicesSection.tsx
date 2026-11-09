import React, { useState } from 'react';
import { Compass, Users, Camera, GraduationCap, Coffee, Handshake, Check, Send } from 'lucide-react';
import { Language } from '../types/barah';
import { SERVICES, COLLABORATION_AREAS } from '../data/barahData';

interface ServicesSectionProps {
  lang: Language;
  onPlanExperience: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  lang,
  onPlanExperience,
}) => {
  const isAr = lang === 'ar';
  const [partnerFormOpen, setPartnerFormOpen] = useState(false);
  const [partnerSubmitted, setPartnerSubmitted] = useState(false);
  const [orgName, setOrgName] = useState('');
  const [contactName, setContactName] = useState('');
  const [partnerType, setPartnerType] = useState('csr');

  const getIcon = (name: string) => {
    switch (name) {
      case 'Compass':
        return Compass;
      case 'Binoculars':
        return Compass;
      case 'Camera':
        return Camera;
      case 'GraduationCap':
        return GraduationCap;
      case 'Coffee':
        return Coffee;
      case 'Users':
        return Users;
      case 'Handshake':
      default:
        return Handshake;
    }
  };

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgName.trim()) return;
    setPartnerSubmitted(true);
    setTimeout(() => {
      setPartnerSubmitted(false);
      setPartnerFormOpen(false);
      setOrgName('');
      setContactName('');
    }, 4000);
  };

  return (
    <section id="services" className="py-20 sm:py-28 bg-[#F2ECE1] text-[#2C3224]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E3D8C6] text-[#515638] text-xs font-bold tracking-wider uppercase mb-3">
            <Compass className="w-3.5 h-3.5 text-[#515638]" />
            <span>{isAr ? 'تجارب وخدمات بَراح' : 'Experiences & Visitor Services'}</span>
          </div>

          <h2 className="font-serif-ar text-3xl sm:text-5xl font-bold text-[#2C3224] leading-tight mb-4">
            {isAr ? (
              <>
                لكل زيارة <span className="text-[#8D7255] italic">تجربتها.</span>
              </>
            ) : (
              <>
                At Your Pace. <span className="text-[#8D7255] italic">Find Your Story.</span>
              </>
            )}
          </h2>

          <p className="text-base sm:text-lg text-[#57604F] font-light leading-relaxed">
            {isAr
              ? 'صُممت تجارب بَراح لتلائم مختلف فئات المجتمع: من الباحثين عن الهدوء والمشي، إلى مصوري الطبيعة، والرحلات التعليمية المدرسية، والمجموعات العائلية.'
              : 'Tailored experiences meeting diverse interests: contemplative walking, nature observation, school study groups, and heritage gatherings.'}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {SERVICES.map((s) => {
            const Icon = getIcon(s.iconName);
            return (
              <div
                key={s.id}
                className="p-6 rounded-3xl bg-[#FFFCF7] border border-[#D8CEBD] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#E3D8C6]/60 group-hover:bg-[#515638] text-[#515638] group-hover:text-white flex items-center justify-center transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xs font-bold text-[#8D7255] px-2 py-0.5 rounded-full bg-[#F8F5EF] border border-[#D8CEBD]/60">
                      {s.num}
                    </span>
                  </div>

                  <h3 className="font-bold text-[#2C3224] text-lg mb-2">
                    {isAr ? s.titleAr : s.titleEn}
                  </h3>

                  <p className="text-xs text-[#57604F] leading-relaxed mb-6">
                    {isAr ? s.descAr : s.descEn}
                  </p>
                </div>

                <button
                  onClick={onPlanExperience}
                  className="w-full py-2.5 px-3 rounded-xl border border-[#D8CEBD] hover:border-[#515638] bg-[#F8F5EF] hover:bg-[#515638] text-[#515638] hover:text-white font-bold text-xs transition-all text-center"
                >
                  {isAr ? 'تضمين في خطة الزيارة' : 'Add to Visit Plan'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Community & Institutional Collaboration Tracks from Wix */}
        <div className="mb-14">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E3D8C6] text-[#515638] text-xs font-bold uppercase mb-2">
              <Handshake className="w-3.5 h-3.5" />
              <span>{isAr ? 'التعاون المجتمعي والشراكات' : 'Community Collaboration'}</span>
            </div>
            <h3 className="font-serif-ar text-2xl sm:text-3xl font-bold text-[#2C3224]">
              {isAr ? 'فرص الشراكة مع بَراح' : 'Collaboration Tracks'}
            </h3>
            <p className="text-xs sm:text-sm text-[#57604F] mt-1">
              {isAr
                ? 'آفاق مقترحة للتنسيق والتكامل مع مختلف القطاعات قبل تنفيذ المشروع'
                : 'Proposed avenues for coordination and integration with various sectors'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {COLLABORATION_AREAS.map((col) => (
              <div
                key={col.id}
                className="p-5 rounded-2xl bg-[#FFFCF7] border border-[#D8CEBD] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <h4 className="font-bold text-[#2C3224] text-sm mb-2">
                    {isAr ? col.titleAr : col.titleEn}
                  </h4>
                  <p className="text-xs text-[#57604F] leading-relaxed">
                    {isAr ? col.descAr : col.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Institutional & Corporate Partnerships Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#515638] text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#62694C] rounded-full blur-3xl pointer-events-none opacity-50" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#CCB798] text-xs font-bold mb-4">
              <Handshake className="w-3.5 h-3.5" />
              <span>{isAr ? 'التعاون المؤسسي والأكاديمي' : 'Institutional Collaboration'}</span>
            </div>

            <h3 className="font-serif-ar text-2xl sm:text-4xl font-bold mb-3">
              {isAr
                ? 'شراكات تصنع فرقاً بيئياً حقيقياً'
                : 'Partnerships that Create Real Environmental Impact'}
            </h3>

            <p className="text-sm text-white/80 leading-relaxed mb-6 font-light max-w-2xl">
              {isAr
                ? 'يفتح مشروع «بَراح» أبواب التعاون للجامعات والمدارس والشركات البحرينية لتبني مبادرات التشجير الفطري، وتنظيم الزيارات الميدانية، ودعم برامج المسؤولية المجتمعية والبحث العلمي.'
                : 'Inviting Bahraini enterprises, academic faculties, and civil societies to sponsor native flora restoration and conduct field studies.'}
            </p>

            <button
              onClick={() => setPartnerFormOpen(true)}
              className="py-3 px-6 rounded-xl bg-[#CCB798] hover:bg-[#E0D3BE] text-[#2C3224] font-bold text-xs shadow-lg transition-all active:scale-95 inline-flex items-center gap-2"
            >
              <Handshake className="w-4 h-4" />
              <span>{isAr ? 'تقديم طلب شراكة أو رعاية' : 'Submit Partnership Proposal'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Partnership Proposal Modal */}
      {partnerFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FFFCF7] border border-[#D8CEBD] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl animate-scaleUp">
            <h3 className="font-serif-ar text-2xl font-bold text-[#515638] mb-1">
              {isAr ? 'طلب شراكة أو رعاية مؤسسية' : 'Partnership Proposal'}
            </h3>
            <p className="text-xs text-[#57604F] mb-4">
              {isAr
                ? 'يسعدنا استقبال مقترحات الشراكة والرعاية لبرامج التشجير والمسؤولية المجتمعية.'
                : 'We welcome partnership and sponsorship proposals for environmental conservation.'}
            </p>

            {partnerSubmitted ? (
              <div className="p-6 rounded-2xl bg-[#515638] text-white text-center space-y-2">
                <Check className="w-8 h-8 mx-auto text-[#CCB798]" />
                <div className="font-bold text-base">
                  {isAr ? 'تم استلام طلب الشراكة بنجاح!' : 'Partnership Request Received!'}
                </div>
                <div className="text-xs text-white/80">
                  {isAr
                    ? `شكراً لمؤسسة ${orgName}، سيتواصل معكم فريق المشروع الأكاديمي.`
                    : `Thank you ${orgName}, the project team will connect with you.`}
                </div>
              </div>
            ) : (
              <form onSubmit={handlePartnerSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#2C3224] mb-1">
                    {isAr ? 'اسم الجهة أو المؤسسة' : 'Organization Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    placeholder={isAr ? 'مثال: شركة نفط البحرين / جامعة البحرين' : 'e.g. University of Bahrain'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CEBD] bg-white text-sm focus:outline-none focus:border-[#515638]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2C3224] mb-1">
                    {isAr ? 'اسم مسؤول التواصل' : 'Contact Person'}
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder={isAr ? 'الاسم والمنصب' : 'Name & Title'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CEBD] bg-white text-sm focus:outline-none focus:border-[#515638]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2C3224] mb-1">
                    {isAr ? 'نوع الشراكة المقترحة' : 'Collaboration Type'}
                  </label>
                  <select
                    value={partnerType}
                    onChange={(e) => setPartnerType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CEBD] bg-white text-sm focus:outline-none focus:border-[#515638]"
                  >
                    <option value="csr">
                      {isAr ? 'رعاية مبادرة تشجير ومسؤولية مجتمعية (CSR)' : 'CSR Native Re-vegetation Sponsorship'}
                    </option>
                    <option value="academic">
                      {isAr ? 'تعاون أكاديمي وبحث بيئي وجيولوجي' : 'Academic & Ecological Research Agreement'}
                    </option>
                    <option value="schools">
                      {isAr ? 'برنامج زيارات ميدانية للطلبة والمدارس' : 'School & Student Field Excursions'}
                    </option>
                    <option value="commercial">
                      {isAr ? 'رعاية منتجات وهدايا مستدامة' : 'Eco-Merchandise Collaboration'}
                    </option>
                  </select>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-[#515638] hover:bg-[#3C4229] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isAr ? 'إرسال المقترح' : 'Submit Proposal'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPartnerFormOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-[#D8CEBD] text-[#626B5E] hover:bg-stone-100 text-xs font-semibold"
                  >
                    {isAr ? 'إغلاق' : 'Close'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
