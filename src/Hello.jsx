import {useState} from "react"
function Hello(){

    const [name , setName] = useState("")
    function handleChange(e){

    setName(e.target.value)
    }
    return (
        <>
        <h1>hello {name}</h1>
<input type="text" placeholder="enter name" value={name} onChange={handleChange}/>
        </>
    )
}

export default Hello ;