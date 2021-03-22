let searchTerm = "";
const PI = "3.1415926535897932384626433832795028841";


async function getNewPI() {
	// HERE WE WILL UPDATE THE DOM ELEMENT THAT DISPLAYS THE SEARCH_TERM
	updateSearchTermElt();
	updateUnderline();

	if (searchTerm === '') {
		resetPIBox();
		resetIndexDisplay();
		return;
	}


	// HERE IS WILL ASK THE SERVER TO FIND THE SEARCH  TERM IN PI
	const LINK = `http://127.0.0.1:5000/search/${searchTerm}`;
	await fetch(LINK)
				.then(res => res.json())
				.then(data => {
						Object.freeze(data);
						updateResults(data);
						updateIndexDisplay(data);
				})
}