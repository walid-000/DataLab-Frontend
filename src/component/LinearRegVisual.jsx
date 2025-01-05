import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components of Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function LinearRegVisual({ slope, intercept, xField, yField }) {
    const [predictedData, setPredictedData] = useState([]);
    const [ yValuePredict , setYValuePredict ] = useState('') 
    // If slope and intercept are not available, show a message
    if (!slope || !intercept) {
        return <div>No sufficient data</div>;
    }

    function predictY(e){
        const x_value = Number(e.target.value) ;
        const y_value = slope * x_value + intercept ;
        setYValuePredict(y_value);
    }

    // Calculate predicted y-values based on the linear regression equation
    useEffect(() => {
        if (xField && slope !== null && intercept !== null) {
            const predictions = xField.map(x => slope * x + intercept);
            setPredictedData(predictions);
        }
    }, [slope, intercept, xField]);

    // Chart.js data structure
    const chartData = {
        labels: xField, // Use xField as the labels on the x-axis
        datasets: [
            {
                label: 'Original Data',
                data: yField, // yField data
                fill: false,
                borderColor: 'blue',
                tension: 0.1,
            },
            {
                label: 'Linear Regression Line',
                data: predictedData, // Predicted y-values (regression line)
                fill: false,
                borderColor: 'red',
                tension: 0.1,
            },
        ],
    };

    return (
        <>
            <h2>Linear Regression Visualization</h2>
            <p>Slope: {slope}</p>
            <p>Intercept: {intercept}</p>
            <Line data={chartData} />
            <input type="number" 
            onChange={predictY}/>
            
            <input type="number"
            value={yValuePredict}
            readOnly={true}
            />
        </>
    );
}

export default LinearRegVisual;
