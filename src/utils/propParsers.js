// Utility helpers to normalize props that may be passed as JSON strings or native values.
export function parseMaybeJSON(value, fallback = null) {
  if (value === null || value === undefined || value === '') return fallback;
  if (typeof value === 'string') {
    try {
      return JSON.parse(value);
    } catch (e) {
      // Keep behaviour conservative: log and return fallback
       
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
  // If first element is also an array assume array-of-arrays, otherwise try to wrap
  if (parsed.length === 0) return [];
  if (Array.isArray(parsed[0])) return parsed;
  // If it's a single list (labels), wrap into an array-of-arrays for backward compatibility
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
  // lineProp may be stringified JSON or array
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
