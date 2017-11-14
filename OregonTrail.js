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

//Require our gameController so that we can access the data
var game = require('./controllers/gameController');

//Create API route so we can request a screen by screenid(array index)
app.get('/game/getNewGameScreen/:screenId', function (req, res){
	var gameScreen = game.startGameScreens[req.params.screenId];
	console.log("\n this is the main node file! \n" + gameScreen);
	
	res.setHeader('Content-Type','text/html');
	res.send(gameScreen);
});

//Create API route so we can save profession
app.get('/game/saveProfession/:profession', function (req, res){
	var profession = req.params.profession;
	game.userSettings.profession = profession;
	
	if(profession === "Banker"){
		game.userSettings.money = 1000;
	}
	if(profession === "Carpenter"){
		game.userSettings.money = 900;
	}
	if(profession === "Farmer") {
		game.userSettings.money = 800;
	}
	console.log("\n this is the main node file! \n" + profession);
	
	res.setHeader('Content-Type','text/html');
	res.send(game.userSettings);
});

//Create API route so we can save player names
app.get('/game/savePlayerName/:playerId/:playerName', function (req, res){
	var playerId = req.params.playerId;
	var playerName = req.params.playerName;
	game.userSettings.playerNames[playerId] = playerName;
	
	console.log("\n this is the main node file! \n" + playerId + ": " + playerName);
	
	res.setHeader('Content-Type','text/html');
	res.send(game.userSettings);
});

//Create API route so we can save the month
app.get('/game/saveMonthChoice/:month', function (req, res){
	var month = req.params.month;
	game.userSettings.month = month;
	
	console.log("\n this is the main node file! \n" + month);
	
	res.setHeader('Content-Type','text/html');
	res.send(game.userSettings);
});

//Create API route to getSettings
app.get('/game/getSettings', function (req, res) {
	res.setHeader('Content-Type','application/json');
	res.send(game.userSettings);
});

app.listen(1337, function() {
  console.log('Example app listening on 1337');
});