const { once, EventEmitter } = require('events')
const { setTimeout } = require('timers/promises')

const uneventful = new EventEmitter()

// const run = async () => {
//     try {
//         await once(uneventful, 'ping')
//         console.log('pinged!')
//       } catch (err) {
//         // ignore abort errors:
//         if (err.code !== 'ABORT_ERR') throw err
//         console.log('canceled')
//       }
// }

// WITH ABORT CONTROLLER

const ac = new AbortController()
const { signal } = ac

setTimeout(1500).then(() => ac.abort())

const run = async () => {
    try {
        await once(uneventful, 'ping', { signal })
        console.log('pinged!')
      } catch (err) {
        // ignore abort errors:
        if (err.code !== 'ABORT_ERR') throw err
        console.log('canceled')
      }
}

run()

setTimeout(2000).then(() => uneventful.emit('ping'))