const req = require('./req');

describe('req module', () => {
    test('handles network errors', (done) => {
        req('ht‌tp://error.com', (err) => {
          expect(err).toStrictEqual(Error('network error'))
          done()
        })
    })

    test('responds with data', (done) => {
        req('http://example.com', (err, data) => {
            expect(err).toBeNull;
            expect(Buffer.isBuffer(data)).toBeTruthy();
            expect(data).toStrictEqual(Buffer.from(data));

            done()
        })
    });
});