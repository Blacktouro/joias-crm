import { useState } from "react";
import Navbar from "./components/Navbar";
import "./static/css/pecas.css";

function Pecas(){

const [peca,setPeca] = useState({
idPeca:"",
lote:"",
descricao:"",
tipo:"",
material:"",
valorReal:"",
percentagem:""
})

const taxaEuro = 0.18

const valorEuro = (peca.valorReal || 0) * taxaEuro
const valorVenda = valorEuro + (valorEuro * ((peca.percentagem || 0)/100))

function handleChange(e){
setPeca({
...peca,
[e.target.name]: e.target.value
})
}

function adicionarPeca(){

console.log({
...peca,
valorEuro,
valorVenda
})

}

return(

<div>

<Navbar/>

<div className="container">

{/* FORM */}

<div className="formPeca">

<h2>Adicionar nova peça</h2>

<div className="formGroup">
<label>ID da peça</label>
<input name="idPeca" onChange={handleChange}/>
</div>

<div className="formGroup">
<label>Lote</label>
<input name="lote" onChange={handleChange}/>
</div>

<div className="formGroup">
<label>Descrição</label>
<input name="descricao" onChange={handleChange}/>
</div>

<div className="formGroup">
<label>Tipo</label>
<select name="tipo" onChange={handleChange}>
<option>Brinco</option>
<option>Colar</option>
<option>Pulseira</option>
<option>Anel</option>
</select>
</div>

<div className="formGroup">
<label>Material</label>
<select name="material" onChange={handleChange}>
<option>Ouro</option>
<option>Prata</option>
<option>Aço inox</option>
</select>
</div>

<div className="formGroup">
<label>Valor no Brasil (R$)</label>
<input type="number" name="valorReal" onChange={handleChange}/>
</div>

<div className="formGroup">
<label>Margem %</label>
<input type="number" name="percentagem" onChange={handleChange}/>
</div>

<div className="resultado">

<p>💱 Custo em Euro: {valorEuro.toFixed(2)} €</p>

<p>💰 Preço de venda: {valorVenda.toFixed(2)} €</p>

</div>

<button className="btnAdd" onClick={adicionarPeca}>
Adicionar peça
</button>

</div>


{/* LISTA */}

<div className="listaPecas">

<h2>Peças registadas</h2>

<table>

<thead>
<tr>
<th>ID</th>
<th>Descrição</th>
<th>Tipo</th>
<th>Material</th>
<th>Custo €</th>
<th>Venda €</th>
</tr>
</thead>

<tbody>

<tr>
<td>3456</td>
<td>Brinco ouro 18k</td>
<td>Brinco</td>
<td>Ouro</td>
<td>4.50€</td>
<td>13.50€</td>
</tr>

</tbody>

</table>

</div>

</div>

</div>

)

}

export default Pecas