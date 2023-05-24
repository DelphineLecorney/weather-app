export function prepareChartData(groupedData) {
  const dates = [];
  const minTemperatureData = [];
  const maxTemperatureData = [];

  for (const date in groupedData) {
    const dayData = groupedData[date];
    const minTemp = Math.min(...dayData.map(item => item.main.temp - 273.15));
    const maxTemp = Math.max(...dayData.map(item => item.main.temp - 273.15));

    dates.push(date);
    minTemperatureData.push(minTemp.toFixed(1));
    maxTemperatureData.push(maxTemp.toFixed(1));
  }

  return {
    labels: dates,
    datasets: [
      {
        label: 'Min Temperature',
        data: minTemperatureData,
        backgroundColor: 'transparent',
        borderColor: 'rgba(192, 75, 75, 1)',
        borderWidth: 1,
      },
      {
        label: 'Max Temperature',
        data: maxTemperatureData,
        backgroundColor: 'transparent',
        borderColor: 'rgba(75, 192, 75, 1)',
        borderWidth: 1,
      },
    ],
  };
}
