import fs from 'fs';
import path from "path";
import { readdir, stat } from "fs/promises";

async function main(): Promise<void> {
    let data = fs.readdirSync(".");

    data.forEach(element => {
        console.log(element);
    });

    let stat = fs.statSync(".");
    console.log("BirthTime: " + stat.birthtime);
    console.log("IsFile: " + stat.isFile());
    console.log("Size: " + await dirSize(".") + " bytes");
}

const dirSize = async (directory: string) => {
    const files = await readdir(directory);
    const stats = files.map(file => stat(path.join(directory, file)));
    return (await Promise.all(stats)).reduce((accumulator, { size }) => accumulator + size, 0);
}

main();