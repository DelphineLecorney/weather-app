export const apiUrl = 'https://api.api-ninjas.com/v1/city';

/* Function for implementing autocomplete, it create a datalist, 
an unique ID, a random string and associate at the list */
export function autocompleteCityInput(inputElement, apiCityKey) {
  const datalistElement = document.createElement('datalist');
  const datalistId = `datalist-${Math.random().toString(36).substring(2, 12)}`;
  datalistElement.id = datalistId;
  inputElement.setAttribute('list', datalistId);
  inputElement.parentNode.appendChild(datalistElement);

  let currentSuggestions = [];

  // Event listener of input for retrieve value and trim() for delete trailing whitespace
  inputElement.addEventListener('input', async (event) => {
    const userInput = event.target.value.trim();

    // Checks if the input is not empty to avoid sending an empty request
    if (userInput === '') {
      datalistElement.innerHTML = '';
      return;
    }

    try {// Executes and sends a GET request
      const response = await fetch(`${apiUrl}?name=${encodeURIComponent(userInput)}`, {
        headers: { 'X-Api-Key': apiCityKey }
      });
      // If resquest is ok, data is assigned to the vairable "currentSuggestions"
      if (response.ok) {
        const results = await response.json();
        currentSuggestions = results;
        // Delete the results
        datalistElement.innerHTML = '';
        // Checks the array and add to the datalist
        if (currentSuggestions.length > 0) {
          currentSuggestions.forEach(result => {
            const option = document.createElement('option');
            option.value = result.name;
            datalistElement.appendChild(option);
          });
        } else {
          console.error('No city found');
        }
      } else {
        console.error('Error', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });
  // Check if a click event on the document, if not it's declare an empty string
  document.addEventListener('click', (event) => {
    if (!inputElement.contains(event.target)) {
      datalistElement.innerHTML = '';
    }
  });
}
