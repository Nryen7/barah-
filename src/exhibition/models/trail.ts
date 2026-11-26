import { materials, type ConceptModel } from './types';

export const trail: ConceptModel = {
  id: 'trail',
  title: { en: 'Trail', ar: 'درب بَراح' },
  description: { en: 'A boardwalk study showing the relationship between a walking surface and a viewing pause.', ar: 'دراسة لمسار خشبي تربط سطح المشي بنقطة توقف للمشاهدة.' },
  parts: [
    { id: 'base', center: [0, 0, 0], size: [4.8, 0.18, 2.5], color: materials.olive },
    ...Array.from({ length: 12 }, (_, i): ConceptModel['parts'][number] => ({
      id: `deck-${i}`, center: [(i - 5.5) * 0.29, 0.48, Math.sin(i * 0.35) * 0.25],
      size: [0.27, 0.14, 0.83], color: materials.wood, offset: [0, 0.65, 0],
    })),
    { id: 'pause', center: [0.8, 0.49, 0.62], size: [1.0, 0.16, 0.85], color: materials.sand, offset: [0, 0.65, 0.65] },
  ],
  annotation: { position: [0.8, 0.9, 0.65], label: { en: 'Viewing pause', ar: 'نقطة توقف للمشاهدة' } },
};
