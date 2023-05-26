// Function takes a data table and groups by dates
export function groupWeatherData(weatherData) {
  const groupedData = {};
  weatherData.forEach(item => {
    const date = item.dt_txt.split(' ')[0];
    if (!groupedData[date]) {
      groupedData[date] = [];
    }
    groupedData[date].push(item);
  });
  return groupedData;
}
