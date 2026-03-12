import { useNavigate } from "react-router-dom";

function Navbar(){

    const navigate = useNavigate();

    return(

        <div className="navbar">

            <div className="logo">
                💎 Vivace CRM
            </div>

            <div className="navlinks">

                <button onClick={()=>navigate("/")}>Dashboard</button>

                <button onClick={()=>navigate("/pecas")}>
                    📦 Peças
                </button>

                <button onClick={()=>navigate("/lotes")}>
                    🏷️ Lotes
                </button>

                <button onClick={()=>navigate("/vendas")}>
                    💰 Vendas
                </button>

            </div>

        </div>

    )

}

export default Navbar