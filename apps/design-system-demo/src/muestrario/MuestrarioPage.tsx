import * as React from 'react';
import { Icon, Inline, Input, Button } from '@medical/design-system';
import { SHOWCASE_ENTRIES } from './entries';
import ShowcaseCard from './ShowcaseCard';
import type { ShowcaseEntry, ShowcaseCategory } from './types';

interface MuestrarioPageProps {
  /** Vuelve a la demo (el caller maneja el hash). */
  onVolver: () => void;
}

/** Orden en que se muestran las familias. */
const ORDEN_CATEGORIAS: ShowcaseCategory[] = [
  'Acciones',
  'Formularios',
  'Datos',
  'Feedback',
  'Navegación',
  'Layout',
];

/**
 * Muestrario del Design System: el desarrollador ve el componente
 * funcionando, lee cómo se usa y copia el código base — el mismo
 * criterio de uso que la galería de Angular Material.
 */
export default function MuestrarioPage({ onVolver }: MuestrarioPageProps) {
  const [query, setQuery] = React.useState('');
  const [categoria, setCategoria] = React.useState<ShowcaseCategory | 'todas'>('todas');

  const filtradas = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return SHOWCASE_ENTRIES.filter((e) => {
      if (categoria !== 'todas' && e.category !== categoria) return false;
      if (!q) return true;
      return [e.name, e.category, e.description, e.id]
        .join(' ')
        .toLowerCase()
        .includes(q);
    });
  }, [query, categoria]);

  /* Agrupa por familia respetando ORDEN_CATEGORIAS. */
  const grupos = React.useMemo(() => {
    const mapa = new Map<ShowcaseCategory, ShowcaseEntry[]>();
    for (const e of filtradas) {
      const actual = mapa.get(e.category);
      if (actual) actual.push(e);
      else mapa.set(e.category, [e]);
    }
    return ORDEN_CATEGORIAS.filter((c) => mapa.has(c)).map((c) => ({
      categoria: c,
      entries: mapa.get(c)!,
    }));
  }, [filtradas]);

  const categoriasPresentes = React.useMemo(
    () => ORDEN_CATEGORIAS.filter((c) => SHOWCASE_ENTRIES.some((e) => e.category === c)),
    [],
  );

  const hayFiltro = query.trim() !== '' || categoria !== 'todas';

  const limpiar = () => {
    setQuery('');
    setCategoria('todas');
  };

  return (
    <div className="ms">
      {/* ---------------- Cabecera ---------------- */}
      <header className="ms-header">
        <div className="ms-wrap ms-header__inner">
          <button type="button" className="ms-back" onClick={onVolver}>
            <Icon name="ArrowLeft" size="sm" />
            Volver a la demo
          </button>
          <div className="ms-header__title">
            <span className="ms-header__meta">
              <span className="ms-header__dot" />
              Muestrario de componentes
            </span>
            <span className="ms-header__name">@medical/design-system</span>
          </div>
        </div>
      </header>

      {/* ---------------- Intro ---------------- */}
      <section className="ms-hero">
        <div className="ms-wrap">
          <h1 className="ms-hero__title">
            Componentes listos para <em>copiar y usar</em>
          </h1>
          <p className="ms-hero__lede">
            Cada componente se muestra funcionando con los tokens del tema activo, junto al código
            de uso que puedes copiar de un clic. Sinsaltos, sin adivinar props.
          </p>
          <Inline gap={3} className="ms-hero__stats">
            <span className="ms-hero__stat">
              <strong>{SHOWCASE_ENTRIES.length}</strong> componentes catalogados
            </span>
            <span className="ms-hero__sep">/</span>
            <span className="ms-hero__stat">
              <strong>{categoriasPresentes.length}</strong> familias
            </span>
          </Inline>
        </div>
      </section>

      {/* ---------------- Buscador + filtros ---------------- */}
      <div className="ms-wrap">
        <div className="ms-toolbar">
          <div className="ms-toolbar__search">
            <Icon name="Search" size="sm" className="ms-toolbar__icon" />
            <Input
              value={query}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
              placeholder="Buscar componente o prop…"
              aria-label="Buscar componente o prop"
            />
          </div>
          <div className="ms-toolbar__cats" role="group" aria-label="Filtrar por familia">
            <button
              type="button"
              className={
                'ms-cat ms-cat--btn' + (categoria === 'todas' ? ' ms-cat--active' : '')
              }
              aria-pressed={categoria === 'todas'}
              onClick={() => setCategoria('todas')}
            >
              Todas
            </button>
            {categoriasPresentes.map((c) => (
              <button
                key={c}
                type="button"
                className={
                  'ms-cat ms-cat--btn' + (categoria === c ? ' ms-cat--active' : '')
                }
                aria-pressed={categoria === c}
                onClick={() => setCategoria(categoria === c ? 'todas' : c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ---------------- Entradas ---------------- */}
      <section className="ms-section">
        <div className="ms-wrap">
          {grupos.length === 0 ? (
            <div className="ms-empty">
              <Icon name="Search" size="lg" />
              <p>Sin resultados para «{query}»</p>
              <Button variant="outline" onClick={limpiar}>
                Limpiar búsqueda
              </Button>
            </div>
          ) : (
            grupos.map((grupo) => (
              <div className="ms-group" key={grupo.categoria}>
                <div className="ms-group__head">
                  <h2 className="ms-group__title">{grupo.categoria}</h2>
                  <span className="ms-group__count">
                    {grupo.entries.length} {grupo.entries.length === 1 ? 'componente' : 'componentes'}
                  </span>
                </div>
                <div className="ms-list">
                  {grupo.entries.map((entry) => (
                    <ShowcaseCard key={entry.id} entry={entry} />
                  ))}
                </div>
              </div>
            ))
          )}

          {hayFiltro && grupos.length > 0 ? (
            <div className="ms-clearbar">
              <span className="ms-clearbar__note">
                Mostrando {filtradas.length} de {SHOWCASE_ENTRIES.length}
              </span>
              <Button variant="ghost" size="sm" onClick={limpiar}>
                Quitar filtros
              </Button>
            </div>
          ) : null}
        </div>
      </section>

      <footer className="ms-footer">
        <div className="ms-wrap ms-footer__inner">
          <span>© 2026 · @medical/design-system v1.0.0 · Muestrario de consumo</span>
          <span>Storybook queda para el desarrollo del DS</span>
        </div>
      </footer>
    </div>
  );
}
