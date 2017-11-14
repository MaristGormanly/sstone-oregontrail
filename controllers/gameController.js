//initialize exports, this is where other node files will look for the data
var exports = module.exports = {};

//Create empty array for start screens and add to exports
exports.startGameScreens = [];

//Function to create gameSettings Object
function gameSettings(){
	this.profession = "";
	this.playerNames = ["","","","",""]
	this.money = 0;
	this.month = "";
}

//Create empty json object for userSettings and add to exports
exports.userSettings = new gameSettings();

//screen 1
var startGame1 = "<p>Many kinds of people made the trip trip to Oregon.</p>"
	+ "<p>You may:</p>"
	+ "<ol id=\"setupQuestions1\" >"
	+ "<li id=\"bankerMenuItem\">Be a banker from Boston</li>"
	+ "<li id=\"carpenterMenuItem\">Be a carpenter from Ohio</li>"
	+ "<li id=\"farmerMenuItem\">Be a farmer from Illinois</li>"
	+ "<li id=\"differencesMenuItem\">Find out the differences between the choices</li>"
	+ "</ol>"
	+ "<div id=\"selectedOption\">What is your choice?</div>";

exports.startGameScreens.push(startGame1);

//screen 2
var startGame2 = "<p>What is your name?</p>" + 
	"Wagon Leader: <input type=\"text\" id=\"playerName1\" >" +
	"<p>What are your fellow traveller's names?</p>" +
	"Traveller 1: <input type=\"text\" id=\"playerName2\"><br>" +
	"Traveller 2: <input type=\"text\" id=\"playerName3\"><br>" +
	"Traveller 3: <input type=\"text\" id=\"playerName4\"><br>" +
	"Traveller 4: <input type=\"text\" id=\"playerName5\"><br>" +
	"<button id=\"submitButton\" type=\"button\">Submit</button>";

exports.startGameScreens.push(startGame2);

//screen 3
var startGame3 = "<p>What month would you like to leave?</p>" +
	"<ol id=\"setupQuestion1\" >" +
	"<li id=\"marchOption\" >March</li>" +
	"<li id=\"aprilOption\" >April</li>" +
	"<li id=\"mayOption\" >May</li>" +
	"<li id=\"juneOption\" >June</li>" +
	"<li id=\"julyOption\" >July</li>" +
	"</ol>"
	
exports.startGameScreens.push(startGame3);

//screen 3
var startGame4 = "<p>Congratulations! You are ready to travel the Oregon Trail!</p>" +
	"<p>Here are your settings for the game</p>" +
	"<ul id=\"settingsList\" >" +
	"<li id =\"wagonLeader\" ></li>" +
	"<li id =\"member1\" ></li>" +
	"<li id =\"member2\" ></li>" +
	"<li id =\"member3\" ></li>" +
	"<li id =\"member4\" ></li>" +
	"<li id =\"profession\" ></li>" +
	"<li id =\"bankAmount\" ></li>" +
	"<li id = \"monthLeaving\" ></li>";
	
exports.startGameScreens.push(startGame4);