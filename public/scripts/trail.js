if (document.getElementById) {
	// Initialize variables
	var currentGameDay,
		userSettings,
		currentTerrain,
		currentWeather,
		terrainImage,
		currentDate,
		currentDay = 1,
		currentMonth,
		currentYear = 1868,
		daysTravelled = 0,
		currentHealth = 100,
		score,
		milesTravelled = 0,
		partyAlive = [true,true,true,true,true],
		membersAlive,
		causeOfDeath,
		currentPace = STEADY,
		paceContainer,
		paceContainerBoolean = false,
		gameOverBoolean = false,
		gameWinBoolean = false,
		landmarkImage,
		riverDepth,
		milesLandmark = 100,
		kansasBoolean = false,
		laramieBoolean = false,
		independenceBoolean = false,
		boiseBoolean = false,
		dallesBoolean = false,
		dallesBoolean1 = false,
		dallesBoolean2 = false,
		rockScore = 0,
		random;
	// Constants
	// Death
	const DIED_FROM_DROWNING = " has died from drowning";
	const DIED_BEING_STABBED = " has died from being stabbed by tribesmen";
	const DIED_BEING_STRANGLED = " has died from being strangled by tribesmen";
	const DIED_BEING_SHOT = " has died from being shot with an arrow"
	const DIED_FROM_POISON = " has died from poisoning"
	const DIED_THROWN_OVERBOARD =  " was thrown overboard and drowned";
	// Lose / Give / Stole
	const NO_MONEY_LEFT = "You don't have enough money to give";
	const GIVE_SURVIVOR_MONEY = "You gave the survivor $200";
	const GIVE_TRIBESMEN_MONEY = "You gave the tribesmen $200";
	const SPEND_300_FERRY = "You spent $300 for the ferry and crossed safely";
	const GAVE_DREAMCATCHER = "The tribesmen gave you a dreamcatcher worth";
	const STOLE_SUPPLIES = "The tribesmen stole $600 worth of supplies";
	const WAGON_TIPPED_OVER = "Wagon tipped over and you lost ";
	// Common strings
	const HEALTH = "health";
	const CURRENT_PACE = "Current Pace: ";
	const STEADY = "Steady";
	const STRENUOUS = "Strenuous";
	const GRUELING = "Grueling";
	const RESTING = "Resting";
	const PLAINS = "Plains";

	// Load the start screen
	window.addEventListener("load", () => {
		getSettings();
		currentGameDay = 0;
	});

	// Listen for click with landmark options
	document.addEventListener('click', (event) => {
		let x = event.target || event.srcElement;

		// Listen for gameScreen0 clicks
		if (kansasBoolean === true) {
			let option1 = document.getElementById("option1");
			let option2 = document.getElementById("option2");
			let option3 = document.getElementById("option3");
			let option4 = document.getElementById("option4");

			// Listen for option 1 click/ Ford the River
			if (x === option1) {
				random = Math.random();
				if (riverDepth < 3) {
					// 10% chance of health loss
					if (random <= 0.1) {
						currentHealth = currentHealth - 3;
						kansasBoolean = false;
						document.getElementById('messageBox').innerHTML = WAGON_TIPPED_OVER + " 3 " + HEALTH;
						document.getElementById('featureMessage').innerHTML = "";
						incrementDay();
					} else {
						kansasBoolean = false;
						document.getElementById('messageBox').innerHTML = "You crossed the river safely";
						document.getElementById('featureMessage').innerHTML = "";
						incrementDay();
					}
				} else {
					// 60% chance of health loss
					if (random <= 0.6) {
						currentHealth = currentHealth - 5;
						kansasBoolean = false;
						document.getElementById('messageBox').innerHTML = WAGON_TIPPED_OVER + " 5 " + HEALTH;
						document.getElementById('featureMessage').innerHTML = "";
						incrementDay();
					} //40% chance of death
					else {
						if (partyAlive[4] === true) {
							partyAlive[4] = false;
							document.getElementById('messageBox').innerHTML = userSettings.playerNames[4] + DIED_FROM_DROWNING;
						} else if (partyAlive[3] === true) {
							partyAlive[3] = false;
							document.getElementById('messageBox').innerHTML = userSettings.playerNames[3] + DIED_FROM_DROWNING;
						} else if (partyAlive[2] === true) {
							partyAlive[2] = false;
							document.getElementById('messageBox').innerHTML = userSettings.playerNames[2] + DIED_FROM_DROWNING;
						} else if (partyAlive[1] === true) {
							partyAlive[1] = false;
							document.getElementById('messageBox').innerHTML = userSettings.playerNames[1] + DIED_FROM_DROWNING;
						} else {
							partyAlive[0] = false;
							document.getElementById('messageBox').innerHTML = userSettings.playerNames[0] + DIED_FROM_DROWNING;
							gameOverBoolean = true;
						}
						kansasBoolean = false;
						document.getElementById('featureMessage').innerHTML = "";
						incrementDay();
					}
				}
			} // Listen for option 2/ Caulk wagon and float across
			else if (x === option2) {
				random = Math.random();
				// 5% chance of death
				if (random <= 0.05) {
					if (partyAlive[4] === true) {
						partyAlive[4] = false;
						document.getElementById('messageBox').innerHTML = userSettings.playerNames[4] + DIED_FROM_DROWNING;
					} else if (partyAlive[3] === true) {
						partyAlive[3] = false;
						document.getElementById('messageBox').innerHTML = userSettings.playerNames[3] + DIED_FROM_DROWNING;
					} else if (partyAlive[2] === true) {
						partyAlive[2] = false;
						document.getElementById('messageBox').innerHTML = userSettings.playerNames[2] + DIED_FROM_DROWNING;
					} else if (partyAlive[1] === true) {
						partyAlive[1] = false;
						document.getElementById('messageBox').innerHTML = userSettings.playerNames[1] + DIED_FROM_DROWNING;
					} else {
						partyAlive[0] = false;
						document.getElementById('messageBox').innerHTML = userSettings.playerNames[0] + DIED_FROM_DROWNING;
						gameOverBoolean = true;
					}
					kansasBoolean = false;
					document.getElementById('featureMessage').innerHTML = "";
					incrementDay();
				} // 20% chance of health loss
				else if (random <= 0.2) {
					currentHealth = currentHealth - 3;
					document.getElementById('messageBox').innerHTML = WAGON_TIPPED_OVER + " 3 " + HEALTH;
					document.getElementById('featureMessage').innerHTML = "";
					kansasBoolean = false;
					incrementDay();
				}
			} // Listen for option3/take a ferry
			else if (x === option3) {
				userSettings.money = userSettings.money - 300;
				document.getElementById('messageBox').innerHTML = SPEND_300_FERRY;
				document.getElementById('featureMessage').innerHTML = "";
				kansasBoolean = false;
				incrementDay();
			} // Listen for option4/wait a day for condition improvement
			else if (x === option4) {
				currentPace = RESTING;
				document.getElementById('currentPace').innerHTML = CURRENT_PACE + currentPace;
				currentGameDay++;
				kansasRiverCrossing();
			}
		} else if (laramieBoolean === true) {
			let option1 = document.getElementById("option1");
			let option2 = document.getElementById("option2");
			let option3 = document.getElementById("option3");

			// Listen for option 1//give supplies and money
			if (x === option1) {
				// Check if money is 0
				if ((userSettings.money - 300) <= 0) {
					document.getElementById('messageBox').innerHTML = GIVE_TRIBESMEN_MONEY;
				} else {
					userSettings.money = userSettings.money - 300;
					document.getElementById('messageBox').innerHTML = GIVE_TRIBESMEN_MONEY;
					document.getElementById('featureMessage').innerHTML = "";
					laramieBoolean = false;
					incrementDay();
				}
			} // Listen for option 2/give ride 30 miles away
			else if (x === option2) {
				milesTravelled = milesTravelled - 30;
				userSettings.money = userSettings.money + 100;
				document.getElementById('messageBox').innerHTML = GAVE_DREAMCATCHER + " $100";
				document.getElementById('featureMessage').innerHTML = "";
				laramieBoolean = false;
				incrementDay();
			} // Listen for option 3, ignore them, large chance of stolen money and loss of life
			else if (x === option3) {
				random = Math.random();
				// 80% chance they steal supplies/money
				if (random <= 0.8) {
					userSettings.money = userSettings.money - 600;
					document.getElementById('featureMessage').innerHTML = STOLE_SUPPLIES;
				}

				random = Math.random();
				// 50% chance of hurting someone
				if (random <= 0.5) {
					currentHealth = currentHealth - 10;
				} // 50% chance of killing someone
				else {
					if (partyAlive[4] === true) {
						partyAlive[4] = false;
						document.getElementById('messageBox').innerHTML = userSettings.playerNames[4] + DIED_BEING_STABBED;
					} else if (partyAlive[3] === true) {
						partyAlive[3] = false;
						document.getElementById('messageBox').innerHTML = userSettings.playerNames[3] + DIED_BEING_STRANGLED;
					} else if (partyAlive[2] === true) {
						partyAlive[2] = false;
						document.getElementById('messageBox').innerHTML = userSettings.playerNames[2] + DIED_BEING_SHOT;
					} else if (partyAlive[1] === true) {
						partyAlive[1] = false;
						document.getElementById('messageBox').innerHTML = userSettings.playerNames[1] + DIED_BEING_STABBED;
					} else {
						partyAlive[0] = false;
						document.getElementById('messageBox').innerHTML = userSettings.playerNames[0] + DIED_FROM_POISON;
						gameOverBoolean = true;
					}
					laramieBoolean = false;
					incrementDay();
				}
			}
		} else if (independenceBoolean === true) {
			let option1 = document.getElementById("option1");
			let option2 = document.getElementById("option2");
			let option3 = document.getElementById("option3");

			if (x === option1) {
				document.getElementById('messageBox').innerHTML = "Your initials are forever engraved into Independence Rock";
				document.getElementById('featureMessage').innerHTML = "";
				rockScore = 10;
				independenceBoolean = false;
				incrementDay();
			} else if (x === option2) {
				document.getElementById('messageBox').innerHTML = "";
				document.getElementById('featureMessage').innerHTML = "An older seasoned traveller tells you to be wary of the " +
				"Dalles River. There are many options of how to float down the river. The first two rocks affect your money and health " +
				"and the last rock affects death and money.";
				independenceBoolean = false;
				incrementDay();
			} else if(x === option3) {
				document.getElementById('messageBox').innerHTML = "";
				document.getElementById('featureMessage').innerHTML = "";
				independenceBoolean = false;
				incrementDay();
			}
		} else if (boiseBoolean === true) {
			let option1 = document.getElementById("option1");
			let option2 = document.getElementById("option2");
			let option3 = document.getElementById("option3");

			// Give supplies/money
			if (x === option1) {
				//check if money <= 0
				if ((userSettings.money - 300) <= 0) {
					document.getElementById('messageBox').innerHTML = NO_MONEY_LEFT;
				} else {
					userSettings.money = userSettings.money - 300;
					document.getElementById('messageBox').innerHTML = GIVE_SURVIVOR_MONEY;
					document.getElementById('featureMessage').innerHTML = "";
					boiseBoolean = false;
					incrementDay();
				}
			} // Ride 20 miles to the attack site
			else if (x === option2) {
				milesTravelled = milesTravelled + 20;
				random = Math.random();
				// 60% chance of getting loot and health
				if (random <= 0.6) {
					userSettings.money = userSettings.money + 400;
					currentHealth = currentHealth + 10;
					document.getElementById('messageBox').innerHTML = "";
					document.getElementById('featureMessage').innerHTML = "You rescued two survivors " +
					"which rewarded you with $400 worth of supplies and 10 health worth of food.";
				} // 30% chance of injury due to attack
				else if (random < 0.9) {
					currentHealth = currentHealth - 5;
					document.getElementById('messageBox').innerHTML = "You were attacked by the Shoshone Indians!";
					document.getElementById('featureMessage').innerHTML = "Your health was reduced by 5 in the " +
					"attack.";
				} // 10% chance of death
				else {
					if (partyAlive[4] === true) {
						partyAlive[4] = false;
						document.getElementById('messageBox').innerHTML = userSettings.playerNames[4] + DIED_BEING_STABBED;
					} else if(partyAlive[3] === true){
						partyAlive[3] = false;
						document.getElementById('messageBox').innerHTML = userSettings.playerNames[3] + DIED_BEING_STRANGLED;
					} else if(partyAlive[2] === true){
						partyAlive[2] = false;
						document.getElementById('messageBox').innerHTML = userSettings.playerNames[2] + DIED_BEING_SHOT;
					} else if(partyAlive[1] === true){
						partyAlive[1] = false;
						document.getElementById('messageBox').innerHTML = userSettings.playerNames[1] + DIED_BEING_STABBED;
					} else {
						partyAlive[0] = false;
						document.getElementById('messageBox').innerHTML = userSettings.playerNames[0] + DIED_BEING_SHOT;
						gameOverBoolean = true;
					}
				}
				boiseBoolean = false;
				incrementDay();
			} //Ignore/continue
			else if (x === option3) {
				document.getElementById('featureMessage').innerHTML = "";
				document.getElementById('messageBox').innerHTML = "You continued down the Oregon Trail";
				boiseBoolean = false;
				incrementDay();
			}
		} // First dalles river option
		else if (dallesBoolean === true) {
			let option1 = document.getElementById("option1");
			let option2 = document.getElementById("option2");
			random = Math.random();

			// Go left 20% chance of supply tipping
			if (x === option1) {
				if(random <= 0.2){
					userSettings.money = userSettings.money - 300;
					document.getElementById('messageBox').innerHTML = "";
					document.getElementById('featureMessage').innerHTML = "<p>You hit the side of the rock" +
					" and $200 worth of supplies fell overboard. There is another large rock formation up" +
					"  ahead. What would you like to do?</p><p>You may: </p><ol><li id=\"option1\">Go left</li>" +
					"<li id=\"option2\">Go right</li></ol>";
					dallesBoolean = false;
					dallesBoolean1 = true;
				} else {
					document.getElementById('messageBox').innerHTML = "";
					document.getElementById('featureMessage').innerHTML = "<p>You made it safely past the rock." +
					" There is another large rock formation up ahead. What would you like to do?</p><p>You may:" +
					"</p><ol><li id=\"option1\">Go left</li><li id=\"option2\">Go right</li></ol>";
					dallesBoolean = false;
					dallesBoolean1 = true;
				}
			} // Go right 20% chance of loss of health
			if (x === option2) {
				if (random <= 0.2) {
					currentHealth = currentHealth - 3;
					document.getElementById('messageBox').innerHTML = "";
					document.getElementById('featureMessage').innerHTML = "<p>You hit the side of the rock" +
					" and your arm slams against the rock. You lost 3 health. There is another large rock formation up" +
					"  ahead. What would you like to do?</p><p>You may: </p><ol><li id=\"option1\">Go left</li>" +
					"<li id=\"option2\">Go right</li></ol>";
					dallesBoolean = false;
					dallesBoolean1 = true;
				} else {
					userSettings.money = userSettings.money - 300;
					document.getElementById('messageBox').innerHTML = "";
					document.getElementById('featureMessage').innerHTML = "<p>You made it safely past the rock." +
					" There is another large rock formation up ahead. What would you like to do?</p><p>You may:" +
					"</p><ol><li id=\"option1\">Go left</li><li id=\"option2\">Go right</li></ol>";
					dallesBoolean = false;
					dallesBoolean1 = true;
				}
			}
		} // Second dalles river choice
		else if (dallesBoolean1 === true) {
			let option1 = document.getElementById("option1");
			let option2 = document.getElementById("option2");
			random = Math.random();

			// Go left 20% chance of health loss
			if (x === option1) {
				if (random <= 0.2) {
					currentHealth -= 3;
					document.getElementById('messageBox').innerHTML = "";
					document.getElementById('featureMessage').innerHTML = "<p>You hit the side of the rock" +
					" and your leg slams against the rock. You lost 3 health. There is another large rock formation up" +
					"  ahead. What would you like to do?</p><p>You may: </p><ol><li id=\"option1\">Go left</li>" +
					"<li id=\"option2\">Go right</li></ol>";
					dallesBoolean1 = false;
					dallesBoolean2 = true;
				} else {
					document.getElementById('messageBox').innerHTML = "";
					document.getElementById('featureMessage').innerHTML = "<p>You made it safely by the rock." +
					" There is another large rock formation up ahead. What would you like to do?</p><p>You may:" +
					"</p><ol><li id=\"option1\">Go left</li><li id=\"option2\">Go right</li></ol>";
					dallesBoolean1 = false;
					dallesBoolean2 = true;
				}
			} // Go right 20% chance of loss of money
			else if (x === option2) {
				if (random <= 0.2) {
					userSettings.money = userSettings.money - 300;
					document.getElementById('messageBox').innerHTML = "";
					document.getElementById('featureMessage').innerHTML = "<p>You hit the side of the rock" +
					" and $200 worth of supplies fell overboard. There is another large rock formation up" +
					"  ahead. What would you like to do?</p><p>You may: </p><ol><li id=\"option1\">Go left</li>" +
					"<li id=\"option2\">Go right</li></ol>";
					dallesBoolean1 = false;
					dallesBoolean2 = true;
				} else {
					userSettings.money = userSettings.money - 300;
					document.getElementById('messageBox').innerHTML = "";
					document.getElementById('featureMessage').innerHTML = "<p>You made it safely by the rock." +
					" There is another large rock formation up ahead. What would you like to do?</p><p>You may:" +
					"</p><ol><li id=\"option1\">Go left</li><li id=\"option2\">Go right</li></ol>";
					dallesBoolean1 = false;
					dallesBoolean2 = true;
				}
			}
		} else if (dallesBoolean2 === true) {
			let option1 = document.getElementById("option1");
			let option2 = document.getElementById("option2");
			random = Math.random();

			// Go left 20% chance of someone dying
			if (x === option1) {
				if (random <= 0.2) {
					if (partyAlive[4] === true) {
						partyAlive[4] = false;
						document.getElementById('messageBox').innerHTML = userSettings.playerNames[4] +
						DIED_THROWN_OVERBOARD;
						document.getElementById('featureMessage').innerHTML = "";
						dallesBoolean2 = false;
						incrementDay();
					} else if (partyAlive[3] === true) {
						partyAlive[3] = false;
						document.getElementById('messageBox').innerHTML = userSettings.playerNames[3] +
						DIED_THROWN_OVERBOARD;
						document.getElementById('featureMessage').innerHTML = "";
						dallesBoolean2 = false;
						incrementDay();
					} else if (partyAlive[2] === true) {
						partyAlive[2] = false;
						document.getElementById('messageBox').innerHTML = userSettings.playerNames[2] +
						DIED_THROWN_OVERBOARD;
						document.getElementById('featureMessage').innerHTML = "";
						dallesBoolean2 = false;
						incrementDay();
					} else if (partyAlive[1] === true) {
						partyAlive[1] = false;
						document.getElementById('messageBox').innerHTML = userSettings.playerNames[1] +
						DIED_THROWN_OVERBOARD;
						document.getElementById('featureMessage').innerHTML = "";
						dallesBoolean2 = false;
						incrementDay();
					} else {
						partyAlive[0] = false;
						document.getElementById('messageBox').innerHTML = userSettings.playerNames[0] +
						DIED_THROWN_OVERBOARD;
						document.getElementById('featureMessage').innerHTML = "";
						dallesBoolean2 = false;
						gameOverBoolean = true;
					}
				} else {
					document.getElementById('messageBox').innerHTML = "";
					document.getElementById('featureMessage').innerHTML = "<p>You made it safely by the rock.</p>"
					dallesBoolean2 = false;
					incrementDay();
				}
			} // Go right 3o% chance of loss of money
			else if (x === option2) {
				if (random <= 0.3) {
					userSettings.money = userSettings.money - 200;
					document.getElementById('messageBox').innerHTML = "";
					document.getElementById('featureMessage').innerHTML = "<p>You hit the side of the rock" +
					" and $200 worth of supplies fell overboard.</p>";
					dallesBoolean2 = false;
					incrementDay();
				} else {
					userSettings.money = userSettings.money - 300;
					document.getElementById('messageBox').innerHTML = "";
					document.getElementById('featureMessage').innerHTML = "<p>You made it safely by the rock.</p>";
					dallesBoolean2 = false;
					incrementDay();
				}
			}
		}
	});

	// Listen for keypress
	document.addEventListener('keypress', (event) =>{
		const keyName = event.keyCode;
		// Check for game over
		if (gameOverBoolean === true) {
			if(keyName === 32){
				location.replace("mainmenu");
			}
		} // check for victory
		else if (gameWinBoolean === true) {
			if (keyName === 32) {
				location.replace("mainmenu");
			}
		} // Check if user is at a landmark
		else if (kansasBoolean === true) {
			// Ford the river
			if (keyName === 49) {
				random = Math.random();
				if (riverDepth < 3) {
					//10% chance of health loss
					if(random <= 0.1){
						currentHealth = currentHealth - 3;
						kansasBoolean = false;
						document.getElementById('messageBox').innerHTML = WAGON_TIPPED_OVER + " 3 " + HEALTH;
						document.getElementById('featureMessage').innerHTML = "";
						incrementDay();
					} else {
						kansasBoolean = false;
						document.getElementById('messageBox').innerHTML = "You safely crossed the river";
						document.getElementById('featureMessage').innerHTML = "";
						incrementDay();
					}
				} else {
					//60% chance of health loss
					if (random <= 0.6) {
						currentHealth = currentHealth - 5;
						kansasBoolean = false;
						document.getElementById('messageBox').innerHTML = "Wagon tipped over and you lost 5 health";
						document.getElementById('featureMessage').innerHTML = "";
						incrementDay();
					} //40% chance of death
					else {
						if(partyAlive[4] === true){
							partyAlive[4] = false;
							document.getElementById('messageBox').innerHTML = userSettings.playerNames[4] + DIED_FROM_DROWNING;
						} else if(partyAlive[3] === true){
							partyAlive[3] = false;
							document.getElementById('messageBox').innerHTML = userSettings.playerNames[3] + DIED_FROM_DROWNING;
						} else if(partyAlive[2] === true){
							partyAlive[2] = false;
							document.getElementById('messageBox').innerHTML = userSettings.playerNames[2] + DIED_FROM_DROWNING;
						} else if(partyAlive[1] === true){
							partyAlive[1] = false;
							document.getElementById('messageBox').innerHTML = userSettings.playerNames[1] + DIED_FROM_DROWNING;
						} else {
							partyAlive[0] = false;
							document.getElementById('messageBox').innerHTML = userSettings.playerNames[0] + DIED_FROM_DROWNING;
							gameOverBoolean = true;
						}
						kansasBoolean = false;
						document.getElementById('featureMessage').innerHTML = "";
						incrementDay();
					}
				}
			} // Caulk wagon and float across
			else if (keyName === 50) {
				random = Math.random();
				//5% chance of death
				if (random <= 0.05) {
					if(partyAlive[4] === true){
							partyAlive[4] = false;
							document.getElementById('messageBox').innerHTML = userSettings.playerNames[4] + DIED_FROM_DROWNING;
						} else if(partyAlive[3] === true){
							partyAlive[3] = false;
							document.getElementById('messageBox').innerHTML = userSettings.playerNames[3] + DIED_FROM_DROWNING;
						} else if(partyAlive[2] === true){
							partyAlive[2] = false;
							document.getElementById('messageBox').innerHTML = userSettings.playerNames[2] + DIED_FROM_DROWNING;
						} else if(partyAlive[1] === true){
							partyAlive[1] = false;
							document.getElementById('messageBox').innerHTML = userSettings.playerNames[1] + DIED_FROM_DROWNING;
						} else {
							partyAlive[0] = false;
							document.getElementById('messageBox').innerHTML = userSettings.playerNames[0] + DIED_FROM_DROWNING;
							gameOverBoolean = true;
						}
						kansasBoolean = false;
						document.getElementById('featureMessage').innerHTML = "";
						incrementDay();
				} // 20% chance of health loss
				else if(random <= 0.2){
					currentHealth = currentHealth - 3;
					document.getElementById('messageBox').innerHTML = WAGON_TIPPED_OVER + " 3 " + HEALTH;
					document.getElementById('featureMessage').innerHTML = "";
					kansasBoolean = false;
					incrementDay();
				} else {
					kansasBoolean = false;
					document.getElementById('messageBox').innerHTML = "You safely crossed the river";
					document.getElementById('featureMessage').innerHTML = "";
					incrementDay();
				}
			} // Take a ferry across
			else if(keyName === 51) {
				userSettings.money = userSettings.money - 300;
				document.getElementById('messageBox').innerHTML = SPEND_300_FERRY;
				document.getElementById('featureMessage').innerHTML = "";
				kansasBoolean = false;
				incrementDay();
			} // Wait for conditions to improve
			else if(keyName === 52) {
				currentPace = RESTING;
				document.getElementById('currentPace').innerHTML = CURRENT_PACE + currentPace;
				currentGameDay++;
				kansasRiverCrossing();
			}
		} else if (laramieBoolean === true) {
			// Give supplies/money
			if (keyName === 49) {
				//check if money <= 0
				if ((userSettings.money - 300) <= 0) {
					document.getElementById('messageBox').innerHTML = NO_MONEY_LEFT;
				} else {
					userSettings.money = userSettings.money - 300;
					document.getElementById('messageBox').innerHTML = GIVE_TRIBESMEN_MONEY;
					document.getElementById('featureMessage').innerHTML = "";
					laramieBoolean = false;
					incrementDay();
				}
			} else if (keyName === 50) {
				//Take them 30 miles off the trail to their home
				milesTravelled = milesTravelled - 30;
				userSettings.money = userSettings.money + 100;
				document.getElementById('messageBox').innerHTML = GAVE_DREAMCATCHER + " $100 as a gift";
				document.getElementById('featureMessage').innerHTML = "";
				laramieBoolean = false;
				incrementDay();
			} else if (keyName === 51) {
				random = Math.random();
				// 80% chance they steal supplies/money
				if (random <= 0.8) {
					userSettings.money = userSettings.money - 600;
					document.getElementById('featureMessage').innerHTML = STOLE_SUPPLIES;
				}
				random = Math.random();
				// 50% chance of hurting someone
				if (random <= 0.5) {
					currentHealth = currentHealth - 5;
					laramieBoolean = false;
					incrementDay();
				} // 50% chance of killing someone
				else {
					if (partyAlive[4] === true) {
						partyAlive[4] = false;
						document.getElementById('messageBox').innerHTML = userSettings.playerNames[4] + DIED_BEING_STABBED;
					} else if(partyAlive[3] === true){
						partyAlive[3] = false;
						document.getElementById('messageBox').innerHTML = userSettings.playerNames[3] + DIED_BEING_STRANGLED;
					} else if(partyAlive[2] === true){
						partyAlive[2] = false;
						document.getElementById('messageBox').innerHTML = userSettings.playerNames[2] + DIED_BEING_SHOT;
					} else if(partyAlive[1] === true){
						partyAlive[1] = false;
						document.getElementById('messageBox').innerHTML = userSettings.playerNames[1] + DIED_BEING_STABBED;
					} else {
						partyAlive[0] = false;
						document.getElementById('messageBox').innerHTML = userSettings.playerNames[0] + DIED_FROM_POISON;
						gameOverBoolean = true;
					}
					laramieBoolean = false;
					incrementDay();
				}
			}
		} else if (independenceBoolean === true) {
			if (keyName === 49) {
				document.getElementById('messageBox').innerHTML = "Your initials are forever engraved into Independence Rock";
				document.getElementById('featureMessage').innerHTML = "";
				rockScore = 10;
				independenceBoolean = false;
				incrementDay();
			} else if (keyName === 50) {
				document.getElementById('featureMessage').innerHTML = "An older seasoned traveller tells you to be wary of the " +
				"Dalles River. There are many options of how to float down the river. The first two rocks affect your money and health " +
				"and the last rock affects death and money.";
				document.getElementById('messageBox').innerHTML = "";
				independenceBoolean = false;
				incrementDay();
			} else if (keyName === 51) {
				document.getElementById('featureMessage').innerHTML = "";
				independenceBoolean = false;
				incrementDay();
			}
		} else if (boiseBoolean === true) {
			// Give supplies/money
			if (keyName === 49) {
				// check if money <= 0
				if ((userSetting.money - 200) <= 0) {
					document.getElementById('messageBox').innerHTML = NO_MONEY_LEFT;
				} else {
					userSettings.money = userSettings.money - 200;
					document.getElementById('messageBox').innerHTML = GIVE_SURVIVOR_MONEY;
					document.getElementById('featureMessage').innerHTML = "";
					boiseBoolean = false;
					incrementDay();
				}
			} // Ride 20 miles to the attack site
			else if (keyName === 50) {
				milesTravelled = milesTravelled + 20;
				random = Math.random();
				// 60% chance of getting loot and health
				if (random <= 0.6) {
					userSettings.money = userSettings.money + 400;
					currentHealth = currentHealth + 10;
					document.getElementById('messageBox').innerHTML = "";
					document.getElementById('featureMessage').innerHTML = "You rescued two survivors " +
					"which rewarded you with $400 worth of supplies and 10 health worth of food.";
				} // 30% chance of injury due to attack
				else if (random < 0.9) {
					currentHealth = currentHealth - 5;
					document.getElementById('messageBox').innerHTML = "You were attacked by the Shoshone Indians!";
					document.getElementById('featureMessage').innerHTML = "Your health was reduced by 5 in the " +
					"attack.";
				} // 10% chance of death
				else {
					if (partyAlive[4] === true) {
						partyAlive[4] = false;
						document.getElementById('messageBox').innerHTML = userSettings.playerNames[4] + DIED_BEING_STABBED;
					} else if (partyAlive[3] === true) {
						partyAlive[3] = false;
						document.getElementById('messageBox').innerHTML = userSettings.playerNames[3] + DIED_BEING_STRANGLED;
					} else if (partyAlive[2] === true) {
						partyAlive[2] = false;
						document.getElementById('messageBox').innerHTML = userSettings.playerNames[2] + DIED_BEING_SHOT;
					} else if (partyAlive[1] === true) {
						partyAlive[1] = false;
						document.getElementById('messageBox').innerHTML = userSettings.playerNames[1] + DIED_BEING_STABBED;
					} else {
						partyAlive[0] = false;
						document.getElementById('messageBox').innerHTML = userSettings.playerNames[0] + DIED_BEING_SHOT;
						gameOverBoolean = true;
					}
				}
				boiseBoolean = false;
				incrementDay();
			} // Ignore/continue
			else if (keyName === 51) {
				document.getElementById('featureMessage').innerHTML = "";
				document.getElementById('messageBox').innerHTML = "You continued down the Oregon Trail";
				boiseBoolean = false;
				incrementDay();
			}
		} else if (dallesBoolean === true) {
			random = Math.random();
			// Go left 20% chance of supply tipping
			if (keyName === 49) {
				if (random <= 0.2) {
					userSettings.money = userSettings.money - 300;
					document.getElementById('messageBox').innerHTML = "";
					document.getElementById('featureMessage').innerHTML = "<p>You hit the side of the rock" +
					" and $200 worth of supplies fell overboard. There is another large rock formation up" +
					"  ahead. What would you like to do?</p><p>You may: </p><ol><li id=\"option1\">Go left</li>" +
					"<li id=\"option2\">Go right</li></ol>";
					dallesBoolean = false;
					dallesBoolean1 = true;
				} else {
					document.getElementById('messageBox').innerHTML = "";
					document.getElementById('featureMessage').innerHTML = "<p>You made it safely by the rock." +
					" There is another large rock formation up ahead. What would you like to do?</p><p>You may:" +
					"</p><ol><li id=\"option1\">Go left</li><li id=\"option2\">Go right</li></ol>";
					dallesBoolean = false;
					dallesBoolean1 = true;
				}
			} // Go right. 20% chance of injury
			else if (keyName === 50) {
				if (random <= 0.2) {
					userSettings.money = userSettings.money - 200;
					document.getElementById('messageBox').innerHTML = "";
					document.getElementById('featureMessage').innerHTML = "<p>You hit the side of the rock" +
					" and $200 worth of supplies fell overboard. There is another large rock formation up" +
					"  ahead. What would you like to do?</p><p>You may: </p><ol><li id=\"option1\">Go left</li>" +
					"<li id=\"option2\">Go right</li></ol>";
					dallesBoolean = false;
					dallesBoolean1 = true;
				} else {
					document.getElementById('messageBox').innerHTML = "";
					document.getElementById('featureMessage').innerHTML = "<p>You made it safely by the rock." +
					" There is another large rock formation up ahead. What would you like to do?</p><p>You may:" +
					"</p><ol><li id=\"option1\">Go left</li><li id=\"option2\">Go right</li></ol>";
					dallesBoolean = false;
					dallesBoolean1 = true;
				}
			}
		} else if (dallesBoolean1 === true) {
			random = Math.random();
			// Go left 20% chance of health loss
			if (keyName === 49) {
				if (random <= 0.2) {
					currentHealth = currentHealth - 3;
					document.getElementById('messageBox').innerHTML = "";
					document.getElementById('featureMessage').innerHTML = "<p>You hit the side of the rock" +
					" and your leg slams against the rock. You lost 3 health. There is another large rock formation up" +
					"  ahead. What would you like to do?</p><p>You may: </p><ol><li id=\"option1\">Go left</li>" +
					"<li id=\"option2\">Go right</li></ol>";
					dallesBoolean1 = false;
					dallesBoolean2 = true;

				} else {
					document.getElementById('messageBox').innerHTML = "";
					document.getElementById('featureMessage').innerHTML = "<p>You made it safely by the rock." +
					" There is another large rock formation up ahead. What would you like to do?</p><p>You may:" +
					"</p><ol><li id=\"option1\">Go left</li><li id=\"option2\">Go right</li></ol>";
					dallesBoolean1 = false;
					dallesBoolean2 = true;
				}
			} //Go right 2o% chance of loss of money
			else if (keyName === 50) {
				if (random <= 0.2) {
					userSettings.money = userSettings.money - 300;
					document.getElementById('messageBox').innerHTML = "";
					document.getElementById('featureMessage').innerHTML = "<p>You hit the side of the rock" +
					" and $200 worth of supplies fell overboard. There is another large rock formation up" +
					"  ahead. What would you like to do?</p><p>You may: </p><ol><li id=\"option1\">Go left</li>" +
					"<li id=\"option2\">Go right</li></ol>";
					dallesBoolean1 = false;
					dallesBoolean2 = true;
				} else {
					userSettings.money = userSettings.money - 300;
					document.getElementById('messageBox').innerHTML = "";
					document.getElementById('featureMessage').innerHTML = "<p>You made it safely by the rock." +
					" There is another large rock formation up ahead. What would you like to do?</p><p>You may:" +
					"</p><ol><li id=\"option1\">Go left</li><li id=\"option2\">Go right</li></ol>";
					dallesBoolean1 = false;
					dallesBoolean2 = true;
				}
			}
		} else if (dallesBoolean2 === true) {
			random = Math.random();
			// Go left 20% chance of someone dying
			if (keyName === 49) {
				if (random <= 0.2) {
					if (partyAlive[4] === true) {
						partyAlive[4] = false;
						document.getElementById('messageBox').innerHTML = userSettings.playerNames[4] + DIED_THROWN_OVERBOARD;
						document.getElementById('featureMessage').innerHTML = "";
						dallesBoolean2 = false;
						incrementDay();
					} else if(partyAlive[3] === true){
						partyAlive[3] = false;
						document.getElementById('messageBox').innerHTML = userSettings.playerNames[3] + DIED_THROWN_OVERBOARD;
						document.getElementById('featureMessage').innerHTML = "";
						dallesBoolean2 = false;
						incrementDay();
					} else if(partyAlive[2] === true){
						partyAlive[2] = false;
						document.getElementById('messageBox').innerHTML = userSettings.playerNames[2] + DIED_THROWN_OVERBOARD;
						document.getElementById('featureMessage').innerHTML = "";
						dallesBoolean2 = false;
						incrementDay();
					} else if(partyAlive[1] === true){
						partyAlive[1] = false;
						document.getElementById('messageBox').innerHTML = userSettings.playerNames[1] + DIED_THROWN_OVERBOARD;
						document.getElementById('featureMessage').innerHTML = "";
						dallesBoolean2 = false;
						incrementDay();
					} else {
						partyAlive[0] = false;
						document.getElementById('messageBox').innerHTML = userSettings.playerNames[0] + DIED_THROWN_OVERBOARD;
						document.getElementById('featureMessage').innerHTML = "";
						dallesBoolean2 = false;
						gameOverBoolean = true;
					}
				} else {
					document.getElementById('messageBox').innerHTML = "";
					document.getElementById('featureMessage').innerHTML = "<p>You made it safely by the rock.</p>"
					dallesBoolean2 = false;
					incrementDay();
				}
			} // Go right 30% chance of loss of money
			else if (keyName === 50) {
				if (random <= 0.3) {
					userSettings.money = userSettings.money - 200;
					document.getElementById('messageBox').innerHTML = "";
					document.getElementById('featureMessage').innerHTML = "<p>You hit the side of the rock" +
					" and $200 worth of supplies fell overboard.</p>";
					dallesBoolean2 = false;
					incrementDay();
				} else {
					userSettings.money = userSettings.money - 300;
					document.getElementById('messageBox').innerHTML = "";
					document.getElementById('featureMessage').innerHTML = "<p>You made it safely by the rock.</p>";
					dallesBoolean2 = false;
					incrementDay();
				}
			}
		} else {
			if (keyName === 32) {
				incrementDay();
			}
		}

		if (keyName === 13) {
			changePace();
		}

		if (paceContainerBoolean === true) {
			if (keyName === 49) {
			currentPace = STEADY;
				document.getElementById('currentPace').innerHTML = CURRENT_PACE + currentPace;
				paceContainerOff();
			}
			if (keyName === 50) {
				currentPace = STRENUOUS;
				document.getElementById('currentPace').innerHTML = CURRENT_PACE + currentPace;
				paceContainerOff();
			}
			if (keyName === 51) {
				currentPace = GRUELING;
				document.getElementById('currentPace').innerHTML = CURRENT_PACE + currentPace;
				paceContainerOff();
			}
			if (keyName === 52) {
				currentPace = RESTING;
				document.getElementById('currentPace').innerHTML = CURRENT_PACE + currentPace;
				paceContainerOff();
			}
		}
	});

	// Get userSettings from gameController
	function getSettings() {
		//Make async call to server to get gameSetting from gameController
		fetch('/game/getSettings/').then((response) => {
			if (response.status !== 200) {
				console.log('problem with ajax call!' +
				response.status + " msg: " + response.value);
				return;
			}
			response.text().then((data) => {
				//Send html returned back to this javascript file
				console.log("received back:" + data);
				userSettings = JSON.parse(data);
				startScreen()
			});
		});
	}

	// Display Start screen
	function startScreen() {
		displayScreen();
		getStartDate();
		document.getElementById('messageBox').innerHTML = "Good Luck on your Journey! Press the Spacebar to Travel One Day or Change your Pace by Pressing Enter.";
	}

	// Display general screen
	function displayScreen() {
		getTerrain();
		getWeather();
		document.getElementById('partyHealth').innerHTML = "Current Health: " + currentHealth;
		document.getElementById('milesTravelled').innerHTML = "Miles Travelled: " + milesTravelled;
		document.getElementById('milesLandmark').innerHTML = "Miles To Next Landmark: " + milesLandmark;
		isPartyAlive();
		document.getElementById('currentMoney').innerHTML = "Current Money: " + userSettings.money;
		document.getElementById('currentPace').innerHTML = CURRENT_PACE + currentPace;
	}

	// Determine weather
	function getWeather() {
		let randomWeather = Math.random();
		//Give random number between 0 and 1 a weighted probability
		if (randomWeather < 0.1) {
			currentWeather = "Very Hot";
		} else if (randomWeather < 0.2) {
			currentWeather = "Hot";
		} else if (randomWeather < 0.4) {
			currentWeather = "Warm";
		} else if (randomWeather < 0.5) {
			currentWeather = "Cool";
		} else if (randomWeather < 0.6) {
			currentWeather = "Cold";
		} else if (randomWeather < 0.7) {
			currentWeather = "Very Cold";
		} else if (randomWeather < 0.8) {
			currentWeather = "Rain";
		} else if (randomWeather < 0.85) {
			currentWeather = "Snow";
		} else if (randomWeather < 0.9) {
			currentWeather = "Blizzard";
		} else {
			currentWeather = "Heavy Fog";
		}
		document.getElementById('currentWeather').innerHTML = "Current Weather: " + currentWeather;
	}

	// Determine terrain
	function getTerrain() {
		let randomTerrain = Math.floor((Math.random() * 4) + 1);
		// Check the terrain
		if (randomTerrain === 1) {
			currentTerrain = "Mountain";
			document.getElementById('currentTerrain').innerHTML = "Current Terrain: " + currentTerrain;
			console.log(currentTerrain);
			terrainImage = "<img src=\"/images/mountain.jpeg\" >";
			document.getElementById("imageHolder").innerHTML = terrainImage;
		} else if (randomTerrain === 2) {
			currentTerrain = "Grassland";
			document.getElementById('currentTerrain').innerHTML = "Current Terrain: " + currentTerrain;
			console.log(currentTerrain);
			terrainImage = "<img src=\"/images/grassland.jpeg\" >";
			document.getElementById("imageHolder").innerHTML = terrainImage;
		} else if (randomTerrain === 3) {
			currentTerrain = PLAINS;
			document.getElementById('currentTerrain').innerHTML = "Current Terrain: " + currentTerrain;
			console.log(currentTerrain);
			terrainImage = "<img src=\"/images/plains.jpeg\" >";
			document.getElementById("imageHolder").innerHTML = terrainImage;
		} else {
			currentTerrain = "Forest";
			document.getElementById('currentTerrain').innerHTML = "Current Terrain: " + currentTerrain;
			console.log(currentTerrain);
			terrainImage = document.createElement("IMG");
			terrainImage = "<img src=\"/images/forest.jpeg\" >";
			document.getElementById("imageHolder").innerHTML = terrainImage;
		}
	}

	// Determine Date
	function getStartDate(){
		if (userSettings.month === "March") {
			currentMonth = "March";
		} else if (userSettings.month === "April") {
			currentMonth = "April";
		} else if (userSettings.month === "May") {
			currentMonth = "May";
		} else if (userSettings.month === "June") {
			currentMonth = "June";
		} else {
			currentMonth = "July";
		}
		document.getElementById('currentDate').innerHTML = "Current Date: " + currentMonth +
			" " + currentDay + " " + currentYear;
	}

	// increment the date
	function getDate(){
		if (currentDay === 30) {
			daysTravelled++;
			currentDay = 1;
			if (currentMonth === "March") {
				currentMonth = "April";
			} else if (currentMonth === "April") {
				currentMonth = "May";
			} else if (currentMonth === "May") {
				currentMonth = "June";
			} else if (currentMonth === "June") {
				currentMonth = "July";
			} else {
				currentMonth = "August";
			}
		} else {
			currentDay++;
			daysTravelled++;
		}
		document.getElementById('currentDate').innerHTML = "Current Date: " + currentMonth +
			" " + currentDay + " " + currentYear;
	}

	// Check how many party members are alive
	function isPartyAlive() {
		membersAlive = 0;
		for (let i = 0; i < 5; i++) {
			if (partyAlive[i] === true) {
				membersAlive++;
			}
		}
		document.getElementById('aliveMembers').innerHTML = "Party Members Alive: " + membersAlive;
	}

	// Change pace
	function changePace() {
		if (paceContainerBoolean === false) {
			document.getElementById('changePaceContainer').style.display = "block";
			paceContainerBoolean = true;
		} else {
			paceContainerOff();
		}
	}

	// turn changePaceContainer off
	function paceContainerOff() {
		document.getElementById('changePaceContainer').style.display = "none";
		paceContainerBoolean = false;
	}

	// Change health according to weather
	function healthWeather() {
		if (currentWeather === "Very Hot") {
			currentHealth = currentHealth - 8;
		} else if (currentWeather === "Hot") {
			currentHealth = currentHealth - 3;
		} else if (currentWeather === "Warm") {
			currentHealth = currentHealth + 1;
		} else if (currentWeather === "Cool") {
			currentHealth = currentHealth + 1;
		} else if (currentWeather === "Cold") {
			currentHealth = currentHealth - 5;
		} else if (currentWeather === "Very Cold") {
			currentHealth = currentHealth - 12;
		} else if (currentWeather === "Rain") {
			currentHealth = currentHealth - 4;
		} else if (currentWeather === "Heavy Rain") {
			currentHealth = currentHealth - 8;
		} else if (currentWeather === "Snow") {
			currentHealth = currentHealth - 15;
		} else if (currentWeather === "Blizzard") {
			currentHealth = currentHealth - 30;
		} else {
			currentHealth = currentHealth - 3;
		}
	}

	// Check if party members died
	function whoDied() {
		let randomLife = Math.random();
		if (currentHealth <= 0) {
			partyAlive = [false,false,false,false,false];
			gameOverBoolean = true;
		} else if (currentHealth < 20) {
			// Give random number between 0 and 1 a weighted probability
			if (randomLife <= 0.1) {
				killPartyMember();
			}
		} else if (currentHealth <= 50) {
			if (randomLife <= 0.03) {
				killPartyMember();
			}
		}
	}

	// Gives a random cause of death
	function deathCause() {
		let randomCause = Math.floor((Math.random() * 6) + 1);
		if (randomCause === 1) {
			causeOfDeath = "Dysentary";
		} else if (randomCause === 2) {
			causeOfDeath = "Cholera";
		} else if (randomCause === 3) {
			causeOfDeath = "Typhoid";
		} else if (randomCause === 4) {
			causeOfDeath = "a Snakebite";
		} else if (randomCause === 5) {
			causeOfDeath = "Measles";
		} else {
			causeOfDeath = "Exhaustion";
		}
	}

	// Helper function for finding an alive party member and giving them a random death cause
	function killPartyMember() {
		if (partyAlive[4] === true) {
			partyAlive[4] = false;
			deathCause();
			document.getElementById('messageBox').innerHTML = userSettings.playerNames[4] + " has died from " 
				+ causeOfDeath;
		} else if (partyAlive[3] === true) {
			partyAlive[3] = false;
			deathCause();
			document.getElementById('messageBox').innerHTML = userSettings.playerNames[3] + " has died from " 
				+ causeOfDeath;
		} else if (partyAlive[2] === true) {
			partyAlive[2] = false;
			deathCause();
			document.getElementById('messageBox').innerHTML = userSettings.playerNames[2] + " has died from " 
				+ causeOfDeath;
		} else if (partyAlive[1] === true) {
			partyAlive[1] = false;
			deathCause();
			document.getElementById('messageBox').innerHTML = userSettings.playerNames[1] + " has died from " 
				+ causeOfDeath;
		} else {
			partyAlive[0] = false;
			deathCause();
			document.getElementById('messageBox').innerHTML = userSettings.playerNames[0] + " has died from " 
				+ causeOfDeath;
			gameOverBoolean = true;
		}
	}

	// Change health and miles travelled according to pace
	function healthMilesPace() {
		if (currentPace === STEADY) {
			milesTravelled += 20;
		} else if (currentPace === STRENUOUS) {
			currentHealth -= 3;
			milesTravelled += 25;
		} else if (currentPace === GRUELING) {
			currentHealth -= 8;
			milesTravelled += 30;
		} else {
			currentHealth += 5;
			if (currentHealth > 100) {
				currentHealth = 100;
			}
		}
	}

	// Move the wagon image from right to left (starts at 1009px and ends at 240px)
	function moveWagon() {
		if (milesTravelled <= 20) {
			document.getElementById('wagonContainer').style.left = "979px";
		} else if (milesTravelled <= 40) {
			document.getElementById('wagonContainer').style.left = "949px";
		} else if (milesTravelled <= 60) {
			document.getElementById('wagonContainer').style.left = "919px";
		} else if (milesTravelled <= 80) {
			document.getElementById('wagonContainer').style.left = "889px";
		} else if (milesTravelled <= 100) {
			document.getElementById('wagonContainer').style.left = "859px";
		} else if (milesTravelled <= 120) {
			document.getElementById('wagonContainer').style.left = "829px";
		} else if (milesTravelled <= 140) {
			document.getElementById('wagonContainer').style.left = "789px";
		} else if (milesTravelled <= 160) {
			document.getElementById('wagonContainer').style.left = "759px";
		} else if (milesTravelled <= 180) {
			document.getElementById('wagonContainer').style.left = "729px";
		} else if (milesTravelled <= 200) {
			document.getElementById('wagonContainer').style.left = "699px";
		} else if (milesTravelled <= 220) {
			document.getElementById('wagonContainer').style.left = "669px";
		} else if (milesTravelled <= 240) {
			document.getElementById('wagonContainer').style.left = "639px";
		} else if (milesTravelled <= 260) {
			document.getElementById('wagonContainer').style.left = "609px";
		} else if (milesTravelled <= 280) {
			document.getElementById('wagonContainer').style.left = "579px";
		} else if (milesTravelled <= 300) {
			document.getElementById('wagonContainer').style.left = "549px";
		} else if (milesTravelled <= 320) {
			document.getElementById('wagonContainer').style.left = "519px";
		} else if (milesTravelled <= 340) {
			document.getElementById('wagonContainer').style.left = "489px";
		} else if (milesTravelled <= 360) {
			document.getElementById('wagonContainer').style.left = "459px";
		} else if (milesTravelled <= 380) {
			document.getElementById('wagonContainer').style.left = "429px";
		} else if (milesTravelled <= 400) {
			document.getElementById('wagonContainer').style.left = "399px";
		} else if (milesTravelled <= 420) {
			document.getElementById('wagonContainer').style.left = "369px";
		} else if (milesTravelled <= 440) {
			document.getElementById('wagonContainer').style.left = "339px";
		} else if (milesTravelled <= 460) {
			document.getElementById('wagonContainer').style.left = "309px";
		} else if (milesTravelled <= 480) {
			document.getElementById('wagonContainer').style.left = "279px";
		} else {
			document.getElementById('wagonContainer').style.left = "240px";
		}
	}

	// Travel one day and calculate date++,miles travelled, health
	function travelDay() {
		if (gameOverBoolean === false) {
			// Change health according to weather
			healthWeather();
			// Change health and miles travelledaccording to pace
			healthMilesPace();
			// Check if party members died
			whoDied();
			// Check if milesTravelled = 500, then win game boolean = true
			if (milesTravelled >= 500) {
				gameWinBoolean = true;
			}
			// Check if daysTravelled > 35, then game over boolean = true
			if (daysTravelled > 45) {
				gameOverBoolean = true;
			}
			moveWagon();
			if (milesTravelled >= milesLandmark && milesLandmark === 100){ 
				kansasRiverCrossing();
				kansasBoolean = true;
			}
			else if (milesTravelled >= milesLandmark && milesLandmark === 200) {
				fortLaramie();
				laramieBoolean = true;
			}
			else if (milesTravelled >= milesLandmark && milesLandmark === 300) {
				independenceRock();
				independenceBoolean = true;
			}
			else if (milesTravelled >= milesLandmark && milesLandmark === 400) {
				fortBoise();
				boiseBoolean = true;
			}
			else if (milesTravelled >= milesLandmark && milesLandmark === 450) {
				theDalles();
				dallesBoolean = true;
			} else {
				// Display the screen
				displayScreen();
				getDate();
			}
			if (gameOverBoolean === true) {
				gameOver();
			}
			if (gameWinBoolean === true) {
				congratulations();
			}
		} else {
			gameOver();
		}
	}

	// Gives the first landmark event
	function kansasRiverCrossing() {
		// increment miles to next landmark
		milesLandmark = 200;
		// Set the display
		landmarkImage = "<img src=\"/images/river.jpeg\" >";
		document.getElementById('imageHolder').innerHTML = landmarkImage;
		document.getElementById('messageBox').innerHTML = "Kansas River Crossing";
		updateLandmark("River");
		getRiverDepth();
		document.getElementById('featureMessage').innerHTML = "<p>River width: 629 feet<br>" +
			"River depth: " + riverDepth + " feet</p>" + "<p>You may:<br></p>" +
			"<ol><li id=\"option1\">Attempt to ford the river</li>" +
			"<li id=\"option2\">Caulk wagon and float it across</li>" +
			"<li id=\"option3\">Take a ferry across</li>" +
			"<li id=\"option4\">Wait to see if conditions improve</li></ol>";
	}

	// Gives the second landmark event
	function fortLaramie() {
		milesLandmark = 300;
		// set display
		landmarkImage = "<img src=\"/images/fortLaramie.jpg\" >";
		document.getElementById("imageHolder").innerHTML = landmarkImage;
		document.getElementById('messageBox').innerHTML = "Fort Laramie";
		updateLandmark(PLAINS);
		document.getElementById('featureMessage').innerHTML = "<p>You come across two Sioux tribesmen 10 " +
			"miles outside of Fort Laramie. They look ill and hungry. What would you like to do?</p>" +
			"<p>You may:<br></p>" +
			"<ol><li id=\"option1\">Gives supplies and money</li>" +
			"<li id=\"option2\">Give them a ride to their home 30 miles off the trail</li>" +
			"<li id=\"option3\">Ignore them and continue on the trail</li></ol>";
	}

	// Gives the third landmark event
	function independenceRock() {
		milesLandmark = 400;
		// set display
		landmarkImage = "<img src=\"/images/independenceRock.jpg\" >";
		document.getElementById("imageHolder").innerHTML = landmarkImage;
		document.getElementById('messageBox').innerHTML = "Independence Rock";
		updateLandmark(PLAINS);
		document.getElementById('featureMessage').innerHTML = "<p>There is a large wagon conway camped " +
			"along Independence Rock as you approach. What would you like to do?</p>" +
			"<p>You may:<br></p>" +
			"<ol><li id=\"option1\">Climb Independence Rock and mark your initials</li>" +
			"<li id=\"option2\">Speak to fellow travellers</li>" +
			"<li id=\"option3\">Continue on the trail</li></ol>";
	}

	// Gives the fourth landmark event
	function fortBoise() {
		milesLandmark = 450;
		// set display
		landmarkImage = "<img src=\"/images/fortBoise.jpg\" >";
		document.getElementById("imageHolder").innerHTML = landmarkImage;
		document.getElementById('messageBox').innerHTML = "Fort Boise";
		updateLandmark(PLAINS);
		document.getElementById('featureMessage').innerHTML = "<p>As you enter Fort Boise, an injured man " +
			" named Newton Ward walks up to your wagon. He explains that his wagon convoy was attacked by " +
			"Shoshone Indians. He was the only one able to escape alive. What would you like to do?</p>" +
			"<p>You may:<br></p>" +
			"<ol><li id=\"option1\">Gives supplies and money</li>" +
			"<li id=\"option2\">Ride out to the attack site and search for survivors</li>" +
			"<li id=\"option3\">Ignore him and continue on the trail</li></ol>";
	}

	// Gives fifth landmark event
	function theDalles() {
		milesLandmark = 500;
		// set display
		landmarkImage = "<img src=\"/images/dallesRiver.jpg\" >";
		document.getElementById("imageHolder").innerHTML = landmarkImage;
		document.getElementById('messageBox').innerHTML = "The Dalles";
		updateLandmark(PLAINS);
		document.getElementById('featureMessage').innerHTML = "<p>You prepare your wagon to float down " +
			"the Dalles River Canyon. As you push off down the river, you realize the current is moving " +
			" very quickly and you will need to make good decisions on how to traverse the river's obstacles. " +
			"There is a large rock formation up ahead. What would you like to do?</p>" +
			"<p>You may:<br></p>" +
			"<ol><li id=\"option1\">Go left of the rock formation</li>" +
			"<li id=\"option2\">Go right of the rock formation</li></ol>";
	}

	// Landmark helper function
	function updateLandmark(terrain) {
		document.getElementById('currentTerrain').innerHTML = "Current Terrain: " + terrain;
		getWeather();
		getDate();
		document.getElementById('partyHealth').innerHTML = "Current Health: " + currentHealth;
		document.getElementById('milesTravelled').innerHTML = "Miles Travelled: " + milesTravelled;
		document.getElementById('milesLandmark').innerHTML = "Miles To Next Landmark: " + milesLandmark;
		isPartyAlive();
		document.getElementById('currentPace').innerHTML = CURRENT_PACE + currentPace;
	}

	// Randomize river depth and river width
	function getRiverDepth() {
		riverDepth = (Math.random() * 4) + 2;
	}

	function gameOver() {
		document.getElementById('messageBox').innerHTML = "Game Over!\nPress spacebar to try again!";
		gameOverBoolean = true;
	}

	function congratulations() {
		document.getElementById('messageBox').innerHTML = "Congratulations! You made it to Oregon City!";
		score = milesTravelled + currentHealth + currentMoney + membersAlive + rockScore;
		terrainImage = "<img src=\"/images/oregoncity.jpg\" >";
		document.getElementById("imageHolder").innerHTML = terrainImage;
		document.getElementById('featureMessage').innerHTML = "<p>Congratulations! Your total score is: \n" +
			"Miles Travelled: " + milesTravelled + "\nCurrent Health: " + currentHealth + "\nCurrent Money: " +
			userSettings.money + "\nParty Members Alive: " + membersAlive + "\nBonus Score: " + rockScore + "Total Score: " + score + "\nThanks for " +
			"playing!\nPress the spacebar to return to the main menu.</p>";
			gameWinBoolean = true;
	}

	// Helper function for incrementing the current gameday and calling travelDay
	function incrementDay() {
		travelDay();
		currentGameDay++;
	}
} else {
	alert("Sorry! Your browser does not support Javascript!");
}