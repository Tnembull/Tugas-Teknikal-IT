// src/components/ProductForm.tsx
import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

interface ProductFormProps {
  product?: any;
  setSelectedProduct: (product: any) => void;
  refreshProducts: () => void;  // Tambahkan prop ini
}

const ProductForm: React.FC<ProductFormProps> = ({ product, setSelectedProduct, refreshProducts }) => {
  const initialValues = {
    product_name: product ? product.product_name : '',
    category: product ? product.category : '',
    price: product ? product.price : '',
    discount: product ? product.discount : '',
  };

  const validationSchema = Yup.object({
    product_name: Yup.string().required('Required'),
    category: Yup.string().required('Required'),
    price: Yup.number().required('Required').positive('Must be positive'),
    discount: Yup.number().nullable(),
  });

  const handleSubmit = async (values: any) => {
    if (product) {
      await axios.put(`http://localhost:8000/api/products/${product.id}`, values);
      alert('Product updated successfully!');
    } else {
      await axios.post('http://localhost:8000/api/products', values);
      alert('Product added successfully!');
    }
    refreshProducts(); // Memanggil fungsi refreshProducts setelah submit
    setSelectedProduct(null); // Reset selected product after submission
  };

  // Menggunakan useEffect untuk menyetel nilai awal ketika produk berubah
  useEffect(() => {
    if (product) {
      initialValues.product_name = product.product_name;
      initialValues.category = product.category;
      initialValues.price = product.price;
      initialValues.discount = product.discount;
    }
  }, [product]);

  return (
    <div className="mt-4">
      <h2>{product ? 'Edit Product' : 'Add Product'}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize // Mengizinkan re-inisialisasi Formik ketika initialValues berubah
      >
        <Form>
          <div className="mb-3">
            <label htmlFor="product_name" className="form-label">Product Name</label>
            <Field name="product_name" className="form-control" />
            <ErrorMessage name="product_name" component="div" className="text-danger" />
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">Category</label>
            <Field name="category" className="form-control" />
            <ErrorMessage name="category" component="div" className="text-danger" />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Price</label>
            <Field name="price" type="number" className="form-control" />
            <ErrorMessage name="price" component="div" className="text-danger" />
          </div>
          <div className="mb-3">
            <label htmlFor="discount" className="form-label">Discount</label>
            <Field name="discount" type="number" className="form-control" />
            <ErrorMessage name="discount" component="div" className="text-danger" />
          </div>
          <button type="submit" className="btn btn-primary">{product ? 'Update Product' : 'Add Product'}</button>
          {product && <button type="button" className="btn btn-secondary ms-2" onClick={() => setSelectedProduct(null)}>Cancel</button>}
        </Form>
      </Formik>
    </div>
  );
};

export default ProductForm;
