import { create } from 'zustand';

const useProductStore = create((set, get) => ({
  products: [],
  categories: [],
  loading: false,
  error: null,
  searchQuery: '',
  activeCategory: 'all',
  activeSection: 'store', // 'store', 'in-store', 'on-demand'

  // Set products
  setProducts: (products) => set({ products }),

  // Set categories
  setCategories: (categories) => set({ categories }),

  // Set loading state
  setLoading: (loading) => set({ loading }),

  // Set error state
  setError: (error) => set({ error }),

  // Set search query
  setSearchQuery: (query) => set({ searchQuery: query }),

  // Set active category
  setActiveCategory: (category) => set({ activeCategory: category }),

  // Set active section
  setActiveSection: (section) => set({ activeSection: section }),

  // Get filtered products based on section, category, and search
  getFilteredProducts: () => {
    const { products, activeSection, activeCategory, searchQuery } = get();

    return products.filter((product) => {
      // Filter by section
      if (activeSection === 'in-store') {
        if (!['in-store', 'both'].includes(product.availability_type)) {
          return false;
        }
      } else if (activeSection === 'on-demand') {
        if (!['on-demand', 'both'].includes(product.availability_type)) {
          return false;
        }
      }

      // Filter by category
      if (activeCategory !== 'all') {
        if (product.category_slug !== activeCategory) {
          return false;
        }
      }

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesCategory = product.category?.toLowerCase().includes(query);
        if (!matchesName && !matchesCategory) {
          return false;
        }
      }

      return true;
    });
  },

  // Clear all filters
  clearFilters: () => {
    set({
      searchQuery: '',
      activeCategory: 'all',
      activeSection: 'store',
    });
  },
}));

export default useProductStore;
