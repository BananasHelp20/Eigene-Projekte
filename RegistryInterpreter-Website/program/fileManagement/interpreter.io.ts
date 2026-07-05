import { readdir, readFile } from "fs/promises";
import { basename, join } from "path";
import type { CraftingRecipe, CreativeTab, Directory, File, Item, Ore, ToolTier } from "../model/interpreter.model";
import { getIgnoredDirsSet, PRIMARY_SOURCE_TEMP } from "../repository/interpreter.repository";
import { Block } from "typescript";

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

export async function writeTabCode(tabs: CreativeTab[]) {
    let parentDir = await getWholeDirectory(PRIMARY_SOURCE_TEMP);
    //alle relevanten files einlesen und dann ois zusammensetzen.
}

export async function writeBlockCode(blocks: Block[]) {
    let parentDir = await getWholeDirectory(PRIMARY_SOURCE_TEMP);
}

export async function writeItemCode(items: Item[]) {
    let parentDir = await getWholeDirectory(PRIMARY_SOURCE_TEMP);
}

export async function writeRecipeCode(recipes: CraftingRecipe[]) {
    let parentDir = await getWholeDirectory(PRIMARY_SOURCE_TEMP);
}

export async function writeToolTierCode(tiers: ToolTier[]) {
    let parentDir = await getWholeDirectory(PRIMARY_SOURCE_TEMP);
}

export async function writeOreCode(ores: Ore[]) {
    let parentDir = await getWholeDirectory(PRIMARY_SOURCE_TEMP);
}