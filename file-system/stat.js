const {lstatSync, statSync, lstat} = require('fs');
const {promisify} = require('util');

const stat = statSync(__dirname);

console.log(lstatSync(__dirname));
console.log(statSync(__dirname));
console.log(lstatSync(__filename));

const lstatProm = promisify(lstat);

lstatProm(__filename).then(console.log)