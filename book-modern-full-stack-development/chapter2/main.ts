//import fs from 'fs';  // prefer promises version in TypeScript
import fs from "fs/promises";
import { Stats } from "fs";
import path from "path";

async function main(): Promise<void> {
    const data = await fs.readdir(".");

    data.forEach(element => {
        console.log(element);
    });

    const stat = await fs.stat(".");
    console.log("\nBirthTime: " + stat.birthtime);
    console.log("IsFile: " + stat.isFile());
    console.log("Size: " + await dirSize(".") + " bytes");
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

main();