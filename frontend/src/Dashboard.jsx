import { useEffect, useState } from "react";
import "./static/css/dashboard.css";
import { useNavigate } from "react-router-dom";

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

    

    const navigate = useNavigate();


    /* KPIs */

    const pecasStock = joias.filter(j => j.vendida === false).length;

    const valorStock = joias
        .filter(j => j.vendida === false)
        .reduce((acc,j)=> acc + j.preco,0);

    const mesAtual = new Date().getMonth();
    const anoAtual = new Date().getFullYear();

    const vendasMes = joias.filter(j => {

        if(!j.dataVenda) return false;

        const data = new Date(j.dataVenda);

        return data.getMonth() === mesAtual &&
               data.getFullYear() === anoAtual;

    });

    const pecasVendidasMes = vendasMes.length;

    const valorVendasMes = vendasMes.reduce((acc,j)=> acc + j.preco,0);


    return(

        <div className="dashboard">

            {/* SIDEBAR */}

            <div className="sidebar">

                <h2>💎 Vivace</h2>

                <ul>
                    <li onClick={()=>navigate("/pecas")}>📦 Peças</li>
                    <li>🏷️ Lotes</li>
                    <li>💰 Vendas</li>
                    <li>👩 Vendedoras</li>
                    <li>📊 Relatórios</li>
                </ul>

                <button className="logout" onClick={()=>{
                    localStorage.removeItem("token")
                    window.location.reload()
                }}>
                    Logout
                </button>

            </div>


            {/* MAIN */}

            <div className="main">

                <h1>Dashboard</h1>

                {/* KPIs */}

                <div className="kpis">

                    <div className="card">
                        <h3>Peças em Stock</h3>
                        <p>{pecasStock}</p>
                    </div>

                    <div className="card">
                        <h3>Vendidas este mês</h3>
                        <p>{pecasVendidasMes}</p>
                    </div>

                    <div className="card">
                        <h3>Valor em Stock</h3>
                        <p>{valorStock}€</p>
                    </div>

                    <div className="card">
                        <h3>Vendas este mês</h3>
                        <p>{valorVendasMes}€</p>
                    </div>

                </div>


                {/* LISTA */}

                <div className="lista">

                    <h2>Peças</h2>

                    {joias.map(j => (

                        <div key={j.id} className="joia">

                            <strong>{j.nome}</strong>

                            <div>
                                Preço: {j.preco}€
                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>

    )

}

export default Dashboard;