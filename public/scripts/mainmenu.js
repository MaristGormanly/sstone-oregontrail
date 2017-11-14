if(document.addEventListener) {
	document.addEventListener('keypress', function(event) {
		const keyName = event.keyCode;
	
		if(keyName === 49) {
			location.replace("game");
		}
		if(keyName === 51) {
			location.replace("top10");
		}
		if(keyName === 52) {
			if(music.paused) {
				document.getElementById("sound").innerHTML = "4. Turn Sound On";
			} else {
				document.getElementById("sound").innerHTML = "4. Turn Sound Off";
			}		
		}
	});
	
	//Listen for clicks
	document.addEventListener('click', function(event) {
		var x = event.target || event.srcElement;
		var travel = document.getElementById('travel');
		var learn = document.getElementById('learn');
		var seeTop10 = document.getElementById('seeTop10');
		var sound = document.getElementById('sound');
		
		if(x === travel){
			location.replace("game");
		}
		if(x === seeTop10){
			location.replace("top10");
		}
		if(x === sound){
			if(music.paused) {
				sound.innerHTML = "4. Turn Sound On";
			} else {
				sound.innerHTML = "4. Turn Sound Off";
			}
		}
} else {
	alert("Sorry. Your browser does not support JavaScript.");
}
