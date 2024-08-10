import { downloadCsv } from "./downloadCsv";
import { convertCsv } from "./convertCsv";
import { saveJson } from "./saveJson";
import * as fs from "fs";
import { CsvRecord } from "../types";

export async function processData() {
  const today = new Date().toISOString().split("T")[0];
  let commandArray: number[] = [];

  // Download CSV file with data if it does not exist
  if (!fs.existsSync(`./downloads/DAM Result for_ ${today}.csv`)) {
    console.log('Could not find file, downloading...');
    await downloadCsv();
    console.log('Download complete');
  }

  /**
   * Convert CSV file to JSON
   * For every entry in the data array,
   * push the command number to the commandArray based on the 'Price (BGN)'
   * 0 - Off; 1 - On
   */
  console.log('Converting CSV to JSON...');
  await convertCsv(`./downloads/DAM Result for_ ${today}.csv`).then((data: CsvRecord[]) => {
    data.forEach((entry) => {
      if (parseFloat(entry["Price (BGN)"]) < 7) {
        commandArray.push(0);
      } else {
        commandArray.push(1);
      }
    });
    console.log('Conversion complete');
  });

  // Save data as JSON file
  console.log('Saving data as JSON...');
  await saveJson(commandArray);
  console.log('Data saved as JSON');
}