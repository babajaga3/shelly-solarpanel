import Bree from 'bree';
import path from 'path';
import {fileURLToPath} from "node:url";
import breeTsWorker from '@breejs/ts-worker'

const __dirname = path.dirname(fileURLToPath(import.meta.url));

Bree.extend(breeTsWorker);
const bree = new Bree({
    logger: console,
    acceptedExtensions: ['ts'],
    jobs: [
        {
            name: 'shelly',
            path: path.join(__dirname, 'jobs', 'shelly.ts'),
            cron: '5 * * * *' // Run every hour at 5 minutes past the hour (e.g. 01:05, 02:05, etc.)
        }
    ]
})

// Start the jobs
console.log('Starting jobs...');
await bree.start();
