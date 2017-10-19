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
} else {
	alert("Sorry. Your browser does not support JavaScript.");
}
