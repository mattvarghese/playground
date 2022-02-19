// Copyright (C) 2022 Varghese Mathew (Matt)
// Distributed under GNU GENERAL PUBLIC LICENSE Version 3
// See ~/license.txt for details
// Blog: https://mattvarghese-cs.blogspot.com/2022/01/minimal-typescript-react-project.html
// GitHub: https://github.com/mattvarghese/minimal-typescript-react-template

var console = require('console');
var exec = require('child_process').exec;
var os = require('os');

function puts(error, stdout, stderr) { console.log(stdout) }

// Run command depending on the OS
if (os.type() === 'Linux') 
   exec("rm -rf build node_modules", puts);
else {
    exec("rmdir /s /q node_modules", puts);
    exec("rmdir /s /q build", puts);
}