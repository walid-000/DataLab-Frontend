import DisplayTable from "./component/DisplayTable";
function Form3({setStep , data} ){


    return (
        <>
        <button onClick={()=>{ setStep("linear")}}>apply algorithm 1 </button>
        <button>apply algorithm 2</button>
        <button>apply algorithm 3</button>
        <button>apply algorithm4</button>
        <button>apply algorithm5</button>
        <button>apply algorithm 6 </button>
        <DisplayTable data={data} />
        </>
    )
}

export default Form3 ;