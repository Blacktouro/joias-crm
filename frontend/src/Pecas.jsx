import { useState, useEffect } from "react"
import Navbar from "./components/Navbar"
import "./static/css/pecas.css"

function Pecas(){

const [pecas,setPecas] = useState([])
const [lotes,setLotes] = useState([])

const [form,setForm] = useState({
lote:"",
descricao:"",
tipo:"",
material:"",
valorReal:"",
percentagem:""
})

const taxa = 0.18


// carregar dados ao iniciar
useEffect(()=>{

carregarPecas()
carregarLotes()

},[])



async function carregarPecas(){

const res = await fetch("http://localhost:5046/api/pecas")
const data = await res.json()

setPecas(data)

}



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

try{

if(!form.lote || !form.descricao || !form.tipo || !form.material){
alert("Preencha todos os campos")
return
}

const valorReal = parseFloat(form.valorReal) || 0
const percentagem = parseFloat(form.percentagem) || 0

const custoEuro = valorReal * taxa
const venda = custoEuro + (custoEuro * percentagem / 100)

const novaPeca = {

loteId: parseInt(form.lote),
descricao: form.descricao,
tipo: form.tipo,
material: form.material,
valorReal: valorReal,
custoEuro: custoEuro,
valorVenda: venda

}

const res = await fetch("http://localhost:5046/api/pecas",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify(novaPeca)

})

const data = await res.json()

setPecas([...pecas,data])

// limpar formulário
setForm({
lote:"",
descricao:"",
tipo:"",
material:"",
valorReal:"",
percentagem:""
})

}catch(err){

console.error("Erro ao adicionar peça:",err)

}

}



async function apagar(id){

await fetch(`http://localhost:5046/api/pecas/${id}`,{

method:"DELETE"

})

setPecas(pecas.filter(p=>p.id !== id))

}



return(

<div>

<Navbar/>

<div className="container">

<h1>📦 Gestão de Peças</h1>


{/* ADD */}

<div className="addBar">

<select name="lote" value={form.lote} onChange={handleChange}>

<option value="">Selecionar lote</option>

{lotes.map(l=>(
<option key={l.id} value={l.id}>
{l.codigoLote}
</option>
))}

</select>


<input 
name="descricao"
placeholder="Descrição"
value={form.descricao}
onChange={handleChange}
/>

<select name="tipo" value={form.tipo} onChange={handleChange}>
<option value="">Tipo</option>
<option>Brinco</option>
<option>Colar</option>
<option>Pulseira</option>
</select>


<select name="material" value={form.material} onChange={handleChange}>
<option value="">Material</option>
<option>Ouro</option>
<option>Prata</option>
<option>Aço</option>
</select>


<input
name="valorReal"
placeholder="R$"
type="number"
value={form.valorReal}
onChange={handleChange}
/>


<input
name="percentagem"
placeholder="% margem"
type="number"
value={form.percentagem}
onChange={handleChange}
/>


<button className="btnAdd" onClick={adicionar}>
Adicionar
</button>

</div>


{/* TABELA */}

<div className="listaPecas">

<table>

<thead>

<tr>

<th>ID</th>
<th>Lote</th>
<th>Descrição</th>
<th>Tipo</th>
<th>Material</th>
<th>Custo €</th>
<th>Venda €</th>
<th>Ações</th>

</tr>

</thead>

<tbody>

{pecas.map((p)=>(

<tr key={p.id}>

<td>{p.id}</td>
<td>{p.loteId}</td>
<td>{p.descricao}</td>
<td>{p.tipo}</td>
<td>{p.material}</td>
<td>{p.custoEuro?.toFixed(2)}€</td>
<td>{p.valorVenda?.toFixed(2)}€</td>

<td>

<button className="btnEdit">
Editar
</button>

<button className="btnDelete" onClick={()=>apagar(p.id)}>
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

export default Pecas