import { join } from "node:path";
import { getIgnoredDirs } from "../fileManagement/interpreter.io";
import { Directory, File } from "../model/interpreter.model";

export const PRIMARY_SOURCE_TEMP = join("..", "..", "testData");

export async function getIgnoredDirsSet() {
    return new Set(await getIgnoredDirs());
}

export async function getDirectory(name: string, parentDir: Directory): Promise<Directory | undefined> {
    const IGNORED_DIRS = await getIgnoredDirsSet();
    if (parentDir.name === name) return parentDir;
    if (IGNORED_DIRS.has(parentDir.name)) return undefined;

    let dirs = parentDir.directories;

    for (const directory of parentDir.directories) {
        if (IGNORED_DIRS.has(directory.name)) {
            continue;
        }

        const foundDirectory = getDirectory(name, directory);

        if (foundDirectory !== undefined) {
            return foundDirectory;
        }
    }

    return undefined;
}

export async function findFile(name: string, parentDir: Directory): Promise<File> {
    const matches: File[] = [];
    const IGNORED_DIRS = await getIgnoredDirsSet();

    function search(dir: Directory): void {
        for (const file of dir.files) {
            if (file.name === name) {
                matches.push(file);
            }
        }

        for (const subDir of dir.directories) {
            if (IGNORED_DIRS.has(subDir.name)) {
                continue;
            }

            search(subDir);
        }
    }

    search(parentDir);

    if (matches.length > 1) {
        throw new Error(`cannot differentiate between files. File with name '${name}' appears ${matches.length} times in given directory!`);
    }

    return matches[0];
}