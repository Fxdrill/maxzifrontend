import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    category_id: '',
    availability_type: 'both',
    image_url: ''
  });

  const [categoryForm, setCategoryForm] = useState({
    name: '',
    slug: ''
  });

  // Fetch data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        fetch('/api/products?limit=100'),
        fetch('/api/categories')
      ]);

      const productsData = await productsRes.json();
      const categoriesData = await categoriesRes.json();

      setProducts(productsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Product CRUD operations
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productForm)
      });

      if (res.ok) {
        fetchData();
        setShowProductForm(false);
        setProductForm({
          name: '',
          description: '',
          price: '',
          category_id: '',
          availability_type: 'both',
          image_url: ''
        });
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productForm)
      });

      if (res.ok) {
        fetchData();
        setShowProductForm(false);
        setEditingProduct(null);
        setProductForm({
          name: '',
          description: '',
          price: '',
          category_id: '',
          availability_type: 'both',
          image_url: ''
        });
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description || '',
      price: product.price.toString(),
      category_id: product.category_id,
      availability_type: product.availability_type,
      image_url: product.image_url || ''
    });
    setShowProductForm(true);
  };

  // Category CRUD operations
  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryForm)
      });

      if (res.ok) {
        fetchData();
        setShowCategoryForm(false);
        setCategoryForm({ name: '', slug: '' });
      }
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    try {
      const res = await fetch(`/api/categories/${categoryId}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-primary text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
              <span className="text-primary font-bold text-xl">M</span>
            </div>
            <h1 className="text-xl font-bold">Maxzi Admin</h1>
          </div>
          <button
            onClick={onLogout}
            className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'products'
                ? 'bg-primary text-white'
                : 'bg-white text-text hover:bg-gray-100'
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'categories'
                ? 'bg-primary text-white'
                : 'bg-white text-text hover:bg-gray-100'
            }`}
          >
            Categories
          </button>
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-text">Products</h2>
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setProductForm({
                    name: '',
                    description: '',
                    price: '',
                    category_id: '',
                    availability_type: 'both',
                    image_url: ''
                  });
                  setShowProductForm(true);
                }}
                className="bg-primary hover:bg-primary-light text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Product
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-text">Image</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-text">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-text">Price</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-text">Category</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-text">Type</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-text">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                            {product.image_url ? (
                              <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-300">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 font-medium text-text">{product.name}</td>
                        <td className="px-6 py-4 text-secondary font-semibold">{formatPrice(product.price)}</td>
                        <td className="px-6 py-4 text-gray-500">{product.category || 'Uncategorized'}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            product.availability_type === 'in-store'
                              ? 'bg-green-100 text-green-700'
                              : product.availability_type === 'on-demand'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {product.availability_type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="text-primary hover:text-primary-dark mr-3"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-text">Categories</h2>
              <button
                onClick={() => {
                  setCategoryForm({ name: '', slug: '' });
                  setShowCategoryForm(true);
                }}
                className="bg-primary hover:bg-primary-light text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Category
              </button>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((category) => (
                <div key={category.id} className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-text">{category.name}</h3>
                    <p className="text-sm text-gray-500">{category.slug}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Product Form Modal */}
      <AnimatePresence>
        {showProductForm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setShowProductForm(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              className="fixed inset-x-0 bottom-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-lg w-full md:rounded-2xl bg-white z-50 max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-text">
                    {editingProduct ? 'Edit Product' : 'Add Product'}
                  </h2>
                  <button
                    onClick={() => setShowProductForm(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text mb-1">Name *</label>
                    <input
                      type="text"
                      value={productForm.name}
                      onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text mb-1">Description</label>
                    <textarea
                      value={productForm.description}
                      onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text mb-1">Price *</label>
                      <input
                        type="number"
                        value={productForm.price}
                        onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text mb-1">Availability *</label>
                      <select
                        value={productForm.availability_type}
                        onChange={(e) => setProductForm({ ...productForm, availability_type: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                      >
                        <option value="both">Both</option>
                        <option value="in-store">In-Store</option>
                        <option value="on-demand">On-Demand</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text mb-1">Category *</label>
                    <select
                      value={productForm.category_id}
                      onChange={(e) => setProductForm({ ...productForm, category_id: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text mb-1">Image URL</label>
                    <input
                      type="url"
                      value={productForm.image_url}
                      onChange={(e) => setProductForm({ ...productForm, image_url: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                      placeholder="https://..."
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowProductForm(false)}
                      className="flex-1 py-3 border border-gray-200 rounded-lg text-text font-medium hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-primary hover:bg-primary-light text-white rounded-lg font-medium transition-colors"
                    >
                      {editingProduct ? 'Update' : 'Add'} Product
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Category Form Modal */}
      <AnimatePresence>
        {showCategoryForm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setShowCategoryForm(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              className="fixed inset-x-0 bottom-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-md w-full md:rounded-2xl bg-white z-50"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-text">Add Category</h2>
                  <button
                    onClick={() => setShowCategoryForm(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleAddCategory} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text mb-1">Name *</label>
                    <input
                      type="text"
                      value={categoryForm.name}
                      onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text mb-1">Slug (auto-generated)</label>
                    <input
                      type="text"
                      value={categoryForm.slug}
                      onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary bg-gray-50"
                      readOnly={categoryForm.name !== ''}
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowCategoryForm(false)}
                      className="flex-1 py-3 border border-gray-200 rounded-lg text-text font-medium hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-primary hover:bg-primary-light text-white rounded-lg font-medium transition-colors"
                    >
                      Add Category
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
