import {useState}from "react"
import Form1 from "./Form1";
import Form2 from "./Form2" ;
import Form3 from "./Form3";
import SimpleLinearReg from "./component/SimpleLinearReg";


function Multipartform(){

const [step , setStep] = useState(1);
const [data , setData] = useState(null);

   

    switch (step){
        case 1 :
            return <Form1 data={data} setData={setData}  setStep={setStep}/>
        case 2 :
            return <Form2 data={data} setData={setData} setStep={setStep}/>
        case 3 :
            return <Form3 data={data} setStep={setStep}/>
        case "linear" :
            return <SimpleLinearReg dataset={data} />
    }
} 

export default Multipartform ;