import path from "path";
import fs from "node:fs"



export async function path_exist(path) {
  try {
      return await fs.existsSync(path);
  } catch (error) {
      console.error({error});
      return false;
  }
}


export function basename(filepath) {
  return path.basename(filepath);
}




