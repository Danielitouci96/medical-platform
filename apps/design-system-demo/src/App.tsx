import * as React from 'react';
import {
  Avatar,
  Button,
  Card,
  Checkbox,
  DataTable,
  Icon,
  IconButton,
  Input,
  RadioGroup,
  Select,
  SelectItem,
  Switch,
  Tag,
  type DataTableColumn,
} from '@medical/design-system';

import './styles.scss';

/* ------------------------------------------------------------------ */
/* Datos                                                               */
/* ------------------------------------------------------------------ */

interface Cohorte {
  id: string;
  cohorte: string;
  sub: string;
  biomarcador: string;
  control?: boolean;
  adherencia: number;
  marcado?: boolean;
  eficacia: number;
  registro: string;
  registroDetalle: string;
}

const COHORTES: Cohorte[] = [
  {
    id: 'SUBJ-94812',
    cohorte: 'Brazo 4-B · Dosis alta',
    sub: 'Cohorte de metástasis alfa',
    biomarcador: 'HER2+ confirmado',
    adherencia: 96.8,
    eficacia: 34.2,
    registro: '12 min',
    registroDetalle: 'hace 12 minutos',
  },
  {
    id: 'SUBJ-94808',
    cohorte: 'Placebo',
    sub: 'Grupo de control ciego',
    biomarcador: 'Grupo control',
    control: true,
    adherencia: 100,
    eficacia: 0.4,
    registro: '1 h',
    registroDetalle: 'hace 1 h 04 m',
  },
  {
    id: 'SUBJ-94793',
    cohorte: 'Brazo 2-A · Monoterapia',
    sub: 'Cohorte de resección primaria',
    biomarcador: 'BRCA1 silvestre',
    adherencia: 78.2,
    marcado: true,
    eficacia: 18.9,
    registro: '3 h',
    registroDetalle: 'hace 3 h 45 m',
  },
  {
    id: 'SUBJ-94770',
    cohorte: 'Brazo 4-B · Dosis alta',
    sub: 'Cohorte de metástasis alfa',
    biomarcador: 'PD-L1 · expresión alta',
    adherencia: 99.1,
    eficacia: 41.8,
    registro: 'Ayer',
    registroDetalle: '17:22 EST',
  },
  {
    id: 'SUBJ-94761',
    cohorte: 'Brazo 1-2 · Combinación',
    sub: 'Cohorte de segunda línea',
    biomarcador: 'TMB alta',
    adherencia: 91.3,
    eficacia: 27.5,
    registro: 'Ayer',
    registroDetalle: '11:06 EST',
  },
];

const columnasCohorte: DataTableColumn<Cohorte>[] = [
  {
    id: 'id',
    accessorKey: 'id',
    header: 'ID de sujeto',
    width: 170,
    cell: (row) => (
      <div className="grove-id-cell">
        <span className="grove-mono">{row.id}</span>
        <IconButton
          icon="Copy"
          size="xs"
          aria-label={`Copiar ${row.id}`}
          className="grove-copy"
          onClick={() => navigator.clipboard?.writeText(row.id)}
        />
      </div>
    ),
  },
  {
    id: 'cohorte',
    accessorKey: 'cohorte',
    header: 'Cohorte / brazo',
    cell: (row) => (
      <div className="grove-cell-stack">
        <span className="grove-cell-main">{row.cohorte}</span>
        <span className="grove-cell-sub">{row.sub}</span>
      </div>
    ),
  },
  {
    id: 'biomarcador',
    header: 'Fenotipo de biomarcador',
    enableSorting: false,
    cell: (row) => (
      <Tag size="sm" tone={row.control ? 'neutral' : 'success'} className="grove-bio-tag">
        {row.biomarcador}
      </Tag>
    ),
  },
  {
    id: 'adherencia',
    accessorKey: 'adherencia',
    header: 'Adherencia al protocolo',
    width: 200,
    cell: (row) => (
      <div className="grove-adherence">
        <div className="grove-bar">
          <div className="grove-bar__fill" style={{ width: `${row.adherencia}%` }} />
        </div>
        <span className="grove-adherence__pct">{row.adherencia}%</span>
        {row.marcado ? (
          <span className="grove-adherence__flag">
            <Icon name="AlertTriangle" size="xs" /> Marcado
          </span>
        ) : null}
      </div>
    ),
  },
  {
    id: 'eficacia',
    accessorKey: 'eficacia',
    header: 'Δ eficacia',
    cell: (row) => (
      <span className={'grove-delta' + (row.control ? ' grove-delta--muted' : '')}>
        <Icon name="ArrowUp" size="xs" /> +{row.eficacia} pts
      </span>
    ),
  },
  {
    id: 'registro',
    accessorKey: 'registro',
    header: 'Último registro',
    cell: (row) => (
      <div className="grove-cell-stack">
        <span className="grove-cell-main">{row.registro}</span>
        <span className="grove-cell-sub">{row.registroDetalle}</span>
      </div>
    ),
  },
];

