import fs from 'fs';
import { processData } from "../utils/processData";


const now = new Date().toISOString().split("T")[0]
const nowHours = new Date().getHours()
const jsonFilePath = `./json/${now}.json`

console.log('Checking if there is a JSON file for today...', jsonFilePath);

// Check if there is a JSON file for the current day
if (!fs.existsSync(jsonFilePath)) {
    console.log(!fs.existsSync(`./json/${now}.json`))
    console.log('No JSON file for today, downloading...');
    await processData()
}

// Read the JSON file
const data = fs.readFileSync(`./json/${now}.json`, 'utf8');
const parsedData = JSON.parse(data);

// Check value based on the current hour
const command = parsedData[nowHours] === 1 ? 'ON' : 'OFF';
console.log(command, 'command sent to Shelly');