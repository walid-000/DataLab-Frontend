import { useState } from "react";
function SimpleLinearReg({dataset}){
  const [xField, setXField] = useState("");  // Field selected for x (independent)
  const [yField, setYField] = useState("");  // Field selected for y (dependent)
  const [message, setMessage] = useState("");  // Feedback message
  const [data, setData] = useState([]);  // Dataset to train

  // Extracting the keys from the first item in the dataset to populate the dropdowns
  const fields = Object.keys(dataset[0]);

  // Handle changes in the field selections
  const handleXChange = (e) => setXField(e.target.value);
  const handleYChange = (e) => setYField(e.target.value);

  // Handle form submission to train the model
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!xField || !yField) {
      setMessage("Please select both independent (x) and dependent (y) variables.");
      return;
    }

    // Extract the x and y values for model training
    const xValues = dataset.map((item) => parseFloat(item[xField]));
    const yValues = dataset.map((item) => parseFloat(item[yField]));
    console.log(xValues);
    console.log(yValues)
    // Prepare the data to send to the backend
    // const trainData = xValues.map((x, index) => ({
    //   [xField]: x,
    //   [yField]: yValues[index],
    // }));

    const fomattedData = { xField : xValues , yField : yValues} ;
    try {

      console.log('data being send' , fomattedData )
      // Send the data to the backend to train the model using fetch
      const response = await fetch("http://localhost:3000/linear-regression", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: fomattedData }),
      });

      const responseData = await response.json();
      
      if (response.ok) {
        setMessage(responseData.message || "Model trained successfully!");
      } else {
        setMessage(`Error: ${responseData.message}`);
      }
    } catch (error) {
      setMessage("Error while training the model: " + error.message);
    }
  };

  return (
    <div className="App">

      <pre>{JSON.stringify(dataset , null , 2)}</pre>
      <h1>Linear Regression Training</h1>
      
    <p>x field is {xField} </p>
    <p>y field is {yField}</p>

      {/* Dropdowns for selecting x and y */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Independent Variable (x): </label>
          <select onChange={handleXChange} value={xField}>
            <option value="">Select x (Independent)</option>
            {fields.map((field) => (
              <option key={field} value={field}>
                {field}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Dependent Variable (y): </label>
          <select onChange={handleYChange} value={yField}>
            <option value="">Select y (Dependent)</option>
            {fields.map((field) => (
              <option key={field} value={field}>
                {field}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Train Model</button>
      </form>

      {/* Display message after submission */}
      {message && <p>{message}</p>}
    </div>
  );
}

export default SimpleLinearReg ;