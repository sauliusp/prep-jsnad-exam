const { spawn } = require('child_process');

const childProcesses = {
    bigChild: spawn('./long-run.js', ['big.txt'], {detached: true}),
    biggerChild: spawn('./long-run.js', ['bigger.txt'], {detached: true}),
    biggestChild: spawn('./long-run.js', ['biggest.txt'], {detached: true}),
}

Object.keys(childProcesses).forEach(key => {
    childProcesses[key].stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    childProcesses[key].stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    childProcesses[key].on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
})