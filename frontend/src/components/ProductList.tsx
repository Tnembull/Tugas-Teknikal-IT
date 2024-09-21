// src/components/ProductList.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from '../store/productSlice';
import { RootState } from '../store/store';
import { AppDispatch } from '../store/store';

interface ProductListProps {
  setSelectedProduct: (product: any) => void;
}

const ProductList: React.FC<ProductListProps> = ({ setSelectedProduct }) => {
  const dispatch: AppDispatch = useDispatch(); 
  const { products, loading, error } = useSelector((state: RootState) => state.products);

  // Refresh products when needed
  const refreshProducts = () => {
    dispatch(fetchProducts());
  };

  useEffect(() => {
    refreshProducts(); // Ambil produk saat komponen pertama kali dimuat
  }, [dispatch]);

  const handleEdit = (product: any) => {
    setSelectedProduct(product);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await dispatch(deleteProduct(id));
      refreshProducts(); // Refresh product list after deletion
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="mt-4">
      <h2>Product List</h2>
      <ul className="list-group">
        {products.map((product) => (
          <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
            {product.product_name} - {product.category} (${product.price}) {product.discount && `- Discount: ${product.discount}%`}
            <div>
              <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(product)}>Edit</button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(product.id!)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
