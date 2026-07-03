import { getDirectory, getWholeDirectory } from "../fileManagement/interpreter.io";
import { Block, CraftingRecipe, CreativeTab, Item, Ore, ToolTier } from "../model/interpreter.model";
import { PRIMARY_SOURCE_TEMP } from "../repository/interpreter.repository";

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