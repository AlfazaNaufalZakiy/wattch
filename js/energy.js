const ctx = document.getElementById('powerChart').getContext('2d');
const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['T-4', 'T-3', 'T-2', 'T-1', 'T'],
    datasets: [
      {
        label: 'Outlet A',
        data: [70, 60, 55, 80, 80],
        borderColor: 'navy',
        fill: false,
      },
      {
        label: 'Outlet B',
        data: [20, 25, 35, 40, 50],
        borderColor: 'seagreen',
        fill: false,
      },
      {
        label: 'Outlet C',
        data: [35, 50, 45, 40, 40],
        borderColor: 'orange',
        fill: false,
      },
      {
        label: 'Outlet D',
        data: [40, 30, 20, 10, 0],
        borderColor: 'royalblue',
        fill: false,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 20
        }
      }
    }
  }
});
