import { BrowserRouter,Routes,Route } from "react-router-dom";

import Dashboard from "./Dashboard";
import Pecas from "./Pecas";

function App(){

return(

<BrowserRouter>

<Routes>

<Route path="/" element={<Dashboard/>} />
<Route path="/pecas" element={<Pecas/>} />

</Routes>

</BrowserRouter>

)

}

export default App