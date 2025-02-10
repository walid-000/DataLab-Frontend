import React, { useState } from 'react';

const PearsonCorrelationTest = ({ data, headers }) => {
  // State to store selected groups, results
  const [group1, setGroup1] = useState("");
  const [group2, setGroup2] = useState("");
  const [correlation, setCorrelation] = useState(null);
  const [pValue, setPValue] = useState(null);

  // Handler for selecting groups for correlation
  const handleGroupChange = (event, group) => {
    const selectedHeader = event.target.value;
    if (group === "group1") {
      setGroup1(selectedHeader);
    } else {
      setGroup2(selectedHeader);
    }
  };

  // Function to perform the Pearson correlation test by calling the backend
  const doPearsonTest = async () => {
    if (!group1 || !group2) {
      alert("Please select both groups for the Pearson correlation test.");
      return;
    }

    // Extract the selected group data from the dataset
    const groupData1 = data.map(i => i[group1]);
    const groupData2 = data.map(i => i[group2]);

    // Prepare the payload for the request
    const payload = {
      group1_data: groupData1,
      group2_data: groupData2
    };
    
    try {
      // Send POST request to the Flask backend
      const response = await fetch('http://127.0.0.1:5000/api/pearson-correlation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        setCorrelation(result.correlation_coefficient);
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
      <h1>Pearson Correlation Test - Frontend UI</h1>
      
      {/* Dropdowns to select columns for correlation */}
      <select value={group1} onChange={(e) => handleGroupChange(e, "group1")}>
        <option value="">--Select First Group--</option>
        {headers.map((header) => (
          <option key={header} value={header}>
            {header}
          </option>
        ))}
      </select>

      <select value={group2} onChange={(e) => handleGroupChange(e, "group2")}>
        <option value="">--Select Second Group--</option>
        {headers.map((header) => (
          <option key={header} value={header}>
            {header}
          </option>
        ))}
      </select>

      {/* Button to trigger the correlation test */}
      <button onClick={doPearsonTest}>Pearson Correlation Test</button>

      {/* Display the results */}
      {correlation !== null && (
        <div>
          <h3>Pearson Correlation Result</h3>
          <p>Correlation Coefficient: {correlation}</p>
          <p>p-value: {pValue}</p>
        </div>
      )}
    </div>
  );
};

export default PearsonCorrelationTest;
