import { useState , useEffect, useCallback} from "react";
function MlRPredictor({beta , epsilon}){

        // beta is array beta values 
    const handlePredict = useCallback()


    return (<>
    <h1>beta </h1>
    <ul>
        {beta.map((item , index) =>(
            <li key={index}>{item}</li>
        ))}
    </ul>
    <h1>epsilons </h1>

    {epsilon.map((item , i) => (
        <li key={i}>{item}</li>
    ))}


    <input type="text" />
    </>)
}

export default MlRPredictor ;