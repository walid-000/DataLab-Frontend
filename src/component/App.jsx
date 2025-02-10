import Apriori from "./Apriori";
import DisplayTable from "./DisplayTable";
import Ttests from "./Ttests";


function App(){
   const data = [
    {
      "Age": "25",
      "Years_of_Experience": "2",
      "Salary": "45000"
    },
    {
      "Age": "30",
      "Years_of_Experience": "5",
      "Salary": "54000"
    },
    {
      "Age": "35",
      "Years_of_Experience": "8",
      "Salary": "61000"
    },
    {
      "Age": "40",
      "Years_of_Experience": "12",
      "Salary": "68000"
    },
    {
      "Age": "45",
      "Years_of_Experience": "15",
      "Salary": "75000"
    },
    {
      "Age": "50",
      "Years_of_Experience": "18",
      "Salary": "82000"
    },
    {
      "Age": "55",
      "Years_of_Experience": "20",
      "Salary": "87000"
    },
    {
      "Age": "60",
      "Years_of_Experience": "25",
      "Salary": "93000"
    }
  ]

  
    return (
        <>
        <Ttests data={data} />

        {/* <Apriori data={data} /> */}
        {/* <DisplayTable data={data} /> */}
        
        </>
    )
}

export default App ;