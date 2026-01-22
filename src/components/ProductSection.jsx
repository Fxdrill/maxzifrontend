import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useProductStore from '../store/productStore';
import ProductCard from './ProductCard';

const ProductSection = ({ section, title, subtitle, icon, onProductClick }) => {
  const { products, loading, error, activeSection, setActiveSection, activeCategory, setActiveCategory, categories, searchQuery, getFilteredProducts } = useProductStore();
  const [showFilters, setShowFilters] = useState(false);

  // Set active section when this section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(section);
          }
        });
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(section);
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [section, setActiveSection]);

  const filteredProducts = getFilteredProducts();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <section
      id={section}
      className="py-12 md:py-16 bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            {icon}
            <h2 className="text-2xl md:text-3xl font-bold text-text">
              {title}
            </h2>
          </div>
          <p className="text-text-muted max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Category Filters */}
        <div className="mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setActiveCategory('all')}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-white text-text hover:bg-gray-100'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.slug)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.slug
                    ? 'bg-primary text-white'
                    : 'bg-white text-text hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="text-primary hover:underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <p className="text-gray-500 mb-2">No products found</p>
                <p className="text-sm text-gray-400">
                  {searchQuery ? 'Try a different search term' : 'Check back later for new products'}
                </p>
              </div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
              >
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={onProductClick}
                  />
                ))}
              </motion.div>
            )}
          </>
        )}

        {/* Search Results Info */}
        {searchQuery && filteredProducts.length > 0 && (
          <p className="text-center text-sm text-gray-500 mt-4">
            Showing {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} for "{searchQuery}"
          </p>
        )}
      </div>
    </section>
  );
};

export default ProductSection;
