const pdf = require('pdfkit');
const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    if (req.url !== '/') {
        res.statusCode = 404;
        return res.end('Page not found')
    }

    res.setHeader('Content-Type', 'application/pdf');

    const doc = new pdf();

    doc.pipe(res);

    doc
    .text(fs.readdirSync(__dirname).join(', '))
    .end()

}).listen(4555);