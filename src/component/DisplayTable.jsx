function DisplayTable({data}){
  // console.log(data)
    if (!data || data.length === 0) return <p>No data to display</p>;
    
    // Get headers from the first row of the data
    const headers = Object.keys(data[0]);
  
    return (
      <div>
        <h2>CSV Data Table</h2>
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {headers.map((header) => (
                  <td key={header}>{row[header]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <pre>{JSON.stringify(data , null , 2)}</pre>
      </div>
    );
  
}

export default DisplayTable ;