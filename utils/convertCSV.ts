import * as fs from "fs";
import { parse } from "csv-parse";

// Converts CSV file to array of objects
export async function convertCsv(pathToFile: fs.PathLike) {
  // Check if file exists
  if (!fs.existsSync(pathToFile)) {
    console.error("File does not exist");
    return null;
  }

  // Use a promise to wait for stream processing
  return new Promise((resolve, reject) => {
    const data = [];

    fs.createReadStream(pathToFile)
      .pipe(
        parse({
          columns: true,
          delimiter: ";",
          ltrim: true,
          from_line: 2,
        })
      )
      .on("data", (row) => {
        data.push(row);
      })
      .on("error", (error) => {
        console.error("Error while reading CSV file:", error);
        reject(error); // Reject the promise if an error occurs
      })
      .on("end", () => {
        console.log("CSV file successfully processed");
        resolve(data); // Resolve the promise with the data array
      });
  });
}
