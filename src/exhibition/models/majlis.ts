import { materials, type ConceptModel } from './types';

export const majlis: ConceptModel = {
  id: 'majlis',
  title: { en: 'Majlis', ar: 'مجلس بَراح' },
  description: { en: 'An open-sided gathering study with seating under a slatted canopy.', ar: 'دراسة لجلسة مفتوحة الجوانب تحت مظلة من الشرائح.' },
  parts: [
    { id: 'base', center: [0, 0, 0], size: [4.7, 0.19, 3.1], color: materials.sand },
    ...[-1.3, 1.3].flatMap(x => [-0.85, 0.85].map((z): ConceptModel['parts'][number] => ({
      id: `post-${x}-${z}`, center: [x, 0.86, z], size: [0.16, 1.55, 0.16], color: materials.wood,
    }))),
    ...Array.from({ length: 9 }, (_, i): ConceptModel['parts'][number] => ({
      id: `slat-${i}`, center: [0, 1.7, (i - 4) * 0.27], size: [3.25, 0.13, 0.16],
      color: materials.olive, offset: [0, 0.9, 0],
    })),
    { id: 'seating', center: [0, 0.22, -0.58], size: [2.35, 0.25, 0.48], color: materials.dark, offset: [0, 0.22, 0.48] },
  ],
  annotation: { position: [0, 1.98, 0], label: { en: 'Slatted shade canopy', ar: 'مظلة من الشرائح' } },
};
