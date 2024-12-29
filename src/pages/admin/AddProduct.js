import React, { useState } from 'react';

function AddProduct() {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    original_price: '',
    sale_price: '',
    category: '',
    stock: '',
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    Object.keys(product).forEach(key => {
      formData.append(key, product[key]);
    });
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          alert('Product added successfully!');
          // Reset form
          setProduct({
            name: '',
            description: '',
            original_price: '',
            sale_price: '',
            category: '',
            stock: '',
          });
          setImage(null);
          setPreview(null);
        }
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product');
    }
  };

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <h2 className="mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Product Name</label>
              <input
                type="text"
                className="form-control"
                value={product.name}
                onChange={(e) => setProduct({...product, name: e.target.value})}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Category</label>
              <input
                type="text"
                className="form-control"
                value={product.category}
                onChange={(e) => setProduct({...product, category: e.target.value})}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Original Price</label>
              <input
                type="number"
                className="form-control"
                value={product.original_price}
                onChange={(e) => setProduct({...product, original_price: e.target.value})}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Sale Price (Optional)</label>
              <input
                type="number"
                className="form-control"
                value={product.sale_price}
                onChange={(e) => setProduct({...product, sale_price: e.target.value})}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Stock</label>
              <input
                type="number"
                className="form-control"
                value={product.stock}
                onChange={(e) => setProduct({...product, stock: e.target.value})}
                required
              />
            </div>
          </div>
          <div className="col-12">
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                rows="3"
                value={product.description}
                onChange={(e) => setProduct({...product, description: e.target.value})}
                required
              ></textarea>
            </div>
          </div>
          <div className="col-12">
            <div className="mb-3">
              <label className="form-label">Product Image</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
              {preview && (
                <div className="mt-2">
                  <img 
                    src={preview} 
                    alt="Preview" 
                    style={{ maxWidth: '200px', maxHeight: '200px' }}
                    className="img-thumbnail"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">Add Product</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
