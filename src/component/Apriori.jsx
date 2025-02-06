import React, { useState, useEffect } from 'react';
import AprioriResult from './AprioriResult';
function Apriori({ data }) {
  const [oneHotEncodedData, setOneHotEncodedData] = useState([]);
  const [uniqueItems, setUniqueItems] = useState([]);
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [frequentitemset , setFrequentItemSets] = useState({})

  // Step 1: One-hot encode the input data
  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
};
  useEffect(() => {
    const itemSet = new Set();
    const transactions = [];

    // Process the data and gather unique items
    data.forEach((transaction) => {
      const transactionItems = [];
      
      // Process each transaction and extract items
      for (const [key, value] of Object.entries(transaction)) {
        if (key.trim() !== "1") { // Skip transaction ID or other irrelevant keys
          const items = value.trim().split(' ').map(item => item.trim());
          transactionItems.push(...items);
          items.forEach(item => itemSet.add(item)); // Add each item to the set
        }
      }

      transactions.push(transactionItems);
    });

    const uniqueItemList = Array.from(itemSet);
    setUniqueItems(uniqueItemList);

    // Step 2: One-hot encode the transactions
    const encodedData = transactions.map((transactionItems) => {
      return uniqueItemList.map((item) => (transactionItems.includes(item) ? 1 : 0));
    });

    setOneHotEncodedData(encodedData);
  }, [data]);

  // Transpose and send the data to backend in processed format
  async function encodeIt() {
    const result = oneHotEncodedData[0].map((_, i) => oneHotEncodedData.map(subArr => subArr[i]));
    const processedData = {};

    // Prepare the processed data with items as keys
    for (let i = 0; i < uniqueItems.length; i++) {
      processedData[uniqueItems[i]] = result[i];
    }

    setLoading(true);
    setError(null);

    try {
      // Send the one-hot encoded data to the backend
      const response = await fetch('http://127.0.0.1:5000/apriori', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: processedData }),
      });

      if (!response.ok) {
        throw new Error('Error fetching data');
      }

      // Parse the response and update the results state
      const resultData = await response.json();
      setResults(resultData.association_rules); 
      setFrequentItemSets(resultData.frequent_itemsets)// Assuming the response has 'association_rules'
      console.log("rules : " , resultData.association_rules)
      console.log("frequent items set : " , resultData.frequent_itemsets)
    } catch (err) {
      setError('Failed to fetch results');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>One-Hot Encoded Data</h2>
      <table border="1">
        <thead>
          <tr>
            {uniqueItems.map((item, index) => (
              <th key={index}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {oneHotEncodedData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((value, colIndex) => (
                <td key={colIndex}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={encodeIt} disabled={loading}>
        {loading ? 'Processing...' : 'Run Apriori'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      
      {!isEmpty(frequentitemset) && (
                <AprioriResult frequentitemset={frequentitemset} associationRules={results} />
            )}

    </div>
  );
}

export default Apriori;
