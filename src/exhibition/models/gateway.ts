import { materials, type ConceptModel } from './types';

export const gateway: ConceptModel = {
  id: 'gateway',
  title: { en: 'Gateway', ar: 'بوابة بَراح' },
  description: { en: 'A massing study of a shaded threshold for visitor arrival.', ar: 'دراسة كتلية لمدخل مظلل لاستقبال الزوار.' },
  parts: [
    { id: 'arrival', center: [0, 0, 0], size: [4.6, 0.18, 3.1], color: materials.sand },
    ...[-1.35, 1.35].map((x): ConceptModel['parts'][number] => ({
      id: `wall-${x}`, center: [x, 0.9, 0], size: [0.45, 1.65, 1.8], color: materials.wood, offset: [Math.sign(x) * 0.5, 0.25, 0],
    })),
    { id: 'shade', center: [0, 1.84, 0], size: [3.8, 0.24, 2.3], color: materials.olive, offset: [0, 0.95, 0] },
  ],
  annotation: { position: [0, 2.16, 0], label: { en: 'Shaded arrival threshold', ar: 'عتبة الاستقبال المظللة' } },
};
