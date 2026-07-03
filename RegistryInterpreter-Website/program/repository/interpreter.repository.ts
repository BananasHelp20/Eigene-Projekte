import { join } from "node:path";
import { getIgnoredDirs } from "../fileManagement/interpreter.io";

export const PRIMARY_SOURCE_TEMP = join("..", "..", "testData");

export async function getIgnoredDirsSet() {
  return new Set(await getIgnoredDirs());
}