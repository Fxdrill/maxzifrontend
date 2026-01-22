import { motion } from 'framer-motion';

const ProductCard = ({ product, onClick }) => {
  const availabilityBadge = () => {
    if (product.availability_type === 'in-store') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          In-Store
        </span>
      );
    } else if (product.availability_type === 'on-demand') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
          <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
          On-Demand
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          Both
        </span>
      );
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

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4 }}
      className="product-card bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer"
      onClick={() => onClick(product)}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Availability Badge */}
        <div className="absolute top-3 left-3">
          {availabilityBadge()}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-text mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-secondary">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick(product);
            }}
            className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white hover:bg-primary-light transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
