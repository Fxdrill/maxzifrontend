import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useCartStore from '../store/cartStore';

const ProductModal = ({ product, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();

  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleAddToCart = () => {
    addItem({
      ...product,
      quantity: quantity
    });
    onClose();
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 modal-overlay"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-lg w-full md:rounded-2xl bg-white z-50 md:max-h-[90vh] overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Content Scroll */}
            <div className="overflow-y-auto max-h-[90vh]">
              {/* Product Image */}
              <div className="relative aspect-square bg-gray-100">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="p-6">
                {/* Availability Badge */}
                <div className="mb-3">
                  {product.availability_type === 'in-store' ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      Available In-Store
                    </span>
                  ) : product.availability_type === 'on-demand' ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 text-sm font-medium rounded-full">
                      <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                      Available On-Demand
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      Available Both Ways
                    </span>
                  )}
                </div>

                {/* Name & Price */}
                <h2 className="text-2xl font-bold text-text mb-2">
                  {product.name}
                </h2>
                <p className="text-2xl font-bold text-secondary mb-4">
                  {formatPrice(product.price)}
                </p>

                {/* Description */}
                {product.description && (
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-text mb-2">Description</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                )}

                {/* Category */}
                {product.category && (
                  <div className="mb-6">
                    <span className="text-sm text-gray-500">Category: </span>
                    <span className="text-sm font-medium text-primary">
                      {product.category}
                    </span>
                  </div>
                )}

                {/* Quantity & Add to Cart */}
                <div className="flex items-center gap-4">
                  {/* Quantity Selector */}
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center text-text hover:bg-gray-100 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="w-12 text-center font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center text-text hover:bg-gray-100 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-primary hover:bg-primary-light text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;
