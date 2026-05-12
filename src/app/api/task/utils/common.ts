import * as fs from "node:fs";

export const readFile = (path: string) => {
    return JSON.parse(fs.readFileSync(path, "utf8"));
}

export const writeFile = <T>(path: string, data: T) => {
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
}