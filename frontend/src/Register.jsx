import { useState } from "react"
import "./static/css/Login.css"

function Register(){

  const [username,setUsername] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [birthDate,setBirthDate] = useState("")

  const [message,setMessage] = useState("")
  const [error,setError] = useState("")
  const [loading,setLoading] = useState(false)

  const register = async () => {

    setError("")
    setMessage("")

    if(!username || !email || !password || !birthDate){
      setError("Preencha todos os campos")
      return
    }

    try{

      setLoading(true)

      const res = await fetch("http://localhost:5046/api/auth/register",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          username,
          email,
          password,
          birthDate
        })
      })

      const data = await res.text()

      setMessage(data)

    }catch(err){

      setError("Erro ao criar utilizador")

    }

    setLoading(false)
  }

  const goLogin = () => {
    window.location.href = "/"
  }

  return(

    <div className="login-container">

      <div className="login-card">

        <h2>Criar conta</h2>

        {error && <div className="login-error">{error}</div>}
        {message && <div className="login-success">{message}</div>}

        <input
          placeholder="Username"
          onChange={(e)=>setUsername(e.target.value)}
        />

        <input
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <input
          type="date"
          onChange={(e)=>setBirthDate(e.target.value)}
        />

        <button onClick={register} disabled={loading}>
          {loading ? "A criar..." : "Criar conta"}
        </button>

        <button className="login-btn" onClick={goLogin}>
          Voltar ao Login
        </button>

        <div className="login-footer">
          CRM de gestão de joias
        </div>

      </div>

    </div>

  )
}

export default Register