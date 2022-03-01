// Copyright (C) 2022 Varghese Mathew (Matt)
// Distributed under GNU GENERAL PUBLIC LICENSE Version 3
// See ~/LICENSE for details
// GitHub: https://github.com/mattvarghese/typescript-node

import Input, { promptReadLine, promptReadLine2 } from "./input";

async function main(): Promise<void> {
    // Method 1
    const value = await promptReadLine("Enter value 1: ");
    console.log("You entered: " + value);

    // Method 2
    const val2 = await promptReadLine2("Enter value 2: ");
    console.log("You entered: " + val2);

    // Method 3 - OOP
    const input = new Input(process.stdin, process.stdout);
    const val3 = await input.ReadLine("Enter value 3: ");
    const val4 = await input.ReadLine("Enter value 4: ");
    console.log("val3: " + val3 + ", val4: " + val4);
    const val5 = await input.ReadLine("Enter value 5: ");
    console.log("You entered: " + val5);
    input.Close();
}

main();
