import { readdir, readFile } from "fs/promises";
import { basename, join } from "path";
import type { Directory, File } from "../model/interpreter.model";
import { getIgnoredDirsSet } from "../repository/interpreter.repository";

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

export async function getIgnoredDirs(): Promise<string[]> {
    const rawContent = await readFile(join("..", "repository", "ignored-dirs.txt"), "utf8");
    const content = rawContent.split(/\r?\n/);
    return content.filter((line) => line.trim() !== "");
}

export async function getWholeDirectory(dirPath: string): Promise<Directory> {
    const IGNORED_DIRS = await getIgnoredDirsSet();
    const entries = await readdir(dirPath, { withFileTypes: true });
    const files: File[] = [];
    const directories: Directory[] = [];

    for (const entry of entries) {
        if (entry.isDirectory()) {
            if (IGNORED_DIRS.has(entry.name)) {
                continue;
            }
            const subdirPath = join(dirPath, entry.name);
            directories.push(await getWholeDirectory(subdirPath));
            continue;
        }

        if (entry.isFile()) {
            const filePath = join(dirPath, entry.name);
            const rawContent = await readFile(filePath, "utf8");
            const content = rawContent.split(/\r?\n/);
            files.push({
                name: entry.name,
                path: filePath,
                content,
            });
        }
    }

    return {
        name: basename(dirPath),
        path: dirPath,
        files,
        directories,
    };
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