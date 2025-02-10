import { useState, useEffect } from "react"

import FieldSelectionForm from "./component/FieldSelectionForm"
import MlRPredictor from "./component/MLRpredictor"

function MultipleLR({data}){
    // get data using this from Field selector
    const [beta , setBeta] = useState([]);
    const [epsilon , setEpsilon] = useState(null)

    return (
        <>
        <FieldSelectionForm data={data} setBeta={setBeta} setEpsilon={setEpsilon} />
        {epsilon &&  <MlRPredictor betas={beta} epsilon={epsilon}  />  }
        
        </>
    )


}

export default  MultipleLR