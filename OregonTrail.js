const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile('views/index.html',{root: __dirname})
});

app.get('/mainmenu', function (req, res) {
  res.sendFile('views/mainmenu.html',{root: __dirname})
});

app.get('/top10', function (req, res) {
  res.sendFile('views/top10.html',{root: __dirname})
});

app.get('/game', function (req, res) {
  res.sendFile('views/game.html',{root: __dirname})
});

app.listen(1337, function() {
  console.log('Example app listening on 1337');
});

