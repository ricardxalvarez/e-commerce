import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from './pages/Register'
import Login from './pages/Login'
import Cart from "./pages/Cart";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/products' element={<ProductList/>}/>
        <Route path='/product/:id' element={<Product/>}/>
      </Routes>
    </Router>
  );
}

export default App;
