const {lstatSync,  lstat} = require('fs');
const {promisify} = require('util');

console.log(lstatSync(__dirname));
console.log(lstatSync(__filename));

const lstatProm = promisify(lstat);

lstatProm(__filename).then(console.log)