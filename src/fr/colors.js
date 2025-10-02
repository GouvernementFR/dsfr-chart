import { colorOptions } from "./generatedFromCss/colorOptions";
import { getColorOptionsHex } from "./generatedFromCss/getColorOptionsHex";
import { colorDecisions } from "./generatedFromCss/colorDecisions";
import { getColorDecisionsHex } from "./generatedFromCss/getColorDecisionsHex";

export const colors = {
  "options": colorOptions,
  "decisions": colorDecisions,
  "getHex": (() => {
    const getHex = ({ isDark }) => {
      const options = getColorOptionsHex({ isDark });

      const decisions = getColorDecisionsHex({ "colorOptions": options });

      return {
        options,
        decisions
      };
    };

    const cache = {
      "light": undefined,
      "dark": undefined
    };

    return ({ isDark }) => (cache[isDark ? "dark" : "light"] ??= getHex({ isDark }));
  })()
};
