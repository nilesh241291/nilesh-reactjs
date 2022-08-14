
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import ProductDetails from "./pages/ProductDetails";
import AddProduct from './pages/AddProduct';

function App() {
  return (
    <Router>
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/product/:productId" element={<ProductDetails />} />
         <Route path="/addproduct" element={<AddProduct/>} />
       </Routes>
     </Router>
  );
}

export default App;
