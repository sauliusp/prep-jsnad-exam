#!/usr/bin/env node

"use strict";

var util = require("util");
const { spawn } = require("child_process");
const { resolve } = require('path');


// ************************************

const HTTP_PORT = 8039;
// const MAX_CHILDREN = 5;

var delay = util.promisify(setTimeout);


main().catch(console.error);


// ************************************

async function main() {
	// console.log(`Load testing http://localhost:${HTTP_PORT}...`);

	const child = spawn('node', [resolve(__dirname, 'load-tester-child.js')]);

	process.stdin.pipe(child.stdin);
	
	child.stdout.pipe(process.stdout);

	child.on('exit', code => console.log(`Child finished with code ${code}`));
}
