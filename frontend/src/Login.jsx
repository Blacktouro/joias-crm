import { useState } from "react"
import "./static/css/Login.css"

function Login(){

  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState("")
  const [loading,setLoading] = useState(false)

  const login = async () => {

    setError("")

    if(!username || !password){
      setError("Preencha username e password")
      return
    }

    try{

      setLoading(true)

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
        window.location.reload()
      }else{
        setError("Login inválido")
      }

    }catch(err){
      setError("Erro ao ligar ao servidor")
    }

    setLoading(false)
  }

  const handleKey = (e) => {
    if(e.key === "Enter"){
      login()
    }
  }

  const goRegister = () => {
    window.location.href = "/register"
  }

  return(

    <div className="login-container">

      <div className="login-card">

        <h2>Vivace CRM</h2>

        {error && (
          <div className="login-error">
            {error}
          </div>
        )}

        <input
          placeholder="Username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          onKeyDown={handleKey}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          onKeyDown={handleKey}
        />

        <button onClick={login} disabled={loading}>
          {loading ? "A entrar..." : "Login"}
        </button>

        <button className="register-btn" onClick={goRegister}>
          Criar conta
        </button>

        <div className="login-footer">
          CRM de gestão de joias
        </div>

      </div>

    </div>

  )
}

export default Login