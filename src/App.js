import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

import Home from "./Pages/Home";
import AddRecipe from "./Pages/Add.Recipe";
import Navbar from "./Components/Navbar";

function App(){
  return(
    <Router>
      <Navbar/>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/add" element={<AddRecipe/>}/>
      </Routes>
    </Router>
  );
}

export default App;