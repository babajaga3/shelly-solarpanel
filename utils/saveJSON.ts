import { writeFileSync, type PathLike, existsSync, mkdirSync } from 'fs';
import { resolve } from 'path'; 

const today = new Date().toISOString().split('T')[0];

export async function saveJSON(data: object) {
  // Fetch or create json directory
  const pathToFile = resolve('./json');
  if (!existsSync(pathToFile)) {
    mkdirSync(pathToFile);
  }

  try {
    writeFileSync(`${pathToFile}/${today}.json`, JSON.stringify(data, null, 2));
    console.log('Data successfully converted to JSON');
  }
  catch (error) {
    console.error('Error while converting data to JSON');
    throw error;
  }
}
