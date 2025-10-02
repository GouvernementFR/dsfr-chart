import memoize from "memoizee";
import { parseCss } from "../parseCss";

export const parseClassNames = memoize((rawCssCode: string): string[] => {
    const parsedCss = parseCss(rawCssCode);

    const classNames = new Set<string>();

    JSON.stringify(parsedCss, (key, value) => {
        if (key === "selectors") {
            const selectors = value as string[];

            selectors.forEach((selector: string) => {
                const matchArr: string[] | null = selector.match(/\.fr-[a-zA-Z0-9_-]+(?:@[a-zA-Z0-9_-]+)?/g);
                if (matchArr === null) {
                    return;
                }

                matchArr
                    .map((matchedStr: string) => matchedStr.replace(/^\./, ""))
                    .forEach((className: string) => classNames.add(className));
            });
        }
        return value;
    });

    return Array.from(classNames);
});

export function generateClassNamesTsCode(params: {
    rawCssCode: string;
}): string {
    const { rawCssCode } = params;

    const classNames = parseClassNames(rawCssCode);

    return [
        `export const frCoreClassNames= ${JSON.stringify(classNames, null, 4)};`,
        ``
    ].join("\n");
}
