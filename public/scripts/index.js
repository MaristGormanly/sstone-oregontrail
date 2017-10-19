if(document.addEventListener) {
	document.addEventListener('keypress', function(event) {
		const keyName = event.keyCode;
		if (keyName === 32) {
			location.replace("mainmenu");
		}
	});
}
else {
	alert("Sorry. Your browser does not support JavaScript.");
}