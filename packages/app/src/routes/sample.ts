import type { ChartConfigurationInstance } from 'chart.js';

export const ghData: ChartConfigurationInstance[] = [
  {
    type: 'bar',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [
        {
          label: 'Sales',
          data: [42, 53, 60, 75, 56, 40],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: {
          ticks: {
            // beginAtZero: true,
          },
        },
      },
    },
  },
  {
    type: 'pie',
    data: {
      labels: ['Red', 'Green', 'Yellow'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
      ],
    },
    options: {
      responsive: true,
      // legend: {
      //   position: 'top',
      // },
      // title: {
      //   display: true,
      //   text: 'Pie Chart',
      // },
      animation: {
        // animateScale: true,
        // animateRotate: true,
      },
    },
  },
  {
    type: 'line',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          data: [65, 59, 80, 81, 56, 55, 40],
        },
        {
          label: 'My Second dataset',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          data: [28, 48, 40, 19, 86, 27, 90],
        },
      ],
    },
    options: {
      responsive: true,
      // title: {
      //   display: true,
      //   text: 'Line Chart',
      // },
      // tooltips: {
      //   mode: 'index',
      //   intersect: false,
      // },
      hover: {
        mode: 'nearest',
        intersect: true,
      },
      scales: {
        // xAxes: [
        //   {
        //     display: true,
        //     scaleLabel: {
        //       display: true,
        //       labelString: 'Month',
        //     },
        //   },
        // ],
        // yAxes: [
        //   {
        //     display: true,
        //     scaleLabel: {
        //       display: true,
        //       labelString: 'Value',
        //     },
        //   },
        // ],
      },
    },
  },
  {
    type: 'radar',
    data: {
      labels: [
        'Eating',
        'Drinking',
        'Sleeping',
        'Designing',
        'Coding',
        'Cycling',
        'Running',
      ],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: 'rgba(179,181,198,0.2)',
          borderColor: 'rgba(179,181,198,1)',
          pointBackgroundColor: 'rgba(179,181,198,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(179,181,198,1)',
          data: [65, 59, 90, 81, 56, 55, 40],
        },
        {
          label: 'My Second dataset',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          pointBackgroundColor: 'rgba(255,99,132,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(255,99,132,1)',
          data: [28, 48, 40, 19, 96, 27, 100],
        },
      ],
    },
    options: {
      responsive: true,
      // title: {
      //   display: true,
      //   text: 'Radar Chart',
      // },
      // scale: {
      //   ticks: {
      //     beginAtZero: true,
      //   },
      // },
    },
  },
  {
    type: 'bubble',
    data: {
      datasets: [
        {
          label: 'My First dataset',
          data: [
            {
              x: 20,
              y: 30,
              r: 15,
            },
            {
              x: 40,
              y: 10,
              r: 10,
            },
          ],
        },
      ],
    },
  },
];

export const wtData: ChartConfigurationInstance[] = [
  {
    type: 'polarArea',
    data: {
      labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue'],
      datasets: [
        {
          data: [11, 16, 7, 3, 14],
          backgroundColor: [
            '#FF6384',
            '#4BC0C0',
            '#FFCE56',
            '#E7E9ED',
            '#36A2EB',
          ],
          label: 'My dataset',
        },
      ],
    },
    options: {
      responsive: true,
      // legend: {
      //   position: 'right',
      // },
      // title: {
      //   display: true,
      //   text: 'Polar Area Chart',
      // },
      // scale: {
      //   ticks: {
      //     beginAtZero: true,
      //   },
      //   reverse: false,
      // },
      // animation: {
      //   animateRotate: false,
      //   animateScale: true,
      // },
    },
  },
];
