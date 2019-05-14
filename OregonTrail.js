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

app.get('/trail', function (req, res) {
  res.sendFile('views/trail.html',{root: __dirname})
});

// Require our gameController so that we can access the data
let game = require('./controllers/gameController');

// Create API route so we can request a screen by screenid(array index)
app.get('/game/getNewGameScreen/:screenId', function (req, res) {
	let gameScreen = game.startGameScreens[req.params.screenId];
	res.setHeader('Content-Type','text/html');
	res.send(gameScreen);
});

// Create API route so we can save profession
app.get('/game/saveProfession/:profession', function (req, res) {
	var profession = req.params.profession;
	game.userSettings.profession = profession;

	if (profession === "Banker") {
		game.userSettings.money = 1000;
	} else if (profession === "Carpenter") {
		game.userSettings.money = 700;
	} else if (profession === "Farmer") {
		game.userSettings.money = 400;
	}

	res.setHeader('Content-Type','text/html');
	res.send(game.userSettings);
});

// Create API route so we can save player names
app.get('/game/savePlayerName/:playerId/:playerName', function (req, res) {
	let playerId = req.params.playerId;
	let playerName = req.params.playerName;
	game.userSettings.playerNames[playerId] = playerName;

	res.setHeader('Content-Type','text/html');
	res.send(game.userSettings);
});

// Create API route so we can save the month
app.get('/game/saveMonthChoice/:month', function (req, res) {
	let month = req.params.month;
	game.userSettings.month = month;

	res.setHeader('Content-Type','text/html');
	res.send(game.userSettings);
});

// Create API route to getSettings
app.get('/game/getSettings', function (res) {
	res.setHeader('Content-Type','application/json');
	res.send(game.userSettings);
});

app.listen(1337, function() {
  console.log('Example app listening on 1337');
});
