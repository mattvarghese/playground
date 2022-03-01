// Copyright (C) 2022 Varghese Mathew (Matt)
// Distributed under GNU GENERAL PUBLIC LICENSE Version 3
// See ~/LICENSE for details
// GitHub: https://github.com/mattvarghese/typescript-node

import readline from 'readline';

export async function promptReadLine2(prompt: string): Promise<string> {
    // Reference: https://stackoverflow.com/questions/33858763/console-input-in-typescript
    //            https://stackoverflow.com/questions/61394928/get-user-input-through-node-js-console
    const io = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    let answer: string | undefined;
    io.question(prompt, (result: string) => {
        answer = result;
        io.close();
    });
    while (answer === undefined) {
        // https://zellwk.com/blog/converting-callbacks-to-promises/
        await new Promise(f => setTimeout(f, 100));
    }
    return answer;
}

// Simplified version
export async function promptReadLine(prompt: string): Promise<string> {
    // Refernce: https://nodejs.dev/learn/accept-input-from-the-command-line-in-nodejs
    const io = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    // https://zellwk.com/blog/converting-callbacks-to-promises/
    const answer = await new Promise(f => {
        io.question(prompt, f);
    }) as string;
    io.close();
    return answer;
}

// Object Oriented version
export class Input {
    private io: readline.Interface;
    public constructor(stdin: NodeJS.ReadableStream, stdout?: NodeJS.WritableStream) {
        this.io = readline.createInterface(stdin, stdout);
    }
    public async ReadLine(prompt: string): Promise<string> {
        const answer = await new Promise(f => {
            this.io.question(prompt, f);
        }) as string;
        return answer;
    }
    public Close(): void {
        this.io.close();
    }
}

export default Input;
