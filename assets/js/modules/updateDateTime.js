import { dateElement, timeElement } from "../script.js";

// Function to update the date and time
export function updateDateTime() {
  const now = moment();
  const formattedDate = now.format('dddd D MMMM YYYY');
  const formattedTime = now.format('h:mm:ss A');

  dateElement.textContent = formattedDate;
  timeElement.textContent = formattedTime;
}
