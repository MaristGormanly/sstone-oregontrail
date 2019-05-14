if (document.addEventListener) {
	document.addEventListener('keypress', (event) => {
		const keyName = event.keyCode;
		if (keyName === 49) {
			location.replace("game");
		} else if (keyName === 51) {
			location.replace("top10");
		} else if (keyName === 52) {
			if (music.paused) {
				document.getElementById("sound").innerHTML = "4. Turn Sound On";
			} else {
				document.getElementById("sound").innerHTML = "4. Turn Sound Off";
			}		
		}
	});
	
	// Listen for clicks
	document.addEventListener('click', (event) => {
		let x = event.target || event.srcElement;
		let travel = document.getElementById('travel');
		let learn = document.getElementById('learn');
		let seeTop10 = document.getElementById('seeTop10');
		let sound = document.getElementById('sound');
		
		if (x === travel) {
			location.replace("game");
		} else if (x === seeTop10) {
			location.replace("top10");
		} else if (x === sound) {
			if (music.paused) {
				sound.innerHTML = "4. Turn Sound On";
			} else {
				sound.innerHTML = "4. Turn Sound Off";
			}
		} 
	});
} else {
	alert("Sorry. Your browser does not support JavaScript.");
}