/* ------------------------------------------------------------------ */
/* Subcomponente: cabecera de sección                                  */
/* ------------------------------------------------------------------ */

function SectionHeader({
  meta,
  title,
  right,
}: {
  meta: string;
  title: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <div className="grove-section-head">
      <div className="grove-meta">
        <span className="grove-meta__dot" />
        <span>{meta}</span>
      </div>
      <div className="grove-section-head__row">
        <h2 className="grove-h2">{title}</h2>
        {right ? <div className="grove-section-head__right">{right}</div> : null}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* App                                                                */
/* ------------------------------------------------------------------ */

export default function App() {
  const [dark, setDark] = React.useState<boolean>(
    () => typeof document !== 'undefined' && document.documentElement.dataset.theme === 'dark',
  );
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);
  const [dosificacion, setDosificacion] = React.useState('adaptativa');
  const [brand, setBrand] = React.useState<'grove' | 'onco' | 'cardio'>('grove');

  React.useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    localStorage?.setItem('grove-theme', dark ? 'dark' : 'light');
  }, [dark]);

  React.useEffect(() => {
    document.documentElement.dataset.brand = brand;
  }, [brand]);

  const toggleTheme = () => setDark((v) => !v);

  return (
    <div className="grove">
      {/* ---------------- Header ---------------- */}
      <header className="grove-header">
        <div className="grove-wrap grove-header__inner">
          <a className="grove-logo" href="#resumen">
            <span className="grove-logo__mark">
              <Icon name="Leaf" size="sm" />
            </span>
            <span className="grove-logo__name">Grove AI</span>
            <span className="grove-logo__divider" />
            <span className="grove-logo__tag">
              <span className="grove-logo__dot" />
              Inteligencia en ensayos clínicos
            </span>
          </a>

          <nav className="grove-nav" aria-label="Principal">
            <a className="grove-nav-link" href="#resumen">
              Resumen
            </a>
            <a className="grove-nav-link grove-nav-link--active" href="#acciones">
              Biblioteca
            </a>
            <a className="grove-nav-link" href="#cohortes">
              Tablas de datos
            </a>
            <a className="grove-nav-link" href="#metricas">
              Métricas y KPI
            </a>
            <a className="grove-nav-link" href="#formularios">
              Formularios
            </a>
            <a className="grove-nav-link" href="#feedback">
              Auditoría
            </a>
          </nav>

          <div className="grove-header__actions">
            <button type="button" className="grove-search-pill">
              <Icon name="Search" size="sm" />
              <span>Buscar componentes…</span>
              <kbd className="grove-kbd">⌘K</kbd>
            </button>
            <Select
              value={brand}
              onValueChange={(v) => setBrand(v as 'grove' | 'onco' | 'cardio')}
              ariaLabel="Tema de color de la marca"
              size="sm"
              className="grove-brand-select"
            >
              <SelectItem value="grove">Tema Grove · verde</SelectItem>
              <SelectItem value="onco">Tema Onco · azul</SelectItem>
              <SelectItem value="cardio">Tema Cardio · violeta</SelectItem>
            </Select>
            <IconButton icon="Bell" aria-label="Notificaciones" className="grove-bell" />
            <IconButton
              icon={dark ? 'Sun' : 'Moon'}
              aria-label="Cambiar tema"
              onClick={toggleTheme}
              className="grove-theme"
            />
            <div className="grove-user">
              <Avatar fallback="EV" size="sm" tone="success" />
              <div className="grove-user__text">
                <span className="grove-user__name">Dra. E. Vance</span>
                <span className="grove-user__role">Investigadora · NCI</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ---------------- Hero ---------------- */}
      <section className="grove-hero" id="resumen">
        <div className="grove-wrap">
          <div className="grove-meta">
            <span className="grove-meta__dot" />
            <span>Sistema de diseño · Especificación v2.4</span>
            <span className="grove-meta__sep">/</span>
            <span>Validado ISO-14155</span>
          </div>
          <h1 className="grove-title">
            La anatomía de la <em>inteligencia clínica</em> Grove
          </h1>
          <p className="grove-lede">
            El sistema de interfaz que gobierna el consentimiento del paciente, la estratificación de
            cohortes y la vigilancia de seguridad en ensayos oncológicos de fase III — construido sobre
            doce estudios activos y auditado por las juntas de revisión institucional de cada sitio.
          </p>
          <div className="grove-quick">
            <a className="grove-quick__pill" href="#acciones">
              Acciones y píldoras <Icon name="ArrowRight" size="sm" />
            </a>
            <a className="grove-quick__pill" href="#metricas">
              Métricas del ensayo <Icon name="ArrowRight" size="sm" />
            </a>
            <a className="grove-quick__pill" href="#cohortes">
              Registro de cohortes <Icon name="ArrowRight" size="sm" />
            </a>
            <a className="grove-quick__pill" href="#formularios">
              Controles de datos <Icon name="ArrowRight" size="sm" />
            </a>
            <a className="grove-quick__pill" href="#feedback">
              Notas clínicas <Icon name="ArrowRight" size="sm" />
            </a>
          </div>
        </div>
      </section>

      {/* ---------------- Métricas ---------------- */}
      <section className="grove-section" id="metricas">
        <div className="grove-wrap">
          <SectionHeader meta="Benchmarks empíricos · 12 ensayos de fase III" title="Validez observacional longitudinal" />
          <div className="grove-metrics">
            <div className="grove-metric">
              <div className="grove-metric__top">
                <span className="grove-metric__label">Paradigma de respuesta</span>
                <span className="grove-metric__icon">
                  <Icon name="Leaf" size="md" />
                </span>
              </div>
              <div className="grove-metric__value">99.4%</div>
              <div className="grove-metric__row">
                <span className="grove-delta">
                  <Icon name="ArrowUp" size="xs" /> +0.6%
                </span>
                <span className="grove-metric__hint">frente a la línea base</span>
              </div>
              <div className="grove-bar">
                <div className="grove-bar__fill" style={{ width: '92%' }} />
              </div>
            </div>

            <div className="grove-metric">
              <div className="grove-metric__top">
                <span className="grove-metric__label">Tiempo activo de inferencia</span>
                <span className="grove-metric__icon">
                  <Icon name="Zap" size="md" />
                </span>
              </div>
              <div className="grove-metric__value">1.8 s</div>
              <div className="grove-metric__row">
                <span className="grove-delta">
                  <Icon name="ArrowDown" size="xs" /> −240 ms
                </span>
                <span className="grove-metric__hint">percentil 95</span>
              </div>
              <div className="grove-bar">
                <div className="grove-bar__fill" style={{ width: '76%' }} />
              </div>
            </div>

            <div className="grove-metric">
              <div className="grove-metric__top">
                <span className="grove-metric__label">Señales de recuperación</span>
                <span className="grove-metric__icon">
                  <Icon name="ShieldCheck" size="md" />
                </span>
              </div>
              <div className="grove-metric__value">10,000,000+</div>
              <div className="grove-metric__row">
                <span className="grove-delta">
                  <Icon name="ArrowUp" size="xs" /> +1.2M
                </span>
                <span className="grove-metric__hint">este año</span>
              </div>
              <div className="grove-bar">
                <div className="grove-bar__fill" style={{ width: '68%' }} />
              </div>
            </div>

            <div className="grove-metric grove-metric--mist">
              <div className="grove-metric__top">
                <span className="grove-metric__label">Confiabilidad de biomarcador · AUC 0.997</span>
                <span className="grove-metric__icon grove-metric__icon--ghost">
                  <Icon name="Activity" size="md" />
                </span>
              </div>
              <div className="grove-metric__value">99.82%</div>
              <div className="grove-metric__row">
                <span className="grove-delta">
                  <Icon name="ArrowUp" size="xs" /> +0.004
                </span>
                <span className="grove-metric__hint">validación cruzada</span>
              </div>
              <svg
                className="grove-spark"
                viewBox="0 0 240 48"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="grove-spark" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="var(--color-secondary)" stopOpacity="0.25" />
                    <stop offset="1" stopColor="var(--color-secondary)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  className="grove-spark__area"
                  d="M4,40 C18,36 30,44 44,32 C58,20 66,28 80,24 C94,20 108,14 122,16 C136,18 146,10 162,8 C178,6 198,8 236,2 L236,48 L4,48 Z"
                  fill="url(#grove-spark)"
                />
                <path
                  className="grove-spark__line"
                  d="M4,40 C18,36 30,44 44,32 C58,20 66,28 80,24 C94,20 108,14 122,16 C136,18 146,10 162,8 C178,6 198,8 236,2"
                  fill="none"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Botones ---------------- */}
      <section className="grove-section" id="acciones">
        <div className="grove-wrap">
          <SectionHeader meta="Tokens de interacción del sistema · Accionabilidad" title="Botones, estados y segmentos" />

          <div className="grove-block">
            <h3 className="grove-sub">Jerarquía primaria</h3>
            <div className="grove-btn-row">
              <Button iconRight="ArrowRight" className="grove-btn-pill">
                Acción principal
              </Button>
              <Button iconRight="ArrowRight" className="grove-btn-pill grove-btn-accent">
                Iniciar estudio
              </Button>
              <Button variant="outline" iconRight="ArrowRight" className="grove-btn-pill">
                Auditoría de protocolo
              </Button>
              <Button iconLeft="SlidersHorizontal" className="grove-btn-pill grove-btn-soft">
                Refinar criterios
              </Button>
              <Button iconLeft="AlertTriangle" className="grove-btn-pill grove-btn-tertiary">
                Marcar toxicidad
              </Button>
            </div>
          </div>

          <div className="grove-block">
            <h3 className="grove-sub">Estados de carga, foco y deshabilitación</h3>
            <div className="grove-btn-row">
              <Button variant="outline" loading className="grove-btn-pill">
                Sintetizando cohorte…
              </Button>
              <Button variant="outline" className="grove-btn-pill grove-btn-focus">
                Sugerencia de criterios
              </Button>
              <Button disabled className="grove-btn-pill">
                Endpoint bloqueado
              </Button>
            </div>
          </div>

          <div className="grove-block">
            <h3 className="grove-sub">Acciones de un solo icono</h3>
            <div className="grove-btn-row">
              <IconButton icon="Bookmark" className="grove-icn-round" aria-label="Guardar" />
              <IconButton icon="Share2" className="grove-icn-round" aria-label="Compartir" />
              <IconButton icon="Download" className="grove-icn-round" aria-label="Descargar" />
              <IconButton icon="Plus" className="grove-icn-round grove-icn-round--accent" aria-label="Añadir" />
            </div>
          </div>

          <div className="grove-block grove-block--seg">
            <div className="grove-seg">
              <span className="grove-seg__label">Controlador de vista de cohorte</span>
              <div className="grove-seg__pills">
                <button type="button" className="grove-seg__pill grove-seg__pill--active">
                  Todos los sujetos · 4,821
                </button>
                <button type="button" className="grove-seg__pill">
                  Estratificados por brazo
                </button>
                <button type="button" className="grove-seg__pill">
                  Valores atípicos · 14
                </button>
              </div>
            </div>
            <div className="grove-seg">
              <span className="grove-seg__label">Presets de densidad</span>
              <div className="grove-seg__pills">
                <button type="button" className="grove-seg__pill grove-seg__pill--active">
                  Cómodo
                </button>
                <button type="button" className="grove-seg__pill">
                  Alta densidad
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Tabla de datos ---------------- */}
      <section className="grove-section" id="cohortes">
        <div className="grove-wrap">
          <SectionHeader
            meta="Registro del protocolo CR-904 · Sincronizado 09:14 EST"
            title="Progresión de cohortes y biomarcadores"
            right={
              <span className="grove-sync">
                <span className="grove-sync__dot" />
                EDC conectado · <strong>En vivo</strong>
              </span>
            }
          />
          <Card className="grove-table-card">
            <div className="grove-toolbar">
              <div className="grove-input-wrap grove-toolbar__search">
                <Icon name="Search" size="sm" className="grove-input-wrap__icon" />
                <Input placeholder="Filtrar por ID de sujeto, mutación, sitio…" />
              </div>
              <div className="grove-toolbar__filters">
                <button type="button" className="grove-filter-pill grove-filter-pill--active">
                  <Icon name="Check" size="xs" /> Todas las cohortes
                  <span className="grove-filter-pill__count">128</span>
                </button>
                <button type="button" className="grove-filter-pill">
                  Solo fase III
                </button>
                <button type="button" className="grove-filter-pill">
                  Positivo de biomarcador
                </button>
              </div>
              <div className="grove-toolbar__actions">
                <Button variant="outline" iconLeft="Filter" size="sm" className="grove-btn-pill">
                  Criterios de filtro
                </Button>
                <Button iconLeft="Download" size="sm" className="grove-btn-pill">
                  Exportar CSV
                </Button>
              </div>
            </div>

            <DataTable
              columns={columnasCohorte}
              data={COHORTES}
              getRowId={(r) => r.id}
              striped
              renderRowActions={(row) => (
                <IconButton icon="MoreVertical" size="sm" aria-label={`Acciones para ${row.id}`} />
              )}
              pagination={{
                page,
                pageCount: Math.ceil(128 / pageSize),
                onPageChange: setPage,
                pageSize,
                onPageSizeChange: setPageSize,
                totalItems: 128,
              }}
            />
          </Card>
        </div>
      </section>

      {/* ---------------- Formularios ---------------- */}
      <section className="grove-section" id="formularios">
        <div className="grove-wrap">
          <SectionHeader meta="Taxonomía de formularios · Captura de datos" title="Módulos de parámetros clínicos" />

          <div className="grove-forms">
            <Card className="grove-form-card">
              <div className="grove-field">
                <label className="grove-field__label" htmlFor="inv-id">
                  ID de investigador principal
                </label>
                <div className="grove-input-wrap grove-input-wrap--has-icon">
                  <Input id="inv-id" defaultValue="INV-90214-VANCE" fullWidth />
                  <Icon
                    name="BadgeCheck"
                    size="sm"
                    color="var(--color-success)"
                    className="grove-input-wrap__icon grove-input-wrap__icon--right"
                  />
                </div>
                <p className="grove-field__help">
                  <Icon name="ShieldCheck" size="xs" /> Credencial GCP activa hasta el cuarto trimestre de 2026
                </p>
              </div>

              <div className="grove-field">
                <label className="grove-field__label" htmlFor="dosificacion">
                  Paradigma de dosificación del protocolo
                </label>
                <Select
                  value={dosificacion}
                  onValueChange={setDosificacion}
                  fullWidth
                  ariaLabel="Paradigma de dosificación del protocolo"
                >
                  <SelectItem value="adaptativa">Titulación adaptativa (recomendado)</SelectItem>
                  <SelectItem value="fija">Fija · 300 mg semanales</SelectItem>
                  <SelectItem value="peso">Basada en el peso corporal</SelectItem>
                </Select>
              </div>

              <div className="grove-field">
                <span className="grove-field__label">Marcadores de criterios de inclusión</span>
                <div className="grove-tags">
                  <Tag className="grove-tag--ink" icon="Check">
                    EGFR exón 19 · deleción
                  </Tag>
                  <Tag className="grove-tag--ink" icon="FlaskConical">
                    ECOG 0 – 1
                  </Tag>
                  <Tag className="grove-tag--green" icon="FlaskConical">
                    Sin tratamiento previo
                  </Tag>
                  <button type="button" className="grove-tag-add">
                    <Icon name="Plus" size="sm" /> Añadir marcador
                  </button>
                </div>
              </div>

              <div className="grove-field">
                <span className="grove-field__label">Aserción reglamentaria</span>
                <div className="grove-checks">
                  <Checkbox
                    defaultChecked
                    className="grove-check"
                    label={
                      <span>
                        Consentimiento informado del paciente obtenido y verificado por el CIR.
                      </span>
                    }
                  />
                  <Checkbox
                    defaultChecked
                    className="grove-check"
                    label={
                      <span>
                        Revisión patológica secundaria confirmada por árbitro de doble ciego.
                      </span>
                    }
                  />
                  <Checkbox
                    className="grove-check"
                    label={<span>Notificación de evento adverso grave enviada a vigilancia.</span>}
                  />
                </div>
              </div>

              <div className="grove-field">
                <span className="grove-field__label">Modo de enmascaramiento de datos</span>
                <RadioGroup
                  name="enmascaramiento"
                  defaultValue="doble"
                  items={[
                    {
                      value: 'doble',
                      label: (
                        <span className="grove-radio">
                          <strong>Doble ciego completo</strong>
                          <span className="grove-radio__sub">Recomendado para ensayos de fase III.</span>
                        </span>
                      ),
                    },
                    {
                      value: 'investigador',
                      label: (
                        <span className="grove-radio">
                          <strong>Pista de auditoría abierta</strong>
                          <span className="grove-radio__sub">Visible solo para el investigador principal.</span>
                        </span>
                      ),
                    },
                  ]}
                />
              </div>
            </Card>

            <aside className="grove-flags">
              <div className="grove-flags__head">
                <span className="grove-meta">
                  <span className="grove-meta__dot" />
                  <span>Banderas de automatización</span>
                </span>
                <h3 className="grove-flags__title">Puertas de inferencia autónoma</h3>
              </div>
              <div className="grove-flag">
                <div className="grove-flag__text">
                  <span className="grove-flag__name">Alerta de ECG continua</span>
                  <span className="grove-flag__desc">Dispara notificación si el QTc supera 460 ms.</span>
                </div>
                <Switch defaultChecked aria-label="Alerta de ECG continua" />
              </div>
              <div className="grove-flag">
                <div className="grove-flag__text">
                  <span className="grove-flag__name">Sincronización eCRF automatizada</span>
                  <span className="grove-flag__desc">Transmisión instantánea conforme a 21 CFR 11.</span>
                </div>
                <Switch defaultChecked aria-label="Sincronización eCRF automatizada" />
              </div>
              <div className="grove-flag">
                <div className="grove-flag__text">
                  <span className="grove-flag__name">Expulsión de valores atípicos</span>
                  <span className="grove-flag__desc">Requiere aprobación del DSMB para dispensarse.</span>
                </div>
                <Switch aria-label="Expulsión de valores atípicos" />
              </div>
              <Button fullWidth iconLeft="Save" className="grove-btn-pill grove-flags__save">
                Guardar parámetros del motor
              </Button>
            </aside>
          </div>
        </div>
      </section>

      {/* ---------------- Feedback ---------------- */}
      <section className="grove-section grove-section--last" id="feedback">
        <div className="grove-wrap">
          <SectionHeader meta="Retroalimentación clínica · Pista de auditoría" title="Banners, estados y notas de expertos" />

          <div className="grove-banner">
            <span className="grove-banner__icon">
              <Icon name="Megaphone" size="md" />
            </span>
            <p className="grove-banner__text">
              <strong>Enmienda del protocolo V2.4 sincronizada.</strong> La expansión de la cohorte de
              dosis fue aprobada por la junta de revisión institucional de todos los sitios oncológicos de
              nivel 1.
            </p>
            <Button className="grove-banner__cta">Revisar enmienda</Button>
          </div>

          <div className="grove-status-row">
            <span className="grove-status-pill grove-status-pill--success">
              <span className="grove-status-pill__dot" /> Protocolo activo
            </span>
            <span className="grove-status-pill grove-status-pill--info">
              <span className="grove-status-pill__dot" /> Evaluando in silico
            </span>
            <span className="grove-status-pill grove-status-pill--warning">
              <span className="grove-status-pill__dot" /> Perspectiva de seguridad crítica
            </span>
            <span className="grove-status-pill grove-status-pill--neutral">
              <span className="grove-status-pill__dot" /> Sincronizado · puerta FDA
            </span>
          </div>

          <div className="grove-notes">
            <div className="grove-note">
              <div className="grove-note__head">
                <Avatar fallback="EV" size="sm" tone="success" />
                <div className="grove-note__who">
                  <span className="grove-note__name">
                    Dra. Elena Vance, MD, PhD <Icon name="BadgeCheck" size="xs" color="var(--color-success)" />
                  </span>
                  <span className="grove-note__role">Investigadora principal · Centro oncológico Johns Hopkins</span>
                </div>
              </div>
              <p className="grove-note__body">
                “El panel de vigilancia capturó el cambio de TMB tres semanas antes que el linaje celular.
                Eso nos abre una ventana terapéutica real.”
              </p>
              <div className="grove-note__foot">
                <span>
                  <Icon name="Clock" size="xs" /> 09:14 EST · Firmado electrónicamente
                </span>
                <a className="grove-link" href="#">
                  Ver pista de auditoría <Icon name="ExternalLink" size="xs" />
                </a>
              </div>
            </div>

            <div className="grove-note grove-note--mist">
              <div className="grove-note__head">
                <span className="grove-note__engine">
                  <Icon name="Bot" size="md" />
                </span>
                <div className="grove-note__who">
                  <span className="grove-note__name">Motor de inferencia Grove v3</span>
                  <span className="grove-note__role">Vigilancia de seguridad en tiempo real</span>
                </div>
              </div>
              <p className="grove-note__body">
                Cribado continuo de 41 canales de seguridad del ensayo. Sin interrupciones en los últimos
                90 días.
              </p>
              <div className="grove-note__foot">
                <span className="grove-status-pill grove-status-pill--success">
                  <span className="grove-status-pill__dot" /> Confianza de inferencia 99.94%
                </span>
                <a className="grove-link" href="#">
                  Generar PDF de seguridad
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Footer ---------------- */}
      <footer className="grove-footer">
        <div className="grove-wrap grove-footer__inner">
          <span>Arquitectura de interfaz clínica Grove © 2026 · Conforme a GCP y 21 CFR Parte 11</span>
          <div className="grove-footer__links">
            <a className="grove-link" href="#">
              Especificaciones del protocolo
            </a>
            <a className="grove-link" href="#">
              Índice del registro de auditoría
            </a>
            <a className="grove-link" href="#">
              Estado del sistema
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}