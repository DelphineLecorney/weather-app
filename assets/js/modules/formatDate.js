
export function formatDate(dateString) {
  const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
}
