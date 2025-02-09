import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

const Kmeans = ({ data }) => {
  const [elbowGraphData, setElbowGraphData] = useState([]); // Data for the Elbow Method
  const [kmeansGraphData, setKMeansGraphData] = useState(null); // KMeans graph data
  const [numClusters, setNumClusters] = useState(3); // Number of clusters user chooses
  const [selectedColumns, setSelectedColumns] = useState([]); // Track selected columns
  const [transformedData, setTransformedData] = useState([]); // Transformed data for clustering
  
  // Headers of the data (the keys of the first object in the data array)
  const headers = data.length ? Object.keys(data[0]) : [];
  
  // Handle header selection
  const handleColumnSelection = (e) => {
    const { value, checked } = e.target;
    setSelectedColumns((prevColumns) =>
      checked ? [...prevColumns, value] : prevColumns.filter((col) => col !== value)
    );
  };

  // Transform the data based on selected columns
  const transformData = () => {
    if (selectedColumns.length === 0) {
      alert("Please select at least one column");
      return;
    }
    
    const transformed = data.map((item) => {
      return selectedColumns.map((col) => parseFloat(item[col]));
    });
    
    setTransformedData(transformed);
    console.log(transformed)
  };

  // Handle the Elbow method call
  const handleElbowMethod = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/elbow-method', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: transformedData }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch elbow method data');
      }

      const result = await response.json();
      const { inertia_values } = result;
      setElbowGraphData(inertia_values); // Set elbow graph data
    } catch (error) {
      console.error('Error fetching elbow method data', error);
    }
  };

  // Handle KMeans clustering call
  const handleKMeansClustering = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/kmeans-clustering', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: transformedData,
          num_clusters: numClusters,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch KMeans clustering data');
      }

      const result = await response.json();
      const { labels, centers } = result;
      setKMeansGraphData({ labels, centers }); // Set KMeans graph data
    } catch (error) {
      console.error('Error fetching KMeans clustering data', error);
    }
  };

  // Generate Elbow method plot using Plotly
  const generateElbowGraph = () => {
    return {
      data: [
        {
          x: Array.from({ length: elbowGraphData.length }, (_, i) => i + 1), // x-axis: Number of clusters
          y: elbowGraphData, // y-axis: Inertia values
          mode: 'lines+markers',
          type: 'scatter',
          name: 'Inertia',
        },
      ],
      layout: {
        title: 'Elbow Method',
        xaxis: { title: 'Number of Clusters' },
        yaxis: { title: 'Inertia' },
      },
    };
  };

  // Generate KMeans clustering plot using Plotly
  const generateKMeansGraph = () => {
    if (!kmeansGraphData) return null;

    const { labels, centers } = kmeansGraphData;

    return {
      data: [
        {
          x: transformedData.map((point) => point[0]),
          y: transformedData.map((point) => point[1]),
          mode: 'markers',
          type: 'scatter',
          marker: {
            color: labels.map(label => label), // Assign colors based on cluster labels
            colorscale: 'Viridis',
            size : 10
          },
          name: 'Data Points',
        },
        {
          x: centers.map((center) => center[0]),
          y: centers.map((center) => center[1]),
          mode: 'markers',
          type: 'scatter',
          marker: {
            color: 'rgba(0,0,0,0)',
            size: 20,
            symbol: 'circle',
            line :{
              color : 'black' ,
              width : 3 ,
            } ,
    
          },
          name: 'Centroids',
        },
      ],
      layout: {
        title: 'KMeans Clustering',
        xaxis: { title: 'Feature 1' },
        yaxis: { title: 'Feature 2' },
      },
    };
  };

  return (
    <div>
      <h1>Clustering Application</h1>

      {/* Select multiple columns to use for clustering */}
      <div>
        <h2>Select Columns for Clustering</h2>
        {headers.map((header) => (
          <div key={header}>
            <input
              type="checkbox"
              value={header}
              onChange={handleColumnSelection}
            />
            <label>{header}</label>
          </div>
        ))}
      </div>

      {/* Button to transform data */}
      <button onClick={transformData}>Transform Data</button>

      {/* Button to trigger Elbow Method */}
      <button onClick={handleElbowMethod} disabled={transformedData.length === 0}>
        Generate Elbow Graph
      </button>

      {/* Display Elbow Graph */}
      {elbowGraphData.length > 0 && (
        <Plot data={generateElbowGraph().data} layout={generateElbowGraph().layout} />
      )}

      {/* Input field for number of clusters */}
      <input
        type="number"
        value={numClusters}
        onChange={(e) => setNumClusters(e.target.value)}
        min="1"
        max="10"
        placeholder="Enter number of clusters"
      />
      
      {/* Button to trigger KMeans clustering */}
      <button onClick={handleKMeansClustering} disabled={transformedData.length === 0}>
        Run KMeans Clustering
      </button>

      {/* Display KMeans clustering graph */}
      {kmeansGraphData && (
        <Plot data={generateKMeansGraph().data} layout={generateKMeansGraph().layout} />
      )}
    </div>
  );
};

export default Kmeans;
