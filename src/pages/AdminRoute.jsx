import { useState, useEffect } from 'react';

const AdminRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      // Verify token is still valid
      fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => {
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('adminToken');
          setIsAuthenticated(false);
        }
      })
      .catch(() => {
        localStorage.removeItem('adminToken');
        setIsAuthenticated(false);
      })
      .finally(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    window.location.href = '/admin';
    return null;
  }

  return children;
};

export default AdminRoute;
