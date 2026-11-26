import { materials, type ConceptModel } from './types';

export const masterplan: ConceptModel = {
  id: 'masterplan',
  title: { en: 'Masterplan study', ar: 'دراسة المخطط العام' },
  description: {
    en: 'An abstract placeholder for the exhibition. Site layout and station relationships are pending the architectural design specification.',
    ar: 'مجسّم تجريدي مؤقت للمعرض. ينتظر توزيع الموقع وعلاقات المحطات تحديد المواصفات المعمارية.',
  },
  parts: [
    { id: 'study-base', center: [0, 0, 0], size: [4.8, 0.2, 3.2], color: materials.sand },
    { id: 'study-layer', center: [0, 0.25, 0], size: [3.6, 0.24, 2.1], color: materials.olive, offset: [0, 0.8, 0] },
  ],
  annotation: { position: [0, 0.7, 0], label: { en: 'Abstract study layers', ar: 'طبقات الدراسة التجريدية' } },
};
