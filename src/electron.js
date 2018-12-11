/* eslint-disable */
const {app, BrowserWindow, protocol} = require('electron')

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600})
  // and load the index.html of the app.
  // win.loadURL('http://117.50.56.135')

  win.loadFile('dist/index.html')

  protocol.registerHttpProtocol("http", function(request, callback) {
    if(request.url == 'http://www.kdniao.com/assets/js/External/PrintOrder.js' ) {
      callback({url: 'http://localhost:3000/dist/static/printWater/printExpress.js', method: 'get'})
    } else {
      callback({url: request.url, method: request.method, uploadData: request.uploadData})
    }
  })
  var http = require('http');
  var fs = require('fs');
  var path = require('path');
  http.createServer(function(req, res){
    var filePath = '.' + request.url;
    if (filePath == './')
      filePath = './index.html';

    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
      case '.js':
        contentType = 'text/javascript';
        break;
      case '.css':
        contentType = 'text/css';
        break;
      case '.json':
        contentType = 'application/json';
        break;
      case '.png':
        contentType = 'image/png';
        break;
      case '.jpg':
        contentType = 'image/jpg';
        break;
      case '.wav':
        contentType = 'audio/wav';
        break;
    }

    fs.readFile(filePath, function(error, content) {
      if (error) {
        if(error.code == 'ENOENT'){
          fs.readFile('./404.html', function(error, content) {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
          });
        }
        else {
          response.writeHead(500);
          response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
          response.end();
        }
      }
      else {
        response.writeHead(200, { 'Content-Type': contentType });
        response.end(content, 'utf-8');
      }
    });
  }).listen(3000);
}

app.on('ready', createWindow)
