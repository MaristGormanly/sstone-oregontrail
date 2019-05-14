// Check if user has Javascript capability
if (document.addEventListener) {
	// Call gameScreen(0) when page loads
	let currentGameScreen;
	window.addEventListener("load", () => {
			gameScreen(0);
			currentGameScreen = 0;
	});
	
	let profession;
	// Listen for key presses
	document.addEventListener('keypress', (event) => {
		const keyName = event.keyCode;
		
		// Check for current gameScreen
		if (currentGameScreen === 0) { 
			if (keyName === 32) {
				location.replace("mainmenu");
			} // Check for 1 keypress
			else if (keyName === 49) {
				profession = "Banker";
				professionChoice(profession);
			} // Check for 2 keypress
			else if (keyName === 50) {
				profession = "Carpenter";
				professionChoice(profession);
			} //Check for 3 keypress
			else if (keyName === 51) {
				profession = "Farmer";
				professionChoice(profession);
			}			
		}
		if (currentGameScreen === 2) {
			let month;
			// Check for 1 keypress
			if (keyName === 49) {
				month = "March";
				monthChoice(month);
				showSettings();
			} // Check for 2 keypress
			else if (keyName === 50) {
				month = "April";
				monthChoice(month);
				showSettings();
			} // Check for 3 keypress
			else if (keyName === 51) {
				month = "May";
				monthChoice(month);
				showSettings();
			} // Check for 4 keypress
			else if (keyName === 52) {
				month = "June";
				monthChoice(month);
				showSettings();
			} // Check for 5 keypress
			else if (keyName === 53) {
				month = "July";
				monthChoice(month);
				showSettings();
			}
		}
		if (currentGameScreen === 3) {
			if (keyName === 32) { 
				location.replace("/trail");
			}
		}	
	});
	
	// Listen for clicks
	document.addEventListener('click', (event) => {
		let x = event.target || event.srcElement;
			
		// Listen for gameScreen0 clicks
		if (currentGameScreen === 0){ 
			//Listen for option 1 click
			let bankerMenuItem = document.getElementById("bankerMenuItem");
			if (x === bankerMenuItem) {
				profession = "Banker";
				professionChoice(profession);
			};
			
			// Listen for option 2 click
			let carpenterMenuItem = document.getElementById("carpenterMenuItem");
			if (x === carpenterMenuItem) {
				profession = "Carpenter";
				professionChoice(profession);
			};
			
			// Listen for option 3 click
			let farmerMenuItem = document.getElementById("farmerMenuItem");
			if (x === farmerMenuItem) {
				profession = "Farmer";
				professionChoice(profession);
			};
		}
		
		// Listen for gamescreen1 submit click
		if (currentGameScreen === 1) {
			let submitPlayerNames = document.getElementById('submitButton');
			if (x === submitPlayerNames) {
				// Initialize player variables
				var player1 = document.getElementById('playerName1').value;
				var player2 = document.getElementById('playerName2').value;
				var player3 = document.getElementById('playerName3').value;
				var player4 = document.getElementById('playerName4').value;
				var player5 = document.getElementById('playerName5').value;
					
				// Call savePlayerName function
				savePlayerName(0, player1);
				savePlayerName(1, player2);
				savePlayerName(2, player3);
				savePlayerName(3, player4);
				savePlayerName(4, player5);
				
				// Change screen and increment
				gameScreen(2);
				currentGameScreen++;
			}
		}
		
		// Listen for gamescreen2 click
		if (currentGameScreen === 2) {
			// Listen for option 1
			let marchOption = document.getElementById('marchOption');
			if (x === marchOption) {
				month = "March";
				monthChoice(month);
				showSettings();
			}
			
			// Listen for option 2
			let aprilOption = document.getElementById('aprilOption');
			if (x === aprilOption) {
				month = "April";
				monthChoice(month);
				showSettings();
			}
			
			// Listen for option 3
			let mayOption = document.getElementById('mayOption');
			if (x === mayOption) {
				month = "May";
				monthChoice(month);
				showSettings();
			}
			
			// Listen for option 4
			let juneOption = document.getElementById('juneOption');
			if (x === juneOption) {
				month = "June";
				monthChoice(month);
				showSettings();
			}
			
			// Listen for option 5
			let julyOption = document.getElementById('julyOption');
			if (x === julyOption) {
				month = "July";
				monthChoice(month);
				showSettings();
			}
		}	
		if (currentGameScreen === 3) {
			var gameStart = document.getElementById('gameStart');
			if (x === gameStart) {
				startGame();
			}
		}	
	});
	
	// Start the game and move to trail.html
	function startGame(){
		location.replace('trail');
	}
		
	// Call new gameScreen
	function gameScreen(screenNumber) {
		let gameContainer = document.getElementById("gameContainer");
		
		// Make async call to server to get requested gameScreen html
		fetch('/game/getNewGameScreen/' + screenNumber).then((response) => {
			if (response.status !== 200) {
				console.log('problem with ajax call!' + 
				response.status + " msg: " + response.value);
				return;
			}
			response.text().then((data) => {
				// Send html returned back to this javascript file
				console.log("received back:" + data);
				gameContainer.innerHTML = data;
			});
		});			
	}	
	
	// Choose new profession
	function professionChoice(profession) {				
		// Make async call to server to set profession
		fetch('/game/saveProfession/' + profession).then((response) => {
			if(response.status !== 200) {
				console.log('problem with ajax call!' + 
				response.status + " msg: " + response.value);
				return;
			}
			response.text().then((data) => {				
				console.log("received back:" + data);
			});
		});		
		gameScreen(1);
		currentGameScreen++;
	}
	
	// Save player names
	function savePlayerName(playerId, playerName) {
		// Make async call to server to set playerName
		let playerUrl = "/game/savePlayerName/" + playerId + "/" + playerName;
		fetch(playerUrl).then((response) => {
			if (response.status !== 200) {
				console.log('problem with ajax call!' + 
				response.status + " msg: " + response.value);
				return;
			}
			response.text().then((data) => {				
				console.log("received back:" + data);
			});
		});
	}
	
	// Save monthChoice
	function monthChoice(month) {				
		// Make async call to server to set month
		fetch('/game/saveMonthChoice/' + month).then((response) => {
			if (response.status !== 200) {
				console.log('problem with ajax call!' + 
				response.status + " msg: " + response.value);
				return;
			}
			response.text().then((data) => {				
				console.log("received back:" + data);
			});
		});		
		gameScreen(3);
		currentGameScreen++;
	}
	
	// Show the userSettings
	function showSettings() {
		// Make async call to server to get gameSetting from gameController
		fetch('/game/getSettings/').then((response) => {
			if (response.status !== 200) {
				console.log('problem with ajax call!' + 
				response.status + " msg: " + response.value);
				return;
			}
			response.text().then((data) => {
				// Send html returned back to this javascript file
				console.log("received back:" + data);
				dataJSON = JSON.parse(data);
				if (data.profession = profession) {
					populateSettings(dataJSON);
				}
				
			});
		});	
	}
	
	// Populate the html with the userSettings
	function populateSettings(settings){
		document.getElementById('wagonLeader').innerHTML = "Wagon Leader: " + settings.playerNames[0];
		document.getElementById('member1').innerHTML = "Member 1: " + settings.playerNames[1];
		document.getElementById('member2').innerHTML = "Member 2: " + settings.playerNames[2];
		document.getElementById('member3').innerHTML = "Member 3: " + settings.playerNames[3];
		document.getElementById('member4').innerHTML = "Member 4: " + settings.playerNames[4];
		document.getElementById('profession').innerHTML = "Profession: " + settings.profession;
		document.getElementById('bankAmount').innerHTML = "Starting Money: " + settings.money;
		document.getElementById('monthLeaving').innerHTML = "Month Leaving: " + settings.month;		
	}
} else {
	alert("Sorry. Your browser does not support JavaScript.");
}
