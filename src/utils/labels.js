export const getIndexes = (datasets, showLabelsParse) => {
  return datasets.map((sets, di) => {
    if (!showLabelsParse[di]) return null;

    // Si c'est une liste d'index, on la retourne telle quelle
    if (Array.isArray(showLabelsParse[di])) {
      return [...showLabelsParse[di]];
    }
    switch (showLabelsParse[di]) {
      case 'all':
        return sets.data.map((_, index) => index);
      case 'edges':
        return [0, sets.data.length - 1];
      case 'minmax': {
        if (sets.data.length === 0) return [];            
        const allYValues = sets.data.map(p => p.y ? p.y : p);
        const min = Math.min(...allYValues);
        const max = Math.max(...allYValues);
        const indexes = [];
        sets.data.forEach((v, index) => {
          const value = v.y ? v.y : v;
          if (value === min || value === max) {
            if (!indexes.includes(index)) {
              indexes.push(index);
            }
          }
        });
        return indexes;
      }
      default:
        console.error('La prop showLabels doit être une liste d\'index, "all", "edges" ou "minmax".');
        return null;
    }
  });
}