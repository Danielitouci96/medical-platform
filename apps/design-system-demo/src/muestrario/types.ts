import type * as React from 'react';

/** Categorías del muestrario (mismo criterio que las fases del DS). */
export type ShowcaseCategory =
  | 'Layout'
  | 'Tipografía'
  | 'Acciones'
  | 'Formularios'
  | 'Datos'
  | 'Feedback'
  | 'Navegación'
  | 'Overlays';

/** Una propiedad documentada en la tabla de API de una entrada. */
export interface ShowcaseApiProp {
  /** Nombre de la prop tal como se escribe en el componente. */
  name: string;
  /** Tipo TypeScript de la prop. */
  type: string;
  /** Valor por defecto, si existe. */
  defaultValue?: string;
  /** Qué hace y cuándo usarla. */
  description?: string;
}

/**
 * Una entrada del muestrario: preview en vivo + código copiable + API.
 */
export interface ShowcaseEntry {
  /** Identificador estable, se usa como ancla (#button). */
  id: string;
  /** Nombre del componente tal como se exporta del paquete. */
  name: string;
  /** Familia a la que pertenece. */
  category: ShowcaseCategory;
  /** Resumen de un párrafo: qué es y cuándo se usa. */
  description: string;
  /**
   * Vista previa en vivo con los tokens del tema activo.
   * Puede ser un nodo estático o una función que devuelva uno — muchos
   * componentes (Modal, Tabs, DatePicker) necesitan estado propio, y en ese
   * caso se devuelve un componente ya montado, no se llama en el render.
   */
  preview: React.ReactNode | (() => React.ReactNode);
  /** Código de uso listo para copiar (JSX). */
  code: string;
  /** Props relevantes del componente. */
  api?: ShowcaseApiProp[];
  /** Nota de theming: qué tokens influence el componente. */
  theming?: string;
  /**
   * El preview usa un panel flotante (Popover, lista de MultiSelect o
   * Combobox, calendario de DateRangePicker) que se sale de la caja. La
   * tarjeta deja de recortar para que se vea completo.
   */
  floatingPreview?: boolean;
}
