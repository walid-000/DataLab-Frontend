import React, { useState } from 'react';
import Papa from 'papaparse';
import { data } from 'react-router-dom';

// CSV Upload Component (Component 1)
const UploadFile = ({ setData  }) => {
  const [csvFile, setCsvFile] = useState(null);

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCsvFile(file);
  };

  // Parse the CSV file
  const handleFileUpload = () => {
    if (csvFile) {
      Papa.parse(csvFile, {
        complete: (result) => {
          setData(result.data);  
        },
        header: true,
        skipEmptyLines: true,
      });
    } else {
      alert('Please select a CSV file.');
    }
  };

  return (
    <div>
      <h2>Upload CSV File</h2>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Parse CSV</button>
   
    </div>
  );
};

export default UploadFile
