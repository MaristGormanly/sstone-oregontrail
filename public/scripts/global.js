if (typeof(Storage) !== "undefined") {
	window.onload = window.resizeTo(1160,720);
	let x = document.cookie;
	if (x == "musicState=off") {
		music.autoplay = false;
	} else {
		music.autoplay = true;
	}

	document.addEventListener('keypress', (event) => {
		const keyName = event.keyCode;
		if (keyName === 52) {
			if(music.paused) {
				music.play();
				document.cookie = "musicState=on";
			} else {
				music.pause();
				document.cookie = "musicState=off";
			}		
		}
	});
} else {
	alert("Sorry. Your browser does not support JavaScript.");
}