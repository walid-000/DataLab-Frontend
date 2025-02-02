import Apriori from "./Apriori";
import DisplayTable from "./DisplayTable";

function App(){
   const data = [
    {
      "1": "2",
      " bread butter jam": " bread butter"
    },
    {
      "1": "3",
      " bread butter jam": " milk butter"
    },
    {
      "1": "4",
      " bread butter jam": " bread milk"
    },
    {
      "1": "5",
      " bread butter jam": " bread butter jam cheese"
    }
  ]
          
    return (
        <>
        
        <Apriori data={data} />
        <DisplayTable data={data} />
        
        </>
    )
}

export default App ;