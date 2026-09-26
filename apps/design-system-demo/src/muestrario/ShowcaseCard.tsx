import type { ShowcaseEntry } from './types';
import CodeBlock from './CodeBlock';

/** Tarjeta de una entrada del muestrario: preview, código, API y theming. */
export default function ShowcaseCard({ entry }: { entry: ShowcaseEntry }) {
  return (
    <article className="ms-card" aria-labelledby={`${entry.id}-title`}>
      <header className="ms-card__head">
        <div>
          <h3 className="ms-card__name" id={`${entry.id}-title`}>
            {entry.name}
          </h3>
          <span className="ms-card__cat">{entry.category}</span>
        </div>
        <code className="ms-card__import">
          import {'{'} {entry.name} {'}'} from '@medical/design-system';
        </code>
      </header>

      <p className="ms-card__desc">{entry.description}</p>

      <div
        className={`ms-card__preview${entry.floatingPreview ? ' ms-card__preview--float' : ''}`}
      >
        <span className="ms-card__preview-label">Vista previa</span>
        <div className="ms-card__preview-body">
          {typeof entry.preview === 'function' ? entry.preview() : entry.preview}
        </div>
      </div>

      <CodeBlock code={entry.code} componentName={entry.name} />

      {entry.api?.length ? (
        <details className="ms-card__api" open>
          <summary className="ms-card__api-summary">API</summary>
          <div className="ms-card__api-table-wrap">
            <table className="ms-card__api-table">
              <thead>
                <tr>
                  <th scope="col">Prop</th>
                  <th scope="col">Tipo</th>
                  <th scope="col">Por defecto</th>
                  <th scope="col">Descripción</th>
                </tr>
              </thead>
              <tbody>
                {entry.api.map((p) => (
                  <tr key={p.name}>
                    <td>
                      <code className="ms-mono">{p.name}</code>
                    </td>
                    <td>
                      <code className="ms-mono ms-mono--type">{p.type}</code>
                    </td>
                    <td>
                      <code className="ms-mono">{p.defaultValue ?? '—'}</code>
                    </td>
                    <td>{p.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      ) : null}

      {entry.theming ? (
        <p className="ms-card__theming">
          <strong>Theming.</strong> {entry.theming}
        </p>
      ) : null}
    </article>
  );
}
