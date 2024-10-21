import {useState} from "react"
 function Form(){
    let [username,setusername]=useState("")
    let handleuser=(event)=>{
        console.log(event.target.value);
        setusername(event.target.value)

    }
    return(
        <form action="">
            <input type="text" placeholder="Username"  value={username} onChange={handleuser}/>
        </form>
    )
}
