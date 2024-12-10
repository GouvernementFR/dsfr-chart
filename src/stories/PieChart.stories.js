const meta = {
  component: 'pie-chart'
};

export default meta;

export const Default = {
  args: {
    x: '["Non-salariés", "Emplois à durée indéterminée", "Contrats à durée déterminée", "Apprentis", "Intérimaires"]',
    y: '[11.7, 74.8, 9.3, 1.6, 2.6]',
    name: '["Non-salariés", "Emplois à durée indéterminée", "Contrats à durée déterminée", "Apprentis", "Intérimaires"]',
    unitTooltip: '%'
  }
};

export const Fill = {
  args: {
    x: '["Protection sociale", "Santé", "Affaires économiques", "Services publics généraux", "Autres", "Enseignement", "Défense"]',
    y: '[40.8, 15.6, 11.5, 10.6, 9.4, 9, 3.1]',
    name: '["Protection sociale", "Santé", "Affaires économiques", "Services publics généraux", "Autres", "Enseignement", "Défense"]',
    fill: 'true',
    unitTooltip: '%'
  }
};
