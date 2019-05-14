if (document.addEventListener) {
	// Listen for spacebar
	document.addEventListener('keypress', (event) => {
		const keyName = event.keyCode;
		if (keyName === 32) {
			location.replace("mainmenu");
		}
	});
	// Listen for clicks
	document.addEventListener('click', (event) => {
		var x = event.target || event.srcElement;
		var fadedText = document.getElementById('fadedText');
		if (x === fadedText) {
			location.replace("mainmenu");
		}
	});
} else {
	alert("Sorry. Your browser does not support JavaScript.");
}