import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

// ============================================================================
// INVERSE SURFACE SCOPE INVARIANT
// ============================================================================
// A CSS custom property resolves against the scope where it is *declared*.
// Every component token in the design system is declared on :root as an alias:
//
//   :root              { --input-background: var(--color-surface-elevated); }
//   [data-med-surface] { --color-surface-elevated: <white wash>; }
//
// The Input does NOT pick up the remapped colour, because the alias captured
// the light value at :root. The alias has to be re-declared inside the inverse
// scope so it resolves there instead.
//
// Getting this wrong is invisible until someone renders a form on a dark or
// saturated surface, and then it is a legibility bug: white placeholder text
// on a white field. It shipped three times before this test existed (Tooltip
// aside, the Drawer inputs in 1.1.1 were the second instance of the same
// mistake). So the invariant is checked mechanically instead of by eye.
// ============================================================================

const TOKENS_DIR = join(__dirname, 'tokens')
const SEMANTIC = join(TOKENS_DIR, 'colors', '_semantic.scss')

/** Base tokens the inverse scope is responsible for re-mapping. */
const REMAPPED_BASE_TOKENS = [
  '--color-surface',
  '--color-surface-hover',
  '--color-surface-active',
  '--color-surface-elevated',
  '--color-surface-overlay',
  '--color-surface-sunken',
  '--color-text-primary',
  '--color-text-secondary',
  '--color-text-tertiary',
  '--color-text-disabled',
  '--color-text-placeholder',
  '--color-border',
  '--color-border-strong',
  '--color-border-subtle',
  '--color-border-hover',
  '--color-border-focus',
  '--color-divider',
  '--color-link',
]

function scssFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) return scssFiles(full)
    return full.endsWith('.scss') ? [full] : []
  })
}

const semanticSource = readFileSync(SEMANTIC, 'utf8')

/** Body of the `[data-med-surface='inverse']` block. */
const inverseBlock = (() => {
  const start = semanticSource.indexOf("[data-med-surface='inverse']")
  expect(start, 'no se encuentra el scope [data-med-surface="inverse"]').toBeGreaterThan(-1)
  const open = semanticSource.indexOf('{', start)
  let depth = 0
  for (let i = open; i < semanticSource.length; i += 1) {
    if (semanticSource[i] === '{') depth += 1
    if (semanticSource[i] === '}') {
      depth -= 1
      if (depth === 0) return semanticSource.slice(open + 1, i)
    }
  }
  throw new Error('el scope inverse no cierra')
})()

const declaredInInverse = new Set(
  [...inverseBlock.matchAll(/(--[a-z0-9-]+)\s*:/g)].map((m) => m[1]),
)

describe('inverse surface scope', () => {
  it('re-maps every base token it depends on', () => {
    const missing = REMAPPED_BASE_TOKENS.filter((t) => !declaredInInverse.has(t))
    expect(missing, `no re-mapeados en el scope inverse: ${missing.join(', ')}`).toEqual([])
  })

  it('re-declares every :root alias that reads a re-mapped base token', () => {
    // Aliases of the form `--component-token: var(--base-token)` declared
    // anywhere in the token layer. Each one captured its light value at :root,
    // so each one has to be repeated inside the inverse scope.
    const offenders: string[] = []

    for (const file of scssFiles(TOKENS_DIR)) {
      const source = readFileSync(file, 'utf8')
      for (const [, name, value] of source.matchAll(
        /^\s*(--[a-z0-9-]+)\s*:\s*([^;]+);/gm,
      )) {
        const referenced = REMAPPED_BASE_TOKENS.filter((base) =>
          new RegExp(`var\\(\\s*${base}\\s*[,)]`).test(value),
        )
        if (referenced.length === 0) continue
        // Only aliases that read a base token *directly*. Chained aliases are
        // covered transitively by the direct ones.
        if (!declaredInInverse.has(name)) {
          offenders.push(`${name} (lee ${referenced.join(', ')})`)
        }
      }
    }

    expect(
      offenders,
      `aliases que leen un token re-mapeado pero no se re-declaran en el scope inverse.\n` +
        `Se quedarian con el valor claro y el texto en blanco sobre un fondo blanco:\n  ` +
        `${offenders.join('\n  ')}`,
    ).toEqual([])
  })
})
