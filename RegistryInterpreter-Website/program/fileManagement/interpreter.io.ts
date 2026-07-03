import { opendir, readdir } from "fs/promises";
import fs from 'fs';

export async function readCustomBlocks(path: string, fileCount: number) { //:[{ fileName: string; filePath: string; content: string }]
    let files = await readdir(path);
    let fileObjects = [];

    for (let i = 0; i < files.length; i++) {
        fileObjects[i] = {
        };
    }
}