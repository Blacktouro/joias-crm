import { useState, useEffect } from "react"
import Navbar from "./components/Navbar"
import "./static/css/pecas.css"

function Lotes(){

const [lotes,setLotes] = useState([])

const [form,setForm] = useState({
codigoLote:"",
fornecedor:"",
valorReal:"",
valorEuro:"",
numeroPecas:"",
valorAlfandega:"",
valorTransporte:"",
transportadora:"",
diasEntrega:"",
estado:""
})


// carregar lotes
useEffect(()=>{
carregarLotes()
},[])


async function carregarLotes(){

const res = await fetch("http://localhost:5046/api/lotes")
const data = await res.json()

setLotes(data)

}


function handleChange(e){

setForm({
...form,
[e.target.name]: e.target.value
})

}


async function adicionar(){

console.log("clicou no botão")

try{
const novoLote = {

codigoLote: form.codigoLote,
fornecedor: form.fornecedor,
valorReal: parseFloat(form.valorReal) || 0,
valorEuro: parseFloat(form.valorEuro) || 0,
numeroPecas: parseInt(form.numeroPecas) || 0,
valorAlfandega: parseFloat(form.valorAlfandega) || 0,
valorTransporte: parseFloat(form.valorTransporte) || 0,
transportadora: form.transportadora,
diasEntrega: parseInt(form.diasEntrega) || 0,
estado: form.estado

}

const res = await fetch("http://localhost:5046/api/lotes",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body: JSON.stringify(novoLote)
})

if(!res.ok){
console.error("Erro na API")
return
}

const data = await res.json()

setLotes([...lotes,data])

}catch(err){

console.error("Erro ao adicionar lote",err)

}

}


async function apagar(id){

await fetch(`http://localhost:5046/api/lotes/${id}`,{

method:"DELETE"

})

setLotes(lotes.filter(l=>l.id !== id))

}



return(

<div>

<Navbar/>

<div className="container">

<h1>📦 Gestão de Lotes</h1>

<div className="addBar">

<input name="codigoLote" placeholder="Código lote" onChange={handleChange}/>

<input name="fornecedor" placeholder="Fornecedor" onChange={handleChange}/>

<input name="valorReal" placeholder="Valor Real (R$)" type="number" onChange={handleChange}/>

<input name="valorEuro" placeholder="Valor €" type="number" onChange={handleChange}/>

<input name="numeroPecas" placeholder="Nº Peças" type="number" onChange={handleChange}/>

<input name="valorAlfandega" placeholder="Alfândega €" type="number" onChange={handleChange}/>

<input name="valorTransporte" placeholder="Transporte €" type="number" onChange={handleChange}/>

<input name="transportadora" placeholder="Transportadora" onChange={handleChange}/>

<input name="diasEntrega" placeholder="Dias entrega" type="number" onChange={handleChange}/>

<select name="estado" onChange={handleChange}>

<option value="">Estado</option>
<option>Encomendado</option>
<option>Em transporte</option>
<option>Recebido</option>

</select>

<button className="btnAdd" onClick={adicionar}>
Adicionar Lote
</button>

</div>



<div className="listaPecas">

<table>

<thead>

<tr>

<th>ID</th>
<th>Código</th>
<th>Fornecedor</th>
<th>Peças</th>
<th>Valor €</th>
<th>Alfândega</th>
<th>Transporte</th>
<th>Estado</th>
<th>Ações</th>

</tr>

</thead>

<tbody>

{lotes.map((l)=>(

<tr key={l.id}>

<td>{l.id}</td>
<td>{l.codigoLote}</td>
<td>{l.fornecedor}</td>
<td>{l.numeroPecas}</td>
<td>{l.valorEuro}€</td>
<td>{l.valorAlfandega}€</td>
<td>{l.valorTransporte}€</td>
<td>{l.estado}</td>

<td>

<button className="btnDelete" onClick={()=>apagar(l.id)}>
Apagar
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

</div>

)

}

export default Lotes