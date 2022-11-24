#!/usr/bin/env node

var cp = require('child_process');
const path = require('path');

// cp.exec(`cat messy.txt | sort | uniq`, (err, stdout, stderr) => {
//     console.log(`stdoud: ${stdout}`);
//     console.log(`stderr: ${stderr}`);
// });

cp.exec(`cat ${path.resolve(__dirname, 'messy.txt')} | sort | uniq`, (err, stdout, stderr) => {
    console.log(`stdoud: ${stdout}`);
    console.log(`stderr: ${stderr}`);
});