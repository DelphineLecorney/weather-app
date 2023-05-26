
/* Function for implementing autocomplete */

export function autocompleteCityInput(inputElement, apiCityKey) {
  const apiUrl = 'https://api.api-ninjas.com/v1/city';

  // Add an event listener to the input element for the "input" event
  inputElement.addEventListener('input', async (event) => {
    const userInput = event.target.value.trim();
    // Check if the user input is empty
    if (userInput === '') {
      inputElement.removeAttribute('list');
      return;
    }

    try {
      // Send a GET request to the API with the user input and API key
      const response = await fetch(`${apiUrl}?name=${encodeURIComponent(userInput)}&limit=10`, {
        headers: { 'X-Api-Key': apiCityKey }
      });

      if (response.ok) {
        const results = await response.json();
        // Add the datalist with option elements for each suggestion
        const suggestions = results.map(result => result.name);

        inputElement.setAttribute('list', 'city-options');

        const datalistElement = document.createElement('datalist');
        datalistElement.id = 'city-options';

        suggestions.forEach(suggestion => {
          const optionElement = document.createElement('option');
          optionElement.value = suggestion;
          datalistElement.appendChild(optionElement);
        });
        // Check if an existing datalist element exists and replace it with the new one      
        const existingDatalist = document.querySelector('#city-options');
        if (existingDatalist) {
          existingDatalist.parentNode.replaceChild(datalistElement, existingDatalist);
        } else {// or insert the new datalist after the input element
          // inputElement.nextSibling = the next brother 
          inputElement.parentNode.insertBefore(datalistElement, inputElement.nextSibling);
        }
      } else {
        console.error('Error', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });
}
