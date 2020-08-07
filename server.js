const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {
    // lodash
    const num = _.random(0, 20);
    console.log('random num', num);

    const greet = _.once(() => {
        console.log('hello');
    });

    var htmlFile = './views/';
    // check url request
    switch(req.url){
        case '/':
            htmlFile += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            htmlFile += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-me':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            htmlFile += '404.html';
            res.statusCode = 404;
            break;
    }

    // set header content type
    res.setHeader('Content-Type', 'text/html');
    fs.readFile(htmlFile, (err, data) => {
        if(err){
            console.log(err);
        }
        else{
            res.write(data);
        }
        res.end();
    });
});

server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000');
});