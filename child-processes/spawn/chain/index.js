#!/usr/bin/env node

var cp = require('child_process');
var path = require('path');

var cat = cp.spawn('cat', [path.resolve(__dirname, 'messy.txt')]);
// var cat = cp.spawn('cat', ['messy.txt']);
var sort = cp.spawn('sort');
var uniq = cp.spawn('uniq');

// cat.stderr.on("data", error => console.error(`${error}`));

cat.stdout.pipe(sort.stdin);
sort.stdout.pipe(uniq.stdin);
uniq.stdout.pipe(process.stdout);

// ---

// const { spawn } = require("child_process");

// const find = spawn("find", [__dirname, "-type", "f"]);
// // const find = spawn("find", [".", "-type", "f"]);
// const wc = spawn("wc", ["-l"]);

// find.stdout.pipe(wc.stdin);

// wc.stdout.on("data", data => {
//   console.log(`Number of files ${data}`);
// });