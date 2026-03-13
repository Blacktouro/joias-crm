import { BrowserRouter,Routes,Route } from "react-router-dom";

import Dashboard from "./Dashboard";
import Pecas from "./Pecas";

import Lotes from "./Lotes"

function App(){

return(

<BrowserRouter>

<Routes>

<Route path="/" element={<Dashboard/>} />
<Route path="/pecas" element={<Pecas/>} />
<Route path="/lotes" element={<Lotes />} />

</Routes>

</BrowserRouter>

)

}

export default App