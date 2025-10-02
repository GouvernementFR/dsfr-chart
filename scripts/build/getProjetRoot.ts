import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function getProjectRootRec(dirPath: string): string {
    if (fs.existsSync(path.join(dirPath, "package.json"))) {
        return dirPath;
    }
    return getProjectRootRec(path.join(dirPath, ".."));
}

let result: string | undefined = undefined;

export function getProjectRoot(): string {
    if (result !== undefined) {
        return result;
    }

    return (result = getProjectRootRec(__dirname));
}
