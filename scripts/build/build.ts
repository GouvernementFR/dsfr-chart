/**
 * This script is based on the dsfr implementation in the react-dsfr project.
 * This version of the script generates .js files instead of .ts files to match
 * this project setup.
 * 
 * {@link https://github.com/Maxenceee/react-dsfr/blob/main/scripts/build/build.ts React DSFR}
 */
import { getProjectRoot } from "./getProjetRoot";
import { join as pathJoin } from "path";
import * as fs from "fs";
import { cssToTs } from "./cssToTs";

(async () => {
		const projectRootDirPath = getProjectRoot();

		const dsfrDirPath = pathJoin(projectRootDirPath, "dsfr");

		if (fs.existsSync(dsfrDirPath)) {
			fs.rmSync(dsfrDirPath, { "recursive": true, "force": true });
		}

		const nodeModuleDirPath = pathJoin(projectRootDirPath, "node_modules");

		fs.cpSync(pathJoin(nodeModuleDirPath, "@gouvfr", "dsfr", "dist"), dsfrDirPath, {
			"recursive": true
		});

		{
			const filePath = pathJoin(dsfrDirPath, "dsfr.css");

			const dsfrCssContent = fs.readFileSync(filePath).toString("utf8");

			const dsfrCssContent_patched = dsfrCssContent.replace('@charset "UTF-8";', "");

			fs.writeFileSync(filePath, Buffer.from(dsfrCssContent_patched, "utf8"));
		}

		const rawDsfrCssCode = fs.readFileSync(pathJoin(dsfrDirPath, "dsfr.css")).toString("utf8");

		const distDirPath = pathJoin(projectRootDirPath, "dist");

		if (fs.existsSync(distDirPath)) {
			fs.rmSync(distDirPath, { "recursive": true, "force": true });
		}

		cssToTs({
			"generatedDirPath": pathJoin(projectRootDirPath, "src", "fr", "generatedFromCss"),
			rawDsfrCssCode
		});
})();
