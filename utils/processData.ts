import { downloadCsv } from "./downloadCsv";
import { convertCsv } from "./convertCsv";
import { saveJson } from "./saveJson";
import * as fs from "fs";
import { CsvRecord } from "../types";

export async function processData() {
  const today = new Date().toISOString().split("T")[0];
  const filePath = `./downloads/DAM Result for_ ${today}.csv`;
  let commandArray: number[] = [];

  try {
    // Download CSV file with data if it does not exist
    if (!fs.existsSync(filePath)) {
      console.log('Could not find file, downloading...');
      await downloadCsv();
      console.log('Download complete');
    }

    // Convert CSV file to JSON
    console.log('Converting CSV to JSON...');
    const data: CsvRecord[] = await convertCsv(filePath);

    // Process each entry in the data array
    commandArray = data.map(entry =>
        parseFloat(entry["Price (BGN)"]) < 7 ? 0 : 1
    );

    console.log('Conversion complete');

    // Save data as JSON file
    console.log('Saving data as JSON...');
    await saveJson(commandArray);
    console.log('Data saved as JSON');

  } catch (error) {
    console.error('An error occurred during the process:', error);
  }
}
