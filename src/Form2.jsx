import React, { useState, useEffect } from 'react';
import DisplayTable from './component/DisplayTable';

function Form2({ data, setData , setStep}) {
  const [columnsToDrop, setColumnsToDrop] = useState([]);
  const [removeEmptyRows, setRemoveEmptyRows] = useState(false);
  const [removeDuplicates, setRemoveDuplicates] = useState(false);
  const [cleanedData, setCleanedData] = useState(data);

function handleNextComponent(){
  // setData(cleanData);
  setStep(3);
}


  // Extract headers from the first row of data
  const headers = data && data[0] ? Object.keys(data[0]) : [];

  // Handle column selection (dropping columns)
  const handleColumnChange = (column, isChecked) => {
    setColumnsToDrop((prev) =>
      isChecked ? [...prev, column] : prev.filter(col => col !== column)
    );
  };

  // Clean data based on user's choices
  const cleanData = () => {
    let cleanedData = [...data]; // Copy the original data to avoid mutating the original

    // 1. Drop unrequired columns based on user selection
    if (columnsToDrop.length > 0) {
      cleanedData = cleanedData.map(row => {
        const newRow = { ...row };
        columnsToDrop.forEach(col => {
          delete newRow[col]; // Delete columns that the user selected
        });
        return newRow;
      });
    }

    // 2. Remove rows with empty values if selected
    if (removeEmptyRows) {
      cleanedData = cleanedData.filter(row => {
        return Object.values(row).every(value => value !== null && value !== ''); // Remove rows with empty values
      });
    }

    // 3. Remove duplicate rows if selected
    if (removeDuplicates) {
      cleanedData = cleanedData.filter((value, index, self) =>
        index === self.findIndex((t) => (
          t['column1'] === value['column1'] // Assuming we are checking 'column1' for uniqueness (you can customize this)
        ))
      );
    }

    setCleanedData(cleanedData); // Update state with cleaned data
    setData(cleanedData); // Optionally send cleaned data back to parent
  };

  useEffect(() => {
    setCleanedData(data); // Reset cleaned data when the input data changes
  }, [data]);

  return (
    <div>
      <h2>Form2 - Data Cleaning Options</h2>

      {/* Show headers */}
      <h3>Select Columns to Drop</h3>
      {headers.length > 0 ? (
        headers.map((header) => (
          <div key={header}>
            <label>
              <input
                type="checkbox"
                onChange={(e) => handleColumnChange(header, e.target.checked)}
              />
              {header}
            </label>
          </div>
        ))
      ) : (
        <p>No headers available.</p>
      )}

      {/* Checkbox for removing empty rows */}
      <div>
        <label>
          <input
            type="checkbox"
            onChange={(e) => setRemoveEmptyRows(e.target.checked)}
          />
          Remove Rows with Empty Values
        </label>
      </div>

      {/* Checkbox for removing duplicate rows */}
      <div>
        <label>
          <input
            type="checkbox"
            onChange={(e) => setRemoveDuplicates(e.target.checked)}
          />
          Remove Duplicate Rows
        </label>
      </div>

      {/* Apply the selected cleaning actions */}
      <button onClick={cleanData}>Apply Data Cleaning</button>

      {/* Display the cleaned data */}
      <DisplayTable data={cleanedData} />
      <button onClick={handleNextComponent}>next step</button>
    </div>
  );
}

export default Form2;
