import React, { useState } from 'react';

const OneSampleTtest = ({ data, headers }) => {
  // State to store the selected header, population mean, and the results
  const [oneSampleTest, setOnesampleTest] = useState("");
  const [popMean, setPopMean] = useState(0);
  const [tStat, setTStat] = useState(null);
  const [pValue, setPValue] = useState(null);

  // Handler for selecting a header (group to test)
  const handleOneSampleChange = (event) => {
    const selectedHeader = event.target.value;
    setOnesampleTest(selectedHeader);
  };

  // Function to perform the one-sample t-test by calling the backend
  const doOneSampleTtest = async () => {
    if (!oneSampleTest || popMean === 0) {
      alert("Please select a group and enter a population mean.");
      return;
    }

    // Extract the selected sample data from the data
    const sampleData = data.map(i => i[oneSampleTest]);

    // Prepare the payload for the request
    const payload = {
      data: sampleData,
      population_mean: popMean
    };

    try {
      // Send POST request to the Flask backend
      const response = await fetch('http://127.0.0.1:5000/api/one-sample-ttest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        setTStat(result.t_statistic);
        setPValue(result.p_value);
      } else {
        alert("Error: " + result.error);
      }
    } catch (error) {
      alert("Error connecting to the backend: " + error.message);
    }
  };

  return (
    <div>
      <h1>One Sample T-test - Frontend UI</h1>
      
      {/* Dropdown to select group/variable for the t-test */}
      <select value={oneSampleTest} onChange={handleOneSampleChange}>
        <option value="">--Select Group--</option>
        {headers.map((header) => (
          <option key={header} value={header}>
            {header}
          </option>
        ))}
      </select>

      {/* Input for population mean */}
      <input 
        type="number" 
        value={popMean} 
        onChange={(e) => setPopMean(Number(e.target.value))} 
        placeholder="Enter Population Mean" 
      />

      {/* Button to trigger the t-test */}
      <button onClick={doOneSampleTtest}>One Sample T-test</button>

      {/* Display the results */}
      {tStat !== null && (
        <div>
          <h3>T-test Result</h3>
          <p>t-statistic: {tStat}</p>
          <p>p-value: {pValue}</p>
        </div>
      )}
    </div>
  );
};

export default OneSampleTtest;
