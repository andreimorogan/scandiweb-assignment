import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import './styles/App.scss';
import ProductList from './pages/ProductList';
import AddProduct from './pages/AddProduct';
import NoMatch from './pages/NoMatch';

class App extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    );
  }
};  

export default App;
