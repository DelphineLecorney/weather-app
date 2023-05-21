/*function that groups weather data by date, it extracts 
the date of each element and groups those with the same date 
in an array of tables containing weather data by date
*/

export function groupWeatherData(weatherData) {
  const groupedData = [];
  const tempData = {};

  weatherData.forEach(item => {
    const date = moment(item.dt * 1000).format('YYYY-MM-DD');

    if (!tempData[date]) {
      tempData[date] = [];
    }

    tempData[date].push(item);
  });

  Object.keys(tempData).forEach(date => {
    groupedData.push(tempData[date]);
  });

  return groupedData;
}
