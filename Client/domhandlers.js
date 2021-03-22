window.addEventListener('keyup', handleKeyPressed);


function handleKeyPressed(e) {
	const key = e.key.toLowerCase();
	const element = document.getElementById(key);

	if (element) {
		element.classList.add('glow');
		setTimeout(() => element.classList.remove('glow'), 300);

		if (key === 'backspace') { handleBackSpace(); }
		else if (key === 'x')    { clearSearchTerm(); }
		else { appendNumberToSearchTerm(key); }
	}
}




function handleBackSpace() {
	// REMOVE THE LAST ELEMENT FROM THE SEARCH_TERM
	searchTerm = searchTerm.slice(0, -1);
	getNewPI();
}


function appendNumberToSearchTerm(id) {
	// APPEND THE NEW NUMBER TO THE
	searchTerm += id;
	getNewPI();
}


function clearSearchTerm() {
	// TURN IT INTO AN EMPTY STRING
	searchTerm = "";
	getNewPI();
}
