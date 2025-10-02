import { generateBreakpointsTsCode } from "./breakpoints";
import { generateGetColorDecisionsHexTsCode, generateColorDecisionsTsCode } from "./colorDecisions";
import { generateGetColorOptionsHexTsCode, generateColorOptionsTsCode } from "./colorOptions";
import { getProjectRoot } from "../getProjetRoot";
import { generateSpacingTsCode } from "./spacing";
import { generateClassNamesTsCode } from "./classNames";
import { generateColorDecisionAndCorrespondingOptionsTsCode } from "./colorDecisionAndCorrespondingOptions";
import * as fs from "fs";
import { join as pathJoin, relative as pathRelative } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

export function cssToTs(params: {
    rawDsfrCssCode: string;
    generatedDirPath: string;
}) {
    const { rawDsfrCssCode, generatedDirPath } = params;

    fs.mkdirSync(generatedDirPath, { "recursive": true });

    const warningMessage = [
        `// This file is generated automatically by ${pathRelative(
            getProjectRoot(),
            __filename
        )}, please don't edit.`
    ].join("\n");

    const targetGetColorOptionsHexFilePath = pathJoin(generatedDirPath, "getColorOptionsHex.js");

    fs.writeFileSync(
        targetGetColorOptionsHexFilePath,
        Buffer.from(
            [warningMessage, ``, generateGetColorOptionsHexTsCode(rawDsfrCssCode), ``].join("\n"),
            "utf8"
        )
    );

    const targetColorOptionsFilePath = pathJoin(generatedDirPath, "colorOptions.js");

    fs.writeFileSync(
        targetColorOptionsFilePath,
        Buffer.from(
            [
                warningMessage,
                ``,
                generateColorOptionsTsCode(rawDsfrCssCode),
                ``
            ].join("\n"),
            "utf8"
        )
    );

    const targetGetColorDecisionsHexFilePath = pathJoin(
        generatedDirPath,
        "getColorDecisionsHex.js"
    );

    fs.writeFileSync(
        targetGetColorDecisionsHexFilePath,
        Buffer.from(
            [
                warningMessage,
                ``,
                generateGetColorDecisionsHexTsCode(rawDsfrCssCode),
                ``
            ].join("\n"),
            "utf8"
        )
    );

    const targetColorDecisionsFilePath = pathJoin(generatedDirPath, "colorDecisions.js");

    fs.writeFileSync(
        targetColorDecisionsFilePath,
        Buffer.from(
            [
                warningMessage,
                ``,
                generateColorDecisionsTsCode(rawDsfrCssCode),
                ``
            ].join("\n"),
            "utf8"
        )
    );

    fs.writeFileSync(
        pathJoin(generatedDirPath, "breakpoints.js"),
        Buffer.from(
            [warningMessage, ``, generateBreakpointsTsCode(rawDsfrCssCode)].join("\n"),
            "utf8"
        )
    );
    
    fs.writeFileSync(
        pathJoin(generatedDirPath, "spacing.js"),
        Buffer.from(
            [warningMessage, ``, generateSpacingTsCode(rawDsfrCssCode), ``].join("\n"),
            "utf8"
        )
    );

    fs.writeFileSync(
        pathJoin(generatedDirPath, "classNames.js"),
        Buffer.from(
            [
                warningMessage,
                ``,
                generateClassNamesTsCode({
                    "rawCssCode": rawDsfrCssCode,
                }),
                ``
            ].join("\n"),
            "utf8"
        )
    );

    fs.writeFileSync(
        pathJoin(generatedDirPath, "colorDecisionAndCorrespondingOptions.js"),
        Buffer.from(
            [
                warningMessage,
                ``,
                generateColorDecisionAndCorrespondingOptionsTsCode(rawDsfrCssCode),
                ``
            ].join("\n"),
            "utf8"
        )
    );
}
