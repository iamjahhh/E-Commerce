import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/navBar';
import Categories from './pages/categories';
import Home from './pages/home';
import AddProduct from './pages/admin/AddProduct';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/categories" element={<Categories />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
      </Routes>
    </Router>
  );
}

export default App;