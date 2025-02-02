import React, { useState, useEffect } from 'react';

const FieldSelectionForm = ({ data , setBeta , setEpsilon}) => {
  // State for selected fields
  const [selectedIndependents, setSelectedIndependents] = useState([]);
  const [selectedDependent, setSelectedDependent] = useState('');
  const [numIndependents, setNumIndependents] = useState(0); // Track number of independents

  // Extract the field names (keys) from the first data object to use for selection
  const [fields, setFields] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      // Get the field names from the first data object
      const fieldNames = Object.keys(data[0]);
      setFields(fieldNames);
    }
  }, [data]);

  // Handler for changes in independent variables selection
  const handleIndependentsChange = (e) => {
    const value = e.target.value;
    setSelectedIndependents((prev) => {
      const newSelection = prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value];
      // Update the number of selected independent variables
      setNumIndependents(newSelection.length);
      return newSelection;
    });
  };

  // Handler for dependent variable selection
  const handleDependentChange = (e) => {
    setSelectedDependent(e.target.value);
  };

  // Filter available fields for dependent selection based on selected independents
  const availableFieldsForDependent = fields.filter(
    (field) => !selectedIndependents.includes(field)
  );

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that both independent and dependent variables are selected
    if (selectedIndependents.length === 0 || !selectedDependent) {
      alert("Please select both independent and dependent variables.");
      return;
    }

    // Get the dependent values for the selected dependent variable
    const dependentValues = data.map((item) => item[selectedDependent]);
    console.log("Dependent values:", dependentValues);

    // Get the values for each selected independent variable and group them per data point
    const independentValues = data.map((item) =>
      selectedIndependents.map((independent) => item[independent])
    );

    console.log("Independent values (array of arrays per data point):", independentValues);

    
    const processedData = {
       y : dependentValues,
      x : independentValues, 
    };

    console.log("Processed Data to be sent:", processedData);

    // Uncomment below to send data to your server
    
    try {
      const response = await fetch("http://localhost:3005/multiple-linear-regression", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(processedData),
      });

      if (response.ok) {
        alert("Data submitted successfully!");

        const data = await response.json() ;
        setBeta(data.coefficients)
        setEpsilon(data.residuals)
        console.log(data)
      } else {
        alert("Error submitting data.");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("An error occurred while submitting the form.");
    }
    
  };

  return (
    <div>
      <h2>Multiple Linear Regression Field Selection</h2>

      <form onSubmit={handleSubmit}>
        {/* Section for Independent Variables (X) */}
        <div>
          <h3>Select Independent Variables (X):</h3>
          {fields.map((field) => (
            <div key={field}>
              <input
                type="checkbox"
                value={field}
                onChange={handleIndependentsChange}
                checked={selectedIndependents.includes(field)}
              />
              {field}
            </div>
          ))}
        </div>

        {/* Section for Dependent Variable (Y) */}
        <div>
          <h3>Select Dependent Variable (Y):</h3>
          <select value={selectedDependent} onChange={handleDependentChange}>
            <option value="">--Select Dependent Variable--</option>
            {availableFieldsForDependent.map((field) => (
              <option key={field} value={field}>
                {field}
              </option>
            ))}
          </select>
        </div>

        {/* Display the number of selected independent variables */}
        <div>
          <h3>Number of Independent Variables Selected: {numIndependents}</h3>
        </div>

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>

      {/* Display the selected fields */}
      <div>
        <h3>Selected Independent Variables (X):</h3>
        <ul>
          {selectedIndependents.map((field) => (
            <li key={field}>{field}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Selected Dependent Variable (Y):</h3>
        <p>{selectedDependent}</p>
      </div>
    </div>
  );
};

export default FieldSelectionForm;
