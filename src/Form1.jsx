import UploadFile from "./component/UploadFile";
import DisplayTable from "./component/DisplayTable"
function Form1({data , setData , setStep}){

    function handeChangeComponent(){
        setStep(2)
    }

    return (
        <>
        <button onClick={handeChangeComponent}> next step</button>
        <UploadFile setData={setData}/>
        <DisplayTable data={data}/>
        </>
    )
}

export default Form1 ;