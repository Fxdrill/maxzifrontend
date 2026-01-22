import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductSection from './components/ProductSection';
import ProductModal from './components/ProductModal';
import Cart from './components/Cart';
import Footer from './components/Footer';
import PolicyModal from './components/PolicyModal';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import useProductStore from './store/productStore';
import { sampleProducts, sampleCategories } from './config/sampleData';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [policyModal, setPolicyModal] = useState({ id: null, isOpen: false });
  const [isAdminRoute, setIsAdminRoute] = useState(false);
  const [adminToken, setAdminToken] = useState(null);
  
  const { setProducts, setCategories, setLoading, setError, setSearchQuery } = useProductStore();

  // Fetch products and categories
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/categories')
        ]);

        if (!productsRes.ok || !categoriesRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();

        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        console.log('API not available, using sample data');
        // Use sample data when API is not available
        setProducts(sampleProducts);
        setCategories(sampleCategories);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setProducts, setCategories, setLoading, setError]);

  // Check for admin route
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/admin') {
      setIsAdminRoute(true);
    } else {
      setIsAdminRoute(false);
    }
  }, []);

  // Scroll to store section
  const handleShopNowClick = () => {
    document.getElementById('store')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle product click
  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  // Handle policy modal
  const handleOpenPolicy = (policyId) => {
    setPolicyModal({ id: policyId, isOpen: true });
  };

  // Handle admin login
  const handleAdminLogin = (token) => {
    setAdminToken(token);
  };

  // Handle admin logout
  const handleAdminLogout = () => {
    localStorage.removeItem('adminToken');
    setAdminToken(null);
    setIsAdminRoute(false);
    window.location.href = '/';
  };

  // Check for existing admin session
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setAdminToken(token);
    }
  }, []);

  // Render admin routes
  if (isAdminRoute) {
    if (!adminToken) {
      return <AdminLogin onLogin={handleAdminLogin} />;
    }
    return <AdminDashboard onLogout={handleAdminLogout} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header onMenuClick={() => setIsCartOpen(true)} />

      {/* Hero Section */}
      <Hero onShopNowClick={handleShopNowClick} />

      {/* Main Store Section */}
      <ProductSection
        id="store"
        section="store"
        title="Our Store"
        subtitle="Browse all our products - available for in-store pickup or on-demand ordering"
        icon={
          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        }
        onProductClick={handleProductClick}
      />

      {/* In-Store Section */}
      <ProductSection
        id="in-store"
        section="in-store"
        title="In-Store"
        subtitle="Available immediately for fast pickup or local delivery"
        icon={
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        }
        onProductClick={handleProductClick}
      />

      {/* On-Demand Section */}
      <ProductSection
        id="on-demand"
        section="on-demand"
        title="On-Demand"
        subtitle="Order specially and we'll ship them directly to you"
        icon={
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        }
        onProductClick={handleProductClick}
      />

      {/* Footer */}
      <Footer onOpenModal={handleOpenPolicy} />

      {/* Cart Sidebar */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Policy Modal */}
      <PolicyModal
        policyId={policyModal.id}
        isOpen={policyModal.isOpen}
        onClose={() => setPolicyModal({ id: null, isOpen: false })}
      />
    </div>
  );
}

export default App;
