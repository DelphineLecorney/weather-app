export function createLineChart(element, chartData, cityName) {
  const ctx = element.getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: chartData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: `Temperatures - ${cityName}`,
          font: {
            size: 16
          }
        }
      }
    },
  });
}
