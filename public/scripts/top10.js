if(document.addEventListener) {
	//Listen for spacebar keypress and change to mainmenu
	document.addEventListener('keypress', function(event) {
		const keyName = event.keyCode;
		if (keyName === 32) {
			location.replace("mainmenu");
		}
	});

	//Create TopScore object
	function TopScore(name, score, date) {
		this.name = name;
		this.score = score;
		this.date = date;
	};

	//Initialize the first 10 top scores
	var pers1 = new TopScore('Stephen Stone',100,'10/1/2017');
	var pers2 = new TopScore('Bob Sanchez',165,'10/1/2017');
	var pers3 = new TopScore('Kyle Petty',23,'10/1/2017');
	var pers4 = new TopScore('Jeff Gordon',1025,'10/1/2017');
	var pers5 = new TopScore('Stefanie Torres',1002,'10/1/2017');
	var pers6 = new TopScore('The Joker',5123,'10/1/2017');
	var pers7 = new TopScore('David Wright',324,'10/1/2017');
	var pers8 = new TopScore('Charles Woodson',654,'10/1/2017');
	var pers9 = new TopScore('Bob Burger',1234,'10/1/2017');
	var pers10 = new TopScore('Clint Eastwood',851,'10/1/2017');

	//Insert top scores into array
	var topScoreArray = [pers1, pers2, pers3, pers4, pers5, pers6, 
						pers7, pers8, pers9, pers10];

	//Function that will compare the TopScore objects
	function compare(a, b) {
		const scoreA = a.score;
		const scoreB = b.score;
		
		let comparison = 0;
		if (scoreA < scoreB) {
			comparison = 1;
		} else if (scoreA > scoreB) {
			comparison = -1;
		}
		return comparison;
	}

	//This function will count the number of attributes within an object
	Object.prototype.count = function () {
		var count = 0;
		for(var prop in this) {
			if(this.hasOwnProperty(prop))
				count = count + 1;
		}
		return count;
	}

	topScoreArray.sort(compare);

	//Initalize variables for the table
	var body, tab, tr, row, th1, th2, th3;

	body = document.getElementById('top10');
	tab = document.createElement('table');

	//Create Headers
	tr = tab.insertRow(0);
	var head1 = tr.insertCell(0);
	var head2 = tr.insertCell(1);
	var head3 = tr.insertCell(2);

	head1.innerHTML = "Name";
	head2.innerHTML = "Score";
	head3.innerHTML = "Date";

	//Will iterate through each row of the array
	for (row=1; row <= topScoreArray.length; row++){
		tr = tab.insertRow(row);
		
		cell1 = tr.insertCell(0);
		cell2 = tr.insertCell(1);
		cell3 = tr.insertCell(2);
		
		cell1.innerHTML = row + ". " + topScoreArray[row - 1].name;
		cell2.innerHTML = topScoreArray[row - 1].score;
		cell3.innerHTML = topScoreArray[row - 1].date;
	}

	body.appendChild(tab);
} else {
	alert("Sorry. Your browser does not support JavaScript.");
}


