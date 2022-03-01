// Copyright (C) 2022 Varghese Mathew (Matt)
// Distributed under GNU GENERAL PUBLIC LICENSE Version 3
// See ~/LICENSE for details
// GitHub: https://github.com/mattvarghese/typescript-node

const echo = function (): void {
    process.stdout.write("The echo program !\n");
    process.stdin.on('readable', () => {
        let chunk;
        // Use a loop to make sure we read all available data.
        while ((chunk = process.stdin.read()) !== null) {
            process.stdout.write(`data: ${chunk}`);
        }
    });
}

export default echo;