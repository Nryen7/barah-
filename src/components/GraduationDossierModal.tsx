import React, { useState, useEffect } from 'react';
import { X, GraduationCap, Award, BookOpen, Layers, MapPin, Printer, Check, User, Building, FileText } from 'lucide-react';
import { Language } from '../types/barah';
import { GRADUATION_INFO } from '../data/barahData';

interface GraduationDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const GraduationDossierModal: React.FC<GraduationDossierModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const isAr = lang === 'ar';
  const [activeTab, setActiveTab] = useState<'factsheet' | 'sdgs' | 'site' | 'feasibility'>('factsheet');

  // Student editable info saved in localStorage
  const [studentName, setStudentName] = useState(() => {
    return localStorage.getItem('barah_student_name') || 'اسم الباحث / الطالب (انقر للتعديل)';
  });
  const [universityName, setUniversityName] = useState(() => {
    return localStorage.getItem('barah_uni_name') || 'جامعة البحرين — كلية الهندسة والعمارة والتصميم';
  });
  const [supervisorName, setSupervisorName] = useState(() => {
    return localStorage.getItem('barah_supervisor_name') || 'لجنة التحكيم والمشرف الأكاديمي';
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    localStorage.setItem('barah_student_name', studentName);
  }, [studentName]);

  useEffect(() => {
    localStorage.setItem('barah_uni_name', universityName);
  }, [universityName]);

  useEffect(() => {
    localStorage.setItem('barah_supervisor_name', supervisorName);
  }, [supervisorName]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#FFFCF7] border-2 border-[#515638] rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-scaleUp">
        {/* Header Ribbon */}
        <div className="bg-[#515638] text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#CCB798] text-[#2C3224] flex items-center justify-center shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="font-serif-ar font-bold text-xl sm:text-2xl leading-tight">
                {isAr ? 'ملف التوثيق البيئي والمعماري' : 'Ecological & Architectural Masterplan Dossier'}
              </div>
              <div className="text-xs text-[#E0D3BE] font-semibold tracking-wider">
                BARAH — WADI AL BUHAIR COMPREHENSIVE DOSSIER
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isAr ? 'طباعة الملف' : 'Print'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-[#D8CEBD] bg-[#F8F5EF] overflow-x-auto no-scrollbar text-xs font-bold">
          <button
            onClick={() => setActiveTab('factsheet')}
            className={`py-2.5 px-4 rounded-t-xl transition-all border-b-2 ${
              activeTab === 'factsheet'
                ? 'bg-[#FFFCF7] text-[#515638] border-[#515638]'
                : 'text-[#626B5E] hover:text-[#2C3224] border-transparent'
            }`}
          >
            {isAr ? '١. بطاقة المشروع والأطروحة' : '1. Project Factsheet'}
          </button>
          <button
            onClick={() => setActiveTab('sdgs')}
            className={`py-2.5 px-4 rounded-t-xl transition-all border-b-2 ${
              activeTab === 'sdgs'
                ? 'bg-[#FFFCF7] text-[#515638] border-[#515638]'
                : 'text-[#626B5E] hover:text-[#2C3224] border-transparent'
            }`}
          >
            {isAr ? '٢. أهداف التنمية المستدامة (SDGs)' : '2. UN SDGs Targets'}
          </button>
          <button
            onClick={() => setActiveTab('site')}
            className={`py-2.5 px-4 rounded-t-xl transition-all border-b-2 ${
              activeTab === 'site'
                ? 'bg-[#FFFCF7] text-[#515638] border-[#515638]'
                : 'text-[#626B5E] hover:text-[#2C3224] border-transparent'
            }`}
          >
            {isAr ? '٣. دراسة الموقع البيئي والجيولوجي' : '3. Site Ecological Analysis'}
          </button>
          <button
            onClick={() => setActiveTab('feasibility')}
            className={`py-2.5 px-4 rounded-t-xl transition-all border-b-2 ${
              activeTab === 'feasibility'
                ? 'bg-[#FFFCF7] text-[#515638] border-[#515638]'
                : 'text-[#626B5E] hover:text-[#2C3224] border-transparent'
            }`}
          >
            {isAr ? '٤. الجدوى والأثر المجتمعي' : '4. Community Impact'}
          </button>
        </div>

        {/* Tab Content Area */}
        <div className="p-6 sm:p-8 flex-1 overflow-y-auto space-y-6">
          {activeTab === 'factsheet' && (
            <div className="space-y-6">
              {/* Editable Student Banner */}
              <div className="p-4 rounded-2xl bg-[#E3D8C6]/50 border border-[#D8CEBD] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="text-xs uppercase font-bold text-[#8D7255]">
                    {isAr ? 'بيانات طالب/فريق التخرج والمشرف' : 'Student & Thesis Supervisor Data'}
                  </div>
                  {isEditing ? (
                    <div className="space-y-2 pt-2">
                      <input
                        type="text"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="اسم الطالب"
                        className="w-full px-3 py-1.5 rounded-lg border border-[#D8CEBD] bg-white text-xs font-bold"
                      />
                      <input
                        type="text"
                        value={universityName}
                        onChange={(e) => setUniversityName(e.target.value)}
                        placeholder="الجامعة والكلية"
                        className="w-full px-3 py-1.5 rounded-lg border border-[#D8CEBD] bg-white text-xs"
                      />
                      <input
                        type="text"
                        value={supervisorName}
                        onChange={(e) => setSupervisorName(e.target.value)}
                        placeholder="المشرف الأكاديمي"
                        className="w-full px-3 py-1.5 rounded-lg border border-[#D8CEBD] bg-white text-xs"
                      />
                    </div>
                  ) : (
                    <div>
                      <div className="font-bold text-sm text-[#2C3224] flex items-center gap-1.5">
                        <User className="w-4 h-4 text-[#515638]" />
                        <span>{studentName}</span>
                      </div>
                      <div className="text-xs text-[#57604F] flex items-center gap-1.5 mt-0.5">
                        <Building className="w-3.5 h-3.5 text-[#8D7255]" />
                        <span>{universityName}</span>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-3.5 py-1.5 rounded-xl border border-[#515638] text-[#515638] text-xs font-bold hover:bg-[#515638] hover:text-white transition-all shrink-0"
                >
                  {isEditing ? (isAr ? 'حفظ البيانات ✓' : 'Save ✓') : (isAr ? 'تعديل بياناتك ✏️' : 'Edit Info ✏️')}
                </button>
              </div>

              {/* Project Title & Abstract */}
              <div>
                <h3 className="font-serif-ar text-2xl font-bold text-[#2C3224] mb-2">
                  {isAr ? GRADUATION_INFO.subtitleAr : GRADUATION_INFO.subtitleEn}
                </h3>
                <p className="text-sm text-[#57604F] leading-relaxed">
                  {isAr ? GRADUATION_INFO.abstractAr : GRADUATION_INFO.abstractEn}
                </p>
              </div>

              {/* Core Project Metrics for Defense */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-[#F8F5EF] border border-[#D8CEBD] text-center">
                  <span className="text-[10px] text-[#8D7255] font-bold block">{isAr ? 'الموقع' : 'Location'}</span>
                  <strong className="text-xs text-[#2C3224]">{isAr ? 'وادي البحير، البحرين' : 'Wadi Al Buhair'}</strong>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F8F5EF] border border-[#D8CEBD] text-center">
                  <span className="text-[10px] text-[#8D7255] font-bold block">{isAr ? 'المحطات' : 'Stations'}</span>
                  <strong className="text-xs text-[#2C3224]">{isAr ? '٤ محطات بيئية' : '4 Eco Stations'}</strong>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F8F5EF] border border-[#D8CEBD] text-center">
                  <span className="text-[10px] text-[#8D7255] font-bold block">{isAr ? 'المقتنيات التذكارية' : 'Keepsakes'}</span>
                  <strong className="text-xs text-[#2C3224]">{isAr ? '٢٧ منتجاً مستداماً' : '27 Products'}</strong>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F8F5EF] border border-[#D8CEBD] text-center">
                  <span className="text-[10px] text-[#8D7255] font-bold block">{isAr ? 'السنة الأكاديمية' : 'Academic Year'}</span>
                  <strong className="text-xs text-[#2C3224]">2025 / 2026</strong>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sdgs' && (
            <div className="space-y-4">
              <h4 className="font-serif-ar text-xl font-bold text-[#2C3224]">
                {isAr ? 'التوافق مع أهداف التنمية المستدامة للأمم المتحدة' : 'UN Sustainable Development Goals (SDGs)'}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-[#F8F5EF] border border-[#D8CEBD] space-y-2">
                  <div className="flex items-center gap-2 font-bold text-[#2C3224]">
                    <span className="w-7 h-7 rounded-lg bg-emerald-700 text-white flex items-center justify-center">15</span>
                    <span>الهدف ١٥: الحياة في البر (Life on Land)</span>
                  </div>
                  <p className="text-[#57604F] leading-relaxed">
                    حماية الأراضي الرطبة في وادي البحير ووقف تدهور التربة والغطاء النباتي من خلال مسارات مرتفعة فوق الأرض بنسبة صفر أثر بيئي سلبي.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F8F5EF] border border-[#D8CEBD] space-y-2">
                  <div className="flex items-center gap-2 font-bold text-[#2C3224]">
                    <span className="w-7 h-7 rounded-lg bg-amber-600 text-white flex items-center justify-center">11</span>
                    <span>الهدف ١١: مدن ومجتمعات مستدامة (Sustainable Cities)</span>
                  </div>
                  <p className="text-[#57604F] leading-relaxed">
                    تحويل منطقة مهملة إلى متنفس طبيعي وسياحي وثقافي لسكان المحافظة الجنوبية وعموم البحرين لتعزيز جودة الحياة والتنقل الأخضر.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F8F5EF] border border-[#D8CEBD] space-y-2">
                  <div className="flex items-center gap-2 font-bold text-[#2C3224]">
                    <span className="w-7 h-7 rounded-lg bg-amber-700 text-white flex items-center justify-center">12</span>
                    <span>الهدف ١٢: استهلاك وإنتاج مسؤول (Responsible Consumption)</span>
                  </div>
                  <p className="text-[#57604F] leading-relaxed">
                    سلسلة مقتنيات «ذكرى بَراح» المكونة من ٢٧ منتجاً صديقاً للبيئة تعتمد على الأقمشة العضوية، السيراميك الحرفي، والمواد المعاد تدويرها.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#F8F5EF] border border-[#D8CEBD] space-y-2">
                  <div className="flex items-center gap-2 font-bold text-[#2C3224]">
                    <span className="w-7 h-7 rounded-lg bg-red-700 text-white flex items-center justify-center">04</span>
                    <span>الهدف ٠٤: التعليم البيئي الجيد (Quality Eco-Education)</span>
                  </div>
                  <p className="text-[#57604F] leading-relaxed">
                    استضافة الزيارات المدرسية والجامعية وتزويد الطلاب بأدوات الرصد الميداني وجواز المستكشف لتعزيز الوعي البيئي والجيولوجي.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'site' && (
            <div className="space-y-4">
              <h4 className="font-serif-ar text-xl font-bold text-[#2C3224]">
                {isAr ? 'الدراسة البيئية والجيولوجية لوادي البحير' : 'Site Geology & Wetland Ecology'}
              </h4>
              <p className="text-sm text-[#57604F] leading-relaxed">
                {isAr
                  ? 'يعد وادي البحير أحد أندر المعالم الجيولوجية الطبيعية في مملكة البحرين. يتميز بتكوينات صخرية رسوبية من الحجر الجيري العائد إلى حقبة الدلتا البحرية القديمة، بالإضافة إلى مسطحات مائية طبيعية تتجمع فيها المياه العذبة ومياه الأمطار، مما خلق موئلاً بيئياً خصباً يستقبل الطيور المهاجرة في مسار هجرتها عبر الخليج العربي.'
                  : 'Wadi Al Buhair represents a critical geological treasure in Bahrain, featuring Lower Dammam limestone strata and natural wetland basins serving as an avian corridor for Eurasian and African migratory birds.'}
              </p>

              <div className="p-4 rounded-2xl bg-[#E3D8C6]/40 border border-[#D8CEBD] space-y-2 text-xs">
                <div className="font-bold text-[#515638]">
                  {isAr ? 'الأنواع الحيوية المستهدفة بالحماية في الوادي:' : 'Target Protected Species:'}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[#4A533E]">
                  <div>• طائر الفلامنغو الكبير (Greater Flamingo)</div>
                  <div>• البلبل البحريني أبيض الخد (Bahrain Bulbul)</div>
                  <div>• الوروار الأوروبي (European Bee-eater)</div>
                  <div>• طائر الرفراف / القصير (Kingfisher)</div>
                  <div>• شجيرات السدر والغاف (Native Ziziphus & Prosopis)</div>
                  <div>• نبات الغردق الملحي (Nitraria Retusa)</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'feasibility' && (
            <div className="space-y-4">
              <h4 className="font-serif-ar text-xl font-bold text-[#2C3224]">
                {isAr ? 'الجدوى الاقتصادية ونموذج التشغيل' : 'Economic Feasibility & Operation Model'}
              </h4>
              <p className="text-sm text-[#57604F] leading-relaxed">
                {isAr
                  ? 'يقوم النموذج المالي لمشروع بَراح على الاستدامة الذاتية عبر مزيج متوازن من رسوم الدخول الرمزية (٢٫٥٠٠ د.ب)، ومبيعات مقتنيات ذكرى بَراح الـ ٢٧، وخدمات الضيافة في المجلس، إلى جانب الشراكات والرعايات المؤسسية (CSR) لمبادرة «أثرك في بَراح» لغرس الشتلات الفطرية.'
                  : 'The financial sustainability relies on low CapEx demountable timber architecture, self-funding operations through admission (2.500 BHD), keepsakes store revenue, and corporate CSR sponsorships.'}
              </p>

              <div className="p-4 rounded-2xl bg-[#515638] text-white flex items-center justify-between">
                <div>
                  <div className="text-xs text-[#CCB798] font-bold">
                    {isAr ? 'نموذج المنشآت المستدامة' : 'Modular Architecture'}
                  </div>
                  <div className="text-sm font-semibold">
                    {isAr ? 'عمارة خشبية منخفضة التكلفة وقابلة للفك بنسبة ١٠٠٪' : '100% Demountable Low-Impact Timber Structures'}
                  </div>
                </div>
                <Check className="w-8 h-8 text-[#CCB798] p-1.5 rounded-full bg-white/10" />
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-[#F8F5EF] border-t border-[#D8CEBD] flex items-center justify-between">
          <span className="text-xs text-[#57604F]">
            {isAr ? 'وثيقة مخصصة للعرض والمناقشة الأكاديمية' : 'Curated for Academic Jury Evaluation'}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => window.print()}
              className="py-2 px-4 rounded-xl bg-[#515638] hover:bg-[#3C4229] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isAr ? 'طباعة بطاقة المشروع' : 'Print Factsheet'}</span>
            </button>
            <button
              onClick={onClose}
              className="py-2 px-4 rounded-xl border border-[#D8CEBD] text-[#626B5E] text-xs font-semibold hover:bg-stone-200"
            >
              {isAr ? 'إغلاق' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
