import DisplayTable from "./component/DisplayTable";
function Form3({setStep , data} ){


    return (
        <>
        <button onClick={()=>{ setStep("linear")}} >apply algorithm 1 </button>
        <button onClick={()=>{ setStep("kmeans")}}>kmeans algo</button>
        <button onClick={()=>{ setStep("apriori")}}>apriori algorithm 3</button>
        <button onClick={()=>{ setStep("multi")}}>multi algorithm4</button>
        <button onClick={()=>{ setStep(1)}}>1 form</button>
        <button onClick={()=>{ setStep("Ttest")}}>Ttest algorithm 6 </button>
        <DisplayTable data={data} />
        </>
    )
}

export default Form3 ;