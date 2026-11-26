import type { Language } from '../../types/barah';

export type Point = [number, number, number];
export type Translation = Record<Language, string>;

export interface Part {
  id: string;
  center: Point;
  size: Point;
  color: string;
  offset?: Point;
  rotation?: Point;
}

export interface ConceptModel {
  id: string;
  title: Translation;
  description: Translation;
  parts: Part[];
  annotation: { position: Point; label: Translation };
}

export const materials = { sand: '#ccb798', olive: '#515638', dark: '#303528', wood: '#8d7255' };
