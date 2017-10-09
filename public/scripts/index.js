const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile('views/index.html',{root: __dirname})
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(1337, function() {
  console.log('Example app listening on 1337');
});
