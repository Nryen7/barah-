import { masterplan } from './masterplan';
import { gateway } from './gateway';
import { trail } from './trail';
import { observatory } from './observatory';
import { majlis } from './majlis';

export const models = [masterplan, gateway, trail, observatory, majlis] as const;
