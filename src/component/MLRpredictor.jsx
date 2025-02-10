import React, { useState } from 'react';

function MLRpredictor({ betas, epsilon }) {
  // Initialize state to hold input values for independent variables
  const [inputs, setInputs] = useState(Array(betas.length - 1).fill('')); // One less than betas because beta0 is not part of inputs
  const [prediction, setPrediction] = useState(null); // To store the predicted Y value

  // Function to handle input change
  const handleInputChange = (index, event) => {
    const newInputs = [...inputs];
    newInputs[index] = event.target.value;
    setInputs(newInputs);
  };

  // Function to calculate prediction based on the inputs
  const calculatePrediction = () => {
    // Convert inputs to numbers
    const xValues = inputs.map((input) => parseFloat(input));
  
    // Log input values to debug
    console.log("Inputs: ", inputs);
    console.log("Parsed xValues: ", xValues);
    let types1 = inputs.map(element => ({ value: element, type: typeof element }));
    console.table(types1) ;
    let types2 = xValues.map(element => ({ value: element, type: typeof element }));
    console.table(types2);

  
    // Ensure all values are valid numbers
    if (xValues.some(isNaN)) {
      alert('Please enter valid numeric values for all inputs');
      return;
    }
    let types3 = betas.map(element => ({ value: element, type: typeof element }));
  
    // Log betas to debug
    // console.log("Betas: ", betas);
    
  
    // Calculate prediction using the regression formula
    let predictedY = Number(betas[0]); // Start with beta0 (intercept)
    console.log(typeof predictedY)
    for (let i = 0; i < xValues.length; i++) {
      predictedY += Number(betas[i + 1]) * xValues[i];
    }
  
    // predictedY += Number(epsilon);
  console.log("epsilon " , typeof epsilon[0] , epsilon[0])
  let ep = epsilon.map((input) => parseFloat(input));
  console.log("epsilon " , typeof ep[0] , ep[0])
    // Log final prediction to debug
    console.log("Predicted Y: ", predictedY);
    const epsum = ep.reduce((epsum, num) => epsum + num, 0);
    console.log(typeof epsum , epsum)
    predictedY = predictedY - epsum ;
    // Set the prediction result
    setPrediction(predictedY);
  };
  

  return (
    <div>
      <h2>Multiple Linear Regression Predictor</h2>
      
      <div>
        <label>Enter values for independent variables (X1, X2, ...):</label>
        {inputs.map((_, index) => (
          <div key={index}>
            <label>{`X${index + 1}:`}</label>
            <input
              type="number"
              value={inputs[index]}
              onChange={(e) => handleInputChange(index, e)}
            />
          </div>
        ))}
      </div>

      <button onClick={calculatePrediction}>Calculate Prediction</button>

      {prediction !== null && (
        <div>
          <h3>Predicted Y Value: {prediction}</h3>
        </div>
      )}
    </div>
  );
}

export default MLRpredictor;

