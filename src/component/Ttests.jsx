import OneSampleTtest from "./OneSampleTtest"
import TwoSampleTtest from "./TwoSampleTtest"
import PairedSampleTtest from "./PairedSampleTtest"
import PearsonCorrelationTest from "./PearsonCorrelationTest"

const Ttests = ({ data }) => {
  // Extract unique keys from the first object in the data
  const headers = Object.keys(data[0]);
  
  return (
    <div>
      <h1>One Sample T-test </h1>
      <OneSampleTtest data={data} headers={headers} />
     <hr />
     <TwoSampleTtest data={data} headers={headers} />
     <hr />
     <PairedSampleTtest data={data} headers={headers} />
     <hr />
     <PearsonCorrelationTest data={data} headers={headers} />
    

       
    </div>
  );
};

export default Ttests;
