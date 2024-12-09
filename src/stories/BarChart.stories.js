const meta = {
  component: 'bar-chart'
}

export default meta

export const Vertical = {
  args: {
    x: '[["2025", "2030", "2035", "2040", "2050", "2060", "2070"]]',
    y: '[[69.1, 70.3, 71.4, 72.5, 74, 75.2, 76.4]]',
    name: '["Population en millions"]',
    selectedPalette: 'defaultColor',
    unitTooltip: 'millions'
  }
}

export const Horizontal = {
  args: {
    x: '[["2000", "2010", "2020"], ["2000", "2010", "2020"]]',
    y: '[[11.1, 10.5, 8.4], [8.8, 7.5, 5.6]]',
    name: '["Empreinte carbone", "Émission sur le territoire national"]',
    horizontal: 'true',
    unitTooltip: 'tonnes'
  }
}

export const Stacked = {
  args: {
    x: '[["Ensemble des Français", "Agglomération parisienne", "Communauté urbaine de province", "Commune rurale"]]',
    y: '[[15, 19, 15, 13], [45, 40, 47, 41], [36, 32, 34, 44], [4, 9, 4, 2]]',
    name: '["Tout à fait satisfait", "Plutôt satisfait", "Plutôt pas satisfait", "Pas du tout satisfait"]',
    stacked: 'true',
    selectedPalette: 'divergentDescending',
    unitTooltip: '%'
  }
}
