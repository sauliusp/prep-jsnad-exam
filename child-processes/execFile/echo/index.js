const {execFile} = require('child_process');
const {promisify} = require('util');

const execFileProm = promisify(execFile);

// execFile('echo', ['hello', 'world'],
//     function (err, stdout, stderr) {
//         if (err) console.error(err);
//         console.log('stdout', stdout);
//         console.log('stderr', stderr);
//     });


execFileProm('echo', ['hello', 'world'])
    .then(res => {
        console.log('stdout', res.stdout);
        console.log('stderr', res.stderr);
    })
    .catch(err => {
        console.error(err);
    });