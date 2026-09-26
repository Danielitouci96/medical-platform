import type { ShowcaseEntry } from '../types';
import { ACCIONES } from './acciones';
import { DATOS } from './datos';
import { FORMULARIOS } from './formularios';
import { FEEDBACK } from './feedback';
import { NAVEGACION } from './navegacion';
import { LAYOUT } from './layout';
import { FECHAS } from './fechas';

/**
 * Catálogo completo del muestrario, agrupado por familia.
 * El orden dentro de cada familia va de lo más usado a lo más especializado.
 */
export const SHOWCASE_ENTRIES: ShowcaseEntry[] = [
  ...ACCIONES,
  ...DATOS,
  ...FORMULARIOS,
  ...FECHAS,
  ...FEEDBACK,
  ...NAVEGACION,
  ...LAYOUT,
];

export { ACCIONES, DATOS, FORMULARIOS, FECHAS, FEEDBACK, NAVEGACION, LAYOUT };
