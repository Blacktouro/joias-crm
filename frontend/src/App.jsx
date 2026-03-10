import { useEffect, useState } from "react";

function App() {

  const [joias, setJoias] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5046/api/joias")
      .then(res => res.json())
      .then(data => setJoias(data));
  }, []);

  return (
    <div style={{padding:"40px"}}>

      <h1>💎 Vivace CRM</h1>

      {joias.map(j => (
        <div key={j.id}>
          {j.nome} - {j.preco}€
        </div>
      ))}

    </div>
  );
}

export default App;