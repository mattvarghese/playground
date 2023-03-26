//import fs from 'fs';  // prefer promises version in TypeScript
import fs from "fs/promises";
import { Stats } from "fs";
import path from "path";
import os from 'os';

async function main(): Promise<void> {
    const data = await fs.readdir(".");

    data.forEach(element => {
        console.log(element);
    });

    const stat = await fs.stat(".");
    console.log("\nBirthTime: " + stat.birthtime);
    console.log("IsFile: " + stat.isFile());
    console.log("Size: " + await dirSize(".") + " bytes");

    writeOSInfo();

    pathParsingExampe();

    processExample();
}

const dirSize = async (directory: string) => {
    const files = await fs.readdir(directory);
    let size: number = 0;
    for (const file of files) {
        const filePath = path.join(directory, file);
        const stat = await fs.stat(filePath);
        if (stat.isFile()) {
            size += stat.size;
        } else {
            size += await dirSize(filePath);
        }
    }
    return size;
}

const dirSizeBad = async (directory: string) => {
    const files = await fs.readdir(directory);
    const stats = files.map(file => fs.stat(path.join(directory, file)));
    return (await Promise.all(stats)).reduce((accumulator, { size }) => accumulator + size, 0);
}

function writeOSInfo() {
    const cpus = os.cpus();
    for (const cpu of cpus) {
        console.log("\nCPU:");
        console.log(" Model: " + cpu.model);
        console.log(" Model: " + cpu.speed);
        console.log(" Model: " + JSON.stringify(cpu.times, null, 2));
    }
    console.log("\nOS Total Memory: " + os.totalmem() + ", Free Mmeory: " + os.freemem() + " bytes");
}

function pathParsingExampe() {
    const filename = "/home/users/mydata/accounts.dat";
    const result = path.parse(filename);
    console.log("\nParsing " + filename + " gives: ");
    console.log(JSON.stringify(result, null, 2));
}

function processExample() {
    // Process is the only module that doesn't need to be imported (??)
    // Actually console module also doesn't need to be imported
    console.log("\nEnvironment variables:");
    console.log(JSON.stringify(process.env, null, 2));
}

main();