// Polyfill types

export declare const colorOptions: Record<string, any>;
export declare function getColorOptionsHex(): Record<string, any>;

export type ColorOptions<Format extends "css var" | "hex"= "css var"> = 
  Format extends "css var" ? typeof colorOptions : ReturnType<typeof getColorOptionsHex>;

export type Colors = {
  options: ColorOptions<"css var">;
  decisions: ColorDecisions<"css var">;
  getHex: (params: { isDark: boolean }) => {
    options: ColorOptions<"hex">;
    decisions: ColorDecisions<"hex">;
  };
};

export const fr = {
  colors: {} as Colors,
};
