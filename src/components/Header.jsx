import { useState, useEffect } from 'react';
import useCartStore from '../store/cartStore';
import useProductStore from '../store/productStore';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ onMenuClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getTotalItems } = useCartStore();
  const { setSearchQuery } = useProductStore();
  const cartCount = getTotalItems();

  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    setIsSearchOpen(false);
  };

  // Scroll to section and close mobile menu
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  // Mobile menu items
  const menuItems = [
    { id: 'home', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'store', label: 'Store', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
    { id: 'in-store', label: 'In-Store', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { id: 'on-demand', label: 'On-Demand', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
  ];

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-primary shadow-md"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center">
              <div 
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => scrollToSection('home')}
              >
                <img 
                  src="/images/logo.png" 
                  alt="Maxzi Logo"
                  className="w-10 h-10 md:w-12 md:h-12 object-contain"
                />
                <span className="text-xl md:text-2xl font-bold text-secondary">
                  Maxzi
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection('home')}
                className="text-white hover:text-secondary font-medium transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('store')}
                className="text-white hover:text-secondary font-medium transition-colors"
              >
                Store
              </button>
              <button
                onClick={() => scrollToSection('in-store')}
                className="flex items-center gap-1 text-white hover:text-secondary font-medium transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-green-400"></span>
                In-Store
              </button>
              <button
                onClick={() => scrollToSection('on-demand')}
                className="flex items-center gap-1 text-white hover:text-secondary font-medium transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                On-Demand
              </button>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2 text-white hover:text-secondary transition-colors"
                  aria-label="Search"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>

                <AnimatePresence>
                  {isSearchOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 top-full mt-2 w-72"
                    >
                      <form onSubmit={handleSearch} className="relative">
                        <input
                          type="text"
                          value={localSearch}
                          onChange={(e) => setLocalSearch(e.target.value)}
                          placeholder="Search products..."
                          className="w-full px-4 py-2 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                          autoFocus
                        />
                        <svg
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Cart */}
              <button
                onClick={onMenuClick}
                className="relative p-2 text-white hover:text-secondary transition-colors"
                aria-label="Open cart"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-text text-xs font-bold rounded-full flex items-center justify-center">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2 text-white hover:text-secondary transition-colors"
                aria-label="Open menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu Panel - 60% width */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-[60%] max-w-xs bg-primary z-50 shadow-2xl"
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/20">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                    <span className="text-primary font-bold text-xl">M</span>
                  </div>
                  <span className="text-xl font-bold text-white">Maxzi</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Menu Items */}
              <nav className="p-4">
                <ul className="space-y-2">
                  {menuItems.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                        </svg>
                        <span className="font-medium">{item.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
