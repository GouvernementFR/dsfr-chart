// Import centralisé via la factory
import { defineAllCharts } from './chart-factory.js';
import '@/styles/style.scss';

// Enregistrement automatique de TOUS les composants
defineAllCharts();
