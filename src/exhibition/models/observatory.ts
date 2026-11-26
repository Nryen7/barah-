import { materials, type ConceptModel } from './types';

export const observatory: ConceptModel = {
  id: 'observatory',
  title: { en: 'Observatory', ar: 'مرصد بَراح' },
  description: { en: 'An enclosure study centered on a narrow opening for quiet observation.', ar: 'دراسة لحيز رصد يتوسطه شق ضيق للمشاهدة الهادئة.' },
  parts: [
    { id: 'base', center: [0, 0, 0], size: [4.0, 0.2, 2.9], color: materials.sand },
    { id: 'back', center: [0, 0.85, -0.85], size: [2.9, 1.5, 0.19], color: materials.dark },
    { id: 'screen-lower', center: [0, 0.49, 0.83], size: [2.9, 0.77, 0.2], color: materials.wood, offset: [0, 0, 0.5] },
    { id: 'screen-upper', center: [0, 1.37, 0.83], size: [2.9, 0.42, 0.2], color: materials.wood, offset: [0, 0.35, 0.5] },
    { id: 'roof', center: [0, 1.66, 0], size: [3.2, 0.16, 2.05], color: materials.olive, offset: [0, 1, 0] },
  ],
  annotation: { position: [0, 1.02, 1.0], label: { en: 'Observation opening', ar: 'فتحة الرصد' } },
};
