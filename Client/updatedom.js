function updateSearchTermElt() {
	const element = document.getElementById('searchTermDisplay');
	if (searchTerm.length !== 0) {
		element.innerText = `Search term is ${searchTerm}`;
	}
	else {
	 element.innerText = "Type or tap on the numpad to search for numbers in PI";
	}
}


function resetPIBox() {
	const element = document.getElementById('PIBox');
	element.innerText = PI;
}


function updateIndexDisplay(serverRes) {
	const indexDisplay = document.getElementById('indexDisplay');

	if (serverRes.posFoundAt !== -1) {
		indexDisplay.style.color = 'white';
		indexDisplay.innerText = `Found at index ${serverRes.posFoundAt}`;
	}
	else {
		indexDisplay.style.color = 'red';
		indexDisplay.innerText = `The search term ${searchTerm} was not found in the 1st million digits of PI`;
	}
}


function beautifyIndex(indexStr) {
	indexStr = indexStr.toString();
	let formattedArr = [];

	let numbersPassed = 0;
	for (let i = 0; i < indexStr.length; i++) {
		formattedArr.push(indexStr[i]);
		if (numbersPassed % 3 === 0) {
			if (indexStr[i+1] === undefined) { continue; }
			formattedArr.push(',');
		}
		numbersPassed++;
	}
	// console.log(formattedIndex);
	// formattedArr.reverse();
	const formattedIndex = formattedArr.join('');
	return formattedArr.join('');
	// return formattedIndex;
}


function resetIndexDisplay() {	
	console.log('index display resetted')
	const indexDisplay = document.getElementById('indexDisplay');
	indexDisplay.innerText = '';
}


function updateUnderline() {
	const PIBox = document.getElementById('PIBox');
	PIBox.style.setProperty('--underline-len', searchTerm.length);
}

function updateResults(serverRes) {
	if (serverRes.extraData) {
		document.getElementById('PIBox').innerHTML = serverRes.extraData;
	}
}
