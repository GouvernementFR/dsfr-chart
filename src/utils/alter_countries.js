import fs from 'fs';
import path from 'path';

import { WORLD } from './constants';

function parseCsv(content) {
  const lines = content
    .trim()
    .split(/\r?\n/)
    .filter((l) => l.length > 0);
  if (lines.length === 0) return [];
  const headers = lines[0].split(',');
  return lines.slice(1).map((line) => {
    // Handle quoted values with commas inside
    const cols = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        cols.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    cols.push(current);
    const row = {};
    headers.forEach((h, i) => {
      row[h] = cols[i] || '';
    });
    return row;
  });
}

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const csvPath = path.join(__dirname, 'countries.csv');
const csvData = fs.readFileSync(csvPath, { encoding: 'utf-8' });
const countries = parseCsv(csvData);
const continents = {
  Asia: 'Asie',
  Europe: 'Europe',
  Africa: 'Afrique',
  'South America': 'Amérique du Sud',
  Oceania: 'Océanie',
  'North America': 'Amérique du Nord',
  Antarctica: 'Antarctique',
};
const countryOverrides = {
  MD: 'Moldavie',
  DO: 'République dominicaine',
  PS: 'Palestine',
  BY: 'Biélorussie',
  GB: 'Royaume-Uni',
  TR: 'Turquie',
  CD: 'République démocratique du Congo',
  CG: 'République du Congo',
  LA: 'Laos',
  VN: 'Vietnam',
  KR: 'Corée du Sud',
  KP: 'Corée du Nord',
  SB: 'Îles Salomon',
};

const FRENCH_WORLD = [];

WORLD.forEach((country) => {
  const match = countries.find((c) => c['Alpha-2 code'] === country.country_value);
  if (match) {
    FRENCH_WORLD.push({
      country: countryOverrides[country.country_value] || match['French short name'].split(' (')[0].replace("'", '’'),
      country_value: country.country_value,
      continent: continents[country.continent] || country.continent,
      continent_value: country.continent_value,
    });
  } else {
    console.warn(`No match found for country ${country.country} (${country.country_value})`);
    FRENCH_WORLD.push({
      country: country.country,
      country_value: country.country_value,
      continent: continents[country.continent] || country.continent,
      continent_value: country.continent_value,
    });
  }
});

fs.writeFileSync(path.join(__dirname, 'countries_fr.js'), JSON.stringify(FRENCH_WORLD, null, 2), { encoding: 'utf-8' });
