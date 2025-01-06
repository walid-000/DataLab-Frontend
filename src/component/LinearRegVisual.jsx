import React from 'react';
import { Line, Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registering the required chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function LinearRegVisual({ slope, intercept, xValues, yValues }) {
  // Generate the predicted y-values based on the regression line equation: y = slope * x + intercept
  const predictedYValues = xValues.map(x => slope * x + intercept);

  // Prepare data for scatter plot (original points)
  const scatterData = {
    datasets: [
      {
        label: 'Original Data',
        data: xValues.map((x, index) => ({ x, y: yValues[index] })),
        backgroundColor: 'rgba(75, 192, 192, 1)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        pointRadius: 5,
      },
    ],
  };

  // Prepare data for line chart (regression line)
  const lineData = {
    datasets: [
      {
        label: 'Regression Line',
        data: xValues.map((x, index) => ({ x, y: predictedYValues[index] })),
        fill: false,
        borderColor: 'rgba(255, 99, 132, 1)',
        tension: 0.1,
        borderWidth: 2,
      },
    ],
  };

  return (
    <div>
      <h2>Linear Regression Chart</h2>
      <div style={{ width: '80%', margin: '0 auto' }}>
        <Scatter data={scatterData} options={{ responsive: true }} />
        <Line data={lineData} options={{ responsive: true }} />
      </div>
    </div>
  );
}

export default LinearRegVisual;

// import React from 'react';
// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// // Registering the required chart.js components
// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// function LinearRegVisual({ slope, intercept, xValues, yValues }) {
//   // Generate the predicted y-values based on the regression line equation: y = slope * x + intercept
//   const predictedYValues = xValues.map(x => slope * x + intercept);

//   // Prepare data for both scatter plot (original points) and regression line
//   const chartData = {
//     datasets: [
//       {
//         label: 'Original Data',
//         data: xValues.map((x, index) => ({ x, y: yValues[index] })),
//         backgroundColor: 'rgba(75, 192, 192, 1)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 1,
//         pointRadius: 5,
//         showLine: false, // This will ensure we don't connect the scatter points with lines
//       },
//       {
//         label: 'Regression Line',
//         data: xValues.map((x, index) => ({ x, y: predictedYValues[index] })),
//         fill: false,
//         borderColor: 'rgba(255, 99, 132, 1)',
//         tension: 0.1,
//         borderWidth: 2,
//         showLine : true ,
//       },
//     ],
//   };

//   return (
//     <div>
//       <h2>Linear Regression Chart</h2>
//       <div style={{ width: '80%', margin: '0 auto' }}>
//         <Line data={chartData} options={{ responsive: true }} />
//       </div>
//     </div>
//   );
// }

// export default LinearRegVisual;
