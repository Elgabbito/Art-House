async function getSingleArt() {
	// Instantiate URL search params object with current URL
	const params = new URLSearchParams(window.location.search);

	// Get art param from URL object and convert it to a string
	const artParam = params.get("art").toString();

	try {
		const response = await fetch(
			`http://localhost:4000/art/singleArt/${artParam}`
		);
		const data = await response.json();
		console.log(data);
		return data;
	} catch (error) {
		return error;
	}
}
function removeAdditionSymbol(inputString) {
	// Use a regular expression to find consecutive ampersands
	const regex = /\+/g;

	// Replace consecutive ampersands with a single ampersand
	const resultString = inputString.replace(regex, " ");

	return resultString;
}

getSingleArt();
