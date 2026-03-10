import Login from "./Login";
import Dashboard from "./Dashboard";

function App(){

  const token = localStorage.getItem("token");

  if(!token){
    return <Login/>
  }

  return <Dashboard/>

}

export default App;