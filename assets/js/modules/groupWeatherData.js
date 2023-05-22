/*function that groups weather data by date, it extracts 
the date of each element and groups those with the same date 
in an array of tables containing weather data by date
*/

export function groupWeatherData(weatherData) {
  const groupedData = [];
  const tempData = {};
  // Extract date with the moment library and format
  weatherData.forEach(item => {
    const date = moment(item.dt * 1000).format('YYYY-MM-DD');
    // Create an array if the tempData doesn't have a property
    if (!tempData[date]) {
      tempData[date] = [];
    }
    // Push the elements in tempData
    tempData[date].push(item);
  });
  // Convert date into an array
  Object.keys(tempData).forEach(date => {
    groupedData.push(tempData[date]);
  });

  return groupedData;
}
