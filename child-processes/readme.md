# Node’s Child Processes

## Intro

Single-threaded, non-blocking performance in Node works great for a single process. But eventually, one process in one CPU is not going to be enough to handle the increasing workload of your application.

No matter how powerful your server may be, a single thread can only support a limited load.

The fact that Node runs in a single thread does not mean that we can’t take advantage of multiple processes and, of course, multiple machines as well.

Using multiple processes is the best way to scale a Node application. Node is designed for building distributed applications with many nodes. This is why it’s named Node. Scalability is baked into the platform and it’s not something you start thinking about later in the lifetime of an application.

In Node, the child_process module allows us to execute these applications and oth- ers (including Node applications) to use with our programs. Thankfully, we don’t have to re-invent the wheel.
The child_process module provides four different methods for executing exter- nal applications. All methods are asynchronous. The right method will depend on what you need.

- `execFile`: Execute an external application, given a set of arguments, and call- back with the buffered output after the process exits.
- `spawn`: Execute an external application, given a set of arguments, and provide a streaming interface for I/O and events for when the process exits.
- `exec`: Execute one or more commands inside a shell and callback with the buffered output after the process exits.
- `fork`: Execute a Node module as a separate process, given a set of arguments, provide a streaming and evented interface like spawn, and also set up an inter- process communication (IPC) channel between the parent and child process.

## spawn

The spawn function launches a command in a new process and we can use it to pass that command any arguments. For example, here’s code to spawn a new process that will execute the pwd command.

- does not create new shell, so has better perfomance than e.g. exec
- implements the EventEmitter API
- gets the three standard stdio streams, which we can access using child.stdin, child.stdout, and child.stderr, so does not have to save the whole result in memory before returning it
- The spawn function is a much better choice when the size of the data expected from the command is large because that data will be streamed with the standard IO objects. (not like exec)

```
const child = spawn("find", [".", "-type", "f"]);
```

## exec

Does create a shell. The exec function has one other major difference. It buffers the command’s generated output and passes the whole output value to a callback function (instead of using streams, which is what spawn does).

- comes with a security risk if you’re executing any kind of dynamic input provided externally, e.g. `command + '; rm -rf ~'`

```
exec("find . -type f | wc -l", (err, stdout, stderr) => {});

```

### When?

exec should be used when we need to utilize shell functionality such as pipe, redirects, backgrounding…

### Notes

The exec will execute the command in a shell which maps to /bin/sh (linux) and cmd.exe (windows)
Executing a command in a shell using exec is great. However, exec should be used with caution as shell injection can be exploited. Whenever possible, execFile should be used as invalid arguments passed to execFile will yield an error.

## fork

What?
The child_process.fork() method is a special case of child_process.spawn() used specifically to spawn new Node.js processes. Like child_process.spawn(), a ChildProcess object is returned. The returned ChildProcess will have an additional communication channel built-in that allows messages to be passed back and forth between the parent and child.
The fork method will open an IPC channel allowing message passing between Node processes:

On the child process, process.on(‘message’) and process.send(‘message to parent’) can be used to receive and send data
On the parent process, child.on(‘message’) and child.send(‘message to child’) are used
Each process has it’s own memory, with their own V8 instances assuming at least 30ms start up and 10mb each.


When?
Since Node's main process is single threaded, long-running tasks like computation will tie up the main process. As a result, incoming requests can’t be serviced and the application becomes unresponsive. Off-loading long-running tasks from the main process by forking a new Node process allows the application to serve incoming requests and stay responsive.

## execFile

What?
Executes an external application, given optional arguments and callback with the buffered output after the application exits.

ow?
In the below example, the node program will be executed with argument “–version”. When the external application exists, the callback function is called. The callback function contains the stdout and stderr output of the child process. The output stdout from the external application is buffered internally.

Running the below code will print out the current node version.

1
const execFile = require('child_process').execFile;
2
const child = execFile('node', ['--version'], (error, stdout, stderr) => {
3
    if (error) {
4
        console.error('stderr', stderr);
5
        throw error;
6
    }
7
    console.log('stdout', stdout);
8
});
How does node know where to find the external application?

It uses the PATH environment variable which specifies a set of directories where executable programs are located. If an external application exists on a PATH environment, it can be located without needing an absolute or relative path to the application.

When?
execFile is used when we just need to execute an application and get the output. For example, we can use execFile to run an image-processing application like ImageMagick to convert an image from PNG to JPG format and we only care if it succeeds or not. execFile should not be used when the external application produces a large amount of data and we need to consume that data in real time manner.

---

# Resources

https://github.com/samerbuna/efficient-node/blob/main/500-child-processes.adoc

Node.js Child Processes: Everything you need to know

https://www.freecodecamp.org/news/node-js-child-processes-everything-you-need-to-know-e69498fe970a/

Understanding execFile, spawn, exec, and fork in Node.js

very GOOD ->>>> https://dzone.com/articles/understanding-execfile-spawn-exec-and-fork-in-node

Child processes: Integrating external applications with Node

https://livebook.manning.com/book/node-js-in-practice/chapter-8/

# What are the major differences between spawn, exec, and fork?
