import { useEffect, useState } from "react";

function Dashboard(){

    const [joias, setJoias] = useState([]);

    const token = localStorage.getItem("token");

    useEffect(() => {

        fetch("http://localhost:5046/api/joias",{
            headers:{
                "Authorization": "Bearer " + token
            }
        })
        .then(res => res.json())
        .then(data => setJoias(data));

    }, []);

    return(

        <div style={{padding:"40px"}}>

            <h1>💎 Vivace CRM</h1>

            <p>Bem-vindo ao painel.</p>

            <button onClick={()=>{
                localStorage.removeItem("token")
                window.location.reload()
            }}>
                Logout
            </button>

            <hr/>

            {joias.map(j => (

                <div key={j.id} style={{
                    padding:"10px",
                    border:"1px solid #ddd",
                    marginBottom:"10px"
                }}>

                    <strong>{j.nome}</strong>

                    <div>
                        Preço: {j.preco}€
                    </div>

                </div>

            ))}

        </div>

    )

}

export default Dashboard