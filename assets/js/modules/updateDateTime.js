import { dateElement, timeElement } from "../script.js";

// Function to update the date and time
export function updateDateTime() {
  const now = moment(); 
  const formattedDate = now.format('MMMM Do, YYYY');
  const formattedTime = now.format('h:mm:ss A');

  dateElement.textContent = formattedDate;
  timeElement.textContent = formattedTime;
}
