// src/App.tsx
import React, { useState } from 'react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';

const App: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  return (
    <div className="container">
      <h1 className="mt-4">Product Management</h1>
      <ProductForm product={selectedProduct} setSelectedProduct={setSelectedProduct} refreshProducts={() => setSelectedProduct(null)} />
      <ProductList setSelectedProduct={setSelectedProduct} />
    </div>
  );
};

export default App;
