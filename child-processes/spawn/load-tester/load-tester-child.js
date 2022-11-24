"use strict";

// var fetch = require("node-fetch");


// ************************************

const HTTP_PORT = 8039;


main().catch(() => 1);


// ************************************

async function main() {
	// TODO

	process.stdin.pipe(process.stdout);

	process.stdout.write(`hello\n`)
}
