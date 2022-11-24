#!/usr/bin/env node

const fs = require('fs');
const { Transform } = require('stream');

const read = fs.createReadStream(`./${process.argv[2]}`);

class LargeTextTransformer extends Transform {
   chunkCount = 0;

   count() {
      this.chunkCount++;
   }

   _transform(chunk, encoding, callback) {
      this.count();

      this.push(`
      --
      Chunk number: ${this.chunkCount}
      --
      File: ${process.argv[2]}
      --
      ${chunk.toString().toUpperCase()}
      --
      `);

      callback();
   }
}

const textTransformer = new LargeTextTransformer();

read.pipe(textTransformer).pipe(process.stdout);