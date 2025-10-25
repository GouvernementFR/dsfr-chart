// Helpers utilitaires pour normaliser les props qui peuvent être passées
// soit sous forme de chaînes JSON, soit sous forme de valeurs natives.
export function parseMaybeJSON(value, fallback = null) {
  if (value === null || value === undefined || value === '') return fallback;
  if (typeof value === 'string') {
    try {
      return JSON.parse(value);
    } catch (e) {
      // Comportement conservateur : logger et retourner la valeur de repli
       
      console.error('parseMaybeJSON: invalid JSON', e);
      return fallback;
    }
  }
  return value;
}

export function ensureArray(value, fallback = []) {
  const parsed = parseMaybeJSON(value, fallback);
  return Array.isArray(parsed) ? parsed : fallback;
}

export function ensureArrayOfArrays(value, fallback = []) {
  const parsed = parseMaybeJSON(value, fallback);
  if (!Array.isArray(parsed)) return fallback;
  // Si le premier élément est lui-même un tableau, on suppose un tableau-de-tableaux,
  // sinon on tente d'encapsuler la liste pour compatibilité ascendante.
  if (parsed.length === 0) return [];
  if (Array.isArray(parsed[0])) return parsed;
  // Si c'est une liste simple (labels), on l'encapsule dans un tableau-de-tableaux
  // pour assurer la compatibilité ascendante.
  return [parsed];
}

export function parseNames(nameProp, seriesCount) {
  const arr = ensureArray(nameProp, []);
  const names = [];
  for (let i = 0; i < seriesCount; i++) {
    names.push(arr[i] || 'Série ' + (i + 1));
  }
  return names;
}

export function parseVhLines(lineProp, lineNameProp, lineColorProp) {
  // lineProp peut être du JSON stringifié ou un tableau
  const parse = ensureArray(lineProp, []);
  const names = ensureArray(lineNameProp, []);
  const colors = ensureArray(lineColorProp, []);

  const resolvedNames = [];
  for (let i = 0; i < parse.length; i++) {
    resolvedNames.push(names[i] || (lineProp === parse ? 'L' + (i + 1) : 'L' + (i + 1)));
  }

  return { parse, names: resolvedNames, colors };
}

export function normalizeNumber(value, fallback = null) {
  if (value === null || value === undefined || value === '') return fallback;
  if (typeof value === 'number') return value;
  const n = Number(value);
  return Number.isNaN(n) ? fallback : n;
}

export function normalizeBoolean(value, fallback = false) {
  if (value === null || value === undefined || value === '') return fallback;
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    const v = value.toLowerCase();
    if (v === 'true') return true;
    if (v === 'false') return false;
  }
  return Boolean(value);
}

export default {
  parseMaybeJSON,
  ensureArray,
  ensureArrayOfArrays,
  parseNames,
  parseVhLines,
};
