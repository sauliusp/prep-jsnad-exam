const { EventEmitter, once } = require("events");

class Emitter extends EventEmitter {
  constructor(opts = {}) {
    super(opts);
    this.name = opts.name;
  }

  messages = []

  emit(evenName, ...args) {
    super.emit(evenName, ...args);

    this.messages.push(...args);

    console.log(`messages so far: ${this.messages}`);
  }

  destroy (err) {
    if (err) { this.emit('error', err) }
    this.emit('close')
  }
}

const emitter = new Emitter();

emitter.on('some-event', console.log);

emitter.emit('some-event', 'test', 'some', 'things')
emitter.emit('some-event', 'test', 'some', 'things')
emitter.emit('some-event', 'test', 'some', 'things')
emitter.emit('some-event', 'test', 'some', 'things')

const intervalID = setInterval(() => {
    emitter.emit('some-event', 'test', 'some', 'things')
  }, 200)

  setTimeout(() => {
    clearInterval(intervalID);
  }, 1500)
