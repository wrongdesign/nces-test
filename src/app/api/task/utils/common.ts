import * as fs from "node:fs";
import path from "node:path";

export const readFile = (filePath: string) => {
    const fullPath = path.join(
        process.cwd(),
        filePath
    )

    return JSON.parse(fs.readFileSync(fullPath, "utf8"));
}

export const writeFile = <T>(filePath: string, data: T) => {
    const fullPath = path.join(
        process.cwd(),
        filePath
    )

    fs.writeFileSync(fullPath, JSON.stringify(data, null, 2));
}