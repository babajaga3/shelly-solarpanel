import { downloadCSV } from "../utils/downloadCSV";
import { convertCSV } from "../utils/convertCSV";
import { saveJSON } from "../utils/saveJSON";
import * as fs from "fs";
import { CsvRecord } from "../types";

const today = new Date().toISOString().split("T")[0];
let commandArray: number[] = [];

// Download CSV file with data if it does not exist
if (!fs.existsSync(`./downloads/DAM Result for_ ${today}.csv`)) {
  await downloadCSV();
}

/**
 * Convert CSV file to JSON
 * For every entry in the data array,
 * push the command number to the commandArray based on the 'Price (BGN)'
 * 0 - Off; 1 - On
*/
await convertCSV(`./downloads/DAM Result for_ ${today}.csv`).then((data: CsvRecord[]) => {
  data.forEach((entry) => {
    if (parseFloat(entry["Price (BGN)"]) < 7) {
      commandArray.push(0);
    } else {
      commandArray.push(1);
    }
  });
});

// Save data as JSON file
await saveJSON(commandArray);