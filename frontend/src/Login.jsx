import { useState } from "react"

function Login(){

  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")

  const login = async () => {

    const res = await fetch("http://localhost:5046/api/auth/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    })

    const data = await res.json()

    if(data.token){
      localStorage.setItem("token",data.token)

      // força React a atualizar
      window.location.reload()

    }else{
      alert("Login inválido")
    }

  }

  return(

    <div style={{padding:"40px"}}>

      <h2>Login Vivace CRM</h2>

      <input
        placeholder="Username"
        onChange={(e)=>setUsername(e.target.value)}
      />

      <br/><br/>

      <input
        type="password"
        placeholder="Password"
        onChange={(e)=>setPassword(e.target.value)}
      />

      <br/><br/>

      <button onClick={login}>
        Login
      </button>

    </div>

  )

}

export default Login