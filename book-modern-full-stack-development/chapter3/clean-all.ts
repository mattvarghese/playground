// Copyright (C) 2022 Varghese Mathew (Matt)

import { exec } from 'child_process';
import * as os from 'os';

function puts(_error, stdout, _stderr) {
    console.log(stdout);
}

// Run command depending on the OS
if (os.type() === 'Linux') {
    exec("rm -rf dist node_modules", puts);
    exec("rm package-lock.json", puts);
    exec("rm clean-all.js", puts);
}
else {
    exec("rmdir /s /q node_modules", puts);
    exec("rmdir /s /q dist", puts);
    exec("del package-lock.json", puts);
    exec("del clean-all.js", puts);
}