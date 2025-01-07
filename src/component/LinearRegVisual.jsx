import React from 'react';
import Plot from 'react-plotly.js';
import { useState } from 'react';

function LineaRegVisual({slope , intercept , xValues , yValues}){

  const [y_val , setYVal] = useState("")
  const predictedYValues = xValues.map((x) => slope*x + intercept)
  function handleChange(e){
    const value = slope * Number(e.target.value) + intercept;
    setYVal(value)
  }
  const scatterData = {
    type: 'scatter',
    mode: 'markers', // Scatter points
    name: 'Data Points',
    x: xValues, // Example x-values for data points
    y: yValues, // Example y-values for data points
    marker: { color: 'blue' }, // Color of the points
  };

  // Line data (your regression line)
  const lineData = {
    type: 'scatter',
    mode: 'lines', // Line chart
    name: 'Regression Line',
    x: xValues, // Same x-values as the scatter
    y: predictedYValues, // Example regression line y-values (for a simple y = x line)
    line: { color: 'red' }, // Color of the regression line
  };

  // Combine both data traces
  const data = [scatterData, lineData];

  // Layout configuration
  const layout = {
    title: 'Linear Regression Visualization',
    xaxis: { title: 'X Axis (Input)' },
    yaxis: { title: 'Y Axis (Output)' },
    showlegend: true, // Display legend
  };

  return (
    <>
      <Plot
        data={data}     // Data array containing both scatter and line
        layout={layout} // Layout for the chart
        config={{ responsive: true }} // Make chart responsive
      />

      <input type="number"
      placeholder='enter X value'
      onChange={handleChange}
      />
      <input type="number" 
      value={y_val}
      readOnly = {true}
      
      />
    </>
  );

}

export default LineaRegVisual ;