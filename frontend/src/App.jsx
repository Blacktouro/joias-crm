import Login from "./Login"
import Register from "./Register"
import Dashboard from "./Dashboard"

function App(){

  const token = localStorage.getItem("token")
  const path = window.location.pathname

  // se estiver na página de registo
  if(path === "/register"){
    return <Register/>
  }

  // se não tiver login
  if(!token){
    return <Login/>
  }

  // se tiver login vai para dashboard
  return <Dashboard/>

}

export default App