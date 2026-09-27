import * as React from 'react';
import { Button } from '@danielitouci96/design-system';

interface CodeBlockProps {
  /** Código a mostrar y a copiar. */
  code: string;
  /** Nombre del componente, para el aria-label del botón. */
  componentName: string;
  /** Idioma del bloque, solo informativo en la cabecera. */
  language?: string;
}

/**
 * Bloque de código con acción de copiar al portapapeles.
 * Es la pieza que permite al consumidor "ver y copiar" sin salir del
 * muestrario (mismo criterio que la galería de Angular Material).
 */
export default function CodeBlock({ code, componentName, language = 'tsx' }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);
  const timerRef = React.useRef<number | undefined>(undefined);

  React.useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // Fallback para contextos sin permiso de portapapeles (p. ej. http).
      const area = document.createElement('textarea');
      area.value = code;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      document.body.removeChild(area);
    }
    setCopied(true);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="ms-code">
      <div className="ms-code__bar">
        <span className="ms-code__lang">{language}</span>
        <Button
          variant="ghost"
          size="xs"
          iconLeft={copied ? 'Check' : 'Copy'}
          onClick={handleCopy}
          className={'ms-code__copy' + (copied ? ' ms-code__copy--done' : '')}
        >
          {copied ? 'Copiado' : 'Copiar'}
        </Button>
        {/* Anuncio accesible del resultado de la copia. */}
        <span role="status" aria-live="polite" className="ms-sr-only">
          {copied ? `Código de ${componentName} copiado al portapapeles` : ''}
        </span>
      </div>
      <pre className="ms-code__pre">
        <code>{code}</code>
      </pre>
    </div>
  );
}
