// const { createServer } = require('http')
// const { Readable, Transform, pipeline } = require('stream')
// const { opendir, readdir } = require('fs')
// const through = require('through2');

// const createEntryStream = () => {
//   let syntax = '[\n'

//   const write = function(chunk, _, next) {
//     next(null, `${syntax} "${chunk.name}"`);

//     syntax = ',\n'
//   } 

//   const end = function() {
//     this.push('\n]\n')
//   }

//   return through({objectMode: true}, write, end);
// }

// createServer((req, res) => {
//   if (req.url !== '/') {
//     res.statusCode = 404
//     res.end('Not Found')
//     return
//   }
//   opendir(__dirname, (err, dir) => {
//     if (err) {
//       res.statusCode = 500
//       res.end('Server Error')
//       return
//     }

//     const dirStream = Readable.from(dir)
//     const entryStream = createEntryStream()
//     res.setHeader('Content-Type', 'application/json')
//     pipeline(dirStream, entryStream, res, (err) => {
//       if (err) console.error(err)
//     })
//   })
// }).listen(4555)


// NATIVE APPROACH

const { createServer } = require('http')
const { Readable, Transform, pipeline } = require('stream')
const { opendir } = require('fs')


const createEntryStream = () => {
  let syntax = '[\n'
  return new Transform({
    objectMode: true,
    transform (entry, enc, next) {
      next(null, `${syntax} "${entry.name}"`)
      syntax = ',\n'
    },
    final (cb) {
      this.push('\n]\n')
      cb()
    }
  })
}

createServer((req, res) => {
  if (req.url !== '/') {
    res.statusCode = 404
    res.end('Not Found')
    return
  }
  opendir(__dirname, (err, dir) => {
    if (err) {
      res.statusCode = 500
      res.end('Server Error')
      return
    }
    const dirStream = Readable.from(dir)
    const entryStream = createEntryStream()
    res.setHeader('Content-Type', 'application/json')
    pipeline(dirStream, entryStream, res, (err) => {
      if (err) console.error(err)
    })
  })
}).listen(4555)